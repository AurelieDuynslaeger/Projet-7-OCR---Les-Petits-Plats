import recipes from "./../data/recipes.js";
import { initializeDropdowns, mainSearch, clearActiveFilters } from "./search/searchFunctions.js";
import { displayRecipes } from "./search/displayFunctions.js";
import { updateSearch } from "./search/tagFunctions.js";



document.addEventListener("DOMContentLoaded", () => {
    const recipesContainer = document.getElementById("recipes");
    const inputSearch = document.getElementById("search");
    const searchForm = document.getElementById("search-form");
    const searchIcon = document.getElementById("search-icon");

    // Chargement initial des dropdowns avec les données des recettes
    initializeDropdowns();

    const performSearch = (query) => {
        if (query.length >= 3) {
            mainSearch(query, recipesContainer);
            updateSearch();
        }
        inputSearch.value = "";
    };

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = inputSearch.value.trim();
        performSearch(query);
    });

    if (searchIcon) {
        searchIcon.addEventListener("click", () => {
            const query = inputSearch.value.trim();
            performSearch(query);
        });
    }

    inputSearch.addEventListener("input", (event) => {
        const query = event.target.value.trim();
        if (query.length >= 3) {
            mainSearch(query, recipesContainer);
            updateSearch();  // Applique les filtres actifs après la recherche principale
        } else {
            displayRecipes(recipes, recipesContainer);
            clearActiveFilters();
        }
    });

    displayRecipes(recipes, recipesContainer);
});

