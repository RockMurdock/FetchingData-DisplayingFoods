/*fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.table(parsedFoods)
    })*/

const foodFactory = (food) => {
    return `<div class="card">
                <h3 class="header">${food.name}</h3>
                <section>
                    <p>${food.category}<br>${food.ethnicity}</p>
                </section>
            </div>`
};

const addFoodToDom = (foodObj) => {
const foodContainer = document.querySelector(".foodList");
foodContainer.innerHTML += foodObj;

};


fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodAsHTML = foodFactory(food)
            addFoodToDom(foodAsHTML)
            
        })
    })
    