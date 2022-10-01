let producto = localStorage.getItem('prodID')
let infoProductos = "";
const lista= document.getElementById('info');
const relacionados = document.getElementById(`rel`)

document.addEventListener('DOMContentLoaded', async function(){
  var listado= await getJSONData(PRODUCT_INFO_URL + producto + EXT_TYPE);
  infoProductos = listado
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

    lista.innerHTML += `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="${listado.data.images[0]}" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="${listado.data.images[1]}" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="${listado.data.images[2]}" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="${listado.data.images[3]}" class="d-block w-100" alt="...">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
        `

    lista.innerHTML += `<hr><h4>Comentarios:</h4>`
    var calification= await getJSONData(PRODUCT_INFO_COMMENTS_URL + producto + EXT_TYPE);
    infoProductos = calification
    console.log(calification)
    for (let i = 0; i < calification.data.length; i++){
        let user = calification.data[i].user;
        let score = calification.data[i].score;
        let description = calification.data[i].description;
        lista.innerHTML += `<div>
        <p><b>${user}</b></p>
        <p>${showStars(score)}</p>
        <p>${description}</p>
        <hr>
        </div>
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

        relacionados.innerHTML += ` <br>
        <p><b>Productos relacionados:</b></p>`
        for (let i = 0; i < 2; i++) {
            const related = listado.data.relatedProducts[i];
            relacionados.innerHTML += `<div onclick="setProdID(${related.id})">
            <img src="${related.image}">
            <p>${related.name}</p>
            </div>
            `
        }   
        
});
