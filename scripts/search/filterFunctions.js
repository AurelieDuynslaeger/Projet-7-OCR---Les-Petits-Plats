let currentFilters = [];

export function updateActiveFilters() {
    const tagsContainer = document.getElementById("tags");
    currentFilters = Array.from(tagsContainer.children).map(
        (element) => element.querySelector("p").textContent
    );
}

export function clearActiveFilters() {
    currentFilters = [];
}
