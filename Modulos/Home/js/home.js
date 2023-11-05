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

    dataset.forEach(element => {
        if (resultadoBusqueda == element.codigoPostal) {
            var div = document.createElement("div");
            div.textContent = " Dirección: " + element.direccion + ", " + element.numeroDireccion
                + " | Ciudad: " + element.ciudad + " | Código Postal: " + element.codigoPostal + " | Tipo Carga: " + element.tipoCarga;
            
            // Añadir una clase al elemento div
            div.classList.add("resultado");
            div.classList.add("col-10");
            div.classList.add("col-md-8");
            div.classList.add("col-lg-6")
            
            resultados.appendChild(div);
        }

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