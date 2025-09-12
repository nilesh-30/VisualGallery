const container = document.querySelector('.container');
const input = document.querySelector('input');

function renderComponent(item) {
  const galleryItem = document.createElement('div');
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

let fetchedData = null;

function fetchDataAndRender() {
  fetch("https://pbivizedit.com/api/visuals")
    .then((res) => res.json())
    .then((data) => {
      fetchedData = data;
      fetchedData.items.forEach((item) => {
        renderComponent(item);
      })
    })
}

fetchDataAndRender()

input.addEventListener('input', (e) => {
  const value = (e.target.value).toLowerCase();
  search(value);
  console.log(value, typeof value)
})

function search(value) {
  if (value === "") {
    fetchedData.items.forEach((item) => {
      renderComponent(item);
    })
  }
  else {
    const charts = fetchedData.items.filter(item => item.id.includes(value));
    container.innerHTML = "";
    charts.forEach((item) => {
      renderComponent(item)
    })
  }
}

