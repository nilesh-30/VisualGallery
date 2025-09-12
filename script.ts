const container = document.querySelector('.container');
const input = document.querySelector('input');

// Types
interface fetched {
  name: string,
  id: string,
  imagePath: string,
  workspacePath: string,
  description: string
}

interface itemType {
  items: fetched[]
}

// Variables
let fetchedData: itemType | null = null;

function fetchDataAndRender(): void {
  fetch("https://pbivizedit.com/api/visuals")
    .then((res) => res.json())
    .then((data) => {
      fetchedData = data;
      if (fetchedData) {
        fetchedData.items.forEach((item: fetched) => {
          renderComponent(item);
        })
      }
    })
}

fetchDataAndRender()

function renderComponent(item: fetched): void {
  const galleryItem: HTMLDivElement = document.createElement('div');
  galleryItem.classList.add('items');
  galleryItem.innerHTML = `
    <a title=${item.description} href="#">
      <img src=${item.imagePath} alt=${item.name}>
      <hr>
      <div class="chartName">${item.name}</div>
    </a>
  `;
  container.append(galleryItem);
}

input.addEventListener('input', (e: Event) => {
  const target = e.target as HTMLInputElement
  const value: string = (target.value).toLowerCase();
  search(value);
})

function search(value: string): void {
  if (!fetchedData) return;

  if (value === "") {
    fetchedData.items.forEach((item: fetched) => {
      renderComponent(item);
    })
  }
  else {
    const charts: fetched[] = fetchedData.items.filter((item: fetched) => item.id.indexOf(value) !== -1);
    container.innerHTML = "";
    charts.forEach((item: fetched) => {
      renderComponent(item)
    })
  }
}

