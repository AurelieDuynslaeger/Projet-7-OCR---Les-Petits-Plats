import recipes from "./../data/recipes.js";
import { initializeDropdowns, mainSearch, applyFilters } from "./search/searchFunctions.js";
import { displayRecipes } from "./search/displayFunctions.js";
import { updateSearch } from "./search/tagFunctions.js";
import { clearActiveFilters } from "./search/filterFunctions.js";

document.addEventListener("DOMContentLoaded", () => {
    const recipesContainer = document.getElementById("recipes");
    const inputSearch = document.getElementById("search");
    const searchForm = document.getElementById("search-form");
    const searchIcon = document.getElementById("search-icon");

    // Chargement initial des dropdowns avec les données des recettes
    initializeDropdowns();

    const performSearch = (query, tags = []) => {
        if (query.length >= 3 || tags.length > 0) {
            mainSearch(query, recipesContainer); // Recherche principale par mot-clé
            updateSearch(); // Met à jour les filtres actifs (tags)
        } else {
            displayRecipes(recipes, recipesContainer, query, tags); // Affiche toutes les recettes si la recherche est vide
            clearActiveFilters(); // Réinitialise les filtres actifs
        }
        inputSearch.value = ""; // Réinitialise la valeur de l'input de recherche après la recherche
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
            updateSearch();
        } else {
            displayRecipes(recipes, recipesContainer);
            clearActiveFilters();
        }
    });

    // Écouteur d'événement pour les dropdowns où les utilisateurs choisissent les tags
    document.querySelectorAll(".select-options").forEach(selectOptions => {
        selectOptions.addEventListener("click", (event) => {
            const selectedTag = event.target.textContent.trim();
            performSearch("", [selectedTag]); // Appel performSearch avec le tag sélectionné
        });
    });;

    displayRecipes(recipes, recipesContainer);
});
