const URL = `https://japceibal.github.io/emercado-api/cats_products/101.json`

function getHtml(producto) {
    return `
    <div class="row p-0 overflow-hiden border border-1 border-dark mb-2" data-id="${producto.id}">
            <div class="col-3 p-0">
              <img class="img-fluid" src="${producto.image}" alt="">
            </div>
            <div class="col-9 d-flex flex-column justify-content-between">
              <div class="productoBody">
                <h3>${producto.name}</h3>
                <p>${producto.description}</p>
              </div>
              <div class="productoFooter d-flex justify-content-between">
                <p>Cantidad de vendidos: <span class="cant">${producto.soldCount}</span></p>
                <div class="precio">
                  <span class="moneda">${producto.currency}</span>
                  <span class="precio">${producto.cost}</span>
                </div>
              </div>
            </div>
          </div>
    `
}

document.addEventListener("DOMContentLoaded", async function(){
    const listado = document.querySelector(".product-list");

    const listaAutos = await getJSONData(URL);

    listaAutos.data.products.forEach(auto => {
      listado.innerHTML += getHtml(auto)
    });
})
