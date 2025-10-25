// js/transportista.js
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("listaSolicitudes");

  // Cargar solicitudes almacenadas
  const solicitudes = JSON.parse(localStorage.getItem("solicitudesAgroLink")) || [];

  if (!contenedor) return;

  if (solicitudes.length === 0) {
    contenedor.innerHTML = "<p>No hay solicitudes disponibles en este momento.</p>";
    return;
  }

  solicitudes.forEach((sol, i) => {
    const card = document.createElement("div");
    card.classList.add("solicitud-card");
    card.innerHTML = `
      <h3>${sol.tipo}</h3>
      <p><strong>Origen:</strong> ${sol.origen}</p>
      <p><strong>Destino:</strong> ${sol.destino}</p>
      <p><strong>Fecha:</strong> ${sol.fecha}</p>
      <p><strong>Peso:</strong> ${sol.peso} kg</p>
      <p><strong>Estado:</strong> ${sol.estado}</p>
      <button class="btn btn-primary" onclick="aceptarSolicitud(${i})">Aceptar solicitud</button>
    `;
    contenedor.appendChild(card);
  });
});

// Función global para aceptar solicitud
function aceptarSolicitud(index) {
  const solicitudes = JSON.parse(localStorage.getItem("solicitudesAgroLink")) || [];
  solicitudes[index].estado = "Aceptada ✅";
  localStorage.setItem("solicitudesAgroLink", JSON.stringify(solicitudes));
  showToast("🚚 Solicitud aceptada");
  location.reload();
}
