function makeHref(date) {

    var res = date.split(".");
    var d = parseInt(res[0], 10);
    var m = parseInt(res[1], 10);
    var y = parseInt(res[2], 10);

    var value = y + "-" + m + "-" + d;

    var today = new Date(value);

    if (d < 10) d = "0" + d;
    if (m < 10) m = "0" + m;

    var todayString = (d + "." + m + "." + y + ".");

    setDatum(today, todayString);
    setActiveNav(today);
    setHref(today);

}

function setDatum(today, todayString) {
    var tempDay = today.getDay();
    switch (tempDay) {
        case 1: weekDay = "Ponedjeljak"; break;
        case 2: weekDay = "Utorak"; break;
        case 3: weekDay = "Srijeda"; break;
        case 4: weekDay = "Četvrtak"; break;
        case 5: weekDay = "Petak"; break;
        case 6: weekDay = "Subota"; break;
        case 7: weekDay = "Nedjelja"; break;
    }

    x = document.getElementById("datum");
    x.innerHTML = weekDay + ", " + todayString;

}


function setHref(today) {
    var monday = today;

    while (monday.getDay() !== 1){
        monday.setDate(monday.getDate()-1);
    }

    var tempDay = monday;


    // ponedjeljak
    var pon = document.getElementById("pon");

    if (tempDay.getDate() < 10) {day = "0"+tempDay.getDate()}
    else {day = tempDay.getDate()}
    if ((tempDay.getMonth()) < 10) {month = "0"+(tempDay.getMonth()+1)}
    else {month = (tempDay.getMonth()+1)}

    pon.href = "?datum=" + day + "." + month + "." + tempDay.getFullYear() + ".";


    // utorak
    tempDay.setDate(tempDay.getDate()+1);
    var uto = document.getElementById("uto");

    if (tempDay.getDate() < 10) {day = "0"+tempDay.getDate()}
    else {day = tempDay.getDate()}
    if ((tempDay.getMonth()) < 10) {month = "0"+(tempDay.getMonth()+1)}
    else {month = (tempDay.getMonth()+1)}

    uto.href = "?datum=" + day + "." + month + "." + tempDay.getFullYear() + ".";


    // srijeda
    tempDay.setDate(tempDay.getDate()+1);
    var sri = document.getElementById("sri");

    if (tempDay.getDate() < 10) {day = "0"+tempDay.getDate()}
    else {day = tempDay.getDate()}
    if ((tempDay.getMonth()) < 10) {month = "0"+(tempDay.getMonth()+1)}
    else {month = (tempDay.getMonth()+1)}

    sri.href = "?datum=" + day + "." + month + "." + tempDay.getFullYear() + ".";


    // četvrtak
    tempDay.setDate(tempDay.getDate()+1);
    var cet = document.getElementById("cet");

    if (tempDay.getDate() < 10) {day = "0"+tempDay.getDate()}
    else {day = tempDay.getDate()}
    if ((tempDay.getMonth()) < 10) {month = "0"+(tempDay.getMonth()+1)}
    else {month = (tempDay.getMonth()+1)}

    cet.href = "?datum=" + day + "." + month + "." + tempDay.getFullYear() + ".";


    // petak
    tempDay.setDate(tempDay.getDate()+1);
    var pet = document.getElementById("pet");

    if (tempDay.getDate() < 10) {day = "0"+tempDay.getDate()}
    else {day = tempDay.getDate()}
    if ((tempDay.getMonth()) < 10) {month = "0"+(tempDay.getMonth()+1)}
    else {month = (tempDay.getMonth()+1)}

    pet.href = "?datum=" + day + "." + month + "." + tempDay.getFullYear() + ".";

}


function setActiveNav(today) {
    var weekDay = today.getDay();
    switch(weekDay) {
        case 1:
            weekDay = "Ponedjeljak";
            document.getElementById("pon").className += " active";
        break;
        case 2:
            weekDay = "Utorak";
            document.getElementById("uto").className += " active";
        break;
        case 3:
            weekDay = "Srijeda";
            document.getElementById("sri").className += " active";
        break;
        case 4:
            weekDay = "Četvrtak";
            document.getElementById("cet").className += " active";
        break;
        case 5:
            weekDay = "Petak";
            document.getElementById("pet").className += " active";
        break;
        case 6:
            weekDay = "Subota";
            document.getElementById("pet").className += " active";
        break;
        case 7:
            weekDay = "Nedjelja";
            document.getElementById("pet").className += " active";
        break;
        default:
        weekDay = "";
        document.getElementById("pet").className += " active";
    }
}

