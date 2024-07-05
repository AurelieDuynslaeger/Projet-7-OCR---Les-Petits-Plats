import recipes from "./../data/recipes.js";
import { addTag, displayRecipes, mainSearch, updateActiveFilters, clearActiveFilters } from "./utils/search.js";

document.addEventListener("DOMContentLoaded", () => {
    const recipesContainer = document.getElementById("recipes");
    const inputSearch = document.getElementById("search");
    const searchForm = document.getElementById("search-form");
    const searchIcon = document.getElementById("search-icon");

    const performSearch = (query) => {
        if (query.length >= 3) {
            mainSearch(query, recipesContainer);
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
        } else {
            displayRecipes(recipes, recipesContainer);
            clearActiveFilters();
        }
    });

    const setupDropdownSearch = (dropdownId, selectId) => {
        const dropdownButton = document.getElementById(dropdownId);
        const selectContainer = document.getElementById(selectId);
        const input = selectContainer.querySelector(".select-input");
        const options = selectContainer.querySelector(".select-options");

        dropdownButton.addEventListener("click", () => {
            selectContainer.classList.toggle("hidden");
            input.focus();
        });

        input.addEventListener("input", (event) => {
            const query = event.target.value.toLowerCase();
            const allOptions = options.querySelectorAll("li");
            allOptions.forEach(option => {
                const text = option.textContent.toLowerCase();
                if (text.includes(query)) {
                    option.classList.remove("hidden");
                } else {
                    option.classList.add("hidden");
                }
            });
        });

        options.addEventListener("click", (event) => {
            if (event.target.tagName === "LI") {
                const selectedOption = event.target.textContent;
                addTag(selectedOption);
                updateActiveFilters();
                updateRecipesWithTags();
                selectContainer.classList.add("hidden");
                input.value = "";
            }
        });
    };

    setupDropdownSearch("dropdownSearchButtonIngredients", "ingredients-select");
    setupDropdownSearch("dropdownSearchButtonAppliances", "appliances-select");
    setupDropdownSearch("dropdownSearchButtonUstensils", "ustensils-select");

    function updateRecipesWithTags() {
        const tagsContainer = document.getElementById("tags");
        const tags = Array.from(tagsContainer.children).map(
            (element) => element.querySelector("p").textContent
        );
        const query = tags.join(" ");
        mainSearch(query, recipesContainer);
    }

    displayRecipes(recipes, recipesContainer);
});
