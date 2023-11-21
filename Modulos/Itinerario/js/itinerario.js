document.addEventListener("DOMContentLoaded", inicio);
var comprobarEmail = false
var comprobarFecha = false
//Sirve para que, de inicio, se muestre el formulario 1, ya que el 2 y el 3
//están escondidos inicialmente
function inicio() {
    mostrarFormulario(1);
}

//Si pinchas en la imagen superior izquierda, vuelves al home
function volverHome() {
    window.open("/Modulos/Home/home.html", "_self");
}

//Permite que se avance al siguiente formulario
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

//Recoge los datos introducidos por el usuario en el formulario 1
function recopilarDatosFormulario1() {
    var formulario1 = document.getElementById("miFormulario1");
    var formData = new FormData(formulario1);
    var nombre = formData.get("nombre");
    var email = formData.get("email");
    var fechaNac = formData.get("fechaNac");

    return {
        nombre: nombre,
        email: email,
        fechaNac: fechaNac,
    };
}

//Recoge los datos introducidos por el usuario en el formulario 2
function recopilarDatosFormulario2() {
    var formulario2 = document.getElementById("miFormulario2");
    var formData = new FormData(formulario2);
    var puntoPartida = formData.get("puntoPartida");
    var puntoDestino = formData.get("puntoDestino");
    var fechaInicio = formData.get("fechaInicio");
    var fechaFin = formData.get("fechaFin");
    var autonomia = formData.get("autonomia");
    var tipoCoche = formData.get("tipoCoche");
    var numPasajeros = formData.get("numPasajeros");
    var velocidadCargaAlta = formData.get("velocidadCarga");

    return {
        puntoPartida: puntoPartida,
        puntoDestino: puntoDestino,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        autonomia: autonomia,
        tipoCoche: tipoCoche,
        numPasajeros: numPasajeros,
        velocidadCargaAlta: velocidadCargaAlta,
    };
}

//Recoge los datos introducidos por el usuario en el formulario 3
function recopilarDatosFormulario3() {
    var formulario3 = document.getElementById("miFormulario3");
    var formData = new FormData(formulario3);
    var preferencias = document.querySelectorAll("input[name='preferenciasActividades[]']:checked");
    var preferenciasText = [];

    //Introduce en el array anterior las elecciones del usuario.
    for (var i = 0; i < preferencias.length; i++) {
        preferenciasText.push(preferencias[i].value);
    }

    return {
        preferenciasActividades: preferenciasText,
    };
}

//Añade al modal todos los datos recopilados
function mostrarResumenModal() {
    var datosFormulario1 = recopilarDatosFormulario1();
    var datosFormulario2 = recopilarDatosFormulario2();
    var datosFormulario3 = recopilarDatosFormulario3();

    // Limpia el contenido previo del modal
    var modalBody = document.querySelector("#resumenItinerario .modal-body");
    modalBody.innerHTML = "";

    // Agrega los datos al modal
    modalBody.innerHTML = "<strong>Nombre:</strong> " + datosFormulario1.nombre + "<br>";
    modalBody.innerHTML += "<strong>Email:</strong> " + datosFormulario1.email + "<br>";
    modalBody.innerHTML += "<strong>Fecha de Nacimiento:</strong> " + datosFormulario1.fechaNac + "<br>";

    // Agrega los otros datos del formulario 2
    modalBody.innerHTML += "<strong>Punto de Partida:</strong> " + datosFormulario2.puntoPartida + "<br>";
    modalBody.innerHTML += "<strong>Punto de Destino:</strong> " + datosFormulario2.puntoDestino + "<br>";
    modalBody.innerHTML += "<strong>Fecha de Inicio:</strong> " + datosFormulario2.fechaInicio + "<br>";
    modalBody.innerHTML += "<strong>Fecha de Fin:</strong> " + datosFormulario2.fechaFin + "<br>";
    modalBody.innerHTML += "<strong>Autonomía del Coche:</strong> " + datosFormulario2.autonomia + "<br>";
    modalBody.innerHTML += "<strong>Tipo de Coche:</strong> " + datosFormulario2.tipoCoche + "<br>";
    modalBody.innerHTML += "<strong>Número de Pasajeros:</strong> " + datosFormulario2.numPasajeros + "<br>";
    modalBody.innerHTML += "<strong>Velocidad de Carga Alta:</strong> " + datosFormulario2.velocidadCargaAlta + "<br>";

    // Agrega los otros datos del formulario 3
    modalBody.innerHTML += "<strong>Preferencias de Actividades:</strong> " + datosFormulario3.preferenciasActividades.join(', ') + "<br>";

    // Abre el modal
    var modal = new bootstrap.Modal(document.getElementById("resumenItinerario"));
    modal.show();

    var enviarEmailBtn = document.getElementById('enviarEmailBtn');

    
    enviarEmailBtn.addEventListener('click', function () {

        var mailtoLink = 'mailto:destinatario@ejemplo.com?subject=Solicitud%20de%20datos';
        window.location.href = mailtoLink;
    });
}

//Se organiza la recopilación de datos por formulario y permite avanzar al siguiente
function siguiente(numero) {

    var formulario = document.getElementById("miFormulario1");
    var formulario2 = document.getElementById('miFormulario2');
    var formulario3 = document.getElementById('miFormulario3');
    //Tengo que comprobar que la fecha y email son correctos antes de que me permita pasar al siguiente formulario, así que los englobo en variables y hago el condicional.
    var checkEmail = validarEmail();
    var checkFecha = validarFechaNac();
    //Tengo que comprobar que no inicia el viaje después de cuando lo acaba.
    var checkFechaInicioyFin = validarFechaInicioyFin();

    if (checkEmail && checkFecha) {
        if (numero === "2") {
            // Llama a la función para recopilar los datos del formulario 1
            recopilarDatosFormulario1();
            if (formulario.checkValidity()) {
                mostrarFormulario(numero);
            } else {
                mostrarModalError("Por favor, completa todos los campos requeridos.")
                //alert("Por favor, completa todos los campos requeridos.");
            }
        } else if (checkFechaInicioyFin) {
            if (numero === "3") {
                // Llama a la función para recopilar los datos del formulario 2
                recopilarDatosFormulario2();
                if (formulario2.checkValidity()) {
                    mostrarFormulario(numero);
                } else {
                    mostrarModalError("Por favor, completa todos los campos requeridos.")
                    //alert("Por favor, completa todos los campos requeridos.");
                }
            } else if (numero === "3") {
                // Llama a la función para recopilar los datos del formulario 3
                recopilarDatosFormulario3();

                if (formulario3.checkValidity()) {
                    mostrarFormulario(numero);
                } else {
                    mostrarModalError("Por favor, completa todos los campos requeridos.")
                    //alert("Por favor, completa todos los campos requeridos.");
                }
            }
        }
    }
}
//Permite volver al formulario anterior
function volver(numero) {
    if (numero > 0) {
        mostrarFormulario(numero);
    } else {
        alert("No puedes retroceder más.");
    }
}

function mostrarModalError(mensaje) {
    var modalErrorMessage = document.getElementById("modalErrorMessage");
    modalErrorMessage.innerText = mensaje;

    var myModal = new bootstrap.Modal(document.querySelector('.bd-example-modal-sm'));
    myModal.show();
}

function validarEmail() {
    var email = document.getElementById("email").value;
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(email) == false) {
        //alert("Email no válido. Por favor, introduce un email válido.");
        mostrarModalError("Email no válido. Por favor, introduce un email válido.");
    } else {
        return true
    }
}

function validarFechaNac() {
    var fechaNac = document.getElementById("fechaNac").value;
    var fechaNacObj = new Date(fechaNac);
    var fechaActual = new Date();
    if (fechaNacObj > fechaActual) {
        mostrarModalError("La fecha introducida no es posible")
        //alert("Esta fecha no es posible")
    } else {
        return true
    }
}

function validarFechaInicioyFin() {
    var fechaInicio = document.getElementById("fechaInicio").value
    var fechaFin = document.getElementById("fechaFin").value
    var fechaInicioObj = new Date(fechaInicio)
    var fechaFinObj = new Date(fechaFin)
    if (fechaInicioObj > fechaFinObj) {
        mostrarModalError("La fecha de inicio no puede ser posterior a la fecha de finalización")
        //alert("La fecha de inicio no puede ser posterior a la fecha de finalización")
    } else {
        return true
    }
}

