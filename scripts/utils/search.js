import recipes from "../../data/recipes.js";
import { recipeCard } from "../templates/recipeCard.js";
import { searchTag } from "../templates/tag.js";

let currentFilters = [];
let searchResults = [];

// Fonction principale pour effectuer la recherche
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

export function updateActiveFilters() {
    const tagsContainer = document.getElementById("tags");
    currentFilters = Array.from(tagsContainer.children).map(
        (element) => element.querySelector("p").textContent
    );
}

export function clearActiveFilters() {
    currentFilters = [];
}

export function displayRecipes(recipesFound, container, query) {
    container.innerHTML = "";
    if (recipesFound.length === 0) {
        container.innerHTML = `
            <div class="no-recipes">
                <p class="font-manrope text-2xl">Aucune recette ne contient '${query}', vous pouvez chercher 'tarte aux pommes', 'poisson', etc.</p>
            </div>
        `;
    } else {
        recipesFound.forEach(recipe => {
            const cardHTML = recipeCard(recipe);
            container.innerHTML += cardHTML;
        });
    }
    const countRecipe = document.getElementById("recipe-count");
    countRecipe.textContent = `${recipesFound.length} recette(s)`;
}

function updateRecipeCount(count) {
    const countRecipe = document.getElementById("recipe-count");
    countRecipe.textContent = `${count} recette(s)`;
}

function updateFilters(filteredRecipes) {
    let ingredients = [];
    let appliances = [];
    let ustensils = [];

    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient =>
            ingredients.push(ingredient.ingredient)
        );
        appliances.push(recipe.appliance);
        recipe.ustensils.forEach(ustensil => ustensils.push(ustensil));
    });

    ingredients = [...new Set(ingredients)];
    appliances = [...new Set(appliances)];
    ustensils = [...new Set(ustensils)];

    updateSelectOptions("ingredients-select", ingredients);
    updateSelectOptions("appliances-select", appliances);
    updateSelectOptions("ustensils-select", ustensils);
}

function updateSelectOptions(selectId, options) {
    const selectElement = document.querySelector(`#${selectId} .select-options`);
    selectElement.innerHTML = "";

    options.forEach(option => {
        const optionElement = document.createElement("li");
        optionElement.classList.add("p-4", "hover:bg-customYellow", "cursor-pointer");
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

export function addTag(tag) {
    const tagsContainer = document.getElementById("tags");
    const existingTag = Array.from(tagsContainer.children).find(
        (element) => element.querySelector("p").textContent === tag
    );

    if (!existingTag) {
        const tagHTML = searchTag(tag);
        tagsContainer.innerHTML += tagHTML;

        const tagElements = tagsContainer.querySelectorAll(".tag");
        tagElements.forEach(tagElement => {
            tagElement.querySelector("i").addEventListener("click", () => {
                tagElement.remove();
                updateSearch();
            });
        });

        updateActiveFilters(Array.from(tagsContainer.children).map(
            (element) => element.querySelector("p").textContent
        ));
    }
}

function updateSearch() {
    const tagsContainer = document.getElementById("tags");
    const tags = Array.from(tagsContainer.children).map(
        (element) => element.querySelector("p").textContent
    );
    updateActiveFilters(tags);
    applyFilters(tags, document.getElementById("recipes"));
}
