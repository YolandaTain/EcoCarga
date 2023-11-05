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

  // Función para cargar los datos del JSON y llenar el carrusel
  function cargarNoticias() {
    fetch('noticias.json') 
      .then((response) => response.json())
      .then((data) => {
        const slides = document.querySelectorAll('.slide');

        data.forEach((noticia, index) => {
          if (index < slides.length) {
            const slide = slides[index];
            const tituloElement = slide.querySelector('.slide-title');
            const textoElement = slide.querySelector('.slide-text');

            tituloElement.textContent = noticia.titulo;
            textoElement.textContent = noticia.descripcion;
          }
        });
      })
      .catch((error) => console.error('Error al cargar noticias: ' + error));
  }

// Llama a la función para cargar las noticias
cargarNoticias();

document.addEventListener("DOMContentLoaded", function () {
  // Obtén los elementos del modal
  const modalTitle = document.getElementById("modal-title");
  const modalDate = document.getElementById("modal-date");
  const modalDescription = document.getElementById("modal-description");
  const modalImage = document.getElementById("modal-image");

  // Obtén los botones "Leer Más"
  const buttons = document.querySelectorAll(".btn[data-bs-toggle='modal']");

  // Función para cargar los datos del JSON
  function cargarDatosNoticia(noticiaId) {
    fetch("noticias.json")
      .then((response) => response.json())
      .then((data) => {
        const noticia = data[noticiaId - 1]; // Restamos 1 para obtener el índice correcto del arreglo
        modalTitle.textContent = noticia.titulo;
        modalDate.textContent = noticia.fecha;
        modalDescription.textContent = noticia.descripcion;

        // Obtén la extensión de la imagen desde el campo "imagen"
        const imageExtension = noticia.imagen.split('.').pop().toLowerCase();
        modalImage.src = `img/noticia${noticia.noticia}.${imageExtension}`;
        modalImage.alt = noticia.titulo;
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }

  // Agregar un evento clic a cada botón "Leer Más"
  buttons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      cargarDatosNoticia(index + 1);
    });
  });
});

var currentSlide = 1;
var totalSlides = 8; // Cambia esto al número total de noticias en tu carrusel
var slideInterval = 50000; // 10 segundos en milisegundos

function changeSlide() {
  if (currentSlide < totalSlides) {
    currentSlide++;
  } else {
    currentSlide = 1;
  }
  var radioId = "btn-" + currentSlide;
  document.getElementById(radioId).checked = true;
}

setInterval(changeSlide, slideInterval);



  





