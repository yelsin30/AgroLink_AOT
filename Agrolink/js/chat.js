// ================================
// AGROLINK - CHAT SINCRONIZADO
// ================================

document.addEventListener("DOMContentLoaded", () => {
  // --- Obtener parámetros de la URL ---
  const params = new URLSearchParams(window.location.search);
  const idEnvio = params.get("id");  // ID único del envío
  const productor = params.get("productor") || "Productor";
  const transportista = params.get("transportista") || "Transportista";

  // --- Elementos del DOM ---
  const chatBody = document.getElementById("chatBody");
  const input = document.getElementById("mensajeInput");
  const enviarBtn = document.getElementById("enviarBtn");

  // --- Determinar rol (productor o transportista) ---
  const rol = localStorage.getItem("agrolinkRol") || "transportista";
  const nombreUsuario =
    JSON.parse(localStorage.getItem("agrolinkUsuario") || "{}").nombre ||
    (rol === "productor" ? "Productor" : "Transportista");

  // --- Clave de almacenamiento por envío ---
  const chatKey = `chat_${idEnvio}`;
  const mensajes = JSON.parse(localStorage.getItem(chatKey)) || [];

  // --- Renderizar mensajes guardados ---
  function renderMensajes() {
    chatBody.innerHTML = "";
    mensajes.forEach((msg) => {
      const div = document.createElement("div");
      div.classList.add("mensaje");
      div.classList.add(msg.remitente === nombreUsuario ? "msg-enviado" : "msg-recibido");
      div.textContent = msg.texto;
      chatBody.appendChild(div);
    });
    chatBody.scrollTop = chatBody.scrollHeight; // auto-scroll
  }

  renderMensajes();

  // --- Enviar nuevo mensaje ---
  function enviarMensaje() {
    const texto = input.value.trim();
    if (!texto) return;

    const nuevoMsg = {
      remitente: nombreUsuario,
      texto,
      fecha: new Date().toISOString(),
    };

    mensajes.push(nuevoMsg);
    localStorage.setItem(chatKey, JSON.stringify(mensajes));

    input.value = "";
    renderMensajes();
  }

  enviarBtn.addEventListener("click", enviarMensaje);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") enviarMensaje();
  });

  // --- Actualización en tiempo real (simulada) ---
  window.addEventListener("storage", (e) => {
    if (e.key === chatKey) {
      const nuevos = JSON.parse(e.newValue || "[]");
      if (nuevos.length !== mensajes.length) {
        mensajes.splice(0, mensajes.length, ...nuevos);
        renderMensajes();
      }
    }
  });
});
