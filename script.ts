// Interface and Types
interface VisualEntry {
	name: string;
	id: string;
	imagePath: string;
	workspacePath?: string;
	description: string;
}

// DOM Elements
const container = document.querySelector(".container") as HTMLElement;
const input = document.querySelector(".search") as HTMLInputElement;
const addButton = document.getElementById("add-button") as HTMLButtonElement;
const cancelAddButton = document.getElementById("cancel-add") as HTMLButtonElement;
const cancelEditButton = document.getElementById("cancel-edit") as HTMLButtonElement;
const addVisualForm = document.getElementById("add-visual-form") as HTMLFormElement;
const editVisualForm = document.getElementById("edit-visual-form") as HTMLFormElement;

// Variables
const BaseUrl: string = "http://localhost:8000/visuals";
let visualData: VisualEntry[] = [];

// Functions
async function fetchVisuals(): Promise<void> {
    try {
        const response = await fetch(BaseUrl, {
            method: "GET"
        });
        const data: VisualEntry[] = await response.json();
        visualData = data;
        renderVisuals(data);
    } catch (error) {
        console.error("Error fetching visuals:", error);
    }
}

function renderVisuals(data: VisualEntry[]): void {
    container.innerHTML = "";
    data.forEach((item: VisualEntry) => {
        const galleryItem: HTMLDivElement = document.createElement("div");
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

function searchVisuals(value: string): void {
    if (!visualData)
        return;

    if (value === "") {
        renderVisuals(visualData);

    } else {
        const charts: VisualEntry[] = visualData.filter((item: VisualEntry) => item.id.includes(value));
        container.innerHTML = "";
        renderVisuals(charts);
    }
}

async function addVisual(payload: VisualEntry) {
    await fetch(BaseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    fetchVisuals();
}

async function editVisual(id: string, payload: VisualEntry) {
    await fetch(`${BaseUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    fetchVisuals();
}

async function deleteVisual(id: string): Promise<void> {
	await fetch(`${BaseUrl}/${id}`, {
        method: "DELETE"
    });

    fetchVisuals();
}

// Event Listeners
input.addEventListener("input", (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = (target.value).toLowerCase();
    searchVisuals(value);
});

addButton.addEventListener("click", () => {
    addVisualForm.style.display = "block";
});

container.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLButtonElement;
    
    if (target.classList.contains("delete-button")) {
        const deleteButtonId: string = target.getAttribute("data-id");
        deleteVisual(deleteButtonId);
    }

    if (target.classList.contains("edit-button")) {
        const editButtonId: string = target.getAttribute("data-id");
        editVisualForm.setAttribute("data-id", editButtonId);
        editVisualForm.style.display = "block";
    }
})

cancelAddButton.addEventListener("click", () => {
    addVisualForm.style.display = "none";
});

cancelEditButton.addEventListener("click", () => {
    editVisualForm.style.display = "none"
})

addVisualForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const visualFormData: FormData = new FormData(addVisualForm);
    
    const payload: VisualEntry = {
        name: visualFormData.get("name") as string,
        id: visualFormData.get("id") as string,
        imagePath: visualFormData.get("imagePath") as string,
        description: visualFormData.get("description") as string
    };

    addVisual(payload);

})

editVisualForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    
    const visualId: string = editVisualForm.getAttribute("data-id");

    const visualFormData: FormData = new FormData(editVisualForm);

    const payload: VisualEntry = {
        name: visualFormData.get("name") as string,
        id: visualFormData.get("id") as string,
        imagePath: visualFormData.get("imagePath") as string,
        description: visualFormData.get("description") as string
    };
    
    editVisual(visualId, payload);
    
})

//Function Calls
fetchVisuals();
