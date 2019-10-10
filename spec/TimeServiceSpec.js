var fs = require('fs');
var time = require('../time');

describe("Testing time.js", function(){

  describe("getMinutesFromTime", function(){ 
    it("nominal case", function() {
        expect(time.getMinutesFromTime("732")).toBe(452);
    });
    it("0 hours", function() {
      expect(time.getMinutesFromTime("0000")).toBe(0); 
    });
    it("23:59", function() {
      expect(time.getMinutesFromTime("2359")).toBe(1439); 
    });
    it("nominal case", function() {
      expect(time.getMinutesFromTime(710)).toBe(430);
  });
  it("should fail", function() {
    expect(time.getMinutesFromTime(710)).not.toBe(431)
  });
  });

  describe("getTimeStringFromMinutes", function(){ 
    it("nominal case", function() {
        expect(time.getTimeStringFromMinutes(466)).toBe("07:46");
    });
    it("max case", function() {
      expect(time.getTimeStringFromMinutes(1439)).toBe("23:59");
    });
    it("min case", function() {
      expect(time.getTimeStringFromMinutes(0)).toBe("00:00");
    });  
  });

  describe("get average without outliers", function(){
    it("nomincal case", function(){
      var minutes=[482, 315, 499, 540, 540, 800, 1020, 340, 599, 560];

      expect(time.getAverageWithoutOutliers(minutes)).toBe(536.6666666666666);
    });
    it("one entry", function(){
      var minutes=[600];
      expect(time.getAverageWithoutOutliers(minutes)).toBe(600);
    });
  });

});