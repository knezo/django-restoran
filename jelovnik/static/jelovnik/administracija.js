
function loadFunc(){
    var today = new Date();
    var monday = today;
    var nextWeekMonday = new Date();

    while (monday.getDay() !== 1){
        monday.setDate(monday.getDate()-1);
    }

    nextWeekMonday.setDate(monday.getDate()+7);

    var mondayString = dateToString(monday);
    var nextWeekMondayString = dateToString(nextWeekMonday);

    console.log(mondayString);
    console.log(nextWeekMondayString);

    var thisWeekBtn = document.getElementById("thisWeekMenu");
    // thisWeekBtn.href += "?monday=" + mondayString;
    thisWeekBtn.href += mondayString;

    var nextWeekBtn = document.getElementById("nextWeekMenu");
    // nextWeekBtn.href += "?monday=" + nextWeekMondayString;
    nextWeekBtn.href += nextWeekMondayString;
}

function dateToString(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    return ("?year=" + year + "&month=" + month + "&day=" + day);
}