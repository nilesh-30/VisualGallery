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

function fetchDataAndRender() {
  fetch("https://pbivizedit.com/api/visuals")
    .then((res) => res.json())
    .then((data) => {
      // console.log("starting", data)
      data.items.forEach((item) => {
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
    fetchDataAndRender();
  }
  else {
    fetch("https://pbivizedit.com/api/visuals")
      .then(res => res.json())
      .then((data) => {
        const charts = data.items.filter(item => item.id.includes(value));
        // console.log(charts)
        container.innerHTML = "";
        charts.forEach((item) => {
          renderComponent(item)
        })
      })
  }
}

