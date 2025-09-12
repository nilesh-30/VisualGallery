var container = document.querySelector('.container');
var input = document.querySelector('input');
// Variables
var fetchedData = null;
function fetchDataAndRender() {
    fetch("https://pbivizedit.com/api/visuals")
        .then(function (res) { return res.json(); })
        .then(function (data) {
        fetchedData = data;
        if (fetchedData) {
            fetchedData.items.forEach(function (item) {
                renderComponent(item);
            });
        }
    });
}
fetchDataAndRender();
function renderComponent(item) {
    var galleryItem = document.createElement('div');
    galleryItem.classList.add('items');
    galleryItem.innerHTML = "\n    <a title=".concat(item.description, " href=\"#\">\n      <img src=").concat(item.imagePath, " alt=").concat(item.name, ">\n      <hr>\n      <div class=\"chartName\">").concat(item.name, "</div>\n    </a>\n  ");
    container.append(galleryItem);
}
input.addEventListener('input', function (e) {
    var target = e.target;
    var value = (target.value).toLowerCase();
    search(value);
});
function search(value) {
    if (!fetchedData)
        return;
    if (value === "") {
        fetchedData.items.forEach(function (item) {
            renderComponent(item);
        });
    }
    else {
        var charts = fetchedData.items.filter(function (item) { return item.id.indexOf(value) !== -1; });
        container.innerHTML = "";
        charts.forEach(function (item) {
            renderComponent(item);
        });
    }
}
