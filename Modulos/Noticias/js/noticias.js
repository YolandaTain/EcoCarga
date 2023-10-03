// Configuración del carrusel de noticias
$('#carrusel-noticias').slick({
    slidesToShow: 3, // Muestra 3 noticias a la vez
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

// Evento para mostrar u ocultar el menú al hacer clic en el botón del menú
menuButton.addEventListener('click', () => {
    menuOptions.classList.toggle('show'); // Muestra u oculta el menú
});

