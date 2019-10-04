const http = require('http');
var url = require('url');
var elastic=require("./elastic-queries");
var calService=require("./calendar-service");

calService.loadCalendar();

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    
    //get url infomation
    var urlParts = url.parse(req.url);
    console.log(req.url, urlParts);

    //direct the request to appropriate function to be processed based on the url pathname
    switch(urlParts.pathname) {
        case "/parkings":
            getParkings(req, res);
            break;
        case "/averageFullTime":
            //const date= urlParts.searchParams.get("date");
            //const parking= urlParts.searchParams.get("parking");
            var query_string = urlParts.search;
            var search_params = new url.URLSearchParams(query_string); 
            var date = search_params.get('date');
            var parking = search_params.get('parking');
            getAverageFullTime(date,parking,res);
            break;
        default:
            homepage(req,res);
            break;
    }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function homepage(req, res) {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello, this is the home page :)"); 
}

function getParkings(req, res) {
    elastic.getParkingNames().then(function(result){
    if(result.statusCode==200){
        console.log("received parkings: "+JSON.stringify(result))
        var list=result.body.aggregations.parkingNames.buckets;
        var parkings=[];     
        for(i in list){
          var parking=list[i];
          console.log("parsing parking "+JSON.stringify(parking));
          parkings.push(parking.key);
        }
        
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');        
        var json="{ \"parkings\": "+JSON.stringify(parkings)+"}";
        console.log("parkings json="+json);
        res.end(json);
      }
      else{
          console.log("error code: "+result.statusCode+": "+JSON.stringify(result));
          res.statusCode=500;
          res.end("an error occured");
      }
    }).catch(function(error){
      console.log("error: "+JSON.stringify(error));
          res.statusCode=500;
          res.end("an error occured");
    });
}

function getAverageFullTime(dateS, parking, res){
  console.log("getAverageFullTime for date "+dateS+" and parking "+parking);
  const date=new Date(dateS);
  const type=calService.getTypeOfDay(date);
  console.log("type of date="+type);


  
  res.statusCode=200;
  res.setHeader('Content-Type', 'text/plain');
    res.end("This is a "+type); 
}