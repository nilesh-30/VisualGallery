// DOM Elements
const container = document.querySelector(".container");
const input = document.querySelector(".search");
const addButton = document.getElementById("add-button");
const cancelAddButton = document.getElementById("cancel-add");
const cancelEditButton = document.getElementById("cancel-edit");
const addVisualForm = document.getElementById("add-visual-form");
const editVisualForm = document.getElementById("edit-visual-form");
// Variables
const BaseUrl = "http://localhost:8000/visuals";
let visualData = [];
// Functions
async function fetchVisuals() {
    try {
        const response = await fetch(BaseUrl, {
            method: "GET"
        });
        const data = await response.json();
        visualData = data;
        renderVisuals(data);
    }
    catch (error) {
        console.error("Error fetching visuals:", error);
    }
}
function renderVisuals(data) {
    container.innerHTML = "";
    data.forEach((item) => {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("items");
        galleryItem.innerHTML = `
            <a title="${item.description}" href="#">
                <img src="${item.imagePath}" alt="${item.name}">
                <hr>
                <div class="chartName">${item.name}</div>
            </a>
            <button class="edit-button" data-id="${item.id}">Edit</button>
            <button class="delete-button" data-id="${item.id}">Delete</button>
        `;
        container.append(galleryItem);
    });
}
function searchVisuals(value) {
    if (!visualData)
        return;
    if (value === "") {
        renderVisuals(visualData);
    }
    else {
        const charts = visualData.filter((item) => item.id.includes(value));
        container.innerHTML = "";
        renderVisuals(charts);
    }
}
async function addVisual(payload) {
    await fetch(BaseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    fetchVisuals();
}
async function editVisual(id, payload) {
    await fetch(`${BaseUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    fetchVisuals();
}
async function deleteVisual(id) {
    await fetch(`${BaseUrl}/${id}`, {
        method: "DELETE"
    });
    fetchVisuals();
}
// Event Listeners
input.addEventListener("input", (e) => {
    const target = e.target;
    const value = (target.value).toLowerCase();
    searchVisuals(value);
});
addButton.addEventListener("click", () => {
    addVisualForm.style.display = "block";
});
container.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("delete-button")) {
        const deleteButtonId = target.getAttribute("data-id");
        deleteVisual(deleteButtonId);
    }
    if (target.classList.contains("edit-button")) {
        const editButtonId = target.getAttribute("data-id");
        editVisualForm.setAttribute("data-id", editButtonId);
        editVisualForm.style.display = "block";
    }
});
cancelAddButton.addEventListener("click", () => {
    addVisualForm.style.display = "none";
});
cancelEditButton.addEventListener("click", () => {
    editVisualForm.style.display = "none";
});
addVisualForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const visualFormData = new FormData(addVisualForm);
    const payload = {
        name: visualFormData.get("name"),
        id: visualFormData.get("id"),
        imagePath: visualFormData.get("imagePath"),
        description: visualFormData.get("description")
    };
    addVisual(payload);
});
editVisualForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const visualId = editVisualForm.getAttribute("data-id");
    const visualFormData = new FormData(editVisualForm);
    const payload = {
        name: visualFormData.get("name"),
        id: visualFormData.get("id"),
        imagePath: visualFormData.get("imagePath"),
        description: visualFormData.get("description")
    };
    editVisual(visualId, payload);
});
//Function Calls
fetchVisuals();
