document.addEventListener("DOMContentLoaded", init());

var dataset;

function init() {

    fetch('./json/data.json')
        .then((response) => response.json())
        .then((data) => {
            dataset = data.puntosCarga;
            var contador = 0;  // Variable contador para limitar a tres tarjetas
            dataset.forEach((punto) => {
                if (contador < 3) {
                    var puntoCard = document.createElement('div');
                    puntoCard.className = 'card col-10 col-md-7 col-lg-3';

                    puntoCard.innerHTML = `
                        <div class="row">
                            <img class="card-img-top col-12" src="${punto.imagen}" alt="Card image cap">
                            <div class="card-body text-center">
                                <h5 class="card-title">${punto.direccion}, ${punto.numeroDireccion}</h5>
                                <p class="card-text">${punto.ciudad}, ${punto.codigoPostal}</p>
                                <a href="#" class="btn btn-primary añadir-carrito"
                                    style="padding: 1rem; width: 15rem; font-size: 1.5rem;">Añadir al carrito</a>
                            </div>
                        </div>
                    `;
                    cards.appendChild(puntoCard);

                    var btnAñadirCarrito = puntoCard.querySelector('.añadir-carrito');

                    btnAñadirCarrito.addEventListener('click', () => {
                        añadir(punto, dropdownMenu);
                    });

                    contador++;
                }
            });
        });
}

let map;
let autocomplete;
/*let jsondata;
fetch("json/data.json")
    .then(response => {
        return response.json();
    })
    .then(function(json){
        jsondata = json;
      });
      console.log(jsondata)*/
let properties = [
    {
        id: 1,
        direccion: "Calle Alhambra",
        numeroDireccion: "123",
        codigoPostal: "29604",
        ciudad: "Málaga",
        tipoCarga: "alta",
        coords: {
            lat: 36.5105,
            lng: -4.882
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3207.696642337295!2d-4.767804110808466!3d36.489042413863416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd73205c112c974b%3A0x81ef7cc22ed129d5!2sC.%20Alhambra%2C%2029604%20Marbella%2C%20M%C3%A1laga!5e0!3m2!1ses!2ses!4v1700509434032!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"

    },
    {
        id: 2,
        direccion: "Avenida de la Palmera",
        numeroDireccion: "45",
        codigoPostal: "41013",
        ciudad: "Sevilla",
        tipoCarga: "normal",
        coords: {
            lat: 37.3886,
            lng: -5.9829
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.2645361576992!2d-5.984437523570594!3d37.35991703594818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126e800acd396d%3A0xb724baba743a587f!2sAv.%20de%20la%20Palmera%2C%2045%2C%2041013%20Sevilla!5e0!3m2!1ses!2ses!4v1700509145764!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 3,
        direccion: "Calle Playa de la Victoria",
        numeroDireccion: "7",
        codigoPostal: "11406",
        ciudad: "Cádiz",
        tipoCarga: "alta",
        coords: {
            lat: 36.5293,
            lng: -6.2924
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.8873702673664!2d-6.109499223593311!3d36.67720897462209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0dc70373623977%3A0x6d3a35af9253f940!2sC.%20Playa%20de%20la%20Victoria%2C%2011406%20Jerez%20de%20la%20Frontera%2C%20C%C3%A1diz!5e0!3m2!1ses!2ses!\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 4,
        direccion: "Paseo de la Ribera",
        numeroDireccion: "9",
        codigoPostal: "14002",
        ciudad: "Córdoba",
        tipoCarga: "normal",
        coords: {
            lat: 37.88047,
            lng: -4.77403
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.121960988111!2d-4.772552523552961!3d37.880830406042776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6d20801326ccbf%3A0xcf8249e573790568!2sP.%C2%BA%20de%20la%20Ribera%2C%2089%2C%2014002%20C%C3%B3rdoba!5e0!3m2!1ses!2ses!4v1700509724208!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 5,
        direccion: "Avenida de Andalucía",
        numeroDireccion: "15",
        codigoPostal: "41007",
        ciudad: "Sevilla",
        tipoCarga: "normal",
        coords: {
            lat: 37.3886,
            lng: -5.9829
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 6,
        direccion: "Avenida de Andalucía",
        numeroDireccion: "15",
        codigoPostal: "41002",
        ciudad: "Sevilla",
        tipoCarga: "normal",
        coords: {
            lat: 37.5379035,
            lng: -5.0750332
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 7,
        direccion: "Calle Nueva",
        numeroDireccion: "42",
        codigoPostal: "11404",
        ciudad: "Cádiz",
        tipoCarga: "alta",
        coords: {
            lat: 36.5271,
            lng: -6.2889
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.4563865161767!2d-6.149784923592967!3d36.68756947403957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0dc698adaf5fef%3A0x34c96b1834933832!2sC.%20Nueva%2C%2042%2C%2011404%20Jerez%20de%20la%20Frontera%2C%20C%C3%A1diz!5e0!3m2!1ses!2ses!4v1700513035136!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 8,
        direccion: "Paseo de los Tristes",
        numeroDireccion: "17",
        codigoPostal: "18002",
        ciudad: "Granada",
        tipoCarga: "normal",
        coords: {
            lat: 37.1736,
            lng: -3.6024
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 9,
        direccion: "Avenida de la Playa",
        numeroDireccion: "21",
        codigoPostal: "29020",
        ciudad: "Málaga",
        tipoCarga: "alta",
        coords: {
            lat: 36.7211,
            lng: -4.4218
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 10,
        direccion: "Calle de la Giralda",
        numeroDireccion: "60",
        codigoPostal: "41003",
        ciudad: "Sevilla",
        tipoCarga: "normal",
        coords: {
            lat: 37.3861,
            lng: -5.9822
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 11,
        direccion: "Calle de las Flores",
        numeroDireccion: "11",
        codigoPostal: "11004",
        ciudad: "Cádiz",
        tipoCarga: "alta",
        coords: {
            lat: 36.5298,
            lng: -6.292
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 12,
        direccion: "Paseo de la Alhambra",
        numeroDireccion: "27",
        codigoPostal: "18003",
        ciudad: "Granada",
        tipoCarga: "normal",
        coords: {
            lat: 37.1718,
            lng: -3.6037
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 13,
        direccion: "Calle Alameda",
        numeroDireccion: "8",
        codigoPostal: "29030",
        ciudad: "Málaga",
        tipoCarga: "alta",
        coords: {
            lat: 36.7211,
            lng: -4.4173
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 14,
        direccion: "Avenida de las Delicias",
        numeroDireccion: "33",
        codigoPostal: "41004",
        ciudad: "Sevilla",
        tipoCarga: "normal",
        coords: {
            lat: 37.3817,
            lng: -5.9818
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 15,
        direccion: "Calle Real",
        numeroDireccion: "19",
        codigoPostal: "11005",
        ciudad: "Cádiz",
        tipoCarga: "alta",
        coords: {
            lat: 36.5261,
            lng: -6.2931
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 16,
        direccion: "Calle Alhambra Sur",
        numeroDireccion: "55",
        codigoPostal: "29005",
        ciudad: "Málaga",
        tipoCarga: "alta",
        coords: {
            lat: 36.7166,
            lng: -4.4296
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 17,
        direccion: "Avenida de la Constitución",
        numeroDireccion: "12",
        codigoPostal: "41010",
        ciudad: "Sevilla",
        tipoCarga: "normal",
        coords: {
            lat: 37.3873,
            lng: -5.9816
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 18,
        direccion: "Calle de la Palma",
        numeroDireccion: "28",
        codigoPostal: "11010",
        ciudad: "Cádiz",
        tipoCarga: "alta",
        coords: {
            lat: 36.5257,
            lng: -6.3013
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 19,
        direccion: "Paseo de los Alamos",
        numeroDireccion: "7",
        codigoPostal: "18010",
        ciudad: "Granada",
        tipoCarga: "normal",
        coords: {
            lat: 37.1792,
            lng: -3.6074
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    },
    {
        id: 20,
        direccion: "Calle San Andrés",
        numeroDireccion: "14",
        codigoPostal: "29015",
        ciudad: "Málaga",
        tipoCarga: "alta",
        coords: {
            lat: 36.7194,
            lng: -4.421
        },
        iframe: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.097170246953!2d-5.955054923569657!3d37.38753423437126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ec35befab07%3A0xec8f724baebb24c1!2sAv.%20de%20Andaluc%C3%ADa%2C%2015%2C%2041007%20Sevilla!5e0!3m2!1ses!2ses!4v1700511747372!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    }
]


function getData() {

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


    // Crear un contenedor div para el iframe
    var iframeContainer = document.createElement("div");
    iframeContainer.innerHTML = element.iframe;

    // Agregar el contenedor del iframe al contenido del modal
    modalContent.appendChild(iframeContainer);

    modalContent.style.display = "flex";
    modalContent.style.justifyContent = "space-between";

    // Muestra el modal utilizando Bootstrap clases
    modal.classList.add("show");
    modal.style.display = "block";
    document.body.classList.add("modal-open");

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


function initMap() {
    const coords = { lat: 37.5268400, lng: -5.3327200 };
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
    const placeInput = document.getElementById("place_input");
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

const firstPositionMap = () => {
    const coords = { lat: 37.5268400, lng: -5.3327200 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: coords,
    });
};
/*
function miboton() {
    var btn = document.getElementById("boton");
    btn.addEventListener("click", function () {
        initMap();
    });
 
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
}
*/
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

function resultado() {
    var menu = document.getElementById("destacados");

    if (menu.style.display === "block") {
        menu.style.display = "none";

    } else {
        menu.style.display = "block";
    }
}
