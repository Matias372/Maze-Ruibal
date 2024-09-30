import {
    cambiarEscenario,
    generarEvento,
    seleccionarEscenario,
} from "./ScenarioManager.js";
import { usarAccion } from "./Items.js";
import { startTimer, stopTimer } from "./ExploreTimer.js"; // Asegúrate de que la ruta sea correcta
import { VerificPanic } from "./VerificPanic.js";

export function manejarClicBoton(event, personaje) {
    const target = event.target;

    if (target.matches("#boton-explorar")) {
        // Lógica para el botón de explorar
        stopTimer(); // Detener el cronómetro al explorar
        startTimer(); // Iniciar el cronómetro al explorar
    }

    if (target.matches("button.menu__option")) {
        const lastEvent = personaje.evento; // Guardar el evento anterior
        const lastScenario = personaje.escenario; // Guardar el escenario anterior

        if (
            personaje.escenario === "Corridor-TrapHole" &&
            personaje.subsuelo > 0
        ) {
            personaje.subsuelo -= 1;
        }

        personaje.evento = generarEvento();
        personaje.escenario = seleccionarEscenario(personaje.evento);

        const restrictedScenarios = [
            "Corridor-DeadEnd",
            "Corridor-Stairs",
            "Corridor-Fountain",
            "Corridor-Chest",
            "Corridor-Monster",
            "Corridor-TrapHole",
            "Corridor-Trap",
            "Corridor-Fountain (w/ torch)",
        ];

        // Evita escenarios restringidos
        while (
            (restrictedScenarios.includes(lastScenario) &&
                personaje.escenario === lastScenario) ||
            (personaje.escenario === "Corridor-TrapHole" &&
                personaje.subsuelo === 0) ||
            personaje.escenario === "Corridor-Fountain (panic)" ||
            personaje.escenario === "StartingRoom" ||
            personaje.escenario === "DeadScene"
        ) {
            personaje.evento = generarEvento();
            personaje.escenario = seleccionarEscenario(personaje.evento);
        }

        if (personaje.escenario === "Corridor-Fountain (w/ torch)") {
            personaje.torch = Math.min(
                personaje.torch + 5,
                personaje.MAX_TORCH
            );
        }

        if (
            personaje.escenario === "Corridor-Fountain (w/ torch)" ||
            personaje.escenario === "Corridor-Fountain"
        ) {
            personaje.lastFountainFloor = personaje.subsuelo;
        }

        // Verificación de estrés
        if (personaje.stress < 100) {
            const panicResult = VerificPanic(personaje.stress); // Llama a VerificPanic y obtiene el resultado

            if (panicResult) {
                personaje.escenario = "Corridor-Fountain (panic)";
                personaje.evento = "Positivo";
                if (personaje.lastFountainFloor !== -1) {
                    personaje.subsuelo = personaje.lastFountainFloor;
                }
                personaje.stress += 50;
                cambiarEscenario(personaje);
            } else {
                cambiarEscenario(personaje); // Cambia el escenario si VerificPanic devuelve false
            }
        } else {
            cambiarEscenario(personaje); // Cambia el escenario si el estrés es 100 o más
        }

        personaje.actualizarDOM(); // Actualizar el DOM después de cambiar el escenario o estrés
    }

    // Verificar si se reinicia el juego
    if (
        target.matches("#btn-restart") &&
        personaje.vida === 0 &&
        target instanceof HTMLElement &&
        getComputedStyle(target).display !== "none"
    ) {
        location.reload(); // Recargar la página
    }
}

// Lógica para manejar el uso de objetos
export function usarObjeto(personaje) {
    usarAccion(personaje); // Llama a usarAccion con la instancia de personaje
}
