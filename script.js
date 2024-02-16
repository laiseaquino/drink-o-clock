// Function to check if it's happy hour
function checkHappyHour() {
    var currentHour = new Date().getHours(); // Get the current hour (0-23)

    // Check if it's happy hour
    var isHappyHour = currentHour >= 17 && currentHour < 22;

    if (isHappyHour) {
        document.getElementById("happy-hour").textContent = "It's Happy Hour!";
        document.getElementById("drink-button").style.display = "block";

        // Display the confetti container
        var confettiContainer = document.getElementById("confetti-container");
		for (let i = 0; i < 50; i++) {
			createConfetti(confettiContainer);
		}

    } else {
        document.getElementById("happy-hour").textContent = "It's not Happy Hour yet.";
    }
}

// Function to generate confetti
function createConfetti(container) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * window.innerWidth + "px";

    // Set initial position closer to the viewport
    confetti.style.top = -10 + "px"; // Adjust value as needed

    // Add animation delay
    confetti.style.animationDelay = Math.random() * 5 + "s";

    container.appendChild(confetti);

    // Remove confetti after animation ends
    confetti.addEventListener("animationend", function() {
        confetti.remove();
    });
}

// Function to get a random drink using TheCocktailDB API
function getDrink() {
    // Fetch a random drink from TheCocktailDB API
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
        // Extract the drink details from the API response
        var randomDrink = data.drinks[0];
        var randomDrinkName = randomDrink.strDrink;
		var randomDrinkImage = randomDrink.strDrinkThumb;
		var randomDrinkRecipe = randomDrink.strInstructions;

        // Create an image element
        var drinkImage = new Image();
        drinkImage.src = randomDrinkImage;
        drinkImage.className = 'drink-image';

        // Create an element for the drink name and recipe
        var textElement = document.createElement('div');
		textElement.innerHTML = "Your drink: " + randomDrinkName + "<br>Ingredients: ";
        //textElement.innerHTML = "Your drink: " + randomDrinkName + "<br>Ingredients: " + randomDrinkIngredients + "<br>Recipe: " + randomDrinkRecipe;

		// Loop through strIngredient properties and add non-null ingredients to the array
		var ingredients = [];
		for (var i = 1; i <= 5; i++) {
			var ingredient = randomDrink['strIngredient' + i];
			if (ingredient) {
				ingredients.push(ingredient);
			}
		}
		if (ingredients.length > 0) {
            textElement.innerHTML += ingredients.join(', ') + "<br>";
		}
		textElement.innerHTML += "Recipe: " + randomDrinkRecipe;

        // Clear previous drink details
        var drinkDetailsDiv = document.getElementById('drink-details');
        drinkDetailsDiv.innerHTML = '';

        // Append the text and image elements to the drink details div
        drinkDetailsDiv.appendChild(textElement);
        drinkDetailsDiv.appendChild(drinkImage);
    })
    .catch(error => {
        console.error('Error fetching drink:', error);
    });
}

// Function to display a modal dialog
function showModalDialog(content) {
    // Create a modal overlay
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    // Create a modal dialog
    var dialog = document.createElement('div');
    dialog.className = 'modal-dialog';

    // Set the dialog content
    dialog.innerHTML = content;

    // Append the modal dialog to the overlay
    overlay.appendChild(dialog);

    // Append the overlay to the document body
    document.body.appendChild(overlay);

    // Add a click event listener to close the modal when clicked outside the dialog
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            closeModalDialog(overlay);
        }
    });
}

// Function to close the modal dialog
function closeModalDialog(overlay) {
    // Remove the overlay from the document body
    document.body.removeChild(overlay);
}

// Check happy hour when the page loads
checkHappyHour();

// Event listener for the drink button
document.getElementById("drink-button").addEventListener("click", getDrink);
