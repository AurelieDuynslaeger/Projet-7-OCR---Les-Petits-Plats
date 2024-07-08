import { updateActiveFilters, applyFilters } from "./searchFunctions.js";
import { displayRecipes } from "./displayFunctions.js";
import { searchTag } from "../templates/tag.js";


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


export function updateSearch() {
    const tagsContainer = document.getElementById("tags");
    const tags = Array.from(tagsContainer.children).map(
        (element) => element.querySelector("p").textContent
    );
    updateActiveFilters(tags);
    applyFilters(tags, document.getElementById("recipes"));
}