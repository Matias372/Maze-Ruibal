import { cargarDatosPersonaje, actualizarDOM } from "./Character.js";
import { manejarClicBoton, usarObjeto } from "./UserInputHandler.js";
import { precargarImagenes } from "./ImageLoader.js";

// =========================
// 1. variables globales
// =========================
let estadoPersonaje = {
    subsuelo: 0,
    escenario: "StartingRoom",
    evento: "Neutro",
    vida: 100,
    stress: 0,
    escudo: 0,
    botas: 0,
    torch: 0,
    lastEvent: "Neutro",
    lastScenario: "StartingRoom",
    lastFountainFloor: -1,
    ItemUsed: false,
    MAX_VIDA: 100,
    MAX_STRESS: 100,
    MAX_TORCH: 10,
};

// =========================
// 2. Funciones de inicialización
// =========================
precargarImagenes();
// Inicialización y variables globales...
cargarDatosPersonaje(estadoPersonaje);
actualizarDOM(
    estadoPersonaje.subsuelo,
    estadoPersonaje.vida,
    estadoPersonaje.stress,
    estadoPersonaje.escudo,
    estadoPersonaje.botas,
    estadoPersonaje.torch
);

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
