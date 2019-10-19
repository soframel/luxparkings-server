const { Client } = require('@elastic/elasticsearch')
var timeService=require("./time");
var dateFormat = require('dateformat');

const client = new Client(
  { 
    node: 'http://localhost:9200', 
    auth: {
      username: 'reader',
      password: 'reader'
    } 
  });

const index="parkings";

/**
 * returns search result with parking names
 */
exports.getParkingNames=function() {
    return client.search({
        index: index,
        body: {      
          "aggregations" : {
            "parkingNames" : {
                "terms" : { 
                  "field" : "parkingName",
                  "size": 50
                }
            }        
        }
        }
    });   
}

exports.getAverageFullTime=async function(similarDates, parking){
  
  //elastic query
  //const esEntries=getCompleteTimesForSimilarDatesInParking(similarDates, parking).then(function(result){
  var result=await getCompleteTimesForSimilarDatesInParking(similarDates, parking);
  try{
    if(result.statusCode==200){
      console.log("received parkings"); //: "+JSON.stringify(result))
      const hits=result.body.hits.hits;
      var map=getMapOfFirstTimeFullByDay(hits);
      //console.log("interpreted results into a map of times");
      //+map.keys.forEach(function(value, index, array){console.log(value+"="+map.get(value))}));
      var values=map.values();
      var times=Array.from(values);

      //calculate average for every day
      const average=timeService.calculateAverageTime(times);
      
      return average;
    }
    else{
        console.log("error code: "+result.statusCode+": "+JSON.stringify(result));
        return null;
    }
  //}).catch(function(error){
  }catch(error){
    console.log("received an error: "+error);
    return null;
  }; //)
};

/**
 * call elasticsearch to get entries for similar dates in given parking
 */
async function getCompleteTimesForSimilarDatesInParking(listOfDates, parkingName){
  var datesRanges=[];
  for(let date of listOfDates.values()){
    var dateS=dateFormat(date, "yyyy-mm-dd");
    //datesRanges=datesRanges+"\n{\"range\": {\"postDate\": {\"gte\": \""+dateS+"\",\"lte\": \""+dateS+"\",\"format\": \"yyyy-MM-dd\"}}},";
    datesRanges.push({
      "range": {
        "postDate": {
          "gte": dateS,
          "lte": dateS,
          "format": "yyyy-MM-dd"
        }
      }
    });   
  }

  return await client.search({
    "index": index,
    "body": {
      "size": 1000,
      "query": {      
    "bool": {
      "must": [
        {
          "range": {
            "message.actuel": {
              "lt": 3
            }
          }
        }
      ],
      "filter": {
        "bool": {
          "must":[
            {
              "term": {
                "parkingName": {
                  "value": parkingName
                }
              }
            }
            , 
            {
              "range":{
                "message.ouvert":{
                  "gte": 1
                }
              }  
            }          
          ], 
          "should": datesRanges,
          "minimum_should_match" : 1
        }
      }
    }
  }
}
}); 
};  


/**
 * interpret elastic result hits to return a map of (day -> minimum full time)
 */
function getMapOfFirstTimeFullByDay(hits){
  var map=new Map();
  hits.forEach(function(value, index, array){
    const dateS=value._source.postDate;
    const time=parseInt(value._source.time);
    var date=new Date(dateS);
    date.setHours(0,0,0,0);
    if(map.has(date)){
      const otherTime=map.get(date);
      if(time<otherTime){
        map.set(date, time);        
      }
    }
    else{
      map.set(date, time)
    }
  });
  return map;
}