import { applyFilters } from "./searchFunctions.js";
import { updateActiveFilters } from "./filterFunctions.js";
import { searchTag } from "../templates/tag.js";

export function addTag(tag) {
    const tagsContainer = document.getElementById("tags");
    const lowerTag = tag.toLowerCase();
    const existingTag = Array.from(tagsContainer.children).find(
        (element) => element.querySelector("p").textContent === lowerTag
    );

    if (!existingTag) {
        const tagHTML = searchTag(lowerTag);
        tagsContainer.innerHTML += tagHTML;

        const tagElements = tagsContainer.querySelectorAll(".tag");
        tagElements.forEach(tagElement => {
            tagElement.querySelector("i").addEventListener("click", () => {
                tagElement.remove();
                updateSearch();
            });
        });

        updateActiveFilters(Array.from(tagsContainer.children).map(
            (element) => element.querySelector("p").textContent.toLowerCase()
        ));
    }
}


export function updateSearch() {
    const tagsContainer = document.getElementById("tags");
    const tags = Array.from(tagsContainer.children).map(
        (element) => element.querySelector("p").textContent.toLowerCase()
    );
    updateActiveFilters(tags);
    applyFilters(tags, document.getElementById("recipes"));
}



