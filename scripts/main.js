import recipes from "./../data/recipes.js";
import { mainSearch, updateActiveFilters, clearActiveFilters, addTag, displayRecipes, applyFilters } from "./utils/search.js";

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
            updateRecipesWithTags();  // Applique les filtres actifs après la recherche principale
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
            updateRecipesWithTags();  // Applique les filtres actifs après la recherche principale
        } else {
            displayRecipes(recipes, recipesContainer);
            clearActiveFilters();
        }
    });

    // Fonction pour initialiser chaque dropdown avec les données des recettes
    function initializeDropdowns() {
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

    // Fonction pour collecter tous les ingrédients uniques
    function collectUniqueIngredients(recipes) {
        const ingredientsSet = new Set();
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => ingredientsSet.add(ingredient.ingredient));
        });
        return Array.from(ingredientsSet);
    }

    // Fonction pour collecter tous les appareils uniques
    function collectUniqueAppliances(recipes) {
        const appliancesSet = new Set();
        recipes.forEach(recipe => appliancesSet.add(recipe.appliance));
        return Array.from(appliancesSet);
    }

    // Fonction pour collecter tous les ustensiles uniques
    function collectUniqueUstensils(recipes) {
        const ustensilsSet = new Set();
        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => ustensilsSet.add(ustensil));
        });
        return Array.from(ustensilsSet);
    }


    // Fonction pour mettre à jour les options d'un dropdown en les triant par ordre alphabétique
    function updateSelectOptions(selectId, options) {
        const selectElement = document.getElementById(selectId).querySelector(".select-options");
        selectElement.innerHTML = "";

        // Trier les options par ordre alphabétique
        options.sort((a, b) => a.localeCompare(b, 'fr', { ignorePunctuation: true })).forEach(option => {
            const optionElement = document.createElement("li");
            optionElement.classList.add("p-4", "hover:bg-customYellow", "cursor-pointer");
            optionElement.textContent = option;
            selectElement.appendChild(optionElement);
        });
    }


    // Fonction pour initialiser un dropdown avec les événements
    function setupDropdown(dropdownId, selectId) {
        const dropdownButton = document.getElementById(dropdownId);
        const selectContainer = document.getElementById(selectId);
        const input = selectContainer.querySelector(".select-input");
        const options = selectContainer.querySelector(".select-options");

        dropdownButton.addEventListener("click", (event) => {
            event.preventDefault(); // Empêcher la soumission du formulaire
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
                addTag(selectedOption); // Fonction à implémenter pour ajouter le tag sélectionné
                updateActiveFilters(); // Fonction à implémenter pour mettre à jour les filtres actifs
                updateRecipesWithTags(); // Fonction à implémenter pour mettre à jour les recettes avec les tags
                selectContainer.classList.add("hidden");
                input.value = "";
            }
        });
    }

    function updateRecipesWithTags() {
        const tagsContainer = document.getElementById("tags");
        const tags = Array.from(tagsContainer.children).map(
            (element) => element.querySelector("p").textContent
        );
        applyFilters(tags, recipesContainer); // Applique les filtres aux résultats actuels
    }

    displayRecipes(recipes, recipesContainer);
});

