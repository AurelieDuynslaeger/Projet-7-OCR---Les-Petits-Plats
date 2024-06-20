import recipes from "./../data/recipes.js";
import { addTag, displayRecipes, mainSearch } from "./utils/search.js";

document.addEventListener("DOMContentLoaded", () => {
    // Récupération des éléments du DOM
    const recipesContainer = document.getElementById("recipes");
    const inputSearch = document.getElementById("search");
    const searchForm = document.getElementById("search-form");
    const searchIcon = document.getElementById("search-icon");

    // Fonction pour effectuer la recherche et ajouter le tag
    const performSearch = () => {
        const query = inputSearch.value.trim();
        if (query.length >= 3) {
            mainSearch(query, recipesContainer);
            addTag(query);
        }
        // Vider le champ de recherche après la soumission, même si la recherche n'a pas atteint 3 caractères
        inputSearch.value = "";
    };

    // Écouter les soumissions du formulaire
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        performSearch();
    });

    // Écouter le clic sur l'icône de recherche
    if (searchIcon) {
        searchIcon.addEventListener("click", (event) => {
            performSearch();
        });
    }

    // Écouter les entrées de l'utilisateur pour les recherches dynamiques
    inputSearch.addEventListener("input", (event) => {
        const query = event.target.value.trim();
        if (query.length >= 3) {
            mainSearch(query, recipesContainer);
        } else {
            displayRecipes(recipes, recipesContainer);
        }
    });

    // Afficher les recettes par défaut
    displayRecipes(recipes, recipesContainer);
});
