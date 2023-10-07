window.onload = inicio;

function inicio() { }

function volverHome() {
    window.open("/Modulos/Home/home.html", "_self");
}

function desplegar() {
    var menu = document.getElementById("menu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
        menu.classList.remove("slide-in-blurred-top");
        menu.classList.add("slide-in-blurred-top2");



    } else {
        menu.style.display = "block";
        menu.classList.remove("slide-in-blurred-top2");
        menu.classList.add("slide-in-blurred-top");
    }
}

function procesoFinalizado() {
    alert("Itinerario enviado, disfrute!")
    window.location.href = "/MI-PROYECTO/Modulos/Home/home.html";

}


document.getElementById('siguiente-button1').addEventListener('click', function () {
    window.location.href = '/itinerario2.html';
});

document.getElementById('siguiente-button2').addEventListener('click', function () {
    window.location.href = '/Modulos/Itinerario/itinerario3.html';
});

document.getElementById('volver-button').addEventListener('click', function () {
    window.location.href = '/Modulos/Itinerario/itinerario.html';
});

document.getElementById('volver-button3').addEventListener('click', function () {
    window.location.href = '/Modulos/Itinerario/itinerario2.html';
});



