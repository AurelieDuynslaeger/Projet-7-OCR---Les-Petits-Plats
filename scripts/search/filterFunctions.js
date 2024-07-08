import { addTag, updateSearch } from "./tagFunctions";


let currentFilters = [];

// Fonction pour initialiser un dropdown avec les événements
export function setupDropdown(dropdownId, selectId) {
    const dropdownButton = document.getElementById(dropdownId);
    const selectContainer = document.getElementById(selectId);
    const input = selectContainer.querySelector(".select-input");
    const options = selectContainer.querySelector(".select-options");

    dropdownButton.addEventListener("click", (event) => {
        event.preventDefault(); // Empêcher la soumission du formulaire
        selectContainer.classList.toggle("hidden");
        input.focus();
    });

    input.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        const allOptions = options.querySelectorAll("li");
        allOptions.forEach(option => {
            const text = option.textContent.toLowerCase();
            if (text.includes(query)) {
                option.classList.remove("hidden");
            } else {
                option.classList.add("hidden");
            }
        });
    });

    options.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            const selectedOption = event.target.textContent;
            addTag(selectedOption); // Fonction à implémenter pour ajouter le tag sélectionné
            updateActiveFilters(); // Fonction à implémenter pour mettre à jour les filtres actifs
            updateSearch(); // Fonction à implémenter pour mettre à jour les recettes avec les tags
            selectContainer.classList.add("hidden");
            input.value = "";
        }
    });
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
