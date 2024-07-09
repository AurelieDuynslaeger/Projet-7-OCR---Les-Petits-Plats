import { recipeCard } from "../templates/recipeCard.js";

export function displayRecipes(recipesFound, container, query = "", tags = []) {
    container.innerHTML = "";

    // Vérifier si aucune recette n'a été trouvée et que la recherche était spécifiée
    if (recipesFound.length === 0 && (query.length > 0 || tags.length > 0)) {
        const errorMessage = query.length > 0 ? query : tags.join(', ');
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

    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient =>
            ingredients.push(ingredient.ingredient.toLowerCase())
        );
        appliances.push(recipe.appliance.toLowerCase());
        recipe.ustensils.forEach(ustensil => ustensils.push(ustensil.toLowerCase()));
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
