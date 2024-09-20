// =========================
// 1. Inicialización y Toma de Datos
// =========================
let subsuelo, escenario, evento, vida, stress, escudo, botas, torch;
let lastScenario;
let lastEvent;
let lastFountainFloor = -1;
let ItemUsed = false;

const MAX_VIDA = 100;
const MAX_STRESS = 100;
const MAX_TORCH = 10;

// =========================
// 1-2. Importar GameData
// =========================
import { gameData } from "./GameData.js";

const escenariosPositivos = gameData.scenarios.positive;
const escenariosNeutros = gameData.scenarios.neutral;
const escenariosNegativos = gameData.scenarios.negative;

// =========================
// 1-3. Pre-carga de Background
// =========================
import { precargarImagenes, escenarioImages } from "./ImageLoader.js";
precargarImagenes();

// =========================
// 1-4. Cargar los Datos del Cofre
// =========================
import { abrirCofre } from "./GameChest.js";

// =========================
// 1-5. Cargar el Timer
// =========================
import { startTimer, stopTimer, checkCharacterLife } from "./ExploreTimer.js";

// =========================
// 1-6. Cargar la Muerte
// =========================
import { mostrarMensajeMuerte } from "./DeathMessage.js";

// =========================
// 2. Función para actualizar el DOM
// =========================
import { actualizarDOM } from "./DOMUtils.js";

// =========================
// 2-1. Cargar los Datos del Personaje
// =========================
function cargarDatosPersonaje() {
    fetch("../../Control/JSON/Personaje.json")
        .then((response) => response.json())
        .then((personaje) => {
            subsuelo = personaje.subsuelo;
            escenario = personaje.escenario;
            evento = personaje.evento;
            vida = Math.min(personaje.vida, MAX_VIDA);
            stress = Math.min(personaje.stress, MAX_STRESS);
            escudo = personaje.escudo;
            botas = personaje.botas;
            torch = Math.min(personaje.torch, MAX_TORCH);

            actualizarDOM(subsuelo, vida, stress, escudo, botas, torch);
        })
        .catch((error) =>
            console.error("Error al cargar los datos del personaje:", error)
        );
}

// Llama a la función cuando necesites cargar los datos
cargarDatosPersonaje();

// =========================
// 3. Función para generar el tipo de evento
// =========================
import {
    generarEvento,
    seleccionarEscenario,
    mostrarOpciones,
} from "./ScenarioManager.js";

// =========================
// 4. Función para actualizar la interfaz al cambiar de escenario
// =========================
import { aplicarDaño, actualizarFiltros } from "./GameUtils.js";

// =========================
// 4-2. Función para verificar escenarios de trampa o monstruo
// =========================
function verificarEscenarioPeligroso(nuevoEscenario) {
    aplicarDaño(nuevoEscenario);
}

// =========================
// 4-3. importar funcion para rellenar la descripción
// =========================
import { actualizarDescripcion } from "./TextUtils.js";

// =========================
// 5. Función para cambiar el escenario
// =========================
function cambiarEscenario(tipo, nuevoEscenario) {
    const sceneEffects = document.querySelector(".scene__effects");
    const background = document.querySelector(".scene__background");

    sceneEffects.classList.add("visible");

    setTimeout(() => {
        if (escenarioImages[nuevoEscenario]) {
            background.style.backgroundImage = `url(${escenarioImages[nuevoEscenario].src})`;
        }

        sceneEffects.classList.remove("visible");

        // Actualiza los parámetros con la función aplicarDaño
        const {
            vida: nuevaVida,
            escudo: nuevoEscudo,
            botas: nuevasBotas,
        } = aplicarDaño(nuevoEscenario, vida, escudo, botas);
        vida = nuevaVida;
        escudo = nuevoEscudo;
        botas = nuevasBotas;

        // Actualiza los filtros
        const { torch: nuevaAntorcha, stress: nuevoStress } = actualizarFiltros(
            torch,
            stress
        );
        torch = nuevaAntorcha;
        stress = nuevoStress;

        ItemUsed = false;
        actualizarDOM(subsuelo, vida, stress, escudo, botas, torch);

        // Llamada a la función para rellenar la descripción
        actualizarDescripcion(nuevoEscenario, botas, escudo, lastFountainFloor);
        mostrarOpciones(tipo, nuevoEscenario);

        if (nuevoEscenario === "StartingRoom") {
            // Recargar los datos del personaje
            cargarDatosPersonaje();
            actualizarDOM(subsuelo, vida, stress, escudo, botas, torch);
        }
        if (vida <= 0) {
            const tiempo = checkCharacterLife(vida);
            mostrarMensajeMuerte(subsuelo, tiempo);
            mostrarOpciones("Neutro", "DeadScene");
            return; // Detener la ejecución si el personaje ha muerto
        }
    }, 1000);
}

// =========================
// 6. importar funcion para verificar el panic
// =========================
import { VerificPanic } from "./VerificPanic.js";
// =========================
// 7. Manejar el clic en el botón para cambiar escenario
// =========================
function manejarClicBoton(event) {
    // Verifica si el target es un elemento HTML antes de intentar acceder a su estilo
    const target = event.target;

    if (
        target.matches("#boton-explorar") &&
        target instanceof HTMLElement &&
        getComputedStyle(target).display !== "none"
    ) {
        stopTimer(); // Detener el cronómetro al explorar
        startTimer(); // Iniciar el cronómetro al explorar
    }

    if (target && target.matches("button.menu__option")) {
        lastEvent = evento;
        lastScenario = escenario;

        if (escenario === "Corridor-TrapHole" && subsuelo > 0) {
            subsuelo -= 1;
        }

        evento = generarEvento();
        escenario = seleccionarEscenario(evento);

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
                escenario === lastScenario) ||
            (escenario === "Corridor-TrapHole" && subsuelo === 0) ||
            escenario === "Corridor-Fountain (panic)" ||
            escenario === "StartingRoom" ||
            escenario === "DeadScene"
        ) {
            evento = generarEvento();
            escenario = seleccionarEscenario(evento);
        }

        if (escenario === "Corridor-Fountain (w/ torch)") {
            torch = Math.min(torch + 5, MAX_TORCH);
        }

        if (
            escenario === "Corridor-Fountain (w/ torch)" ||
            escenario === "Corridor-Fountain"
        ) {
            lastFountainFloor = subsuelo;
        }

        // Verificación de estrés
        if (stress < 100) {
            const panicResult = VerificPanic(stress); // Llama a VerificPanic y obtiene el resultado

            if (panicResult) {
                escenario = "Corridor-Fountain (panic)";
                evento = "Positivo";
                if (lastFountainFloor !== -1) {
                    subsuelo = lastFountainFloor;
                }
                stress += 50;
                cambiarEscenario(evento, escenario);
            } else {
                cambiarEscenario(evento, escenario); // Cambia el escenario si VerificPanic devuelve false
            }
        } else {
            cambiarEscenario(evento, escenario); // Cambia el escenario si el estrés es 100 o más
        }

        // Verificar si se reinicia el juego
        if (
            target.matches("#btn-restart") &&
            vida === 0 &&
            target instanceof HTMLElement &&
            getComputedStyle(target).display !== "none"
        ) {
            location.reload(); // Recargar la página
        }
    }
}

document
    .getElementById("options-container")
    .addEventListener("click", manejarClicBoton);

// =========================
// 10. Función para manejar el botón "Usar"
// =========================
function usarAccion() {
    if (!ItemUsed) {
        switch (escenario) {
            case "Corridor-Fountain (panic)":
                vida = Math.min(vida + 25, MAX_VIDA); // valor minimo entre vida y MAX_VIDA, recordar...
                actualizarDOM(subsuelo, vida, stress, escudo, botas, torch);
                console.log(
                    "Has bebido en la fuente y recuperado vida. Vida actual:",
                    vida
                );
                break;

            case "Corridor-Fountain (w/ torch)":
                vida = Math.min(vida + 25, MAX_VIDA); // valor minimo entre vida y MAX_VIDA, recordar...
                actualizarDOM(subsuelo, vida, stress, escudo, botas, torch);
                console.log(
                    "Has bebido en la fuente y recuperado vida. Vida actual:",
                    vida
                );
                break;

            case "Corridor-Fountain":
                vida = Math.min(vida + 25, MAX_VIDA); // valor minimo entre vida y MAX_VIDA, recordar...
                actualizarDOM(subsuelo, vida, stress, escudo, botas, torch);
                console.log(
                    "Has bebido en la fuente y recuperado vida. Vida actual:",
                    vida
                );
                break;

            case "Corridor-Chest":
                // Llamar a abrirCofre y actualizar los valores del personaje
                const resultadosCofre = abrirCofre(
                    subsuelo,
                    vida,
                    stress,
                    escudo,
                    botas,
                    torch,
                    MAX_TORCH
                );

                // Actualizar las variables con los valores retornados
                vida = resultadosCofre.vida;
                escudo = resultadosCofre.escudo;
                botas = resultadosCofre.botas;
                torch = resultadosCofre.torch;

                // El DOM ya se actualiza dentro de abrirCofre
                break;

            case "Corridor-Stairs":
                subsuelo += 1;
                actualizarDOM(subsuelo, vida, stress, escudo, botas, torch);

                manejarClicBoton({ target: { matches: () => true } });
                console.log(
                    "Has subido al siguiente piso. Piso actual:",
                    subsuelo
                );
                break;

            default:
                console.log("No hay una acción definida para este escenario.");
                break;
        }

        ItemUsed = true;
    } else {
        console.log("Ya has usado el objeto en este escenario.");
    }
}

document.getElementById("btn-usar").addEventListener("click", usarAccion);
