import recipes from "../../data/recipes.js";
import { recipeCard } from "../templates/recipeCard.js";
import { searchTag } from "../templates/tag.js"

export function mainSearch(query, container) {
    if (query.length < 3) {
        // Si la requête n'atteint pas 3 caractères, on affiche toutes les recettes
        displayRecipes(recipes, container);
        updateRecipeCount(recipes.length);
        return;
    }

    // Filtrage des recettes
    const filteredRecipes = recipes.filter(recipe => {
        const queryLower = query.toLowerCase();
        const nameMatch = recipe.name.toLowerCase().includes(queryLower);
        const descriptionMatch = recipe.description.toLowerCase().includes(queryLower);
        const ingredientsMatch = recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase().includes(queryLower)
        );

        return nameMatch || descriptionMatch || ingredientsMatch;
    });

    // Affichage des recettes filtrées
    displayRecipes(filteredRecipes, container);
    updateRecipeCount(filteredRecipes.length);
    // Mise à jour des filtres de recherche avancée
    updateFilters(filteredRecipes);
}

export function displayRecipes(recipesFound, container) {
    container.innerHTML = "";
    recipesFound.forEach(recipe => {
        const cardHTML = recipeCard(recipe);
        container.innerHTML += cardHTML;
    });
    // Afficher le nombre de recettes
    const countRecipe = document.getElementById("recipe-count");
    countRecipe.textContent = `${recipesFound.length} recette(s)`;
}

// Fonction pour mettre à jour le nombre de recettes affichées
function updateRecipeCount(count) {
    const countRecipe = document.getElementById("recipe-count");
    countRecipe.textContent = `${count} recette(s)`;
}

// Fonction pour mettre à jour les filtres select ingrédients/ustensiles/appareils
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

    updateSelect("ingredients-select", ingredients);
    updateSelect("appliances-select", appliances);
    updateSelect("ustensils-select", ustensils);
}

// Fonction pour mettre à jour les options de chaque select
function updateSelect(selectId, options) {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = selectElement.querySelector('option[value=""]').outerHTML;

    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

// Fonction pour ajouter un tag de recherche
export function addTag(tag) {
    //on cible l'élement container du dom où afficher les tags
    const tagsContainer = document.getElementById("tags");
    //on cible l'élement enfant de ce container qui recevra le tag
    const existingTag = Array.from(tagsContainer.children).find(
        (element) => element.querySelector("p").textContent === tag
    );

    //si le tag n'existe pas
    if (!existingTag) {
        //on utilise la fonction d'affichge du tag de la recherche
        const tagHTML = searchTag(tag);
        tagsContainer.innerHTML += tagHTML;

        // Ajout de l'événement de suppression du tag
        const tagElements = tagsContainer.querySelectorAll(".tag");
        const lastTagElement = tagElements[tagElements.length - 1];
        //on cible l'icone pour supprimer le tag
        lastTagElement.querySelector("i").addEventListener("click", () => {
            lastTagElement.remove();
            //mise à jour la recherche après la suppression du tag
            updateSearch();
        });
    }
}

//Fonction pour mettre à jour la recherche après la suppression d'un tag
function updateSearch() {
    const tagsContainer = document.getElementById("tags");
    const tags = Array.from(tagsContainer.children).map(
        (element) => element.querySelector("p").textContent
    );

    const query = tags.join(" ");
    const recipesContainer = document.getElementById("recipes");

    mainSearch(query, recipesContainer);
}
