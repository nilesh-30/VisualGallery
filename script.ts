// Types
interface VisualItem {
	name: string;
	id: string;
	imagePath: string;
	workspacePath: string;
	description: string;
}

interface VisualItemList {
	items: VisualItem[];
}

// Variables
const container = document.querySelector(".container") as HTMLElement;
const input = document.querySelector("input") as HTMLInputElement;

let fetchedData: VisualItemList | null = null;

// Functions
function fetchDataAndRender(): void {
	fetch("https://pbivizedit.com/api/visuals")
		.then((res) => res.json())
		.then((data) => {
			fetchedData = data;
			if (fetchedData) {
				fetchedData.items.forEach((item: VisualItem) => {
					renderComponent(item);
				})
			}
		})
}

function renderComponent(item: VisualItem): void {
	const galleryItem: HTMLDivElement = document.createElement("div");
	galleryItem.classList.add("items");
	galleryItem.innerHTML = `
    <a title=${item.description} href="#">
      <img src=${item.imagePath} alt=${item.name}>
      <hr>
      <div class="chartName">${item.name}</div>
    </a>
  `;
	container.append(galleryItem);
}

function search(value: string): void {
	if (!fetchedData) return;

	if (value === "") {
		fetchedData.items.forEach((item: VisualItem) => {
			renderComponent(item);
		})
	}
	else {
		const charts: VisualItem[] = fetchedData.items.filter((item: VisualItem) => item.id.includes(value));
		container.innerHTML = "";
		charts.forEach((item: VisualItem) => {
			renderComponent(item);
		})
	}
}

// Event Listeners
input.addEventListener("input", (e: Event) => {
	const target = e.target as HTMLInputElement;
	const value: string = (target.value).toLowerCase();
	search(value);
})

// Function Calls
fetchDataAndRender();