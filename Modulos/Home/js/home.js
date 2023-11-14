document.addEventListener("DOMContentLoaded", init);

var dataset;

function init() {

    fetch('./json/data.json')
        .then((response) => response.json())
        .then((data) => {
            dataset = data.puntosCarga;
        });
}


function getData() {
    var resultadoBusqueda = document.querySelector('input').value;
    document.getElementById("resultadosBusqueda").innerHTML = ""
    var resultados = document.getElementById("resultadosBusqueda");

    // Limpia los resultados anteriores
    resultados.innerHTML = "";

    // Variable para realizar un seguimiento de si se encontró el código postal
    var codigoPostalEncontrado = false;

    dataset.forEach(element => {
        if (resultadoBusqueda == element.codigoPostal) {
            var div = document.createElement("div");
            div.textContent = element.direccion + ", " + element.numeroDireccion
                + " | Ciudad: " + element.ciudad + " | Código Postal: " + element.codigoPostal + " | Tipo Carga: " + element.tipoCarga;

            // Añadir una clase al elemento div
            div.classList.add("resultado");
            div.classList.add("col-10");
            div.classList.add("col-md-8");
            div.classList.add("col-lg-6")

            resultados.appendChild(div);

            // Crea un botón para mostrar el modal
            var infoButton = document.createElement("button");
            infoButton.style.padding = '1rem';
            infoButton.style.margin = '1rem';
            infoButton.style.width = '10rem';
            infoButton.style.fontSize = '2rem';
            infoButton.textContent = "+Info";
            infoButton.classList.add("btn", "btn-dark");

            // Agrega un manejador de eventos para mostrar el modal cuando se hace clic en el botón
            infoButton.addEventListener("click", function () {
                showInfoModal(element);
            });

            // Agrega el botón al div de resultados
            div.appendChild(infoButton);

            // Agrega el div al contenedor de resultados
            resultados.appendChild(div);

            // Cambia la variable a true porque encontraste un código postal
            codigoPostalEncontrado = true;
        }
    });

    // Después del bucle, verifica si se encontró el código postal o no
    if (!codigoPostalEncontrado) {
        // Si no se encuentra el código postal, muestra un mensaje de error en un modal
        var modal = document.getElementById("ModalCenterF");
        var modalTitleF = modal.querySelector(".modal-titleF");
        var modalContentF = modal.querySelector(".modal-bodyF");
        modalTitleF.textContent = "Código Postal no encontrado";
        modalContentF.innerHTML = "El código postal que ingresaste no se encuentra en la base de datos.";
        // Muestra el modal
        modal.classList.add("show");
        modal.style.display = "block";
        document.body.classList.add("modal-open");
        document.body.style.paddingRight = "15px"; // Ajusta el desplazamiento del cuerpo si es necesario
    }
}

function showInfoModal(element) {
    var modal = document.getElementById("exampleModalCenter");
    var modalTitle = modal.querySelector(".modal-title");
    var modalContent = modal.querySelector(".modal-body");

    modalTitle.textContent = "Información del Código Postal: " + element.codigoPostal;

    modalContent.innerHTML =
        "Dirección: " + element.direccion + ", " + element.numeroDireccion +
        " | Ciudad: " + element.ciudad +
        " | Código Postal: " + element.codigoPostal +
        " | Tipo Carga: " + element.tipoCarga;

    // Muestra el modal utilizando Bootstrap clases
    modal.classList.add("show");
    modal.style.display = "block";
    document.body.classList.add("modal-open");
    initMap()

}

function initMap() {
    var myLatLng = { lat: 36.7201600, lng: -4.4203400 };
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 12
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Calle Alhambra, Málaga'
    });
  }

function resultado() {
    var menu = document.getElementById("destacados");

    if (menu.style.display === "block") {
        menu.style.display = "none";

    } else {
        menu.style.display = "block";
    }
}



/*
    //MAPA
    var mapaConfig = {
        chart: {
            renderTo: 'mapa', // El ID del div donde se renderizará el mapa
            map: 'world' // Tipo de mapa, en este caso, 'world' para un mapa del mundo
        },
        title: {
            text: 'Mapa del mundo'
        },
        series: [{
            // Datos del mapa (puedes cambiar estos datos para tu mapa personalizado)
            data: [{
                'hc-key': 'us',
                value: 1 // Valor para el país o región
            }, {
                'hc-key': 'ca',
                value: 2
            }],
            mapData: Highcharts.maps['custom/world'], // Puedes usar mapas personalizados
            joinBy: 'hc-key' // Clave para unir los datos con el mapa
        }]
    };

    // Crear el mapa con Highcharts
    var mapa = new Highcharts.Map(mapaConfig);
*/