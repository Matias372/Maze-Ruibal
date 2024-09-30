// TextUpdater.js

import { gameData } from "./ScenariosDescription.js";

// Obtiene las descripciones de los escenarios desde gameData
const descripciones = gameData.scenarios.Positivo.concat(
    gameData.scenarios.Neutro,
    gameData.scenarios.Negativo
).reduce((acc, escenario) => {
    acc[escenario.name] = escenario.description;
    return acc;
}, {});

function actualizarDescripcion(escenario, estado) {
    const descripcionElemento = document.getElementById("scene-description");

    // Verifica si el escenario tiene una descripción
    const escenarioData = descripciones[escenario];

    if (escenarioData) {
        // Para los escenarios con opciones múltiples de descripción
        if (escenario === "Corridor-Trap") {
            descripcionElemento.textContent = estado.botas
                ? escenarioData.withItem
                : escenarioData.default;
        } else if (escenario === "Corridor-Monster") {
            descripcionElemento.textContent = estado.escudo
                ? escenarioData.withItem
                : escenarioData.default;
        } else if (escenario === "Corridor-Fountain (panic)") {
            if (estado.lastFountainFloor === -1) {
                descripcionElemento.textContent = escenarioData.withItem;
            } else {
                descripcionElemento.textContent = escenarioData.default;
            }
        } else {
            // Para los demás escenarios que tienen una única descripción
            descripcionElemento.textContent = escenarioData;
        }
    } else {
        console.error(
            "Descripción no encontrada para el escenario:",
            escenario
        );
    }
}

export { actualizarDescripcion };
