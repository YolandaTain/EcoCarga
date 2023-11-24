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

cargarNoticias();

document.addEventListener("DOMContentLoaded", function () {

  const modalTitle = document.getElementById("modal-title");
  const modalDate = document.getElementById("modal-date");
  const modalDescription = document.getElementById("modal-descriptioncompleta");
  const modalImage = document.getElementById("modal-image");

  const buttons = document.querySelectorAll(".btn[data-bs-toggle='modal']");

  function cargarDatosNoticia(noticiaId) {
    fetch("noticias.json")
      .then((response) => response.json())
      .then((data) => {
        const noticia = data[noticiaId - 1]; 
        modalTitle.textContent = noticia.titulo;
        modalDate.textContent = noticia.fecha;
        modalDescription.innerHTML = noticia.descripcioncompleta;

        const imageExtension = noticia.imagen.split('.').pop().toLowerCase();
        modalImage.src = `img/imagen_${noticia.noticia}.${imageExtension}`;
        modalImage.alt = noticia.titulo;
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }

  buttons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      cargarDatosNoticia(index + 1);
    });
  });
});



let currentSlide = 1; 

function cambiarCarrusel() {
  const currentInput = document.querySelector(`#btn-${currentSlide}`);
  
  if (currentInput) {
    currentInput.click();
  }
  
  currentSlide++;
  if (currentSlide > 8) {
    currentSlide = 1; 
  }
}

setInterval(cambiarCarrusel, 4000); 





  





