
const tabla = document.getElementById("tableInfo")

document.addEventListener('DOMContentLoaded', async function(){
    var info= await getJSONData (CART_INFO_URL+ 25801 + EXT_TYPE);
    console.log(info)

    tabla.innerHTML += `<tr>
    <td><img width="100" height="60" src="${info.data.articles[0].image}"></td>
    <td>${info.data.articles[0].name}</td>
    <td>${info.data.articles[0].currency}${info.data.articles[0].unitCost}</td>
    <td><input id="count" type="number" min="1" value="${info.data.articles[0].count}" oninput="subtotal(${info.data.articles[0].unitCost})"></input></td>
    <td>${info.data.articles[0].currency}<span id="multiplication">${info.data.articles[0].unitCost * info.data.articles[0].count}</span></td>
  </tr>
    `
  });

  function subtotal(cost) {
    const count= document.getElementById("count").value;
    const multiplication = document.getElementById("multiplication");

    multiplication.innerHTML = count * cost
    
  }