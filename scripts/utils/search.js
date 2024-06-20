import recipes from "../../data/recipes.js";
import { recipeCard } from "../templates/recipeCard.js";

export function mainSearch(query, container) {
    if (query.length < 3) {
        // Si la requête n'atteint pas 3 caractères, on affiche toutes les recettes
        displayRecipes(recipes, container);
        updateRecipeCount(recipes.length);
        return;
    }

    // Filtrage des recettes
    const filteredRecipes = recipes.filter(recipe => {
        const queryLower = query.toLowerCase();
        const nameMatch = recipe.name.toLowerCase().includes(queryLower);
        const descriptionMatch = recipe.description.toLowerCase().includes(queryLower);
        const ingredientsMatch = recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase().includes(queryLower)
        );

        return nameMatch || descriptionMatch || ingredientsMatch;
    });

    // Affichage des recettes filtrées
    displayRecipes(filteredRecipes, container);
    updateRecipeCount(filteredRecipes.length);
    // Mise à jour des filtres de recherche avancée
    updateFilters(filteredRecipes);
}

export function displayRecipes(recipesFound, container) {
    container.innerHTML = "";
    recipesFound.forEach(recipe => {
        const cardHTML = recipeCard(recipe);
        container.innerHTML += cardHTML;
    });
}

// Fonction pour mettre à jour le nombre de recettes affichées
function updateRecipeCount(count) {
    const countRecipe = document.getElementById("recipe-count");
    countRecipe.textContent = `${count} recette(s)`;
}

// Fonction pour mettre à jour les filtres select ingrédients/ustensiles/appareils
function updateFilters(filteredRecipes) {
    let ingredients = [];
    let appliances = [];
    let ustensils = [];

    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient =>
            ingredients.push(ingredient.ingredient));
        appliances.push(recipe.appliance);
        recipe.ustensils.forEach(ustensil => ustensils.push(ustensil));
    });

    ingredients = [...new Set(ingredients)];
    appliances = [...new Set(appliances)];
    ustensils = [...new Set(ustensils)];

    updateSelect("ingredients-select", ingredients);
    updateSelect("appliances-select", appliances);
    updateSelect("ustensils-select", ustensils);
}

// Fonction pour mettre à jour les options de chaque select
function updateSelect(selectId, options) {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = selectElement.querySelector('option[value=""]').outerHTML;

    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}
