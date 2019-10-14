/**Helper method for manipulating time, presented using a number in format "HHMM" */


exports.calculateAverageTime=function (times){
    var minutes=times.map(t => exports.getMinutesFromTime(t));
    var avgMinutes = exports.getAverageWithoutOutliers(minutes);
    console.log("average minutes calculated: "+avgMinutes);
    return exports.getTimeStringFromMinutes(avgMinutes);
}

exports.getAverageWithoutOutliers=function (minutes){
    //sort list of minutes
    var sorted=minutes.sort(function(a,b){return a-b;});

    //remove outliers
    const middleIndex=Math.floor(sorted.length/2);
    const median=sorted[(middleIndex>0)?middleIndex-1:0];
    console.log("median is "+median);
    var finalSorted=[];
    for( var i = 0; i < sorted.length; i++ ){
        const  m= sorted[i];
        //only keep values between 1 hour less & 1 hour more to median
        if(m>=median-60 && m <= median+60){
            finalSorted.push(m);
            //console.log("keeping "+m)
        }
        /*else{
            console.log("trimming "+m);
        }*/
    }

    //calculate average
    var sum = 0;
    for( var i = 0; i < finalSorted.length; i++ ){
        sum += finalSorted[i];
    }
    var avgMinutes = sum/finalSorted.length;
    //console.log("trimmed average="+avgMinutes);
    return avgMinutes;
}

/**
 * convert a time in format HHMM to a number of minutes from midnight 
 */
exports.getMinutesFromTime= function(time){    
    var timeS=time+"";
    if(timeS.length==3){
        timeS="0"+timeS;
    }
    const hour=parseInt(timeS.substr(0, 2), 10);
    const minutes=parseInt(timeS.substr(2,4), 10);
    const result= (hour*60)+minutes;
    //console.log("getMinutesFromTime for "+time+": "+result);
    return result;
}

/**
 * get a time in day of the form HH:MM
 */
exports.getTimeStringFromMinutes=function (minutes){
    if(minutes > 0 && minutes < 1440){
        const hours = Math.floor(minutes/60);
        const hoursString=(hours<10)?"0"+hours:hours;
        const mins = minutes % 60;
        const minsString=(mins<10)?"0"+mins:mins;
        const time=hoursString+":"+minsString.toFixed(0);
        console.log("minutes "+minutes+" converted to "+time);
        return time;
    }
    else{
        console.log("result minutes was not a number of minutes: "+minutes);
        return null;
    }
}