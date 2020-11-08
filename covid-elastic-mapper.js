var dateFormat = require('dateformat');


function sortByDate(data){
  const ordered = {};
  Object.keys(data).sort((d1, d2) => new Date(d1)-new Date(d2)).forEach(function(date) {
    ordered[date] = data[date];
  });
  return ordered;
}

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
  return sortByDate(result);
}


exports.mapCountryDeathsPer100k = function (hits) {
  console.log("mapping data")
  var result = {};
  hits.forEach(function (value, index, array) {
    console.log("mapping " + value._source.date + ", " + value._source.country)
    const date = value._source.date;
    const data = { country: value._source.country, totalDeathsPer100kInhabitants: value._source.totalDeathsPer100kInhabitants }
    console.log("data=" + JSON.stringify(data))

    const entry=result[date]
    if (entry) {
      entry.push(data)      
    }
    else {
      result[date]=[data]
    }
  });
  return sortByDate(result);
}


exports.mapCountryReanimationsPer100k = function (hits) {
  console.log("mapping data")
  var result = {};
  hits.forEach(function (value, index, array) {
    console.log("mapping " + value._source.date + ", " + value._source.country)
    const date = value._source.date;
    const data = { country: value._source.country, reanimationPer100kInhabitants: value._source.reanimationPer100kInhabitants }
    console.log("data=" + JSON.stringify(data))

    const entry=result[date]
    if (entry) {
      entry.push(data)      
    }
    else {
      result[date]=[data]
    }
  });
  return sortByDate(result);
}