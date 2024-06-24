import recipes from "../../data/recipes.js";
import { recipeCard } from "../templates/recipeCard.js";
import { searchTag } from "../templates/tag.js"

let currentFilters = [];

export function mainSearch(query, container) {
    if (query.length < 3 && currentFilters.length === 0) {
        displayRecipes(recipes, container);
        updateRecipeCount(recipes.length);
        return;
    }

    const filteredRecipes = recipes.filter(recipe => {
        const queryLower = query.toLowerCase();
        const nameMatch = recipe.name.toLowerCase().includes(queryLower);
        const descriptionMatch = recipe.description.toLowerCase().includes(queryLower);
        const ingredientsMatch = recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase().includes(queryLower)
        );

        const allFiltersMatch = currentFilters.every(filter =>
            recipe.ingredients.some(ingredient =>
                ingredient.ingredient.toLowerCase().includes(filter.toLowerCase())
            )
        );

        return nameMatch || descriptionMatch || ingredientsMatch;
    });

    displayRecipes(filteredRecipes, container);
    updateRecipeCount(filteredRecipes.length);
    updateFilters(filteredRecipes);
}

export function updateActiveFilters(tags) {
    currentFilters = tags;
}

export function displayRecipes(recipesFound, container) {
    container.innerHTML = "";
    recipesFound.forEach(recipe => {
        const cardHTML = recipeCard(recipe);
        container.innerHTML += cardHTML;
    });
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
            ingredients.push(ingredient.ingredient));
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
        const lastTagElement = tagElements[tagElements.length - 1];
        lastTagElement.querySelector("i").addEventListener("click", () => {
            lastTagElement.remove();
            updateSearch();
        });
    }
}

function updateSearch() {
    const tagsContainer = document.getElementById("tags");
    const tags = Array.from(tagsContainer.children).map(
        (element) => element.querySelector("p").textContent
    );

    const query = tags.join(" ");
    const recipesContainer = document.getElementById("recipes");

    mainSearch(query, recipesContainer);
}
