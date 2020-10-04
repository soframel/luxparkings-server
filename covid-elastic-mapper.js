var dateFormat = require('dateformat');

/**
 * return a object of results by date: 
 * date -> Array<{country, totalCasesPer100k}>
 * @param {*} hits 
 */
exports.mapTotalCasesPer100k = function (hits) {
  console.log("mapping data")
  var result = {};
  hits.forEach(function (value, index, array) {
    console.log("mapping " + value._source.date + ", " + value._source.country)
    const date = value._source.date;
    const data = { country: value._source.country, totalCasesPer100kInhabitants: value._source.totalCasesPer100kInhabitants }
    console.log("data=" + JSON.stringify(data))

    const entry=result[date]
    if (entry) {
      entry.push(data)      
    }
    else {
      result[date]=[data]
    }
  });
  return result;
}

exports.mapTotalDeathsPer100k = function (hits) {
  console.log("mapping data")
  var result = {};
  hits.forEach(function (value, index, array) {
    console.log("mapping " + value._source.date + ", " + value._source.country)
    const date = value._source.date;
    const data = { country: value._source.country, region: value._source.region, totalDeathsPer100kInhabitants: value._source.totalDeathsPer100kInhabitants }
    console.log("data=" + JSON.stringify(data))

    const entry=result[date]
    if (entry) {
      entry.push(data)      
    }
    else {
      result[date]=[data]
    }
  });
  return result;
}


exports.mapReanimationsPer100k = function (hits) {
  console.log("mapping data")
  var result = {};
  hits.forEach(function (value, index, array) {
    console.log("mapping " + value._source.date + ", " + value._source.country)
    const date = value._source.date;
    const data = { country: value._source.country, region: value._source.region, reanimationPer100kInhabitants: value._source.reanimationPer100kInhabitants }
    console.log("data=" + JSON.stringify(data))

    const entry=result[date]
    if (entry) {
      entry.push(data)      
    }
    else {
      result[date]=[data]
    }
  });
  return result;
}