const { Client } = require('@elastic/elasticsearch')

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
