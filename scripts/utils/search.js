import recipes from "../../data/recipes.js";
import { recipeCard } from "../templates/recipeCard.js";

export function mainSearch(query, container) {
    if (query.lenght < 3) {
        //si la requête n'atteint pas 3 caractères on affiche tjr les recettes telles quelles
        displayRecipes(recipes);
        return;
    }
    //sinon on passe au filtrage
    const filteredRecipes = recipes.filter(recipe => {
        const queryLower = query.toLowerCase();
        const nameMatch = recipe.name.toLowerCase().includes(queryLower);
        const descriptionMatch = recipe.description.toLowerCase().includes(queryLower);
        const ingredientsMatch = recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase().includes(queryLower)
        );

        return nameMatch || descriptionMatch || ingredientsMatch;
    });
    //on display les recherches filtrées
    displayRecipes(filteredRecipes, container);
    //update des select de recherche avancée
    updateFilters(filteredRecipes)
    //1 - créer 3 tableaux (ingrédients, ustensiles, appareils) extraits de filteredrecipes
    //2 - injecter les données dans chaque select
    //- cibler les éléments select du DOM
    //- injecter les données du tableau dans chaque option
    //- input de recherche avant la liste des options
}

export function displayRecipes(recipesFound, container) {
    container.innerHTML = "";
    recipesFound.forEach(recipe => {
        const cardHTML = recipeCard(recipe);
        container.innerHTML += cardHTML;
    })
}

//fonction pour mettreà jour les filtres select ingrédients/ustensiles/appareils
function updateFilters(filteredRecipes) {
    //initialisation des tableaux
    let ingredients = [];
    let appliances = [];
    let ustensils = [];

    //pour chaque recettes filtrées, on extrait les ingrédients etc etc
    //et les push dans leurs tableaux respectifs créées ci-dessus
    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient =>
            ingredients.push(ingredient.ingredient));
        appliances.push(recipe.appliance);
        recipe.ustensils.forEach(ustensil => ustensils.push(ustensil));
    });

    //élimination des doublons (Set = structure de données qui ne permets pas les valeurs dupliquées)
    //convertion du set en tableau grâce à l'opérateur de décomposition
    ingredients = [...new Set(ingredients)];
    appliances = [...new Set(appliances)];
    ustensils = [...new Set(ustensils)];

    //mise à jour des éléments HTML (les options sont donc dynamiques selon ce qui est récupéré de la première recherche principale)
    updateSelect("ingredients-select", ingredients);
    updateSelect("appliances-select", appliances);
    updateSelect("ustensils-select", ustensils);
}
//fonction pour update les options de chaque select
function updateSelect(selectId, options) {
    //élement DOM
    const selectElement = document.getElementById(selectId);
    //on vient vider le contenu des options sauf celle du label et à chaque recherche pour affecter les nouvelles donneés
    selectElement.innerHTML = selectElement.querySelector('option[value=""]').outerHTML;
    //pour chaque option, on vient créer l'élément, on lui donne en valeur ce que l'on a dans chaque tableaux (ing, ust, appli)
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}