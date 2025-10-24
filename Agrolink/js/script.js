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

  // ====== Validación básica de formularios ======
  const forms = document.querySelectorAll(".auth-form");
  forms.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const inputs = form.querySelectorAll("input, select");
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add("input-error");
          valid = false;
        } else {
          input.classList.remove("input-error");
        }
      });

      if (valid) {
        alert("Formulario enviado correctamente (simulación).");
        form.reset();
      }
    });
  });
});
