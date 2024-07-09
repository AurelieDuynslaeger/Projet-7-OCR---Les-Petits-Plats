import recipes from "./../data/recipes.js";
import { initializeDropdowns, mainSearch, applyFilters } from "./search/searchFunctions.js";
import { displayRecipes } from "./search/displayFunctions.js";
import { updateSearch } from "./search/tagFunctions.js";
import { clearActiveFilters } from "./search/filterFunctions.js";

document.addEventListener("DOMContentLoaded", () => {
    const recipesContainer = document.getElementById("recipes");
    const inputSearch = document.getElementById("search");
    const searchForm = document.getElementById("search-form");

    initializeDropdowns();

    const getActiveTags = () => {
        const tagsContainer = document.getElementById("tags");
        return Array.from(tagsContainer.children).map(
            (element) => element.querySelector("p").textContent.toLowerCase()
        );
    };

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function (m) { return map[m]; });
    }

    const performSearch = (query, tags = []) => {
        const checkedInput = escapeHtml(query);
        console.log(checkedInput);
        if (checkedInput.length >= 3 || tags.length > 0) {
            console.log(checkedInput);
            mainSearch(checkedInput, recipesContainer);
            applyFilters(tags, recipesContainer, checkedInput); // Pass query to applyFilters
            updateSearch();
        } else {
            displayRecipes(recipes, recipesContainer, checkedInput, []);
            clearActiveFilters();
        }
    };

    const handleSearch = () => {
        const query = inputSearch.value.trim();
        performSearch(query, getActiveTags());
    };

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        handleSearch();
    });

    inputSearch.addEventListener("input", () => {
        handleSearch();
    });

    document.querySelectorAll(".select-options").forEach(selectOptions => {
        selectOptions.addEventListener("click", (event) => {
            const selectedTag = event.target.textContent.trim();
            performSearch(inputSearch.value.trim(), [selectedTag, ...getActiveTags()]);
        });
    });

    displayRecipes(recipes, recipesContainer);
});
