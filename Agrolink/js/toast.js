// js/toast.js
function showToast(mensaje, duracion = 2500) {
  // Eliminar cualquier toast previo
  const existente = document.querySelector(".toast");
  if (existente) existente.remove();

  // Crear el contenedor
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = mensaje;
  document.body.appendChild(toast);

  // Mostrar animación
  setTimeout(() => toast.classList.add("show"), 100);

  // Ocultar después del tiempo indicado
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 400);
  }, duracion);
}
