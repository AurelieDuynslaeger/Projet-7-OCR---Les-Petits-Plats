import recipes from "../../data/recipes.js";
import { recipeCard } from "../templates/recipeCard.js";

export function mainSearch(query, container) {
    if (query.lenght < 3) {
        //si la requête n'atteint pas 3 caractères on affiche tjr les recettes telles quelles
        displayRecipes(recipes);
        return;
    }
    //sinon on passe au filtrage
    const filteredRecipes = recipes.filter(recipe => {
        const queryLower = query.toLowerCase();
        const nameMatch = recipe.name.toLowerCase().includes(queryLower);
        const descriptionMatch = recipe.description.toLowerCase().includes(queryLower);
        const ingredientsMatch = recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase().includes(queryLower)
        );

        return nameMatch || descriptionMatch || ingredientsMatch;
    });
    displayRecipes(filteredRecipes, container);
    //on display les recherches filtrées
}

export function displayRecipes(recipesFound, container) {
    container.innerHTML = "";
    recipesFound.forEach(recipe => {
        const cardHTML = recipeCard(recipe);
        container.innerHTML += cardHTML;
    })
}