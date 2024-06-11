import recipes from "./../data/recipes.js";
import { displayRecipes, mainSearch } from "./utils/search.js";

document.addEventListener("DOMContentLoaded", () => {
    //recup du conteneur html
    const recipesContainer = document.getElementById("recipes");
    //récup de l'input de recherche principal
    const inputSearch = document.getElementById("search");
    //récup du formulaire de recherche principal
    const searchForm = document.getElementById("search-form");
    // Écouter les soumissions du formulaire
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = inputSearch.value;
        mainSearch(query, recipesContainer);
    });
    // Écouter les entrées de l'utilisateur pour les recherches dynamiques
    inputSearch.addEventListener("input", (event) => {
        const query = event.target.value;
        if (query.length >= 3) {
            mainSearch(query, recipesContainer);
        }
        else {
            displayRecipes(recipes, recipesContainer)
        }
    });

    displayRecipes(recipes, recipesContainer)

});