
import { updateSelectOptions } from "./displayFunctions.js";


export function displayRecipes(recipesFound, container, query) {
    container.innerHTML = "";
    if (recipesFound.length === 0) {
        container.innerHTML = `
            <div class="no-recipes">
                <p class="font-manrope text-2xl">Aucune recette ne contient '${query}', vous pouvez chercher 'tarte aux pommes', 'poisson', etc.</p>
            </div>
        `;
    } else {
        recipesFound.forEach(recipe => {
            const cardHTML = recipeCard(recipe);
            container.innerHTML += cardHTML;
        });
    }
    const countRecipe = document.getElementById("recipe-count");
    countRecipe.textContent = `${recipesFound.length} recette(s)`;
}


export function updateRecipeCount(count) {
    const countRecipe = document.getElementById("recipe-count");
    countRecipe.textContent = `${count} recette(s)`;
}

export function updateFilters(filteredRecipes) {
    let ingredients = [];
    let appliances = [];
    let ustensils = [];

    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient =>
            ingredients.push(ingredient.ingredient)
        );
        appliances.push(recipe.appliance);
        recipe.ustensils.forEach(ustensil => ustensils.push(ustensil));
    });

    ingredients = [...new Set(ingredients)];
    appliances = [...new Set(appliances)];
    ustensils = [...new Set(ustensils)];

    updateSelectOptions("ingredients-select", ingredients);
    updateSelectOptions("appliances-select", appliances);
    updateSelectOptions("ustensils-select", ustensils);
}

export function updateSelectOptions(selectId, options) {
    const selectElement = document.querySelector(`#${selectId} .select-options`);
    selectElement.innerHTML = "";

    options.forEach(option => {
        const optionElement = document.createElement("li");
        optionElement.classList.add("p-4", "hover:bg-customYellow", "cursor-pointer");
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}