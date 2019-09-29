describe("CalendarService", function() {
  var calService = require('../calendar-service');

  it("get type of day for sunday", function() {
    var date1 = new Date('September 29, 2019 15:24:00');
    expect(calService.getTypeOfDay(date1)).toEqual(calService.dayTypes.WEEKEND);
  });
  it("get type of day for saturday", function() {
    var date1 = new Date('September 28, 2019 15:24:00');
    expect(calService.getTypeOfDay(date1)).toEqual(calService.dayTypes.WEEKEND);
  });
  it("get type of day for school holiday", function() {
    var date1 = new Date('September 10, 2019 15:24:00');
    expect(calService.getTypeOfDay(date1)).toEqual(calService.dayTypes.HOLIDAY);
  });
  it("get type of day for public holiday", function() {
    var date1 = new Date('August 15, 2019 15:24:00');
    expect(calService.getTypeOfDay(date1)).toEqual(calService.dayTypes.HOLIDAY);
  });
  it("get type of day for normal week day", function() {
    var date1 = new Date('September 29, 2019 15:24:00');
    expect(calService.getTypeOfDay(date1)).toEqual(calService.dayTypes.WEEKDAY);
  });

});
