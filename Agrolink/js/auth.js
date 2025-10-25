// js/auth.js — versión corregida y mejorada
document.addEventListener("DOMContentLoaded", () => {
  const registroForm = document.querySelector(".auth-form[action='registro']");
  const loginForm = document.querySelector(".auth-form[action='login']");

  // === REGISTRO ===
  if (registroForm) {
    registroForm.addEventListener("submit", e => {
      e.preventDefault();

      const rol = document.getElementById("rol").value.trim();
      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!rol || !nombre || !email || !password) {
        alert("Por favor, completa todos los campos antes de continuar.");
        return;
      }

      // Obtener lista de usuarios almacenados
      const usuarios = JSON.parse(localStorage.getItem("agrolinkUsuarios")) || [];

      // Verificar si ya existe el correo
      const existe = usuarios.find(u => u.email === email);
      if (existe) {
        alert("Este correo ya está registrado. Inicia sesión en su lugar.");
        window.location.href = "login.html";
        return;
      }

      // Guardar nuevo usuario
      usuarios.push({ rol, nombre, email, password });
      localStorage.setItem("agrolinkUsuarios", JSON.stringify(usuarios));

      // Guardar sesión activa
      localStorage.setItem("usuarioActivo", JSON.stringify({ email, rol, nombre }));

      alert("Registro exitoso. Bienvenido a AgroLink.");
      if (rol === "productor") {
        window.location.href = "productor/dashboard.html";
      } else {
        window.location.href = "transportista/dashboard.html";
      }
    });
  }

  // === INICIO DE SESIÓN ===
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const usuarios = JSON.parse(localStorage.getItem("agrolinkUsuarios")) || [];
      const user = usuarios.find(u => u.email === email && u.password === password);

      if (!user) {
        alert("⚠️ No se encontró una cuenta registrada. Por favor regístrate.");
        return;
      }

      // Guardar sesión
      localStorage.setItem("usuarioActivo", JSON.stringify(user));
      localStorage.setItem("agrolinkRol", user.rol);

      // Redirigir según el rol
      if (user.rol === "productor") {
        window.location.href = "productor/dashboard.html";
      } else {
        window.location.href = "transportista/dashboard.html";
      }
    });
  }
});
