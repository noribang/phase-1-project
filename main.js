/* DOMContentLoaded event fires when DOM is fully 
   from the HTML.
   Does not wait for CSS stylesheets.
   Does not wait for images to load.*/

  /* 
  User Stories (e.g. Tasklister Mini Project Todo List)
  1. As a user, I should be able to type a 
     task into the input field.
  2. As a user, I should be able to click 
     some form of a submit button.
  3. As a user, I expect to see the task string 
     that I provided appear in the DOM after the 
     submit button has been activated.
   */

  /* Project Requirements:
  1)-html/css/javascript that access public API.
  -asynchronous client/ server communication.
  -JSON as communication format.
  2)-single page app (SPA), one html file.
  3)-app has 3 event listeners.
  4)-interactivity required (e.g. comment, like).
  -not necessarily persist
  5)-DRY code (Do not repeat yourself)
   */   



/* LOOK AT:
-Tasklister Mini Project Todo List
-Practice dog ceo*/
document.addEventListener('DOMContentLoaded', function() {
    /* Create empty array. */
    // let drinkArray = []
    /* Access ul element by id. */
    const drinkTypesList = document.getElementById("drink-types")
    // console.log("drinkTypesList: ", drinkTypesList)
    /* Access dropdown. */
    const drinkDropDown = document.getElementById("drink-dropdown")
    // console.log("drinkDropDown: ", drinkDropDown)
    /* Access div that will hold img. */
    const drinkImgContainer = document.getElementById("drink-image-container")

    ////* Dropdown event listener. *////
    drinkDropDown.addEventListener('click', function(event) {
        /* Remove all existing li elements for ul. */
        drinkTypesList.innerHTML = ""
        /* Get char clicked on dropdown. */
        // console.log(event.target.value)
        const drinkStartChar = event.target.value
        /* Send default GET request to Drinks API. */
        const drinksUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${drinkStartChar}`

        /* fetch() returns a Promise */
        fetch(drinksUrl)    
        // console.log("fetch: ", fetch(drinksUrl))
        /* then() takes a callback function.    
        then() returns a Promise. */
        .then(function(response) {  
            // console.log(response.json())
            // Convert fullfilled Promise to JSON format.
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

            /* Empty existing array first to get rid of old data. */
            // drinkArray.splice(0, drinkArray.length)
            for (const element of data.drinks) {
                // console.log(element.strDrink)
                // console.log(element.strInstructions)
                
                /* Append drink object into array. */
                // drinkArray.push(element)
                // console.log("drinkArray: ", drinkArray)
                /* Get strInstructions key's value from data.drinks array of objects. */
                // let drinkInstr = element.strInstructions
                let drinkInstr = element.strDrink
                /* Create li element. */
                const drinkLi = document.createElement("li")
                // console.log(drinkInstr)
                drinkLi.className = "listDrink"
                /* Assign String drinkInstr to li innerText property. */
                drinkLi.innerText = drinkInstr 
                /* Append to ul as child. */
                drinkTypesList.appendChild(drinkLi)
            }
        })
        .catch(function(error) {
            console.log(error)
        })

    }) // end drop down click event listener.

    /* List event listener. Img will
       display when name of drink is click in ul list. 
    */    
    drinkTypesList.addEventListener("click", function(event) {
        // debugger
        /* Clear out previous image in container. */
        drinkImgContainer.innerHTML = ""
        /* Get name of drink clicked on in list. */
        const listTarget = event.target.innerText
        console.log(listTarget)
        /* Send default GET request to Drinks API. 
           Request JSON by name of drink from ul li. */
        const drinksByNameUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${listTarget}`
    
        fetch(drinksByNameUrl)
        // console.log(fetch(drinksByNameUrl))
        .then(function(response) {
            // console.log(response)
            // console.log(response.json())
            return response.json()
        })
        .then(function(data) {
            // console.log(data)
            // console.log(data.drinks[0].strDrinkThumb)
            /* Get img src URL string from JSON. */
            const drinkImgURL = data.drinks[0].strDrinkThumb
            /* Create img element. */
            const drinkImg = document.createElement("img")
            /* Img element src attribute */
            drinkImg.src = drinkImgURL
            /* Img element width attribute. */
            drinkImg.width = "300"
            /* Append to div that is img container. */
            drinkImgContainer.appendChild(drinkImg)
        })
        .catch(function(error) {
            console.log(error)
        })
        
    })


    
}) // End DOMContentLoaded


