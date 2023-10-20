document.addEventListener("DOMContentLoaded", inicio);

function inicio() { 
   /* document.getElementById('siguiente-button1').addEventListener('click', function () {
        window.location.href = '/MI-PROYECTO/Modulos/Itinerario/itinerario2.html';
    });

    document.getElementById('siguiente-button2').addEventListener('click', function () {
        window.location.href = '/MI-PROYECTO/Modulos/Itinerario/itinerario3.html';
    });
    
    document.getElementById('volver-button').addEventListener('click', function () {
        window.location.href = '/MI-PROYECTO/Modulos/Itinerarioo/itinerario.html';
    });
    
    document.getElementById('volver-button3').addEventListener('click', function () {
        window.location.href = '/MI-PROYECTO/Modulos/Itinerario/itinerario2.html';
    });    */
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

function procesoFinalizado() {
    alert("Itinerario enviado, disfrute!")
    window.open("/Modulos/Home/home.html", "_self");

}

function siguiente(numero) {
    var formulario = document.getElementById('miFormulario');

    if (formulario.checkValidity()) {
        numero = numero == 1 ? "" : numero; //variable = condición ? valor_si_cierto : valor_si_falso;
        window.open("/Modulos/Itinerario/itinerario" + numero + ".html", "_self");
    } else {
        alert("Por favor, completa todos los campos requeridos.");
    }
}


function volver(numero){
    numero = numero == 1? "" : numero;
    window.open("/Modulos/Itinerario/itinerario"+numero+".html", "_self");
}

