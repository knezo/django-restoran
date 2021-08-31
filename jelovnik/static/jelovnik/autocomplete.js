var search = document.getElementById("search");
var matchList = document.getElementById("match-list");

matchList = null;

function dishAutocomplete(search_input, value) {
    search = search_input;
    matchList = search_input.parentElement.parentElement;
    matchList = matchList.querySelector('#match-list');

    searchDish(value);
}


function mealTypeAutocomplete(search_input, value) {
    search = search_input;
    matchList = search_input.parentElement.parentElement;
    matchList = matchList.querySelector('#match-list');

    searchMealType(value);
}


const searchDish = async searchText =>{
    const res = await fetch('http://127.0.0.1:8000/jelovnik/dishes/?format=json');
    const dishes = await res.json();

    // Get matches to current text input
    let matches = dishes.filter(dish => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return dish.name.match(regex);
    });

    if(searchText.length === 0){
        matches = [];
        matchList.innerHTML='';
    }

    outputHtml(matches);
};


const searchMealType = async searchText =>{
    const res = await fetch('http://127.0.0.1:8000/jelovnik/mealtypes/?format=json');
    const dishes = await res.json();

    // Get matches to current text input
    let matches = dishes.filter(dish => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return dish.name.match(regex);
    });

    if(searchText.length === 0){
        matches = [];
        matchList.innerHTML='';
    }

    outputHtml(matches);
};

const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
        <div>
            <p onclick="copyName('${match.name}')">${match.name}</p>
        </div>
        `).join('');

        matchList.innerHTML = html;
    }
}


document.addEventListener('click', function (e) {
    if(matchList != null){
        matchList.innerHTML = '';
    }
});

function copyName(name) {
    search.value = name;
    matchList.innerHTML = '';
}