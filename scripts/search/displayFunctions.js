import { recipeCard } from "../templates/recipeCard.js";

export function displayRecipes(recipesFound, container, query = "", tags = []) {
    container.innerHTML = "";

    if (recipesFound.length === 0 && tags.length > 0) {
        const errorMessage = query ? query : tags.join(', ');
        container.innerHTML = `
            <div class="no-recipes">
                <p class="font-manrope text-2xl">Aucune recette ne contient '${errorMessage}', vous pouvez chercher 'tarte aux pommes', 'poisson', etc.</p>
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

    for (let recipe of filteredRecipes) {
        for (let ingredient of recipe.ingredients) {
            ingredients.push(ingredient.ingredient.toLowerCase());
        }
        appliances.push(recipe.appliance.toLowerCase());
        for (let ustensil of recipe.ustensils) {
            ustensils.push(ustensil.toLowerCase());
        }
    }

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

    for (let option of options) {
        const optionElement = document.createElement("li");
        optionElement.classList.add("p-4", "hover:bg-customYellow", "cursor-pointer");
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    }
}