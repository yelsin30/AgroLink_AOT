// ===============================
// js/toast.js — Sistema de notificaciones AgroLink
// ===============================
function showToast(mensaje, tipo = "success", duracion = 3000) {
  // Eliminar cualquier toast existente
  const existente = document.querySelector(".toast");
  if (existente) existente.remove();

  // Crear contenedor del toast
  const toast = document.createElement("div");
  toast.className = `toast ${tipo}`;

  // Definir íconos por tipo
  const iconos = {
    success: "✅",
    warning: "⚠️",
    error: "❌",
    info: "ℹ️"
  };

  // Contenido del toast
  toast.innerHTML = `
    <span class="toast-icon">${iconos[tipo] || iconos.info}</span>
    <span class="toast-message">${mensaje}</span>
  `;

  // Añadir al DOM
  document.body.appendChild(toast);

  // Forzar reflujo para iniciar la animación
  void toast.offsetWidth;
  toast.classList.add("show");

  // Cerrar automáticamente
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 400);
  }, duracion);
}

// ===============================
// Estilos dinámicos para el toast
// ===============================
const toastStyle = document.createElement("style");
toastStyle.textContent = `
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #fff;
  color: #1f3b13;
  padding: 0.9rem 1.3rem;
  border-radius: 10px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: "Poppins", sans-serif;
  font-size: 0.95rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  z-index: 9999;
}
.toast.show {
  opacity: 1;
  transform: translateY(0);
}
.toast.hide {
  opacity: 0;
  transform: translateY(20px);
}
.toast.success {
  border-left: 5px solid #2b7a0b;
  background-color: #f0fff0;
}
.toast.warning {
  border-left: 5px solid #f4c542;
  background-color: #fffbea;
}
.toast.error {
  border-left: 5px solid #e63946;
  background-color: #ffeaea;
}
.toast.info {
  border-left: 5px solid #0077b6;
  background-color: #e8f4ff;
}
.toast-icon {
  font-size: 1.2rem;
}
@media (max-width: 600px) {
  .toast {
    bottom: 20px;
    right: 20px;
    font-size: 0.9rem;
    padding: 0.8rem 1rem;
  }
}
`;
document.head.appendChild(toastStyle);
