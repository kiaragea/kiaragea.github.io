
const tabla = document.getElementById("tableInfo")
const sub = document.getElementById("sub")
const envio = document.getElementById("envio")
const total = document.getElementById("total")
const premium = document.getElementById("premium")
const express = document.getElementById("express")
const standard = document.getElementById("standard")
const tarjeta = document.getElementById("checkTarjeta")
const transferencia = document.getElementById("checkTransferencia")
const numTarjeta = document.getElementById("numTarj")
const codigoSeg = document.getElementById("codSeg")
const vencimiento = document.getElementById("vencimiento")
const numeroCuenta = document.getElementById("numCuenta")
let porcentajeCheckeado = 0
document.addEventListener('DOMContentLoaded', async function () {
  var info = await getJSONData(CART_INFO_URL + 25801 + EXT_TYPE);
  console.log(info)
  
  tabla.innerHTML += `<tr>
    <td><img width="100" height="60" src="${info.data.articles[0].image}"></td>
    <td>${info.data.articles[0].name}</td>
    <td>${info.data.articles[0].currency}${info.data.articles[0].unitCost}</td>
    <td><input id="count" type="number" min="1" value="${info.data.articles[0].count}" oninput="subtotal(${info.data.articles[0].unitCost})" onchange="costoEnvio(${porcentajeCheckeado})" ></input></td>
    <td>${info.data.articles[0].currency}<span id="multiplication">${info.data.articles[0].unitCost * info.data.articles[0].count}</span></td>
  </tr>
    `
  sub.innerHTML = subtotal(info.data.articles[0].unitCost)


  premium.addEventListener("click", function () {

    if (premium.checked) {
      porcentajeCheckeado = 15
      envio.innerHTML = costoEnvio(porcentajeCheckeado)
      total.innerHTML = costoTotal().toString();
    }
  })
  express.addEventListener("click", function () {
    if (express.checked) {
      porcentajeCheckeado = 7
      envio.innerHTML = costoEnvio(porcentajeCheckeado)
    }
  })
  standard.addEventListener("click", function () {
    if (standard.checked) {
      porcentajeCheckeado = 5

      envio.innerHTML = costoEnvio(porcentajeCheckeado)
    }
  })


  tarjeta.addEventListener("click", function () {
    numeroCuenta.disabled = true
    if (tarjeta.checked = true) {
      numTarjeta.disabled = false
      codigoSeg.disabled = false
      vencimiento.disabled = false
      transferencia.checked = false
    }
  })
  transferencia.addEventListener("click", function () {
    numTarjeta.disabled = true
    codigoSeg.disabled = true
    vencimiento.disabled = true
    tarjeta.checked = false
    if (transferencia.checked = true) {
      numeroCuenta.disabled = false
    }
  })
});

function subtotal(cost) {
  const count = document.getElementById("count").value;
  const multiplication = document.getElementById("multiplication");
  multiplication.innerHTML = count * cost
  sub.innerHTML = count * cost
  if (porcentajeCheckeado > 0)
    envio.innerHTML = costoEnvio(porcentajeCheckeado)
  if (envio.textContent == 0) {
    total.innerHTML = sub.textContent
  }
  else {
    total.innerHTML = costoTotal().toString();
  }

  return count * cost

}

function costoEnvio(porcentaje) {
  if (porcentaje == 5) {
    return sub.textContent * 0.05
  }
  else if (porcentaje == 7) {
    return sub.textContent * 0.07
  }
  else if (porcentaje == 15) {
    return sub.textContent * 0.15
  }
}

function costoTotal() {
  var precio = parseInt(sub.textContent)
  var porcentajeprecio = parseInt(envio.textContent)
  return precio + porcentajeprecio

}


(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      validarEnvios()
      validarModal()
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

function validarEnvios() {
  var checkeado = document.getElementById("premium").checked || document.getElementById("express").checked || document.getElementById("standard").checked
  if (checkeado == true) {
  } else {
    alert("Debe seleccionar una opción de envío")
  }
}
function validarModal() {
  var checkeado = document.getElementById("checkTarjeta").checked || document.getElementById("checkTransferencia").checked
  if (checkeado == true) {
  } else {
    alert("Debe seleccionar una forma de pago")
  }
}


