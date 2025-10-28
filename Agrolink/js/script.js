// js/script.js
document.addEventListener("DOMContentLoaded", () => {
  // ====== Menú Responsive ======
  const menuToggle = document.querySelector("#menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("change", () => {
      nav.classList.toggle("active", menuToggle.checked);
    });
  }

  // ====== Enlace activo ======
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // ====== Mostrar/Ocultar campos del transportista ======
  const rolSelect = document.getElementById("rol");
  const camposTransportista = document.getElementById("camposTransportista");

  if (rolSelect && camposTransportista) {
    rolSelect.addEventListener("change", () => {
      const esTransportista = rolSelect.value === "transportista";
      camposTransportista.classList.toggle("hidden", !esTransportista);

      // Limpia los campos si se cambia de transportista a productor
      if (!esTransportista) {
        camposTransportista.querySelectorAll("input").forEach(input => (input.value = ""));
      }
    });
  }

  // ====== Validación de formularios ======
  const forms = document.querySelectorAll(".auth-form");
  forms.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();

      let valid = true;
      const inputs = form.querySelectorAll("input, select");

      inputs.forEach(input => {
        // Ignora campos ocultos (por ejemplo, los de transportista si están ocultos)
        const hiddenParent = input.closest(".hidden");
        if (!hiddenParent && !input.value.trim()) {
          input.classList.add("input-error");
          valid = false;
        } else {
          input.classList.remove("input-error");
        }
      });

      if (!valid) {
        alert("⚠️ Por favor, completa todos los campos requeridos.");
        return;
      }

      alert("✅ Registro enviado correctamente (simulación).");
      form.reset();

      // Vuelve a ocultar los campos del transportista
      if (camposTransportista) camposTransportista.classList.add("hidden");
    });
  });
});
