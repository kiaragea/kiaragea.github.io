const email = document.getElementById("email");
const contra = document.getElementById("pass");
const boton = document.getElementById("button");

boton.addEventListener(`click`, (e) => {
    e.preventDefault();
    const data = {
        email: email.value,
        contra: contra.value,
    };
    if (email.value !== "" && contra.value !== ""){
        window.location.replace("home.html");
    } else {
        alert ("Todos los campos son obligatorios");
    }
    console.log(data);
})