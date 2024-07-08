import recipes from "../../data/recipes.js";
import { displayRecipes, updateRecipeCount, updateFilters } from "./displayFunctions.js";


//Fonction principale pour effectuer la recherche
export function mainSearch(query, container) {
    searchResults = recipes;

    // Filtrer les recettes en fonction de la recherche principale (query)
    if (query.length >= 3) {
        const queryLower = query.toLowerCase();
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

// Applique les filtres actifs aux résultats de recherche
export function applyFilters(tags, container) {
    let filteredRecipes = searchResults;

    if (tags.length > 0) {
        tags.forEach(filter => {
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.ingredients.some(ingredient =>
                    ingredient.ingredient.toLowerCase().includes(filter.toLowerCase())
                ) ||
                recipe.ustensils.some(ustensil =>
                    ustensil.toLowerCase().includes(filter.toLowerCase())
                ) ||
                recipe.appliance.toLowerCase().includes(filter.toLowerCase())
            );
        });
    }

    // Afficher les recettes filtrées
    displayRecipes(filteredRecipes, container);
    updateRecipeCount(filteredRecipes.length);
}