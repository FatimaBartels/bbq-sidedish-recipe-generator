function generateRecipe(event) {
  event.preventDefault();

  new Typewriter("#recipe", {
    strings: "Macaroni Salad",
    autoStart: true,
    delay: 1,
    cursor: null,
  });
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);
