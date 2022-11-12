const primerNombre = document.getElementById("primerNombre")
const segundoNombre = document.getElementById("segundoNombre")
const primerApellido = document.getElementById("primerApellido")
const segundoApellido = document.getElementById("segundoApellido")
const eMail = document.getElementById("eMail")
const telefono = document.getElementById("telefono")
const guardar = document.getElementById("guardar")

if (!localStorage.getItem("email")) {
    window.location = "index.html"
} else {
    eMail.value = localStorage.getItem("email")
}


(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
            let datosUsuario = {
                primerNombre: primerNombre.value,
                segundoNombre: segundoNombre.value,
                primerApellido: primerApellido.value,
                segundoApellido: segundoApellido.value,
                telefono: telefono.value
            }
            localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario))
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  if (localStorage.getItem("datosUsuario")){
    let datosGuardados = JSON.parse(localStorage.getItem("datosUsuario"))
    console.log(datosGuardados)
    primerNombre.value = datosGuardados.primerNombre
    segundoNombre.value = datosGuardados.segundoNombre
    primerApellido.value = datosGuardados.primerApellido
    segundoApellido.value = datosGuardados.segundoApellido
    telefono.value = datosGuardados.telefono
  }