import { Personaje } from "./Character.js";
import { manejarClicBoton, usarObjeto } from "./UserInputHandler.js";
import { precargarImagenes } from "./ImageLoader.js";

// =========================
// 1. variables globales
// =========================
const estadoPersonaje = new Personaje();

// =========================
// 2. Funciones de inicialización
// =========================
precargarImagenes();
// Inicialización y variables globales...
estadoPersonaje.cargarDatos();
estadoPersonaje.actualizarDOM();

// =========================
// 3. Manejo de eventos
// =========================
document
    .getElementById("options-container")
    .addEventListener("click", (event) =>
        manejarClicBoton(event, estadoPersonaje)
    );

document
    .getElementById("btn-usar")
    .addEventListener("click", () => usarObjeto(estadoPersonaje));
