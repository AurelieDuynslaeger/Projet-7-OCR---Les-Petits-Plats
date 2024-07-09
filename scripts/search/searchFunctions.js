// searchFunctions.js

import recipes from "../../data/recipes.js";
import { displayRecipes, updateRecipeCount, updateFilters, updateSelectOptions } from "./displayFunctions.js";
import { setupDropdown } from "./filterFunctions.js";

let searchResults = [];

function escapeHtml(text) {
    //caractères spéciaux HTML à leurs équivalents échappés
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    //recherche tous les caractères dans le texte
    //puis remplace chaque occurence trouvée par la valeur correspondante
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

// Fonction principale pour effectuer la recherche
export function mainSearch(query, container) {
    const checkedInput = escapeHtml(query);
    searchResults = recipes;

    // Filtrer les recettes en fonction de la recherche principale (query)
    if (checkedInput.length >= 3) {
        const queryLower = checkedInput.toLowerCase();
        searchResults = recipes.filter(recipe => {
            const nameMatch = recipe.name.toLowerCase().includes(queryLower);
            const descriptionMatch = recipe.description.toLowerCase().includes(queryLower);
            const ingredientsMatch = recipe.ingredients.some(ingredient =>
                ingredient.ingredient.toLowerCase().includes(queryLower)
            );

            return nameMatch || descriptionMatch || ingredientsMatch;
        });
    }

    // Afficher les recettes filtrées dans le conteneur spécifié
    displayRecipes(searchResults, container, query);
    updateRecipeCount(searchResults.length);
    updateFilters(searchResults);
}

// Fonction pour initialiser chaque dropdown avec les données des recettes
export function initializeDropdowns() {
    const ingredients = collectUniqueIngredients(recipes);
    const appliances = collectUniqueAppliances(recipes);
    const ustensils = collectUniqueUstensils(recipes);

    updateSelectOptions("ingredients-select", ingredients);
    updateSelectOptions("appliances-select", appliances);
    updateSelectOptions("ustensils-select", ustensils);

    // Initialisation des écouteurs pour les dropdowns
    setupDropdown("dropdownSearchButtonIngredients", "ingredients-select");
    setupDropdown("dropdownSearchButtonUstensils", "ustensils-select");
    setupDropdown("dropdownSearchButtonAppliances", "appliances-select");
}

// Applique les filtres actifs aux résultats de recherche
export function applyFilters(tags, container) {
    let filteredRecipes = searchResults;

    if (tags.length > 0) {
        tags.forEach(tag => {
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.ingredients.some(ingredient =>
                    ingredient.ingredient.toLowerCase().includes(tag)
                ) ||
                recipe.ustensils.some(ustensil =>
                    ustensil.toLowerCase().includes(tag)
                ) ||
                recipe.appliance.toLowerCase().includes(tag)
            );
        });
    }

    displayRecipes(filteredRecipes, container, '', tags);
    updateRecipeCount(filteredRecipes.length);
}



// Fonction pour collecter tous les ingrédients uniques
function collectUniqueIngredients(recipes) {
    const ingredientsSet = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => ingredientsSet.add(ingredient.ingredient.toLowerCase()));
    });
    return Array.from(ingredientsSet);
}

// Fonction pour collecter tous les appareils uniques
function collectUniqueAppliances(recipes) {
    const appliancesSet = new Set();
    recipes.forEach(recipe => appliancesSet.add(recipe.appliance.toLowerCase()));
    return Array.from(appliancesSet);
}

// Fonction pour collecter tous les ustensiles uniques
function collectUniqueUstensils(recipes) {
    const ustensilsSet = new Set();
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => ustensilsSet.add(ustensil.toLowerCase()));
    });
    return Array.from(ustensilsSet);
}
