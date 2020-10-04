var queries = require('../covid-elastic-mapper.js');


describe("Testing covid-elastic-mapper", function () {

  it("nominal case", function () {

    const hits = [
          {
            "_index": "covid",
            "_type": "_doc",
            "_id": "CH-AGGREGATE-2020-09-25",
            "_score": 3.4222064,
            "_source": {
              "date": "2020-09-25",
              "source": "AGGREGATE",
              "country": "CH",
              "region": "",
              "totalCases": 28221,
              "totalDeaths": 1132,
              "currentlyHospitalized": 103,
              "currentlyInReanimation": 10,
              "totalCured": 0,
              "newHospitalisations": 0,
              "newReanimations": 0,
              "victimes": [],
              "totalTested": 0,
              "newPositiveTests": 0,
              "totalCasesPer100kInhabitants": 441,
              "totalDeathsPer100kInhabitants": 17,
              "reanimationPer100kInhabitants": 0,
              "population": 6398680
            }
          },
          {
            "_index": "covid",
            "_type": "_doc",
            "_id": "FR--2020-09-08-ministere-sante",
            "_score": 3.4222064,
            "_source": {
              "date": "2020-09-08",
              "source": "ministere-sante",
              "country": "FR",
              "region": "",
              "totalCases": 376400,
              "totalDeaths": 30764,
              "currentlyHospitalized": 4960,
              "currentlyInReanimation": 574,
              "totalCured": 88226,
              "newHospitalisations": 490,
              "newReanimations": 86,
              "victimes": [],
              "totalTested": 0,
              "newPositiveTests": 0,
              "totalCasesPer100kInhabitants": 565,
              "totalDeathsPer100kInhabitants": 46,
              "reanimationPer100kInhabitants": 0,
              "population": 66524000
            }
          },
          {
            "_index": "covid",
            "_type": "_doc",
            "_id": "CH-AGGREGATE-2020-09-08",
            "_score": 3.4222064,
            "_source": {
              "date": "2020-09-08",
              "source": "AGGREGATE",
              "country": "CH",
              "region": "",
              "totalCases": 28221,
              "totalDeaths": 1132,
              "currentlyHospitalized": 103,
              "currentlyInReanimation": 10,
              "totalCured": 0,
              "newHospitalisations": 0,
              "newReanimations": 0,
              "victimes": [],
              "totalTested": 0,
              "newPositiveTests": 0,
              "totalCasesPer100kInhabitants": 421,
              "totalDeathsPer100kInhabitants": 17,
              "reanimationPer100kInhabitants": 0,
              "population": 6398680
            }
          },
        ]

        const expected={
          "2020-09-08": [
            {
              country: "FR",
              totalCasesPer100kInhabitants: 565
            },
            {
              country: "CH",
              totalCasesPer100kInhabitants: 421
            }
          ],
          "2020-09-25": [
            {
              country: "CH",
              totalCasesPer100kInhabitants: 441
            }
          ]
        }

    expect(queries.mapTotalCasesPer100k(hits)).toEqual(expected);
  });

});