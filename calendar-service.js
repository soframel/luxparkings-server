require('ical.js');
var fs = require('fs');
var holidays;
exports.dayTypes={WEEKEND:0, HOLIDAY:1, WEEKDAY:3};

exports.loadCalendar =function(){
    var fileContent;
    fs.readFile('luxembourg-holidays.ics', 'utf8', function(err, data) {
        if (err) throw err;
        fileContent=data;
        console.log("read calendar file data");
        var luxCal=new ICAL.parse(fileContent);
        console.log("Luxembourg calendar loaded");
        this.interpretCalendar(luxCal);
    });   
}

interpretCalendar = function (luxCal){
    var comp = new ICAL.Component(luxCal);
    //icaljs not very useful here, we have to iterate into each event to find full list of holidays...
    var events=comp.getAllSubcomponents("vevent");
    for(i in events){
        var vevent=events[i];
        var start=vevent.getFirstPropertyValue("dtstart");
        var end=vevent.getFirstPropertyValue("dtend");
        console.log("interpreting event "+JSON.stringify(vevent)+": start="+start+", end="+end);
        
    }
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
        var time=ICAL.Time.fromJSDate(date);
        console.log("time="+JSON.stringify(time));
        //luxCal.getFirstSubcomponent
        //var comp = new ICAL.Component(jcalData);
        //var vevent = comp.getFirstSubcomponent("vevent");
    }
}