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

    const getActiveTags = () => {
        const tagsContainer = document.getElementById("tags");
        return Array.from(tagsContainer.children).map(
            (element) => element.querySelector("p").textContent.toLowerCase()
        );
    };

    const performSearch = (query, tags = []) => {
        if (query.length >= 3 || tags.length > 0) {
            mainSearch(query, recipesContainer);
            applyFilters(tags, recipesContainer);
            updateSearch();
        } else {
            displayRecipes(recipes, recipesContainer, query, []);
            clearActiveFilters();
        }

    };


    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = inputSearch.value.trim();
        performSearch(query, getActiveTags());
        inputSearch.value = "";
    });

    inputSearch.addEventListener("input", (event) => {
        const query = event.target.value.trim();
        if (query.length >= 3) {
            performSearch(query, getActiveTags());
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
            performSearch(inputSearch.value.trim(), [selectedTag, ...getActiveTags()]);
        });
    });

    displayRecipes(recipes, recipesContainer);
});
