require('ical.js');
var fs = require('fs');
var luxCal;
const dayTypes={WEEKEND, PUBLIC_HOLIDAY, SCHOOL_HOLIDAY, WEEKDAY}

exports.loadCalendar =function(){
    var fileContent;
    fs.readFile('luxembourg-holidays.ics', 'utf8', function(err, data) {
        if (err) throw err;
        fileContent=data;
        console.log("read calendar file data");
        this.luxCal=new ICAL.parse(fileContent);
        console.log("Luxembourg calendar loaded");
    });   
}

/**
 * find whether the date is a weekend, a public holiday, a school holiday, or a normal week day
 */
exports.getTypeOfDay=function(date){
    var day=date.getDay();
    if(day==0 || day==6){
        return dateTypes.WEEKDAY;
    }
    else{
        //check calendar to see if public or school holiday
    }
}