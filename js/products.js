function getHtml(producto) {
    return `
    <div onclick="setProdID(${producto.id})" class="row p-0 overflow-hiden border border-1 border-dark mb-2 cursor-active" data-id="${producto.id}">
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

let categoria = localStorage.getItem ('catID')
let listaProductos = [];
const listado= document.querySelector('.product-list');

document.addEventListener('DOMContentLoaded', async function(){
  var listado= await getJSONData (PRODUCTS_URL+ categoria + EXT_TYPE);
  listaProductos = listado
  showProductsList (listaProductos.data.products)
});

const ORDER_ASC_BY_COST = "Precio asc."
const ORDER_DESC_BY_COST = "Precio desc."
const ORDER_BY_PROD_SOLDCOUNT = "Relevancia";
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            let asoldCount = parseInt(a.soldCount);
            let bsoldCount = parseInt(b.soldCount);

            if ( asoldCount > bsoldCount ){ return -1; }
            if ( asoldCount < bsoldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}




function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){

            htmlContentToAppend += getHtml(product)
        }

        listado.innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria){
    currentSortCriteria = sortCriteria;
 
    array = sortProducts(currentSortCriteria, listaProductos.data.products);

    showProductsList(array);
}

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList(listaProductos.data.products);
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList(listaProductos.data.products);
    });

    


