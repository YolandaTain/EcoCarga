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

function recopilarDatos() {
    var formulario = document.getElementById("miFormulario");
    var formData = new FormData(formulario);
    var nombre = formData.get("nombre");
    var email = formData.get("email");
    var fechaNac = formData.get("fechaNac");
    var puntoPartida = formData.get("puntoPartida");
    var puntoDestino = formData.get("puntoDestino");
    var fechaInicio = formData.get("fechaInicio");
    var fechaFin = formData.get("fechaFin");
    var autonomia = formData.get("autonomia");
    var tipoCoche = formData.get("tipoCoche");
    var numPasajeros = formData.get("numPasajeros");
    var velocidadCargaAlta = formData.get("velocidadCarga");
    var restaurantes = formData.get("preferenciasActividades[]");

    /*var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var fechaNac = document.getElementById("fechaNac").value;

    var puntoPartida = document.getElementById("puntoPartida").value;
    var puntoDestino = document.getElementById("puntoDestino").value;
    var fechaInicio = document.getElementById("fechaInicio").value;
    var fechaFin = document.getElementById("fechaFin").value;
    var autonomia = document.getElementById("autonomia").value;
    var tipoCoche = document.getElementById("tipoCoche").value;
    var numPasajeros = document.getElementById("numPasajeros").value;
    var velocidadCargaAlta = document.getElementById("velocidadCargaAlta").value;

    var restaurantes = document.getElementById("restaurantes").value;
    var puntosInteres = document.getElementById("puntosInteres").value;
    var bares = document.getElementById("bares").value;
    var centrosComerciales = document.getElementById("centrosComerciales").value;
    var parques = document.getElementById("parques").value;
    var museos = document.getElementById("museos").value;*/

}

function mostrarResumenModal(nombre, email, fechaNac, puntoPartida, puntoDestino, fechaInicio, fechaFin, autonomia, tipoCoche, numPasajeros, velocidadCargaAlta, restaurantes, puntosInteres, bares, centrosComerciales, parques, museos) {
    var modalBody = document.querySelector("#resumenItinerario .modal-body");

    // Limpia el contenido previo del modal
    modalBody.innerHTML = "";

    // Agrega los datos al modal
    modalBody.innerHTML += "<strong>Nombre:</strong> " + nombre + "<br>";
    modalBody.innerHTML += "<strong>Email:</strong> " + email + "<br>";
    modalBody.innerHTML += "<strong>Fecha de Nacimiento:</strong> " + fechaNac + "<br>";

    // Agrega los otros datos del formulario 1
    modalBody.innerHTML += "<strong>Punto de Partida:</strong> " + puntoPartida + "<br>";
    modalBody.innerHTML += "<strong>Punto de Destino:</strong> " + puntoDestino + "<br>";
    modalBody.innerHTML += "<strong>Fecha de Inicio:</strong> " + fechaInicio + "<br>";
    modalBody.innerHTML += "<strong>Fecha de Fin:</strong> " + fechaFin + "<br>";
    modalBody.innerHTML += "<strong>Autonomía del Coche:</strong> " + autonomia + "<br>";
    modalBody.innerHTML += "<strong>Tipo de Coche:</strong> " + tipoCoche + "<br>";
    modalBody.innerHTML += "<strong>Número de Pasajeros:</strong> " + numPasajeros + "<br>";
    modalBody.innerHTML += "<strong>Velocidad de Carga Alta:</strong> " + velocidadCargaAlta + "<br>";

    // Agrega los otros datos del formulario 2
    modalBody.innerHTML += "<strong>Restaurantes:</strong> " + restaurantes + "<br>";
    modalBody.innerHTML += "<strong>Puntos de Interés:</strong> " + puntosInteres + "<br>";
    modalBody.innerHTML += "<strong>Bares:</strong> " + bares + "<br>";
    modalBody.innerHTML += "<strong>Centros Comerciales:</strong> " + centrosComerciales + "<br>";
    modalBody.innerHTML += "<strong>Parques:</strong> " + parques + "<br>";
    modalBody.innerHTML += "<strong>Museos:</strong> " + museos + "<br>";

    // Abre el modal
    var modal = new bootstrap.Modal(document.getElementById("resumenItinerario"));
    modal.show();

    var botonSiguiente1 = document.getElementById("siguiente-button1");
    botonSiguiente1.addEventListener("click", recopilarDatos);
    var botonSiguiente2 = document.getElementById("siguiente-button2");
    botonSiguiente2.addEventListener("click", recopilarDatos);
    var botonSiguiente3 = document.getElementById("siguiente-button3");
    botonSiguiente3.addEventListener("click", recopilarDatos);
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
    //} else {
    //alert("Por favor, completa todos los campos requeridos.");
    //}
    recopilarDatos();
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







