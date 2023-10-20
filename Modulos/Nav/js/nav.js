function volverHome(){
    window.open("/Modulos/Home/home.html", "_self");
}

function desplegar(){
    var menu = document.getElementById("menu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
        menu.classList.remove("scale-up-hor-right");
        menu.classList.add("scale-up-hor-left");
      
       

    } else {
        menu.style.display = "block";
        menu.classList.remove("scale-up-hor-left");
        menu.classList.add("scale-up-hor-right");
    }
}





    

