const all_inventory = JSON.parse(localStorage.getItem("3"))
let inventory = unique_finder(all_inventory);

document.getElementById('addRecipeBtn').addEventListener('click', function() {
    document.getElementById('recipeModal').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('recipeModal').style.display = 'none';
});

function unique_finder(lst){
    return [...new Set(lst)];
}

function addRecipeToPage(name, minutes, glutenFree, ingredients, imageUrl, instructions, allergies, cookingLevel) {
    const imageArray = [
        'RecipePage/burger.jpeg',
        'RecipePage/donut.jpeg',
        'RecipePage/small_food.jpeg',
        // ... add as many as you have
    ];
    function getRandomImage(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.setAttribute('data-name', name);
    card.setAttribute('data-ingredients', ingredients.join(', '));
    card.setAttribute('data-cookingLevel', cookingLevel); // Ensure this is set correctly based on input
    card.setAttribute('data-cuisine', "American"); // Assuming this is static, adjust if necessary
    card.setAttribute('data-cookingTime', minutes + " minutes");
    card.setAttribute('data-allergies', allergies);

    const imageDiv = document.createElement('div');
    imageDiv.className = 'recipe-image';
    const image = document.createElement('img');
    
    // Set the src to a random image from the array
    image.src = getRandomImage(imageArray);
    
    image.alt = name;

    image.width = 650;
    image.height = 350; // Adjusted to match your example
    imageDiv.appendChild(image);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'recipe-content';

    const h2 = document.createElement('h2');
    h2.textContent = name;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'recipe-info';
    
    // Creating divs for each piece of information
    const divMinutes = document.createElement('div');
    divMinutes.textContent = minutes + " Minute Meal";

    const divCookingLevel = document.createElement('div');
    divCookingLevel.textContent = "Cooking Level " + cookingLevel;

    const divGlutenFree = document.createElement('div');
    divGlutenFree.textContent = glutenFree ? 'Gluten free' : 'Contains Gluten';

    const divAllergies = document.createElement('div');
    divAllergies.textContent = allergies ? 'Allergies: ' + allergies : 'No Allergies'; // Shows allergies if any

    // Appending information divs to the infoDiv
    infoDiv.appendChild(divMinutes);
    infoDiv.appendChild(divCookingLevel);
    infoDiv.appendChild(divGlutenFree);
    infoDiv.appendChild(divAllergies);

    const arrowButton = document.createElement('button');
    arrowButton.className = 'recipe-arrow';
    arrowButton.textContent = '➔';
    arrowButton.setAttribute('data-instructions', instructions);
    arrowButton.addEventListener('click', function() {
        document.getElementById('recipeTitleModal').textContent = name;
        document.getElementById('recipeInstructionsModal').textContent = instructions;
        document.getElementById('recipeAllergies').textContent = allergies ? 'Allergies: ' + allergies : 'No Allergies';
        document.getElementById('cookTime').textContent = minutes + " Minute Meal";
        document.getElementById('instructionsModal').style.display = 'block';
    });

    contentDiv.appendChild(h2);
    contentDiv.appendChild(infoDiv);
    contentDiv.appendChild(arrowButton);

    card.appendChild(imageDiv);
    card.appendChild(contentDiv);
    document.getElementById('recipe-container').appendChild(card);
}


document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    // Retrieve form values
    const name = document.getElementById('recipeName').value;
    const instructions = document.getElementById('recipeInstructions').value;
    const ingredients = document.getElementById('recipeIngredients').value.split(',').map(ingredient => ingredient.trim());
    const minutes = document.getElementById('recipeTime').value;
    const glutenFree = document.getElementById('recipeGlutenFree').value === 'true';
    const imageUrl = document.getElementById('recipeImageUrl').value || 'default-recipe-image.jpg';
    const allergiesInfo = document.getElementById('allergies').value; // Ensure this matches your form's input ID
    const cookingLevel = document.getElementById('cookingLevel').value; // Ensure this matches your form's select ID

    // Add the new recipe card to the page
    addRecipeToPage(name, minutes, glutenFree, ingredients, imageUrl, instructions, allergiesInfo, cookingLevel);

    document.getElementById('recipeModal').style.display = 'none';
    event.target.reset(); // Clear the form fields after submission
});



function createRecipeCard(name, instructions, ingredients, allergies, cookingTime) {
    // Create the card elements (simplified version)
    const card = document.createElement('div');
    const title = document.createElement('h2');
    const info = document.createElement('div');
    const time = document.createElement('div');

    // Set the content
    title.textContent = name;
    info.textContent = instructions; // You'll probably want to add more detail here
    time.textContent = cookingTime;

    // Assemble the card
    card.appendChild(title);
    card.appendChild(info);
    card.appendChild(time);

    // Add to the DOM
    document.body.appendChild(card);
}




//Second half

document.addEventListener('DOMContentLoaded', function() {
	
    // Close modal when the close button is clicked


    // Event listener to close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == document.getElementById('instructionsModal')) {
            document.getElementById('instructionsModal').style.display = 'none';
        }
    };

	//pre-existing reciper card inventory
	// const inventory = ['Milk', 'Lemon', "Yogurt", "Salmon"];

	// document.querySelectorAll('.recipe-arrow').forEach(button => {
    //     button.addEventListener('click', function() {
    //         const recipeCard = this.closest('.recipe-card');
    //         const ingredientsList = recipeCard.getAttribute('data-ingredients');
    //         const ingredients = ingredientsList.split(',').map(ingredient => ingredient.trim()); // Split by comma and trim spaces
    //         const recipeName = recipeCard.getAttribute('data-name');
    //         const instructions = this.getAttribute('data-instructions');
	// 		const allergies = this.getAttribute('data-allergies');
	// 		const cookingTime = recipeCard.getAttribute('data-cookingTime');

    //         const hasAllIngredients = ingredients.every(ingredient => inventory.includes(ingredient));

    //         if (hasAllIngredients) {
    //             document.getElementById('recipeTitleModal').textContent = recipeName;
	// 			document.getElementById('cookTime').textContent = cookingTime
    //             document.getElementById('recipeInstructionsModal').textContent = instructions;
	// 			document.getElementById('recipeAllergies').textContent = allergies;
    //             document.getElementById('instructionsModal').style.display = 'block';

    //         } else {
    //             const missing_items = findMissingItems(ingredients,inventory);
    //             localStorage.setItem("4",JSON.stringify(missing_items));
                
    //         }
			
    //     });
    // });
    function displayRecipe(){
        const ingredientsList = recipeCard.getAttribute('data-ingredients');
        const ingredients = ingredientsList.split(',').map(ingredient => ingredient.trim());
        const hasAllIngredients = ingredients.every(ingredient => inventory.includes(ingredient));
        if (hasAllIngredients) {
            document.getElementById('popup').style.display = 'block'; 
        }else{
            document.getElementById('popup-2').style.display = 'block'; 
        }
    }
	
});

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function closePopup2() {
    document.getElementById('popup-2').style.display = 'none';
}

function findMissingItems(list1, list2) {
    return list2.filter(item => !list1.includes(item));
}

document.getElementById('filter-select').addEventListener('change', function() {
    const filterValue = this.value;
    const recipeContainer = document.getElementById('recipe-container');
    let recipeCards = Array.from(recipeContainer.getElementsByClassName('recipe-card'));

	if(filterValue === ''){

	}else if (filterValue === 'alphabetical') {
        recipeCards.sort((a, b) => a.getAttribute('data-name').localeCompare(b.getAttribute('data-name')));
    } else if (filterValue === 'level') {
        recipeCards.sort((a, b) => parseInt(a.getAttribute('data-cookingLevel'), 10) - parseInt(b.getAttribute('data-cookingLevel'), 10));
    } else if (filterValue === 'cuisine') {
        recipeCards.sort((a, b) => a.getAttribute('data-cuisine').localeCompare(b.getAttribute('data-cuisine')));
    // } else if (filterValue === 'time') { // New filter by recipeTime
    //     recipeCards.sort((a, b) => parseInt(a.getAttribute('data-cookingTime'), 10) - parseInt(b.getAttribute('data-cookingTime'), 10));
    }else if (filterValue === 'time') {
        recipeCards.sort((a, b) => {
            const timeA = parseInt(a.getAttribute('data-cookingTime'), 10);
            const timeB = parseInt(b.getAttribute('data-cookingTime'), 10);
            return timeA - timeB;
        });
	}

    // Clear the container and re-append cards in sorted order
    recipeContainer.innerHTML = '';
    recipeCards.forEach(card => recipeContainer.appendChild(card));
});





// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == document.getElementById('recipeModal')) {
        document.getElementById('recipeModal').style.display = 'none';
    }
}


