function submitForms() {
    var allForms = document.forms;
    var date;

    var validate = checkForms();

    if (validate) {
        deleteOldMenu();

        for (i = 0; i < allForms.length; i++) {
            switch (allForms[i].parentElement.id) {
                case "pon-menu-day":
                    date = document.getElementById("pon").innerHTML;
                    break;
                case "uto-menu-day":
                    date = document.getElementById("uto").innerHTML;
                    break;
                case "sri-menu-day":
                    date = document.getElementById("sri").innerHTML;
                    break;
                case "cet-menu-day":
                    date = document.getElementById("cet").innerHTML;
                    break;
                case "pet-menu-day":
                    date = document.getElementById("pet").innerHTML;
                    break;
            }

            var inputs = allForms[i].querySelectorAll("input");

            var mealType = inputs[0].value;
            var dishes = new Array();

            for (ii = 1; ii < inputs.length; ii++) {
                dishes.push(inputs[ii].value);
            }

            var requestData = `date=${date}&mealType=${mealType}`;
            for (ii = 0; ii < dishes.length; ii++) {
                requestData += `&dish${ii}=${dishes[ii]}`;
            }

            url = './formMeni?' + requestData;

            var request = new XMLHttpRequest();
            request.open('get', url, false);

            request.send(requestData);
        }

        alert("Tjedni meni je uspješno objavljen.");
    }
}


// check if forms are complete
function checkForms() {
    var allForms = document.forms;
    var checkSum = true;

    if (allForms.length === 0){
        alert("Ne postoji niti jedan meni.")
        return false;
    }

    for (i = 0; i < allForms.length; i++) {
        var inputs = allForms[i].querySelectorAll("input");

        for (ii=0; ii < inputs.length; ii++){
            if(inputs[ii].value === ""){
                checkSum = false;
            }
        }
    }

    if (!checkSum){
        // not all forms are complete
        alert("Nisu ispunjeni svi unosi.");
        return false;
    } else {
        //all forms complete
        return true;
    }
}


function deleteOldMenu() {
    var datePon = document.getElementById("pon").innerHTML;
    var dateUto = document.getElementById("uto").innerHTML;
    var dateSri = document.getElementById("sri").innerHTML;
    var dateCet = document.getElementById("cet").innerHTML;
    var datePet = document.getElementById("pet").innerHTML;

    var url = [];

    url[1] = './delOldMeni?date=' + datePon;
    url[2] = './delOldMeni?date=' + dateUto;
    url[3] = './delOldMeni?date=' + dateSri;
    url[4] = './delOldMeni?date=' + dateCet;
    url[5] = './delOldMeni?date=' + datePet;

    for(let i = 1; i <= 5; i++){
        let request = new XMLHttpRequest();
        request.open('get', url[i], false);
        request.send();
    }
}