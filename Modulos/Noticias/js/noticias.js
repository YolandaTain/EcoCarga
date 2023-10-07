$('#carrusel-noticias').slick({
    slidesToShow: 3, 
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('#prev'),
    nextArrow: $('#next'),
});

const menuButton = document.getElementById('menu-button');
const menuOptions = document.getElementById('menu-options');

let posicionActual = 0;

function mostrarNoticia() {
    $('#carrusel-noticias').slick('slickGoTo', posicionActual);
}
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
    const tituloEmergente = document.getElementById("titulo-noticia-popup");
    const contenidoEmergente = document.getElementById("descripcion-noticia-popup");
    const cerrar = document.getElementById("cerrar");

    imagenes.forEach((imagen, index) => {
        imagen.addEventListener("click", () => {
            const tituloNoticia = document.querySelectorAll(".titulo-noticia")[index];
            contenidoEmergente.textContent = descripciones[index].textContent;

            // Establece el contenido del título en el cuadro emergente
            tituloEmergente.textContent = tituloNoticia.textContent;
            contenidoEmergente.textContent = descripciones[index].textContent;

                // Agregar la clase "cambio-color" al título para cambiar el color
                tituloNoticia.classList.add("cambio-color");

                // Restaurar el color original de otros títulos
                const otrosTitulos = document.querySelectorAll(".titulo-noticia.cambio-color");
                otrosTitulos.forEach((otroTitulo) => {
                    if (otroTitulo !== tituloNoticia) {
                        otroTitulo.classList.remove("cambio-color");
                    }
                });
            
                cerrar.addEventListener("click", () => {
                    cuadroEmergente.style.display = "none";
                });

            // Obtener el tamaño y posición del carrusel
            const carrusel = document.getElementById("carrusel-noticias");
            const carruselAncho = carrusel.clientWidth;
            const carruselAlto = carrusel.clientHeight;
            const carruselPosicion = carrusel.getBoundingClientRect();

            // Establecer el ancho y alto del cuadro emergente
            cuadroEmergente.style.width = "880px";
            cuadroEmergente.style.height = "200px";

            // Centrar el cuadro emergente dentro del carrusel
            cuadroEmergente.style.left = `${carruselPosicion.left}px`;
            cuadroEmergente.style.top = `${carruselPosicion.top}px`;

            cuadroEmergente.style.display = "block";
        });
    });
});

  
  
  



