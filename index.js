let allDishesDiv = document.querySelector('#all-dishes')
let homeButton = document.querySelector('#show-all-dishes')

let clickFalse = false;



homeButton.addEventListener('click', event => {
 inputDishDiv.innerHTML = ''
 allDishesDiv.innerHTML= ''
 showUserDishes.innerHTML = '';

  
  
fetch(`http://localhost:3000/dishes`) //eslint-disable-line
  .then(response => response.json())
  .then(arr => {
       
      for(let element of arr)
      {
          dishElement(element);
      }
  })


  function dishElement(element)
  {
      let oneDishDiv = document.createElement("div");
      oneDishDiv.id = "one-dish-div"

      let h2DishName = document.createElement('h1');
        h2DishName.innerText = element.name_of_dish;
        
      let imgDish = document.createElement("img")  
        imgDish.src = element.img
       
       let newButton = document.createElement("button");
        newButton.innerText = "reverse"

        newButton.addEventListener('click', event => {
           
           let nameOfDish = element.name_of_dish
           
            let reversedName =  nameOfDish.split("").reverse().join("");

           fetch(`http://localhost:3000/dishes/${element.id}`, { //eslint-disable-line 
             method: 'PATCH',
             headers: {
               'content-type': 'application/json',
               Accept: 'application/json'
             },
             body: JSON.stringify({
               name_of_dish: reversedName
             })
           })
             .then(response => response.json())
             .then(res =>{
               element.name_of_dish = reversedName
                h2DishName.innerText= res.name_of_dish
             }
                  
             )

        })


       let buttonDiv = document.createElement('div');
      let likeDish = document.createElement("button");
         likeDish.className = "btn btn-outline-danger" 
         likeDish.innerText = `❤️`;
      let spanOfbutton = document.createElement('span')
       spanOfbutton.innerText = `${element.like}`
       spanOfbutton.className = 'badge badge-light'
        likeDish.append(spanOfbutton);
        buttonDiv.append(likeDish);


        
        let countryDish = document.createElement("h4");
         countryDish.innerText = `Country: ${element.country}`;
        
        let descriptionDish  = document.createElement("h6")
           descriptionDish.innerText = element.description 
          

       oneDishDiv.append(h2DishName,imgDish,buttonDiv,countryDish,descriptionDish,newButton);

       allDishesDiv.append(oneDishDiv);

       likeDish.addEventListener('click', event => {
         
        fetch(`http://localhost:3000/dishes/${element.id}`, { 
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            like: ++element.like 
          })
        })
          .then(response => response.json())
          .then(data => { 
             spanOfbutton.innerText = `${data.like}`
          })
     })
   }
  
})



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

let createDishElementButton = document.querySelector('#create-dish-button')
let inputDishDiv = document.querySelector("#input-dish-div");

createDishElementButton.addEventListener('click',() => {


    allDishesDiv.innerHTML = '';
  inputDishDiv.innerHTML = '';
  showUserDishes.innerHTML = '';
let recipeForm = document.createElement('form');
let mainDiv = document.createElement('div');
    mainDiv.id = 'div-main'

    let divOfNameInput = document.createElement('div');
      divOfNameInput.id = "div-of-input-name";

    let divOfFoodNameInput = document.createElement('div');
      divOfFoodNameInput.id = "div-of-input-foodname"; 
      
    let divOfImage = document.createElement('div');
      divOfImage.id = "div-of-input-image";

    let divOfCountry = document.createElement('div')
       divOfCountry.id = 'div-of-input-country'  

    let divOfTextArea = document.createElement('div');
       divOfTextArea.id = "div-of-input-textarea";
     

    let divButtonSubmit = document.createElement('div');
        divButtonSubmit.id = "div-of-input-button"
    


       divOfNameInput.innerHTML = `<div class="input-group">
                                  <div class="input-group-prepend">
                                     <span class="input-group-text">Put your Full Name</span>
                                  </div>
                                    <input id= "name" type="text" aria-label="First name" class="form-control">
                                </div>` 

        divOfFoodNameInput.innerHTML = `<div class="input-group">
                                  <div class="input-group-prepend">
                                     <span class="input-group-text">Put a name of your Dish</span>
                                  </div>
                                    <input id="name-of-dish" type="text" aria-label="First name" class="form-control">
                                </div>`                        
         
         divOfImage.innerHTML = `<div class="input-group">
                                  <div class="input-group-prepend">
                                     <span class="input-group-text">Put your image:</span>
                                  </div>
                                    <input id="form-image" type="text" aria-label="First name" class="form-control">
                                </div>`

          divOfCountry.innerHTML =  `<div class="input-group">
                                  <div class="input-group-prepend">
                                     <span class="input-group-text">Dish origins(country):</span>
                                  </div>
                                    <input id="country-name" type="text" aria-label="First name" class="form-control">
                                </div>`


          divOfTextArea.innerHTML = `<div class="form-group">
              <label for="exampleFormControlTextarea1">Put your recipe</label>
              <textarea class="form-control" id="description-text" rows="3"></textarea>
              </div>`
          
          divButtonSubmit.innerHTML = `<button type="submit" value="Submit" class="btn btn-secondary btn-lg">Submit your dish</button>`


                mainDiv.append(divOfNameInput,divOfFoodNameInput,divOfImage,divOfCountry,divOfTextArea,divButtonSubmit) ;
                // form.append(divOfFoodNameInput);
                // form.append(divOfImage);
                // form.append(divOfCountry);
                // form.append(divOfTextArea);
                // form.append(divButtonSubmit);
                inputDishDiv.append(recipeForm);
                recipeForm.append(mainDiv)
                       

                
     recipeForm.addEventListener('submit',event =>{
      
       event.preventDefault();
       
        let nameInput = divOfNameInput.querySelector("#name").value;
        let nameOfDish = divOfFoodNameInput.querySelector("#name-of-dish").value ;
        let formImg = document.querySelector("#form-image").value;
        let countryName = divOfCountry.querySelector("#country-name").value;
        let descriptionText =  divOfTextArea.querySelector("#description-text").value;

          
         fetch(`http://localhost:3000/dishes`, 
         { //eslint-disable-line 
               method: 'POST',
               headers: 
              {
                  'Content-type': 'application/json',
                  'Accept': 'application/json'
              },
               body: JSON.stringify({
                 name_of_dish: nameOfDish,
                 description: descriptionText,
                 country: countryName,
                 img: formImg,
                 like: 0,
                 user: nameInput

              })
          })
      .then(response => response.json())
      .then(data => {
        event.target.reset()
      })
           
     } )

})
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

let showUserDishes = document.querySelector("#user-dishes");
let userDishesButton = document.querySelector("#user-dishes-button");

userDishesButton.addEventListener('click', event => 
{
       allDishesDiv.innerHTML = '';
       inputDishDiv.innerHTML = '';
       showUserDishes.innerHTML = '';
     
      let generalDiv = document.createElement('div');

      let nameDiv = document.createElement('div')
      let buttonDiv = document.createElement('div')
      let mainForm = document.createElement('form')


      nameDiv.innerHTML = `
                              <div class="input-group">
                                  <div class="input-group-prepend">
                                     <span class="input-group-text">Put your Full name</span>
                                  </div>
                                    <input id= "name-2" type="text" aria-label="First name" class="form-control">
                                </div>
                            `

      buttonDiv.innerHTML = `<button type="submit" value="Submit" class="btn btn-secondary btn-sm">Submit your name</button>`                      
     
      generalDiv.append(nameDiv);
      generalDiv.append(buttonDiv);

      mainForm.append(generalDiv);
      showUserDishes.append(mainForm);

            

      mainForm.addEventListener('submit',event => 
      { 
         
          event.preventDefault();
          targerName = nameDiv.querySelector('#name-2').value;
          
          fetch(`http://localhost:3000/users`) //eslint-disable-line
            .then(response => response.json())
            .then(data => 
            {    
                for(let userObj of data)
                {
                     if(userObj.name === targerName)
                     {
                       showUserDishes.innerHTML = ""
                       let elementOfObject = userObj.dishes;

                        for(let element of elementOfObject)
                        {
                            let oneDishDiv = document.createElement("div");
                              oneDishDiv.id = "one-dish-div"

                            let h2DishName = document.createElement('h1');
                             h2DishName.innerText = element.name_of_dish;
        
                            let imgDish = document.createElement("img")  
                            imgDish.src = element.img
       

                            let buttonDiv = document.createElement('div');
                            let likeDish = document.createElement("h4");
                             //likeDish.className = "btn btn-outline-danger" 
                              likeDish.innerText = `❤️`;
                            let spanOfbutton = document.createElement('span')
                             spanOfbutton.innerText = `${element.like}`
                              spanOfbutton.className = 'badge badge-light'
                                likeDish.append(spanOfbutton);
                                  buttonDiv.append(likeDish);

                             //<button type="button" class="btn btn-danger">Danger</button>

                             let buttonDelete = document.createElement("button")
                             buttonDelete.type = "button"
                             buttonDelete.className = "btn btn-danger"
                             buttonDelete.innerText = "Delete Your Dish"     
        
                             let countryDish = document.createElement("h4");
                                countryDish.innerText = `Country: ${element.country}`;
        
                               let descriptionDish  = document.createElement("h6")
                                   descriptionDish.innerText = element.description 
          

                                oneDishDiv.append(h2DishName,imgDish,buttonDiv,buttonDelete,countryDish,descriptionDish);
                                 showUserDishes.append(oneDishDiv);


                              buttonDelete.addEventListener('click', event =>{
                                oneDishDiv.remove()
                                fetch(`http://localhost:3000/dishes/${element.id}`, { //eslint-disable-line 
                                  method: 'DELETE'
                                })
                                  
                              })   
                        }
                     }
                }
            })

      })
     
      

})


