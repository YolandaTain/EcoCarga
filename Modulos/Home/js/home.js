document.addEventListener("DOMContentLoaded", init());

var dataset;
const placeInput = document.getElementById("place_input");
let map;
let autocomplete;
let properties = [
    {
        id: 1,
        direccion: "Avenida de los Remedios",
        numeroDireccion: "30",
        codigoPostal: "41020",
        ciudad: "Sevilla",
        tipoCarga: "normal",
        coords: {
            lat: 37.3913,
            lng: -5.9813
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.2645361576992!2d-5.984437523570573!3d37.35991703594818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126e800acd396d%3A0xb724baba743a587f!2sAv.%20de%20la%20Palmera%2C%2045%2C%2041013%20Sevilla!5e0!3m2!1ses!2ses!4v1700407894930!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"

    },
    {
        id: 2,
        direccion: "Avenida de la Palmera",
        numeroDireccion: "45",
        codigoPostal: "41001",
        ciudad: "Sevilla",
        tipoCarga: "normal",
        coords: {
            lat: 37.3886,
            lng: -5.9829
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.2645361576992!2d-5.984437523570573!3d37.35991703594818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126e800acd396d%3A0xb724baba743a587f!2sAv.%20de%20la%20Palmera%2C%2045%2C%2041013%20Sevilla!5e0!3m2!1ses!2ses!4v1700407894930!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 3,
        direccion: "Calle Playa de la Victoria",
        numeroDireccion: "7",
        codigoPostal: "11002",
        ciudad: "Cádiz",
        tipoCarga: "alta",
        coords: {
            lat: 36.5293,
            lng: -6.2924
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3202.971917918859!2d-4.532797223595762!3d36.60298537879079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72fc84ea56031d%3A0x8ede592d17799679!2sC.%20Alhambra%2C%2029631%20Benalm%C3%A1dena%2C%20M%C3%A1laga!5e0!3m2!1ses!2ses!4v1700328353732!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 4,
        direccion: "Paseo de la Ribera",
        numeroDireccion: "89",
        codigoPostal: "18001",
        ciudad: "Granada",
        tipoCarga: "normal",
        coords: {
            lat: 37.1752,
            lng: -3.5984
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3202.971917918859!2d-4.532797223595762!3d36.60298537879079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72fc84ea56031d%3A0x8ede592d17799679!2sC.%20Alhambra%2C%2029631%20Benalm%C3%A1dena%2C%20M%C3%A1laga!5e0!3m2!1ses!2ses!4v1700328353732!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 5,
        direccion: "Calle del Pilar",
        numeroDireccion: "30",
        codigoPostal: "29001",
        ciudad: "Málaga",
        tipoCarga: "alta",
        coords: {
            lat: 36.7208,
            lng: -4.4121
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3202.971917918859!2d-4.532797223595762!3d36.60298537879079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72fc84ea56031d%3A0x8ede592d17799679!2sC.%20Alhambra%2C%2029631%20Benalm%C3%A1dena%2C%20M%C3%A1laga!5e0!3m2!1ses!2ses!4v1700328353732!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    }

]


window.initMap = function () {
    const coords = { lat: 37.3886, lng: -5.9829 };
    firstPositionMap();
   

    let infoWindow = new google.maps.InfoWindow();


    const addMarker = (properties) => {
        properties.forEach((property) => {
            const informationCard = createInfoWindow(property);

            property.marker = new google.maps.Marker({
                position: property.coords,
                map,
                icon: "./icons/charge.png",
            });

            google.maps.event.addListener(property.marker, "click", () => {
                infoWindow.setContent(informationCard);
                infoWindow.open(map, property.marker);
                map.setCenter(property.coords);
                map.setZoom(15); // Adjust the zoom level as needed
            });
        });
    };


    getYourLocation();
    addMarker(properties);
    searchGoogleMap(infoWindow);
};

const searchGoogleMap = (infoWindow, map) => {
    autocomplete = new google.maps.places.Autocomplete(placeInput);
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        // Check if the input matches any property's address
        const matchingProperty = properties.find((property) => {
            return (
                property.direccion.toLowerCase() ===
                place.name.toLowerCase()
            );
        });

        if (matchingProperty) {
            // Open the corresponding marker's info window
            infoWindow.setContent(createInfoWindow(matchingProperty));
            infoWindow.open(map, matchingProperty.marker);
            map.setCenter(matchingProperty.coords);
            map.setZoom(15); // Adjust the zoom level as needed
        } else {
            // If no match found, just center the map on the input location
            map.setCenter(place.geometry.location);
            map.setZoom(13);
        }
    });
};


const firstPositionMap = (coords) => {
    //const coords = { lat: 37.3886, lng: -5.9829 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: coords,
    });
};

const createInfoWindow = (property) => {
    return `
    <div>
    <h3 class="text-reset py-1">${property.direccion}, ${property.numeroDireccion}</h3>
    <div class= "d-flex justify-content-space-between">
        <p><b>Código Postal: </b>${property.codigoPostal}</p>
        <p><b>Ciudad: </b>${property.ciudad}</p>
        <p><b>Tipo de Carga: </b>${property.tipoCarga}</p>
    </div>
    <h4><b>Cómo llegar: </b>${property.iframe}</h4>
    </div>
    `;
};

const getYourLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                const coords = {
                    lat: latitude,
                    lng: longitude
                }
                map.setCenter(coords);
                map.setZoom(12);
                new google.maps.Marker({
                    position: coords,
                    map,
                    icon: "./icons/position.svg",
                });
            }, () => {
                alert("Tu navegador esta bien, pero ocurrio un error al obtener tu ubicación");
            }
        );
    } else {
        alert("Tu navegador no cuanta con localización")
    }
}



function init() {

    fetch('./json/data.json')
        .then((response) => response.json())
        .then((data) => {
            dataset = data.puntosCarga;
        });
}



function getData(longitud, latitud) {

    var resultadoBusqueda = document.querySelector('input').value;
    var resultados = document.getElementById("resultadosBusqueda");

    // Limpia los resultados anteriores
    resultados.innerHTML = "";

    // Variable para realizar un seguimiento de si se encontró el código postal
    var codigoPostalEncontrado = false;
    var ciudadEncontrada = false;

    var resultadosEncontrados = 0; // Variable para contar resultados
    var countElement = document.createElement("h1");

    dataset.forEach(element => {
        if (resultadoBusqueda == element.codigoPostal || resultadoBusqueda == element.ciudad) {
            resultadosEncontrados++;
            // Incrementa el contador de resultados
            // Muestra el número de resultados encontrados

            countElement.style.fontSize = '3rem';
            countElement.style.textAlign = 'center';
            resultados.appendChild(countElement);
            countElement.innerHTML = "<strong>" + resultadosEncontrados + " Puntos de carga cercanos" + "</strong>" + "<br>" + "Selecciona " + "<strong>" + "+Info" + "</strong>" + " en la lista";

        }


    });

    dataset.forEach(element => {
        if (resultadoBusqueda == element.codigoPostal || resultadoBusqueda == element.ciudad) {

            // Creo el elemento para svg que necesito
            var svgElement = document.createElement("span");
            svgElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#344306" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>';

            // Crear el elemento div principal
            var div = document.createElement("div");

            // Agregar el contenedor SVG al div principal antes del contenido de texto
            div.appendChild(svgElement);

            // Agregar el contenido de texto (dirección, etc.) al div
            div.innerHTML += element.direccion + ", " + element.numeroDireccion +
                " | Ciudad: " + element.ciudad + " | Código Postal: " + element.codigoPostal + " | Tipo Carga: " + element.tipoCarga;

            // Añadir una clase al elemento div
            div.classList.add("resultado");
            div.classList.add("col-10");
            div.classList.add("col-md-8");
            div.classList.add("col-lg-6");

            // Agregar un manejador de eventos para el hover
            div.addEventListener("mouseover", function () {
                div.classList.add("resultado-hover");
            });

            // Agregar un manejador de eventos para cuando el mouse sale del elemento
            div.addEventListener("mouseout", function () {
                div.classList.remove("resultado-hover");
            });

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
            ciudadEncontrada = true;


        }

    });


    // Después del bucle, verifica si se encontró el código postal o no
    if (!codigoPostalEncontrado || !ciudadEncontrada) {
        // Si no se encuentra el código postal, muestra un mensaje de error en un modal
        var modal = document.getElementById("exampleModal");
        var modalTitleF = modal.querySelector(".modal-title");
        var modalContentF = modal.querySelector(".modal-body");
        modalTitleF.textContent = "Código Postal no encontrado";
        modalContentF.innerHTML = "El código postal  o ciudad que ingresaste no se encuentra en la base de datos.";
        // Muestra el modal
        modal.classList.add("show");
        modal.style.display = "block";
        document.body.classList.add("modal-open");
        document.body.style.paddingRight = "15px"; // Ajusta el desplazamiento del cuerpo si es necesario

        //Obtén una referencia al botón de cerrar
        var closeButton = document.querySelector('.btn-close');

        // Asocia la función de cierre al evento de clic en el botón de cerrar
        closeButton.addEventListener('click', function () {
            // Oculta el modal utilizando Bootstrap clases
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        });

    }
}

function showInfoModal(element) {
    var modal = document.getElementById("exampleModal");
    var modalTitle = modal.querySelector(".modal-title");
    var modalContent = modal.querySelector(".modal-body");

    modalTitle.textContent = "Información del Código Postal: " + element.codigoPostal;
    modalTitle.style.fontSize = "2rem";
    modalContent.style.fontSize = "2.5rem";


    modalContent.innerHTML =
        "<strong>" + element.direccion + ", " + element.numeroDireccion + "<br>" +
        "Ciudad: " + element.ciudad + "<br>" +
        "Código Postal: " + element.codigoPostal + "<br>" +
        "Tipo Carga: " + element.tipoCarga + "</strong>"
    // Muestra el modal utilizando Bootstrap clases
    modal.classList.add("show");
    modal.style.display = "block";
    document.body.classList.add("modal-open");

    var div = document.createElement("div");


    modalContent.appendChild(div);

    //Obtén una referencia al botón de cerrar
    var closeButton = document.querySelector('.btn-close');

    // Asocia la función de cierre al evento de clic en el botón de cerrar
    closeButton.addEventListener('click', function () {
        // Oculta el modal utilizando Bootstrap clases
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
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

function showComprarModal() {
    var modal = document.querySelector(".modal");
    var modalTitle = modal.querySelector(".modal-title");
    var modalContent = modal.querySelector(".modal-body");

    modalTitle.textContent = "Compra completada";
    modalContent.textContent = "Gracias por su compra";

    // Obtén una referencia al modal
    var modal = document.querySelector('.modal');

    // Muestra el modal utilizando Bootstrap clases
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');

    // Obtén una referencia al botón de cerrar
    var closeButton = document.querySelector('.btn-close');

    // Asocia la función de cierre al evento de clic en el botón de cerrar
    closeButton.addEventListener('click', function () {
        // Oculta el modal utilizando Bootstrap clases
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });
}

const searchButton = document.getElementById('boton');
searchButton.addEventListener('click', function () {
    searchGoogleMapWithButton();
});

function searchGoogleMapWithButton() {
    // Your logic for handling button click, you can call initMap or any other function here
    initMap(); // Call initMap or replace with the desired function
}

