function displayRecipe(response) {
  console.log("recipe generated");
  new Typewriter("#recipe", {
    strings: response.data.answer,
    autoStart: true,
    delay: 0,
    cursor: null,
  });
}

function generateRecipe(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "f80c43e79144055afb51f7885ft48o7e";
  let prompt = `User instructions: Generate a barbecue side dish recipe about ${instructionsInput.value}`;
  let context =
    "You are a very good cook and love to make the best and simple side dishes. Your mission is to generate a simple and easy to make side dish recipe for barbecue in HTML format. Make sure to follow the user instructions.";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("hidden");
  recipeElement.innerHTML = `<div class="generating">⏳Generating a BBQ ${instructionsInput.value} Side Dish Recipe for you... </div>`;

  console.log("Generating recipe");
  console.log(`Prompt: ${prompt}`);
  console.log(`Context: ${context}`);

  axios.get(apiUrl).then(displayRecipe);
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);

// change theme
function changeTheme() {
  let body = document.querySelector("body");
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
  } else {
    body.classList.add("dark");
  }
}
let themeButton = document.querySelector(".theme-button");
themeButton.addEventListener("click", changeTheme);
