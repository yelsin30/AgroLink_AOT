// js/auth.js
// Maneja el registro, login y flujo de acceso por rol (productor / transportista)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form");

  if (!form) return;

  // ======= REGISTRO =======
  if (window.location.pathname.includes("registro.html")) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const rol = document.querySelector("#rol").value;
      const nombre = document.querySelector("#nombre").value.trim();
      const email = document.querySelector("#email").value.trim();
      const password = document.querySelector("#password").value.trim();

      if (!rol || !nombre || !email || !password) {
        showToast("Completa todos los campos antes de continuar", "error");
        return;
      }

      // Obtener base de datos o crear una nueva
      const db = getDB();

      // Crear el usuario base si no existe
      if (!db[rol]) db[rol] = {};

      // Crear perfil inicial
      const perfilBase = rol === "productor"
        ? { nombre, email, telefono: "", direccion: "" }
        : { nombre, email, telefono: "", vehiculo: "", placa: "" };

      db[rol].perfil = perfilBase;
      db[rol].solicitudes = db[rol].solicitudes || [];
      db[rol].viajes = db[rol].viajes || [];

      // Guardar la base
      saveDB(db);
      localStorage.setItem("agrolinkRol", rol);

      showToast("Registro exitoso. Redirigiendo...", "success");

      setTimeout(() => {
        window.location.href =
          rol === "productor"
            ? "productor/dashboard.html"
            : "transportista/dashboard.html";
      }, 1200);
    });
  }

  // ======= LOGIN =======
  if (window.location.pathname.includes("login.html")) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const email = document.querySelector("#email").value.trim();
      const password = document.querySelector("#password").value.trim();

      if (!email || !password) {
        showToast("Completa todos los campos", "error");
        return;
      }

      const db = getDB();
      let rolEncontrado = null;

      // Buscar el usuario en la base local (solo por correo)
      for (const rol of ["productor", "transportista"]) {
        const perfil = db[rol]?.perfil;
        if (perfil && perfil.email === email) {
          rolEncontrado = rol;
          break;
        }
      }

      if (!rolEncontrado) {
        showToast("Cuenta no encontrada. Regístrate primero.", "error");
        return;
      }

      // Guardar sesión actual
      localStorage.setItem("agrolinkRol", rolEncontrado);
      showToast("Inicio de sesión correcto", "success");

      setTimeout(() => {
        window.location.href =
          rolEncontrado === "productor"
            ? "productor/dashboard.html"
            : "transportista/dashboard.html";
      }, 1000);
    });
  }
});
