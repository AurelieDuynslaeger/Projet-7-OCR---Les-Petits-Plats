import recipes from "../../data/recipes.js";
import { recipeCard } from "../templates/recipeCard.js";
import { searchTag } from "../templates/tag.js";

let currentFilters = [];

export function mainSearch(query, container) {
    //filtrage des recettes en fonction de la recherche principale
    let filteredRecipes = [];
    if (query.length >= 3) {
        const queryLower = query.toLowerCase();

        //itération sur toutes les recettes (i = index de la boucle) et s'incrémente jusqu'à ce longueur du taleau recipes
        for (let i = 0; i < recipes.length; i++) {
            //on extrait à chaque itération l'objet recette et on la stocke
            const recipe = recipes[i];
            //verif si recipe contient la meme chaine de caract que la query
            //convertir les 2 chaines en minuscule
            //methode includes => true  si query est trouvé dans le string
            const nameMatch = recipe.name.toLowerCase().includes(queryLower);
            const descriptionMatch = recipe.description.toLowerCase().includes(queryLower);
            //si au moins un ingrédient contient query
            const ingredientsMatch = recipe.ingredients.some(ingredient =>
                ingredient.ingredient.toLowerCase().includes(queryLower)
            );
            //verif des correspondances, alors recipe ajoutée au tableau des recettes filtrées
            if (nameMatch || descriptionMatch || ingredientsMatch) {
                filteredRecipes.push(recipe);
            }
        }
    } else {
        //copie de toutes les recettes si la recherche est vide
        filteredRecipes = recipes.slice();
    }

    //filtres actifs sur les recettes déjà filtrées
    for (let filter of currentFilters) {
        //tableau pour les recettes qui corresp au filtre courant
        let filtered = [];
        //itération sur chaque recette dans le tableau rcettes filtrées
        for (let recipe of filteredRecipes) {
            for (let ingredient of recipe.ingredients) {
                if (ingredient.ingredient.toLowerCase().includes(filter.toLowerCase())) {
                    filtered.push(recipe);
                    break;
                }
            }
        }
        //mise à jour des recettes filtrées
        filteredRecipes = filtered;
    }

    displayRecipes(filteredRecipes, container, query);
    updateRecipeCount(filteredRecipes.length);
    updateFilters(filteredRecipes);
}

export function updateActiveFilters(tags) {
    currentFilters = tags;
    const query = document.getElementById("search").value.trim();
    mainSearch(query, document.getElementById("recipes"));
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

    for (let recipe of filteredRecipes) {
        for (let ingredient of recipe.ingredients) {
            ingredients.push(ingredient.ingredient);
        }
        appliances.push(recipe.appliance);
        for (let ustensil of recipe.ustensils) {
            ustensils.push(ustensil);
        }
    }

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

    for (let option of options) {
        const optionElement = document.createElement("li");
        optionElement.classList.add("p-4", "hover:bg-customYellow", "cursor-pointer");
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    }
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

        const tags = [];
        for (let element of tagsContainer.children) {
            tags.push(element.querySelector("p").textContent);
        }
        updateActiveFilters(tags);
    }
}

function updateSearch() {
    const tagsContainer = document.getElementById("tags");
    const tags = [];
    for (let element of tagsContainer.children) {
        tags.push(element.querySelector("p").textContent);
    }

    const query = tags.join(" ");
    const recipesContainer = document.getElementById("recipes");

    mainSearch(query, recipesContainer);
}
