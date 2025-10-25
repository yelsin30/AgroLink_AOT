// js/storage.js
// ===== Funciones para manejar la base de datos local unificada =====
function getDB() {
  return JSON.parse(localStorage.getItem("agrolinkDB")) || { productor: {}, transportista: {} };
}

function saveDB(db) {
  localStorage.setItem("agrolinkDB", JSON.stringify(db));
}

// Guardar datos en una ruta: ej. ("productor", "perfil", objeto)
function setData(rol, clave, valor) {
  const db = getDB();
  if (!db[rol]) db[rol] = {};
  db[rol][clave] = valor;
  saveDB(db);
}

// Obtener datos: ej. getData("productor", "perfil")
function getData(rol, clave) {
  const db = getDB();
  return db[rol]?.[clave] || null;
}
