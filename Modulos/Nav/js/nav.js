function volverHome(){
    window.open("/Modulos/Home/home.html", "_self");
}

function desplegar(){
    var menu = document.getElementById("menu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
        menu.classList.remove("slide-in-blurred-top");
        menu.classList.add("slide-in-blurred-top2");
      
       

    } else {
        menu.style.display = "block";
        menu.classList.remove("slide-in-blurred-top2");
        menu.classList.add("slide-in-blurred-top");
    }
}





    

