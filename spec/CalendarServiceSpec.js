var fs = require('fs');
var calService = require('../calendar-service');
//read in synchronous manner for tests
var fileContent=fs.readFileSync('spec/test.ics', 'utf8');
var luxCal=new ICAL.parse(fileContent);
calService.interpretCalendar(luxCal);

console.log("loaded holidays in tests, size="+calService.holidays.size);

describe("Calendar interpretation", function(){ 
  it("test calendar size", function() {
      expect(33, calService.holidays.size);
  });
  it("load test calendar", function() {
      //expect(calService.holidays.has(new Date(2010,11,25))).toBe(true);
      const date=new Date(2010,11,25);
      date.setHours(0,0,0,0);      
      expect(calService.holidays.has(date.getTime())).toBe(true);
      const date2=new Date(2011,0,3);
      date2.setHours(0,0,0,0);      
      expect( calService.holidays.has(date2.getTime())).toBe(false);
      const date3=new Date(2011,3,12);
      date3.setHours(0,0,0,0);      
      expect(calService.holidays.has(date3.getTime())).toBe(true);
      const date4=new Date(2011,3,25);
      date4.setHours(0,0,0,0);      
      expect(calService.holidays.has(date4.getTime())).toBe(true);
      const date5=new Date(2011,3,26);
      date5.setHours(0,0,0,0);      
      expect(false, calService.holidays.has(date5)).toBe(false);
    });
  
});

describe("getTypeOfDay", function() {
  it("get type of day for sunday", function() {
    let date1 = new Date(2019,8,29);
    expect(calService.getTypeOfDay(date1)).toEqual(calService.dayTypes.WEEKEND);
  });
  it("get type of day for saturday", function() {
    let date1 = new Date(2019,08,28);
    expect(calService.getTypeOfDay(date1)).toEqual(calService.dayTypes.WEEKEND);
  });
  it("get type of day for school holiday", function() {
    let date1 = new Date(2011,3,20);
    expect(calService.getTypeOfDay(date1)).toEqual(calService.dayTypes.HOLIDAY);
  });
  it("get type of day for normal week day", function() {
    let date1 = new Date(2019,7,29);
    expect(calService.getTypeOfDay(date1)).toEqual(calService.dayTypes.WEEKDAY);
  });
});

describe("getPreviousSimilarDates", function() {
  it("getPreviousSimilarDates for non holiday", function() {
    let date = new Date(2011,4,3);
    let type=calService.dayTypes.WEEKDAY;
    const result=calService.getPreviousSimilarDates(date, type)
    expect(result.size).toEqual(20);
    //for (let value of result) console.log("similar date: "+value);
    let date1 = new Date(2011,0,25);
    expect(result.has(date1+""));
    let date2 = new Date(2011,3,19);
    expect(!result.has(date2+""));
  });

  it("getPreviousSimilarDates for holiday", function() {
    let date = new Date(2011,3,20);
    let type=calService.dayTypes.HOLIDAY;
    const result=calService.getPreviousSimilarDates(date, type)
    expect(result.size).toEqual(3);
    //for (let value of result) console.log("similar date: "+value);
    let date1 = new Date(2010,11,22);
    expect(result.has(date1+""));
    let date2 = new Date(2010,11,29);
    expect(result.has(date2+""));
    let date3 = new Date(2011,3,13);
    expect(result.has(date3+""));
  });
  
});