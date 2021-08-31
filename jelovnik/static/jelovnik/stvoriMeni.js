// function called onload
function load() {
    liveTime();
    daysOfWeek();
}


function loadTemplates() {
    liveTime();
    templateDate();
}


function liveTime(){
    var date = document.getElementById("date");
    var time = document.getElementById("time");
    var today = new Date();

    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    if (day < 10) { day = "0" + day}
    if (month < 10) {month = "0" + month}

    var weekDay = today.getDay();
    switch(weekDay) {
        case 1:
            weekDay = "Ponedjeljak";
        break;
        case 2:
            weekDay = "Utorak";
        break;
        case 3:
            weekDay = "Srijeda";
        break;
        case 4:
            weekDay = "Četvrtak";
        break;
        case 5:
            weekDay = "Petak";
        break;
        case 6:
            weekDay = "Subota";
        break;
        case 7:
            weekDay = "Nedjelja";
        break;
        default:
        weekDay = "";
    }

    var h = today.getHours();
    var m = today.getMinutes();

    if(h < 10){h = "0" + h}
    if(m < 10){m = "0" + m}

    date.innerHTML = weekDay + ", " + day + "." + month + "." + year + ".";
    time.innerHTML = h + ":" + m;

    var t = setTimeout(function() {
        liveTime();
    }, 1000);
}


function daysOfWeek() {

    var year = parseInt(findGetParameter("year"));
    var month = parseInt(findGetParameter("month"))-1;
    var day = parseInt(findGetParameter("day"));

    var monday = new Date(year, month, day);

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

    pon.innerHTML = day + "." + month + "." + tempDay.getFullYear() + ".";

    // utorak
    tempDay.setDate(tempDay.getDate()+1);
    var uto = document.getElementById("uto");

    if (tempDay.getDate() < 10) {day = "0"+tempDay.getDate()}
    else {day = tempDay.getDate()}

    if ((tempDay.getMonth()) < 10) {month = "0"+(tempDay.getMonth()+1)}
    else {month = (tempDay.getMonth()+1)}

    uto.innerHTML = day + "." + month + "." + tempDay.getFullYear() + ".";

    // srijeda
    tempDay.setDate(tempDay.getDate()+1);
    var sri = document.getElementById("sri");

    if (tempDay.getDate() < 10) {day = "0"+tempDay.getDate()}
    else {day = tempDay.getDate()}

    if ((tempDay.getMonth()) < 10) {month = "0"+(tempDay.getMonth()+1)}
    else {month = (tempDay.getMonth()+1)}

    sri.innerHTML = day + "." + month + "." + tempDay.getFullYear() + ".";

    // četvrtak
    tempDay.setDate(tempDay.getDate()+1);
    var cet = document.getElementById("cet");

    if (tempDay.getDate() < 10) {day = "0"+tempDay.getDate()}
    else {day = tempDay.getDate()}

    if ((tempDay.getMonth()) < 10) {month = "0"+(tempDay.getMonth()+1)}
    else {month = (tempDay.getMonth()+1)}

    cet.innerHTML = day + "." + month + "." + tempDay.getFullYear() + ".";

    // petak
    tempDay.setDate(tempDay.getDate()+1);
    var pet = document.getElementById("pet");

    if (tempDay.getDate() < 10) {day = "0"+tempDay.getDate()}
    else {day = tempDay.getDate()}

    if ((tempDay.getMonth()) < 10) {month = "0"+(tempDay.getMonth()+1)}
    else {month = (tempDay.getMonth()+1)}

    pet.innerHTML = day + "." + month + "." + tempDay.getFullYear() + ".";
}


function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}


// function to add/delete MealTypes or Dishes
function addNewMealType(id) {
    var form = document.createElement("form");
    form.innerHTML = "<div class=\"menu-form\">\n" +
        "        <div class=\"row\" style=\"margin-left: 0; margin-right: 0\" >\n" +
        "            <button type=\"button\" class=\"delBtn btn btn-outline-danger btn-sm\" onclick=\"delMealType(this)\" >Ukloni meni</button>\n" +
        "            <button type=\"button\" class=\"up-downBtn btn btn-outline-info btn-sm\" onclick=\"moveUp(this)\" >&#x25B2;</button>\n" +
        "            <button type=\"button\" class=\"up-downBtn btn btn-outline-info btn-sm\" onclick=\"moveDown(this)\" >&#x25BC;</button>\n" +
        "        </div>" +
        "        <div class=\"header\">\n" +
        "            <div class=\"autocomplete\">\n" +
        "                <div>\n" +
        "                    <input type=\"text\" id=\"search\" placeholder=\"Vrsta menija\" oninput=\"mealTypeAutocomplete(this, this.value)\">\n" +
        "                </div>\n" +
        "                <div id=\"match-list\" class=\"autocomplete-items\"></div>\n" +
        "            </div>\n" +
        "\n" +
        "        </div>\n" +
        "        <div class=\"Dish-list\" id=\"Dish-list\">\n" +
        "            <table id=\"Dish-list-table\">\n" +
        "                <tr><td>\n" +
        "                    <div class=\"autocomplete\">\n" +
        "                        <div>\n" +
        "                            <input type=\"text\" id=\"search\" class=\"input\" placeholder=\"Naziv jela\" oninput=\"dishAutocomplete(this, this.value)\">\n" +
        "                        </div>\n" +
        "                        <div id=\"match-list\" class=\"autocomplete-items\"></div>\n" +
        "                    </div>\n" +
        "                </td><td><span onclick=\"delDish(this)\">&#10006;</span></td>\n" +
        "                </tr>\n" +
        "                <tr><td>\n" +
        "                    <div class=\"autocomplete\">\n" +
        "                        <div>\n" +
        "                            <input type=\"text\" id=\"search\" class=\"input\" placeholder=\"Naziv jela\" oninput=\"dishAutocomplete(this, this.value)\">\n" +
        "                        </div>\n" +
        "                        <div id=\"match-list\" class=\"autocomplete-items\"></div>\n" +
        "                    </div>\n" +
        "                </td><td><span onclick=\"delDish(this)\">&#10006;</span></td>\n" +
        "                </tr>\n" +
        "                <tr><td>\n" +
        "                    <div class=\"autocomplete\">\n" +
        "                        <div>\n" +
        "                            <input type=\"text\" id=\"search\" class=\"input\" placeholder=\"Naziv jela\" oninput=\"dishAutocomplete(this, this.value)\">\n" +
        "                        </div>\n" +
        "                        <div id=\"match-list\" class=\"autocomplete-items\"></div>\n" +
        "                    </div>\n" +
        "                </td><td><span onclick=\"delDish(this)\">&#10006;</span></td>\n" +
        "                </tr>\n" +
        "            </table>\n" +
        "\n" +
        "\n" +
        "            <button type=\"button\" class=\"addDishBtn btn btn-outline-success btn-sm\" id=\"addDishBtn\" onclick=\"addDish(this)\">Dodaj jelo</button>\n" +
        "        </div>\n" +
        "    </div>";

    var menuDay = id.parentNode;
    var button = id;

    menuDay.insertBefore(form, button);
}


function addDish(param) {
    var newTr = document.createElement("tr");
    newTr.innerHTML = "<tr><td>\n" +
        "                        <div class=\"autocomplete\">\n" +
        "                            <div>\n" +
        "                                <input type=\"text\" id=\"search\" class=\"input\" placeholder=\"Naziv jela\" oninput=\"dishAutocomplete(this, this.value)\">\n" +
        "                            </div>\n" +
        "                            <div id=\"match-list\" class=\"autocomplete-items\"></div>\n" +
        "                        </div>\n" +
        "                    </td><td><span onclick=\"delDish(this)\">&#10006;</span></td>\n" +
        "                    </tr>";

    var divDishList = param.parentElement;
    var table = divDishList.querySelector('#Dish-list-table');
    table.appendChild(newTr);

}


function delMealType(buttonId) {
    var form = buttonId.parentElement.parentElement.parentElement;
    form.remove();
}


function delDish(param) {
    var td = param.parentElement;
    var tr = td.parentElement;
    tr.parentElement.removeChild(tr);
}


function moveUp(button) {
    var form = button.parentElement.parentElement.parentElement;
    var dayDiv = form.parentElement;

    var previousElement = form.previousElementSibling;
    if (previousElement.nodeName === "FORM"){
        dayDiv.insertBefore(form, previousElement);
    }
}

function moveDown(button) {
    var form = button.parentElement.parentElement.parentElement;
    var dayDiv = form.parentElement;

    var nextElement = form.nextElementSibling;
    if (nextElement.nodeName === "FORM"){
        dayDiv.insertBefore(form, nextElement.nextSibling);
    }
}


function templateDate(){
    var ponDiv = document.getElementById("pon-menu-day");
    var datePon = ponDiv.getAttribute("data-date");

    datePon = parseInt(datePon);

    document.getElementById("uto-menu-day").setAttribute("data-date", datePon + 1);
    document.getElementById("sri-menu-day").setAttribute("data-date", datePon + 2);
    document.getElementById("cet-menu-day").setAttribute("data-date", datePon + 3);
    document.getElementById("pet-menu-day").setAttribute("data-date", datePon + 4);
}


function useTemplate() {
    var select = document.getElementById("predlozak");
    var tempValue = select.options[select.selectedIndex].value;

    var url = location.protocol + '//' + location.host + location.pathname;

    year = findGetParameter("year");
    month = findGetParameter("month");
    day = findGetParameter("day");

    url += "?year=" + year + "&month=" + month + "&day=" + day;

    url += "&predlozak=" + tempValue;

    window.location.href = url;
}










