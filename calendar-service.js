require('ical.js');
var fs = require('fs');

exports.holidays=new Set();
exports.dayTypes={WEEKEND:0, HOLIDAY:1, WEEKDAY:2};

exports.loadCalendar =function(){
    var fileContent;
    fs.readFile('luxembourg-holidays.ics', 'utf8', function(err, data) {
        if (err) throw err;
        fileContent=data;
        console.log("read calendar file data");
        var luxCal=new ICAL.parse(fileContent);        
        this.interpretCalendar(luxCal);
        console.log("Luxembourg calendar loaded, number of holidays found: "+exports.holidays.size);
    });   
}

exports.interpretCalendar = function (luxCal){    
    exports.holidays.clear();
    var comp = new ICAL.Component(luxCal);
    //icaljs not very useful here, we have to iterate into each event to find full list of holidays...
    var events=comp.getAllSubcomponents("vevent");
    for(i in events){
        var vevent=events[i];
        var start=vevent.getFirstPropertyValue("dtstart");
        var startDate=new Date(start);
        startDate.setHours(0,0,0,0);
        var end=vevent.getFirstPropertyValue("dtend");
        var endDate=new Date(end);
        endDate.setHours(0,0,0,0);
        //console.log("interpreting event "+JSON.stringify(vevent)+": start="+startDate+", end="+endDate);
        //adding dates from start to end (exclusive) into list of holidays
        var date=startDate;
        
        while(date.getTime()<endDate.getTime()){
            exports.holidays.add(date+"");
            //console.log("added date "+date);
            //next day
            date=new Date(date.getTime());
            date.setDate( date.getDate() + 1);             
            date.setHours(0,0,0,0);
        }
    }
    console.log("loaded holidays, size="+exports.holidays.size);
    for (let value of exports.holidays) console.log("holiday: "+value);
}

/*parseDate = function(dateString){
    var pattern = /(\d{2})(\d{2})(\d{4})/;
    return new Date(dateString.replace(pattern,'$3-$2-$1'));
}*/

/**
 * find whether the date is a weekend, a public holiday, a school holiday, or a normal week day
 */
exports.getTypeOfDay=function(date){
    var day=date.getDay();
    if(day==0 || day==6){
        return this.dayTypes.WEEKEND;
    }
    else{
        //check calendar to see if public or school holiday
        if(exports.holidays.has(date+"")){
            return exports.dayTypes.HOLIDAY;            
        }
        else{
            return exports.dayTypes.WEEKDAY;
        }
    }
}