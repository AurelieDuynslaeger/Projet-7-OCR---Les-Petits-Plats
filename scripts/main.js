import recipes from "./../data/recipes.js";
import { addTag, displayRecipes, mainSearch, updateActiveFilters } from "./utils/search.js";

document.addEventListener("DOMContentLoaded", () => {
    // Récupération des éléments du DOM
    const recipesContainer = document.getElementById("recipes");
    const inputSearch = document.getElementById("search");
    const searchForm = document.getElementById("search-form");
    const searchIcon = document.getElementById("search-icon");

    // Fonction pour effectuer la recherche et ajouter le tag
    const performSearch = (query) => {
        if (query.length >= 3) {
            mainSearch(query, recipesContainer);
            updateActiveFilters();
        }
        // Vider le champ de recherche après la soumission, même si la recherche n'a pas atteint 3 caractères
        inputSearch.value = "";
    };

    // Écouter les soumissions du formulaire
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = inputSearch.value.trim();
        performSearch(query);
    });

    // Écouter le clic sur l'icône de recherche
    if (searchIcon) {
        searchIcon.addEventListener("click", (event) => {
            const query = inputSearch.value.trim();
            performSearch(query);
        });
    }

    // Écouter les entrées de l'utilisateur pour les recherches dynamiques
    inputSearch.addEventListener("input", (event) => {
        const query = event.target.value.trim();
        if (query.length >= 3) {
            mainSearch(query, recipesContainer);
        } else {
            displayRecipes(recipes, recipesContainer);
            clearActiveFilters();
        }
    });

    // Écouter les changements dans les selects d'ingrédients, d'ustensiles et d'appareils
    const ingredientsSelect = document.getElementById("ingredients-select");
    ingredientsSelect.addEventListener("change", (event) => {
        const selectedIngredient = event.target.value;
        if (selectedIngredient) {
            addTag(selectedIngredient);
            updateActiveFilters();
            updateRecipesWithTags();
        }
    });

    const appliancesSelect = document.getElementById("appliances-select");
    appliancesSelect.addEventListener("change", (event) => {
        const selectedAppliance = event.target.value;
        if (selectedAppliance) {
            addTag(selectedAppliance);
            updateActiveFilters();
            updateRecipesWithTags();
        }
    });

    const ustensilsSelect = document.getElementById("ustensils-select");
    ustensilsSelect.addEventListener("change", (event) => {
        const selectedUstensil = event.target.value;
        if (selectedUstensil) {
            addTag(selectedUstensil);
            updateActiveFilters();
            updateRecipesWithTags();
        }
    });

    // Mettre à jour les filtres actifs
    function updateActiveFilters() {
        const tagsContainer = document.getElementById("tags");
        const tags = Array.from(tagsContainer.children).map(
            (element) => element.querySelector("p").textContent
        );
        // Appeler la fonction pour mettre à jour les filtres avec les tags actifs
        updateFilters(tags);
    }

    // Fonction pour mettre à jour les filtres avec les tags actifs
    function updateFilters(tags) {
        // Implémenter la logique pour mettre à jour les filtres (à adapter selon votre structure HTML et votre application)
        console.log("Filtres mis à jour :", tags);
    }

    // Effacer les filtres actifs
    function clearActiveFilters() {
        // Implémenter la logique pour effacer les filtres actifs (à adapter selon votre structure HTML et votre application)
        console.log("Filtres effacés");
    }

    //mise à jour les recettes en fonction des tags actifs
    function updateRecipesWithTags() {
        const tagsContainer = document.getElementById("tags");
        const tags = Array.from(tagsContainer.children).map(
            (element) => element.querySelector("p").textContent
        );
        const query = tags.join(" ");
        mainSearch(query, recipesContainer);
    }

    // Afficher les recettes par défaut
    displayRecipes(recipes, recipesContainer);
});
