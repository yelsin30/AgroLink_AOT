// js/auth.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form");

  // ===== Registro =====
  if (form && window.location.pathname.includes("registro.html")) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const rol = document.querySelector("#rol").value;
      if (!rol) {
        alert("Selecciona un rol antes de continuar.");
        return;
      }
      localStorage.setItem("agrolinkRol", rol);
      alert("Registro exitoso. Redirigiendo a tu panel...");
      window.location.href =
        rol === "productor"
          ? "productor/dashboard.html"
          : "transportista/dashboard.html";
    });
  }

  // ===== Inicio de sesión =====
  if (form && window.location.pathname.includes("login.html")) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const rol = localStorage.getItem("agrolinkRol");
      if (rol === "productor") {
        window.location.href = "productor/dashboard.html";
      } else if (rol === "transportista") {
        window.location.href = "transportista/dashboard.html";
      } else {
        alert("Cuenta no encontrada. Regístrate primero.");
      }
    });
  }
});
