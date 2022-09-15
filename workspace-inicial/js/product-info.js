/* function getHtml(product) {
    return `
    <div class=""><h3><b>${product.name}</b></h3>
    </div>
      <hr>
      <p><b>Precio</b></p>
      <p>${product.cost}</p>
      <p><b>Descripción</b></p>
      <p>${product.description}</p>
      <p><b>Categoría</b></p>
      <p>product.categorie</p>
      <p><b>Cantidad de vendidos</b></p>
      <p>${product.SoldCount}</p>
      <p><b>Imágenes ilustrativas</b></p>
      <div class="col">
        <div class="card h-100 mb-2 shadow-sm">
          <img src="${product.images}"/>
      </div>
    `
} */

let producto = localStorage.getItem('prodID')
console.log(producto)
let infoProductos = "";
const lista= document.getElementById('info');

document.addEventListener('DOMContentLoaded', async function(){
  var listado= await getJSONData(PRODUCT_INFO_URL + producto + EXT_TYPE);
  infoProductos = listado
  lista.innerhtml += `
  <div class=""><h3><b>${producto.name}</b></h3>
  </div>
    <hr>
    <p><b>Precio</b></p>
    <p>${producto.cost}</p>
    <p><b>Descripción</b></p>
    <p>${producto.description}</p>
    <p><b>Categoría</b></p>
    <p>product.categorie</p>
    <p><b>Cantidad de vendidos</b></p>
    <p>${producto.SoldCount}</p>
    <p><b>Imágenes ilustrativas</b></p>
    <div class="col">
      <div class="card h-100 mb-2 shadow-sm">
        <img src="${producto.images[0]}"/>
    </div>
  `
});