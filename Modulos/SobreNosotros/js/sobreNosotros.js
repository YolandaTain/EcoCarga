function desplegar() {
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

/*
function iniciar(){
    document.getElementById("formulario").addEventListener("click", function() {
    let reseña = prompt("Por favor, añade tu reseña:");
    
    if (reseña !== null && reseña.trim() !== "") {
      alert("¡Gracias por tu reseña!\n\nReseña: " + reseña);
    } else {
      alert("Debes ingresar una reseña válida.");
    }
  });
}

