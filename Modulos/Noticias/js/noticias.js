// Configuración del carrusel de noticias
$('#carrusel-noticias').slick({
    slidesToShow: 3, // Muestra 2 noticias a la vez
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('#prev'),
    nextArrow: $('#next'),
});

// Obtén referencias a elementos HTML
const menuButton = document.getElementById('menu-button');
const menuOptions = document.getElementById('menu-options');

let posicionActual = 0;

// Función para mostrar la noticia en la posición actual
function mostrarNoticia() {
    $('#carrusel-noticias').slick('slickGoTo', posicionActual);
}

// Evento para avanzar a la siguiente noticia
$('#next').click(() => {
    if (posicionActual < $('#carrusel-noticias .slick-slide').length - 3) {
        posicionActual++;
        mostrarNoticia();
    }
});

// Evento para retroceder a la noticia anterior
$('#prev').click(() => {
    if (posicionActual > 0) {
        posicionActual--;
        mostrarNoticia();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const imagenes = document.querySelectorAll(".imagen-noticia");
    const descripciones = document.querySelectorAll(".descripcion-noticia");
    const cuadroEmergente = document.getElementById("cuadro-emergente");
    const contenidoEmergente = document.getElementById("descripcion-noticia-popup");
    const cerrar = document.getElementById("cerrar");
  
    imagenes.forEach((imagen, index) => {
      imagen.addEventListener("click", () => {
        contenidoEmergente.textContent = descripciones[index].textContent;
  
        // Obtener el tamaño y posición del carrusel
        const carrusel = document.getElementById("carrusel-noticias");
        const carruselAncho = carrusel.clientWidth;
        const carruselAlto = carrusel.clientHeight;
        const carruselPosicion = carrusel.getBoundingClientRect();
  
        // Establecer el ancho y alto del cuadro emergente
        cuadroEmergente.style.width = "880px";
        cuadroEmergente.style.height = "100px";
  
        // Centrar el cuadro emergente dentro del carrusel
        cuadroEmergente.style.left = `${carruselPosicion.left}px`;
        cuadroEmergente.style.top = `${carruselPosicion.top}px`;
  
        cuadroEmergente.style.display = "block";
      });
    });
  });
  
  
  



