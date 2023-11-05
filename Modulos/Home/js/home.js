document.addEventListener("DOMContentLoaded", init);

var dataset;

function init(){

    fetch('/json/data.json')
        .then((response) => response.json())
        .then((data) => {
            dataset = data.puntosCarga;
            getData();
        });
}


function getData(){
    


}

function resultado(){
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