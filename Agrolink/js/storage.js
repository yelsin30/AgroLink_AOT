// ==========================================================
// storage.js - Manejo unificado de la base de datos local AgroLink
// ==========================================================

// === Obtener base de datos general (productor / transportista) ===
function getDB() {
  return JSON.parse(localStorage.getItem("agrolinkDB")) || {
    productor: {},
    transportista: {},
    admin: {},
  };
}

// === Guardar base de datos ===
function saveDB(db) {
  localStorage.setItem("agrolinkDB", JSON.stringify(db));
}

// === Guardar datos en una ruta (rol, clave, valor) ===
// Ejemplo: setData("productor", "perfil", objeto)
function setData(rol, clave, valor) {
  const db = getDB();
  if (!db[rol]) db[rol] = {};
  db[rol][clave] = valor;
  saveDB(db);
}

// === Obtener datos (rol, clave) ===
// Ejemplo: getData("transportista", "envios")
function getData(rol, clave) {
  const db = getDB();
  return db[rol]?.[clave] || null;
}

// === 🧠 Obtener usuario activo actual (cualquiera de las claves) ===
function getActiveUser() {
  return (
    JSON.parse(localStorage.getItem("usuarioActivo")) ||
    JSON.parse(localStorage.getItem("agrolinkUsuario")) ||
    null
  );
}

// === 📌 Guardar datos directamente del usuario activo ===
// Guarda en la base de datos según su rol automáticamente
function saveUserData(clave, valor) {
  const user = getActiveUser();
  if (!user) {
    console.warn("⚠️ No hay sesión activa. No se guardaron los datos.");
    return;
  }
  setData(user.rol, clave, valor);
}

// === 📋 Obtener datos del usuario activo ===
function getUserData(clave) {
  const user = getActiveUser();
  if (!user) return null;
  return getData(user.rol, clave);
}

// === 🧹 Limpiar datos del usuario activo ===
function clearUserData() {
  const user = getActiveUser();
  if (!user) return;
  const db = getDB();
  if (db[user.rol]) {
    db[user.rol] = {};
    saveDB(db);
  }
  console.log(`🧽 Datos de ${user.rol} limpiados correctamente`);
}

// ==========================================================
// Ejemplos de uso:
// ==========================================================
// saveUserData("perfil", { nombre: "Yelsin", region: "Lima" });
// const perfil = getUserData("perfil");
// clearUserData();
// ==========================================================
