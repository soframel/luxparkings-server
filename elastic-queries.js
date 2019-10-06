const { Client } = require('@elastic/elasticsearch')
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

exports.getCompleteTimesForSimilarDatesInParking=function(listOfDates, parkingName){
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

  return client.search({
    "index": index,
    "body": {
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
                  "value": "Bouillon"
                }
              }
            }], 
          "should": datesRanges,
          "minimum_should_match" : 1
        }
      }
    }
  }
}
}); 
};  