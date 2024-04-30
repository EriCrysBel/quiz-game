  // Crear la imagen principal
  let imagenPrincipal = document.createElement("img");
  imagenPrincipal.src = "./img/inicio.png";
  imagenPrincipal.alt = "Imagen Principal";
  imagenPrincipal.style.width = "100%"; // Ajustar al ancho del contenedor

  // Crear el botón "Jugar"
  let botonJugar = document.createElement("button");
  botonJugar.classList.add("btn-jugar" /* Estilo CSS */);
  botonJugar.textContent = "Jugar";
  botonJugar.addEventListener("click", function() {
      window.location.href = "index2.html"; // Redireccionar al hacer clic en el botón
  });

  // Añadir la imagen y el botón al contenedor
  var contenedor = document.createElement("div");
  contenedor.appendChild(imagenPrincipal);
  contenedor.appendChild(botonJugar);

  document.body.appendChild(contenedor);