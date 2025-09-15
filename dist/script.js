// Variables
const container = document.querySelector(".container");
const input = document.querySelector("input");
let fetchedData = null;
// Functions
function fetchDataAndRender() {
    fetch("https://pbivizedit.com/api/visuals")
        .then((res) => res.json())
        .then((data) => {
        fetchedData = data;
        if (fetchedData) {
            fetchedData.items.forEach((item) => {
                renderComponent(item);
            });
        }
    });
}
function renderComponent(item) {
    const galleryItem = document.createElement("div");
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
function search(value) {
    if (!fetchedData)
        return;
    if (value === "") {
        fetchedData.items.forEach((item) => {
            renderComponent(item);
        });
    }
    else {
        const charts = fetchedData.items.filter((item) => item.id.includes(value));
        container.innerHTML = "";
        charts.forEach((item) => {
            renderComponent(item);
        });
    }
}
// Event Listeners
input.addEventListener("input", (e) => {
    const target = e.target;
    const value = (target.value).toLowerCase();
    search(value);
});
// Function Calls
fetchDataAndRender();
