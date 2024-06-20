
### Schéma Algorithmique

1. Initialisation
    - Charger les recettes depuis le fichier `recipes.js`.
    - Afficher toutes les recettes sur la page lors du chargement initial.

2. Écoute des Événements
    - Ajouter un écouteur d'événements pour l'input de recherche.
    - Ajouter un écouteur d'événements pour le formulaire de recherche (submit).

3. Gestion de la Recherche
    - Lorsqu'une entrée est détectée dans le champ de recherche :
        - Si la longueur de la requête est inférieure à 3 caractères :
            - Afficher toutes les recettes.
        - Si la longueur de la requête est supérieure ou égale à 3 caractères :
            - Filtrer les recettes en fonction de la requête.
            - Afficher les recettes filtrées.
            - Mettre à jour les filtres dynamiques (ingrédients, appareils, ustensiles).

4. Filtrage des Recettes
    - Convertir la requête en minuscules pour une comparaison insensible à la casse.
    - Pour chaque recette :
        - Vérifier si le nom de la recette contient la requête.
        - Vérifier si la description de la recette contient la requête.
        - Vérifier si un ingrédient de la recette contient la requête.
    - Retourner les recettes qui correspondent à l'une des conditions ci-dessus.

5. Affichage des Recettes
    - Vider le conteneur des recettes.
    - Pour chaque recette filtrée :
        - Générer le HTML de la carte de recette.
        - Ajouter la carte de recette au conteneur.

6. Mise à Jour des Filtres Dynamiques
    - Initialiser trois tableaux : ingrédients, appareils, ustensiles.
    - Pour chaque recette filtrée :
        - Ajouter les ingrédients au tableau des ingrédients.
        - Ajouter l'appareil au tableau des appareils.
        - Ajouter les ustensiles au tableau des ustensiles.
    - Supprimer les doublons dans chaque tableau.
    - Mettre à jour les sélecteurs HTML pour les ingrédients, appareils et ustensiles avec les valeurs uniques.


```pseudocode
BEGIN
    LOAD recipes from "recipes.js"
    DISPLAY all recipes

    ADD event listener to inputSearch
    ADD event listener to searchForm

    FUNCTION handleSearchEvent(event)
        query = event.target.value
        IF query.length < 3 THEN
            DISPLAY all recipes
        ELSE
            filteredRecipes = FILTER recipes WHERE recipe matches query
            DISPLAY filteredRecipes
            UPDATE filters with filteredRecipes
        END IF
    END FUNCTION

    FUNCTION filterRecipes(query)
        filteredRecipes = []
        FOR EACH recipe IN recipes DO
            IF recipe.name CONTAINS query OR
               recipe.description CONTAINS query OR
               ANY ingredient.ingredient CONTAINS query THEN
                ADD recipe TO filteredRecipes
            END IF
        END FOR
        RETURN filteredRecipes
    END FUNCTION

    FUNCTION displayRecipes(recipes, container)
        CLEAR container
        FOR EACH recipe IN recipes DO
            cardHtml = GENERATE recipeCard(recipe)
            ADD cardHtml TO container
        END FOR
    END FUNCTION

    FUNCTION updateFilters(filteredRecipes)
        ingredients = []
        appliances = []
        ustensils = []

        FOR EACH recipe IN filteredRecipes DO
            FOR EACH ingredient IN recipe.ingredients DO
                ADD ingredient.ingredient TO ingredients
            END FOR
            ADD recipe.appliance TO appliances
            FOR EACH ustensil IN recipe.ustensils DO
                ADD ustensil TO ustensils
            END FOR
        END FOR

        ingredients = REMOVE_DUPLICATES(ingredients)
        appliances = REMOVE_DUPLICATES(appliances)
        ustensils = REMOVE_DUPLICATES(ustensils)

        updateSelect("ingredients-select", ingredients)
        updateSelect("appliances-select", appliances)
        updateSelect("ustensils-select", ustensils)
    END FUNCTION

    FUNCTION updateSelect(selectId, options)
        CLEAR selectElement
        FOR EACH option IN options DO
            CREATE optionElement
            SET optionElement.value = option
            SET optionElement.textContent = option
            ADD optionElement TO selectElement
        END FOR
    END FUNCTION
END
```

Pour représenter ce pseudocode sous forme d'algorigramme, nous allons créer un schéma étape par étape qui visualise le flux logique du programme. L'algorigramme (ou flowchart) sera composé de différentes formes pour représenter les différentes actions et décisions.

Voici une description du schéma en mots avant de le transformer en image :

1. **Début** (Oval)
2. **Charger les recettes depuis "recipes.js"** (Rectangle)
3. **Afficher toutes les recettes** (Rectangle)
4. **Ajouter un écouteur d'événements à `inputSearch`** (Rectangle)
5. **Ajouter un écouteur d'événements à `searchForm`** (Rectangle)
6. **Déclaration de la fonction `handleSearchEvent`** (Sous-programme)
    - **Obtenir la requête depuis `event.target.value`** (Rectangle)
    - **Condition : `query.length < 3`** (Diamant)
        - Oui : **Afficher toutes les recettes** (Rectangle)
        - Non : **Filtrer les recettes qui correspondent à la requête** (Rectangle)
        - **Afficher les recettes filtrées** (Rectangle)
        - **Mettre à jour les filtres avec les recettes filtrées** (Rectangle)
7. **Déclaration de la fonction `filterRecipes`** (Sous-programme)
    - **Initialiser `filteredRecipes`** (Rectangle)
    - **Pour chaque recette dans `recipes`** (Boucle)
        - **Condition : `recipe.name`, `recipe.description`, ou un ingrédient contient la requête** (Diamant)
            - Oui : **Ajouter la recette à `filteredRecipes`** (Rectangle)
    - **Retourner `filteredRecipes`** (Rectangle)
8. **Déclaration de la fonction `displayRecipes`** (Sous-programme)
    - **Effacer le conteneur** (Rectangle)
    - **Pour chaque recette dans `recipes`** (Boucle)
        - **Générer `recipeCard` et l'ajouter au conteneur** (Rectangle)
9. **Déclaration de la fonction `updateFilters`** (Sous-programme)
    - **Initialiser `ingredients`, `appliances`, `ustensils`** (Rectangle)
    - **Pour chaque recette dans `filteredRecipes`** (Boucle)
        - **Ajouter les ingrédients, l'appareil, et les ustensiles à leurs listes respectives** (Rectangle)
    - **Supprimer les doublons dans les listes** (Rectangle)
    - **Mettre à jour les sélecteurs** (Rectangle)
10. **Déclaration de la fonction `updateSelect`** (Sous-programme)
    - **Effacer l'élément de sélection** (Rectangle)
    - **Pour chaque option dans `options`** (Boucle)
        - **Créer et ajouter `optionElement` au sélecteur** (Rectangle)
11. **Fin** (Oval)


