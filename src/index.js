

// AI with API fallback
function generateRecipe(event) {
  event.preventDefault();

  const instructionsInput = document.querySelector("#user-instructions");
  const recipeElement = document.querySelector("#recipe");
  const apiKey = "f80c43e79144055afb51f7885ft48o7e";

  const prompt = `User instructions: Generate a barbecue side dish recipe about ${instructionsInput.value}`;
  const context =
    "You are a very good cook who writes recipes for a web app. Generate a simple and easy-to-make side dish recipe with clear sections: Title, Ingredients (as a bulleted list), and Instructions (as numbered steps). Write it as clean, readable HTML for display in a webpage — do NOT include code blocks, HTML tags explanations, or any text like 'copy this code'. Only return the formatted recipe content.";


  const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  recipeElement.classList.remove("hidden");
  recipeElement.innerHTML = `<div class="generating">⏳Generating a ${instructionsInput.value} Side Dish Recipe for you... </div>`;

  axios
    .get(apiUrl)
    .then(displayRecipe)
    .catch((error) => {
      console.log("AI failed, using backup API:", error);
      getBackupRecipe(instructionsInput.value);
    });
}

function displayRecipe(response) {
  console.log("recipe generated");
  let recipe = response.data.answer.replace(/```html|```/g, "").trim();
  document.querySelector("#recipe").innerHTML = "";

    new Typewriter("#recipe", {
      strings: recipe,
      autoStart: true,
      delay: 0.5,
      cursor: null,
    });
}

function getBackupRecipe(query) {
  const spoonKey = "1"; // free test key
  const spoonUrl = `https://www.themealdb.com/api/json/v1/${spoonKey}/search.php?s=${query}`;

  axios.get(spoonUrl).then((response) => {
    const meals = response.data.meals;

    if (meals) {
      const meal = meals[0];

      // Collect ingredients and measurements
      let ingredientsHTML = "";
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredientsHTML += `<li>${measure} ${ingredient}</li>`;
        }
      }

      const recipeHTML = `
        <div class="recipe-card">
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-image">

          <div class="recipe-info">
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Origin:</strong> ${meal.strArea}</p>
          </div>

          <h3>Ingredients:</h3>
          <ul class="ingredients-list">
            ${ingredientsHTML}
          </ul>

          <h3>Instructions:</h3>
          <p class="instructions">${meal.strInstructions}</p>
        </div>
      `;

      document.querySelector("#recipe").innerHTML = recipeHTML;
    } else {
      document.querySelector("#recipe").innerHTML =
        "Sorry, no recipes found for that keyword.";
    }
  });
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);

