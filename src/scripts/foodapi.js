/*fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.table(parsedFoods)
    })*/

const foodFactory = (food) => {
    return `<div class="card">
                <h2 class="header">${food.name}</h2>
                <section>
                    <p>${food.ethnicity}<br>${food.category}</p>
                </section>
                <h4>Ingredients</h4>
                <section>
                    <p>${food.ingredients}</p>
                </section>
                <h4>Country of origin</h4>
                <section>
                    <p>${food.origin}</p>
                </section>
                <h4>Calories per serving</h4>
                <section>
                    <p>${food.calories}</p>
                </section>
                <h4>Fat per serving</h4>
                <section>
                    <p>${food.fat}</p>
                </section>
                <h4>Sugar per serving</h4>
                <section>
                    <p>${food.sugar}</p>
                </section>
            </div>`
};

const addFoodToDom = (foodObj) => {
const foodContainer = document.querySelector(".foodList");
foodContainer.innerHTML += foodObj;

};


/*fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodAsHTML = foodFactory(food)
            addFoodToDom(foodAsHTML)
            
        })
    })*/

    fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    // adding in the ingredients of product if applicable
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }
                    // adding in the country of origin if applicable
                    if (productInfo.product.origins) {
                        food.origin = productInfo.product.origins
                    } else {
                        food.origin = "no origin country listed"
                    }
                    // adding in calories per serving to product if applicable
                    if (productInfo.product.nutriments.energy_value) {
                        food.calories = productInfo.product.nutriments.energy_value
                    } else {
                        food.calories = "no caloric information provided"
                    }
                    //  adding in fat per serving to product if applicable
                    if (productInfo.product.nutriments.fat) {
                        food.fat = productInfo.product.nutriments.fat
                    } else {
                        food.fat = "no fat per serving provided"
                    }
                    // adding in sugar per serving to product if applicable
                    if (productInfo.product.nutriments.sugars) {
                        food.sugar = productInfo.product.nutriments.sugars
                    } else {
                        food.sugar = "no sugar per serving provided"
                    }

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })
    