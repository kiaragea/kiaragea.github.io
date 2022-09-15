let producto = localStorage.getItem('prodID')
let infoProductos = "";
const lista= document.getElementById('info');

document.addEventListener('DOMContentLoaded', async function(){
  var listado= await getJSONData(PRODUCT_INFO_URL + producto + EXT_TYPE);
  infoProductos = listado
  console.log(listado)
  const name = listado.data.name;
  const currency = listado.data.currency;
  const cost = listado.data.cost;
  const description = listado.data.description;
  const category = listado.data.category;
  const soldCount = listado.data.soldCount;

  lista.innerHTML += `
  <div class=""><h3><b>${name}</b></h3>
  </div>
    <hr>
    <p><b>Precio:</b></p>
    <p>${currency} ${cost}</p>
    <p><b>Descripción:</b></p>
    <p>${description}</p>
    <p><b>Categoría:</b></p>
    <p>${category}</p>
    <p><b>Cantidad de vendidos:</b></p>
    <p>${soldCount}</p>
    <p><b>Imágenes ilustrativas:</b></p>
  `

  for (let i = 0; i < 4; i++) {
    const images = listado.data.images[i];
    lista.innerHTML += `
    <div class="h-100 mb-2">
        <img src="${images}" >
        </div>
        `}

        lista.innerHTML += `<hr><h4>Comentarios:</h4>`
        var calification= await getJSONData(PRODUCT_INFO_COMMENTS_URL + producto + EXT_TYPE);
        infoProductos = calification
        console.log(calification)
    
        for (let i = 0; i < 10; i++){
            let user = calification.data[i].user;
            let score = calification.data[i].score;
            let description = calification.data[i].description;
            lista.innerHTML += `
            <p><b>${user}</b></p>
            <p>${showStars(score)}</p>
            <p>${description}</p>
            <hr>
            `
        }
    
        function showStars(score){
            
            if (score == 1) {
                return `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`
            }
            else if (score == 2) {
                return `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`
            }
            else if (score == 3){
                return `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`
            }
            else if (score == 4){
                return `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>`
            }
            else if (score == 5){
                return `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>`
            }
            else {
                return `
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`
            }
        }

});

// document.addEventListener('DOMContentLoaded', async function(){
    
// })