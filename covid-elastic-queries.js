const { Client } = require('@elastic/elasticsearch')
var timeService = require("./time");
var mapper = require("./covid-elastic-mapper");
var dateFormat = require('dateformat');

const username = process.env.ELASTIC_COVID_USERNAME;
const password = process.env.ELASTIC_COVID_PASSWORD;
const elastic_url = process.env.ELASTIC_URL;

console.log("loaded username & password from command line: " + username);
if (!username || !password || !elastic_url) {
  console.log("No username or password or url for Elastic. Exiting");
  process.exit(1);
}

const client = new Client(
  {
    node: elastic_url,
    auth: {
      username: username,
      password: password
    }
  });

const index = "covid";

exports.getTotalCasesPer100kPerCountry = function (startDate, endDate) {

  console.log("getCountryData between " + startDate + " and " + endDate);

  var date1 = dateFormat(startDate, "yyyy-mm-dd");
  var date2 = dateFormat(endDate, "yyyy-mm-dd");

return client.search({
  "index": index,
  "body": {
    "size": 1000,
    "query":
    {
      "bool": {
        "must": [
          {
            "term": {
              "region": {
                "value": ""
              }
            }
          }
        ],
        "must_not": [
          {
            "term": {
              "country": {
                "value": "World"
              }
            }
          }
        ],
        "filter": [
          {
            "range": {
              "date": {
                "gte": date1,
                "lte": date2,
                "format": "yyyy-MM-dd"
              }
            }
          }
        ]


      }
    }
  }
});
}


exports.getTotalDeathsPer100k = function (startDate, endDate) {

  console.log("getTotalDeaths between " + startDate + " and " + endDate);

  var date1 = dateFormat(startDate, "yyyy-mm-dd");
  var date2 = dateFormat(endDate, "yyyy-mm-dd");

return client.search({
  "index": index,
  "body": {
    "size": 1000,
    "query":
    {
      "bool": {
        "must": [
          {
            "range": {
              "population": {
                "gt": 0
              }
            }
          }
        ],
        "must_not": [
          {
            "term": {
              "country": {
                "value": "World"
              }
            }
          }
        ],
        "filter": [
          {
            "range": {
              "date": {
                "gte": date1,
                "lte": date2,
                "format": "yyyy-MM-dd"
              }
            }
          }
        ]


      }
    }
  }
});
}



exports.getReanimationsPer100k = function (startDate, endDate) {

  console.log("getReanimations between " + startDate + " and " + endDate);

  var date1 = dateFormat(startDate, "yyyy-mm-dd");
  var date2 = dateFormat(endDate, "yyyy-mm-dd");

return client.search({
  "index": index,
  "body": {
    "size": 1000,
    "query":
    {
      "bool": {
        "must": [
          {
            "range": {
              "population": {
                "gt": 0
              }
            }
          }
        ],
        "must_not": [
          {
            "term": {
              "country": {
                "value": "World"
              }
            }
          }
        ],
        "filter": [
          {
            "range": {
              "date": {
                "gte": date1,
                "lte": date2,
                "format": "yyyy-MM-dd"
              }
            }
          }
        ]


      }
    }
  }
});
}
