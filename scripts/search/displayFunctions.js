import { recipeCard } from "../templates/recipeCard.js";

export function displayRecipes(recipesFound, container, query = "", tags = []) {
    container.innerHTML = "";
    console.log(query);
    console.log(recipesFound.length);

    // Vérifier si aucune recette n'a été trouvée
    if (recipesFound.length === 0) {
        let errorMessage = "";
        console.log(errorMessage);
        console.log(query);

        // Cas 1: Aucun résultat pour la query seule
        if (query.length > 0 && tags.length === 0) {
            errorMessage = query;
            console.log(errorMessage);
        }
        // Cas 2: Aucun résultat pour la query avec des tags
        else if (query.length > 0 && tags.length > 0) {
            errorMessage = `${query}, ${tags.join(', ')}`;
            console.log(errorMessage);
        }
        // Cas 3: Aucun résultat pour les tags seuls
        else if (query.length === 0 && tags.length > 0) {
            errorMessage = tags.join(', ');
            console.log(errorMessage);
        }

        // Affichage du message d'erreur
        container.innerHTML = `
            <div class="no-recipes">
                <p class="font-manrope text-2xl">Aucune recette ne contient '${errorMessage}', vous pouvez chercher 'tarte aux pommes', 'poisson', etc.</p>
            </div>
        `;
        console.log(container.innerHTML);
    } else {
        // Affichage des recettes trouvées
        recipesFound.forEach(recipe => {
            const cardHTML = recipeCard(recipe);
            container.innerHTML += cardHTML;
        });
    }

    // Mise à jour du compteur de recettes
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
