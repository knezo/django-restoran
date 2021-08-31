function submitTemplates() {
    var allForms = document.forms;
    var date;

    var validate = checkForms();

    if (validate) {
        deleteOldMenu();

        for (i = 0; i < allForms.length; i++) {
            date = allForms[i].parentElement.getAttribute("data-date");

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

            url = '../stvoriMeni/formMeni?' + requestData;

            var request = new XMLHttpRequest();
            request.open('get', url, false);

            request.send(requestData);
        }

        alert("Predložak je izmjenjen!");
        // location.replace("../");
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
    var datePon = document.getElementById("pon-menu-day").getAttribute("data-date");
    var dateUto = document.getElementById("uto-menu-day").getAttribute("data-date");
    var dateSri = document.getElementById("sri-menu-day").getAttribute("data-date");
    var dateCet = document.getElementById("cet-menu-day").getAttribute("data-date");
    var datePet = document.getElementById("pet-menu-day").getAttribute("data-date");

    var url = [];

    url[1] = '../stvoriMeni/delOldMeni?date=' + datePon;
    url[2] = '../stvoriMeni/delOldMeni?date=' + dateUto;
    url[3] = '../stvoriMeni/delOldMeni?date=' + dateSri;
    url[4] = '../stvoriMeni/delOldMeni?date=' + dateCet;
    url[5] = '../stvoriMeni/delOldMeni?date=' + datePet;

    for(let i = 1; i <= 5; i++){
        let request = new XMLHttpRequest();
        request.open('get', url[i], false);
        request.send();
    }
}