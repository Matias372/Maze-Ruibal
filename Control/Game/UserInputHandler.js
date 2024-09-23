import {
    cambiarEscenario,
    generarEvento,
    seleccionarEscenario,
} from "./ScenarioManager.js";
import { usarAccion } from "./Items.js";
import { startTimer, stopTimer } from "./ExploreTimer.js"; // Asegúrate de que la ruta sea correcta

export function manejarClicBoton(event, estado) {
    const target = event.target;

    if (target.matches("#boton-explorar")) {
        // Lógica para el botón de explorar
        stopTimer(); // Detener el cronómetro al explorar
        startTimer(); // Iniciar el cronómetro al explorar
    }

    if (target.matches("button.menu__option")) {
        const lastEvent = estado.evento; // Guardar el evento anterior
        const lastScenario = estado.escenario; // Guardar el escenario anterior

        if (estado.escenario === "Corridor-TrapHole" && estado.subsuelo > 0) {
            estado.subsuelo -= 1;
        }

        estado.evento = generarEvento();
        estado.escenario = seleccionarEscenario(estado.evento);

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
                estado.escenario === lastScenario) ||
            (estado.escenario === "Corridor-TrapHole" &&
                estado.subsuelo === 0) ||
            estado.escenario === "Corridor-Fountain (panic)" ||
            estado.escenario === "StartingRoom" ||
            estado.escenario === "DeadScene"
        ) {
            estado.evento = generarEvento();
            estado.escenario = seleccionarEscenario(estado.evento);
        }

        if (estado.escenario === "Corridor-Fountain (w/ torch)") {
            estado.torch = Math.min(estado.torch + 5, MAX_TORCH);
        }

        if (
            estado.escenario === "Corridor-Fountain (w/ torch)" ||
            estado.escenario === "Corridor-Fountain"
        ) {
            lastFountainFloor = estado.subsuelo;
        }

        // Verificación de estrés
        if (estado.stress < 100) {
            const panicResult = VerificPanic(estado.stress); // Llama a VerificPanic y obtiene el resultado

            if (panicResult) {
                estado.escenario = "Corridor-Fountain (panic)";
                estado.evento = "Positivo";
                if (lastFountainFloor !== -1) {
                    estado.subsuelo = lastFountainFloor;
                }
                estado.stress += 50;
                cambiarEscenario(estado.evento, estado.escenario);
            } else {
                cambiarEscenario(estado.evento, estado.escenario); // Cambia el escenario si VerificPanic devuelve false
            }
        } else {
            cambiarEscenario(estado.evento, estado.escenario); // Cambia el escenario si el estrés es 100 o más
        }
    }

    // Verificar si se reinicia el juego
    if (
        target.matches("#btn-restart") &&
        estado.vida === 0 &&
        target instanceof HTMLElement &&
        getComputedStyle(target).display !== "none"
    ) {
        location.reload(); // Recargar la página
    }
}

// Lógica para manejar el uso de objetos
export function usarObjeto() {
    usarAccion();
}
