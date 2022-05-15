/* Send request to Drinks API. */
const drinksUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"

/* fetch() returns a Promise */
fetch(drinksUrl)    
// console.log("fetch: ", fetch(drinksUrl))
/* then() takes a callback function. 
   then() returns a Promise. */
.then(function(response) {  
    // console.log(response.json())
    return response.json()
})
/* Second then() takes a callback. 
   Typically, response converted to json will be 
   passed into callback as useable data be used
   in DOM manipulation. */
.then(function(data) {
    // console.log(data)
    // console.log(data.drinks)
    // console.log(data.drinks.length)
    // console.log(data.drinks[1])
    // console.log(data.drinks[1].dateModified)
    // console.log(data.drinks[1].strDrinkThumb)
    for (const element of data.drinks) {
        // console.log(element.strDrink)
        console.log(element.strInstructions)
    }
})