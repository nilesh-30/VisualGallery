const container = document.querySelector('.container');

fetch("https://pbivizedit.com/api/visuals")
.then((res) => res.json())
.then((data) => {
  data.items.forEach((item) => {
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
  })
})
