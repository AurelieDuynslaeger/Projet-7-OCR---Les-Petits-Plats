import recipes from "./../data/recipes.js";
import { addTag, displayRecipes, mainSearch } from "./utils/search.js";

document.addEventListener("DOMContentLoaded", () => {
    const recipesContainer = document.getElementById("recipes");
    const inputSearch = document.getElementById("search");
    const searchForm = document.getElementById("search-form");
    const searchIcon = document.getElementById("search-icon");

    const performSearch = (query) => {
        if (query.length >= 3) {
            mainSearch(query, recipesContainer);
            updateActiveFilters();
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

    const setupCustomSelect = (selectId) => {
        const selectContainer = document.getElementById(selectId);
        const title = selectContainer.querySelector(".select-title");
        const inputContainer = selectContainer.querySelector(".select-input-container");
        const input = selectContainer.querySelector(".select-input");
        const options = selectContainer.querySelector(".select-options");

        title.addEventListener("click", () => {
            inputContainer.classList.toggle("hidden");
            options.classList.toggle("hidden");
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
                inputContainer.classList.add("hidden");
                options.classList.add("hidden");
                input.value = "";
            }
        });
    };

    setupCustomSelect("ingredients-select");
    setupCustomSelect("appliances-select");
    setupCustomSelect("ustensils-select");

    function updateActiveFilters() {
        const tagsContainer = document.getElementById("tags");
        const tags = Array.from(tagsContainer.children).map(
            (element) => element.querySelector("p").textContent
        );
        updateFilters(tags);
    }

    function updateFilters(tags) {
        console.log("Filtres mis à jour :", tags);
    }

    function clearActiveFilters() {
        console.log("Filtres effacés");
    }

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

function updateSelectOptions(selectId, options) {
    const selectElement = document.querySelector(`#${selectId} .select-options`);
    selectElement.innerHTML = "";

    options.forEach(option => {
        const optionElement = document.createElement("li");
        optionElement.classList.add("py-4", "hover:bg-customYellow", "cursor-pointer");
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}
