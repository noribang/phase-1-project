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
    /* Access li elements in DOM. */
    const drinkList = document.getElementsByClassName("listDrink")
    /* Access comments elements by class name. */
    const drinkCommentsForm = document.getElementsByClassName("comments_form_display")
    /* Access form element. */
    const drinkForm = document.querySelector("form")

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

        // Make li text bold.
        // Access li element.
        const liTarget = event.target
        // console.log(liTarget)
        // console.log(drinkList)
        // First remove class bold_text from all li elements.
        for (let i = 0; i < drinkList.length; i++) {
            drinkList[i].classList.remove("bold_text")
        }
        // Add class bold_text to li element.
        liTarget.classList.add("bold_text")

        /* Clear out previous image in container. */
        drinkImgContainer.innerHTML = ""
        /* Get name of drink clicked on in list. */
        const listTarget = event.target.innerText
        // console.log(listTarget)
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
        
        /* Drink Comments Form display. */
        // Remove class comments_display from all comments elements.
        // console.log(drinkCommentsForm)
        for (let i = 0; i < drinkCommentsForm.length; i++) {
            drinkCommentsForm[i].classList.remove("comments_form_display")
        }
        // Add class comments_display to comments element.
        // liTarget.classList.add("bold_text")  

        /* Delete existing comments. */
        const existComment = document.getElementById("drink_comments") 
        existComment.innerHTML = ""
    })

    /* Form to leave comments. */
    drinkForm.addEventListener("submit", (event) => {
        /* Suppress default page load bwhavior. */
        event.preventDefault()

        let formCommentTarget = event.target.new_drink_comment.value
        // console.log("Form submit: ", formCommentTarget)

        buildComment(formCommentTarget)
        // console.log("Form submit: ", event.target.new_drink_comment)
        /* Clear input text. */
        // formCommentTarget.innerText = " "
        const commentValue = document.getElementById("new_drink_comment")
        console.log("commentValue ", commentValue)
        commentValue.value = ""

        /* Display Comments. */
        // const displayComments = document.getElementsByClassName("comments_div_display")
        // console.log("Comments: ", displayComments)
        // Remove class to display on DOM.
        // console.log("Comments: ", displayComments[0])

        // displayComments[0].classList.remove("comments_div_display")
    
    })

    function buildComment(comment) {
        /* Create li element to put user input into. */
        const li = document.createElement("li")
        /* Create button element */
        const btn = document.createElement("button")
        /* Add .addEventListener to button 
           to be able to delete it later. */
        btn.addEventListener("click", handleDelete)
        btn.textContent = "Delete"
        /* Assign user input to li element. */
        li.textContent = `${comment} `
        /* Append button to li element. */
        li.appendChild(btn)
        // console.log(li)
        /* Append li element to ul element as a child element. */
        document.querySelector("#drink_comments").appendChild(li)
      }
    
      function handleDelete(e) {
        // console.log(e)
        /* Delete button as target and li as parentNode. */
        e.target.parentNode.remove()
    
      }

    
    
}) // End DOMContentLoaded


