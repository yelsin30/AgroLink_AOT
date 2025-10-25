// js/dashboard.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("solicitudForm");
  const mensajeExito = document.getElementById("mensajeExito");
  const logout = document.getElementById("logout");

  // ===== Registrar nueva solicitud =====
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const tipo = document.getElementById("tipoCarga").value.trim();
      const origen = document.getElementById("origen").value.trim();
      const destino = document.getElementById("destino").value.trim();
      const fecha = document.getElementById("fecha").value;
      const peso = document.getElementById("peso").value;

      if (!tipo || !origen || !destino || !fecha || !peso) {
        showToast("⚠️ Completa todos los campos antes de enviar", 3000);
        return;
      }

      // Crear el objeto de solicitud
      const solicitud = {
        tipo,
        origen,
        destino,
        fecha,
        peso,
        estado: "Pendiente"
      };

      // Guardar en localStorage
      const solicitudes = JSON.parse(localStorage.getItem("solicitudesAgroLink")) || [];
      solicitudes.push(solicitud);
      localStorage.setItem("solicitudesAgroLink", JSON.stringify(solicitudes));

      // Mostrar notificación
      showToast("✅ Solicitud registrada exitosamente", 3000);

      // Resetear formulario y mensaje
      form.reset();
      if (mensajeExito) {
        mensajeExito.style.display = "block";
        setTimeout(() => (mensajeExito.style.display = "none"), 2500);
      }
    });
  }

  // ===== Cerrar sesión =====
  if (logout) {
    logout.addEventListener("click", e => {
      e.preventDefault();
      showToast("👋 Sesión cerrada correctamente", 2000);
      localStorage.removeItem("agrolinkRol");

      // Pequeña pausa antes de redirigir
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1200);
    });
  }
});
