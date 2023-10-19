document.addEventListener("DOMContentLoaded", function () {
    const botonesLeerMas = document.querySelectorAll(".slide-link");
    const cuadroEmergente = document.querySelector(".cuadro-emergente");
    const tituloEmergente = document.getElementById("titulo-noticia-popup");
    const contenidoEmergente = document.getElementById("descripcion-noticia-popup");
    const cerrar = document.getElementById("cerrar");
  
    botonesLeerMas.forEach((botonLeerMas, index) => {
      botonLeerMas.addEventListener("click", (event) => {
        event.preventDefault();
  
        // Obtén los datos de la diapositiva actual
        const tituloNoticia = document.querySelectorAll(".slide-title")[index];
        const descripcionNoticia = document.querySelectorAll(".slide-text")[index];
  
        // Establece el contenido del título y descripción en el cuadro emergente
        tituloEmergente.textContent = tituloNoticia.textContent;
        contenidoEmergente.textContent = descripcionNoticia.textContent;
  
        // Abre el cuadro emergente
        cuadroEmergente.style.display = "block";
  
        // Agregar la clase "cambio-color" al título para cambiar el color
        tituloNoticia.classList.add("cambio-color");
  
        // Restaurar el color original de otros títulos
        const otrosTitulos = document.querySelectorAll(".slide-title.cambio-color");
        otrosTitulos.forEach((otroTitulo) => {
          if (otroTitulo !== tituloNoticia) {
            otroTitulo.classList.remove("cambio-color");
          }
        });
      });
    });
  
    cerrar.addEventListener("click", () => {
      cuadroEmergente.style.display = "none";
    });
  });
  


const carrusel = document.getElementById("carrusel-noticias");
let currentPosition = 0;

function mostrarNoticia(index) {
    if (index < 0) {
        currentPosition = 0;
    } else if (index >= carrusel.children.length) {
        currentPosition = carrusel.children.length - 1;
    }

    carrusel.style.transform = `translateX(-${currentPosition * 100}%)`;
}


document.addEventListener('DOMContentLoaded', function () {
  const listaItems = document.querySelectorAll('.video-list li');

  listaItems.forEach(function (item) {
      item.addEventListener('click', function () {
          const videoId = item.getAttribute('data-video-id');
          const iframes = document.querySelectorAll('.video-player iframe');

          iframes.forEach(function (iframe) {
              iframe.style.display = 'none';
          });

          const videoIframe = document.getElementById(videoId);
          if (videoIframe) {
              videoIframe.style.display = 'block';
          }
      });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const listaItems = document.querySelectorAll('.video-list li');

  listaItems.forEach(function (item) {
      item.addEventListener('click', function () {
          listaItems.forEach(function (otherItem) {
              otherItem.querySelector('.listaVideo').classList.remove('selected');
          });

          const videoTitle = item.querySelector('.listaVideo');
          videoTitle.classList.add('selected');
      });
  });
});





    





