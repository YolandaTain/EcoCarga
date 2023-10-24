document.addEventListener("DOMContentLoaded", inicio);

function inicio() {
    mostrarFormulario(1);
}

function volverHome() {
    window.open("/Modulos/Home/home.html", "_self");
}

function desplegar() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
        menu.classList.remove("scale-up-hor-right");
        menu.classList.add("scale-up-hor-left");
    } else {
        menu.style.display = "block";
        menu.classList.remove("scale-up-hor-left");
        menu.classList.add("scale-up-hor-right");
    }
}

function mostrarFormulario(numero) {
    // Oculta todos los formularios
    var formularios = document.querySelectorAll(".formulario");
    formularios.forEach(function (formulario) {
        formulario.style.display = "none";
    });

    // Muestra el formulario deseado
    var formularioActual = document.getElementById("formularioPagina" + numero);
    formularioActual.style.display = "block";

}

function siguiente(numero) {
    var formulario = document.getElementById("formularioPagina" + numero);
    //var formulario2 = document.getElementById('miFormulario');
    //if (formulario2.checkValidity()) {
    if (formulario) {
        mostrarFormulario(numero);
    } else {
        alert("No hay más formularios disponibles.");
    }
    //} //else {
    //alert("Por favor, completa todos los campos requeridos.");
    //}
}

function volver(numero) {
    if (numero > 0) {
        mostrarFormulario(numero);
    } else {
        alert("No puedes retroceder más.");
    }
}

function procesoFinalizado() {
    alert("Itinerario enviado, disfrute!")
    window.open("/Modulos/Home/home.html", "_self");
}







