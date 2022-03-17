const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = 'd2b9f3aa';
const APP_key = '4b093550259b81ae7a9e690a22ec3413'; 



searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
}

function generateHTML(results){
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=

        `
        <div class="item">
                <img src="${result.recipe.image}" alt="">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a href="${result.recipe.url}" target="_blank" class="view-button">view recipe</a>
                </div>

                <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                <p class="item-data">Diet Label: ${result.recipe.dietLabels > 0 ? result.dietLabels.length : 'No Data Found'}</p>
                <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
            </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}