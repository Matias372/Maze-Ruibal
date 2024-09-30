// Importar datos del juego y utilidades
import { gameData } from "./ScenariosDescription.js";
import { aplicarDaño, actualizarFiltros } from "./PlayerDamageAndEffects.js";
import { actualizarDescripcion } from "./TextUpdater.js"; // Importar solo lo necesario
import { checkCharacterLife } from "./ExploreTimer.js";
import { escenarioImages } from "./ImageLoader.js";
import { mostrarMensajeMuerte } from "./DeathMessage.js";

const PROB_EVENTO_POSITIVO = 0.25;
const PROB_EVENTO_NEGATIVO = 0.25;

// =========================
// 1. Función para generar el tipo de evento
// =========================
function generarEvento() {
    let random = Math.random();

    if (random < PROB_EVENTO_POSITIVO) {
        return "Positivo";
    } else if (random < PROB_EVENTO_POSITIVO + PROB_EVENTO_NEGATIVO) {
        return "Negativo";
    } else {
        return "Neutro";
    }
}

// =========================
// 2. Función para seleccionar escenario según evento
// =========================
function seleccionarEscenario(tipo) {
    let escenarioSeleccionado;
    switch (tipo) {
        case "Positivo":
            escenarioSeleccionado = seleccionarEscenarioAleatorio(
                gameData.scenarios.Positivo
            );
            break;
        case "Neutro":
            escenarioSeleccionado = seleccionarEscenarioAleatorio(
                gameData.scenarios.Neutro
            );
            break;
        case "Negativo":
            escenarioSeleccionado = seleccionarEscenarioAleatorio(
                gameData.scenarios.Negativo
            );
            break;
        default:
            console.error("Tipo de escenario desconocido");
            return null;
    }
    return escenarioSeleccionado.name; // Solo devolvemos el nombre del escenario
}

function seleccionarEscenarioAleatorio(escenarios) {
    return escenarios[Math.floor(Math.random() * escenarios.length)];
}

// =========================
// 3. Función para mostrar opciones del escenario
// =========================
function mostrarOpciones(tipo, nuevoEscenario) {
    const botonIzquierda = document.querySelector(".options-Izquierda");
    const botonFrente = document.querySelector(".options-Frente");
    const botonDerecha = document.querySelector(".options-Derecha");
    const botonVolver = document.querySelector(".options-Volver");
    const botonUsar = document.querySelector(".options-Usar");
    const botonExplorar = document.querySelector(".options-Explorar");
    const botonContinuar = document.querySelector(".options-Continuar");
    const botonrestart = document.querySelector(".options-restart");

    // Ocultar todos los botones antes de mostrar las opciones relevantes
    [
        botonIzquierda,
        botonFrente,
        botonDerecha,
        botonVolver,
        botonUsar,
        botonExplorar,
        botonContinuar,
        botonrestart,
    ].forEach((boton) => {
        boton.style.display = "none";
    });

    // Mostrar botones según el escenario
    function obtenerEscenarioPorNombre(tipo, nuevoEscenario) {
        const escenarios = gameData.scenarios[tipo];
        return escenarios.find(
            (scenarios) => scenarios.name === nuevoEscenario
        );
    }

    const escenarioData = obtenerEscenarioPorNombre(tipo, nuevoEscenario);

    if (escenarioData) {
        const opciones = escenarioData.options || [];

        opciones.forEach((opcion) => {
            const boton = document.querySelector(`.${opcion.clase}`);
            if (boton) {
                boton.style.display = "inline-block";
                boton.innerText = opcion.text || boton.innerText;
            }
        });

        // Mostrar opciones especiales basadas en el nombre del escenario
        switch (nuevoEscenario) {
            case "Corridor-3Ways":
                botonIzquierda.style.display = "inline-block";
                botonFrente.style.display = "inline-block";
                botonDerecha.style.display = "inline-block";
                break;
            case "Corridor-RL":
                botonIzquierda.style.display = "inline-block";
                botonDerecha.style.display = "inline-block";
                break;
            case "Corridor-RF":
                botonFrente.style.display = "inline-block";
                botonDerecha.style.display = "inline-block";
                break;
            case "Corridor-LF":
                botonIzquierda.style.display = "inline-block";
                botonFrente.style.display = "inline-block";
                break;
            case "Corridor-DeadEnd":
                botonVolver.style.display = "inline-block";
                break;
            case "Corridor-Stairs":
                botonUsar.innerText = "Go up"; // "subir" becomes "Go up"
                botonUsar.style.display = "inline-block";
                break;
            case "Corridor-Fountain":
            case "Corridor-Fountain (w/ torch)":
            case "Corridor-Fountain (panic)":
                botonUsar.innerText = "Drink"; // "Beber" becomes "Drink"
                botonUsar.style.display = "inline-block";
                botonContinuar.style.display = "inline-block"; // "Seguir" becomes "Continue"
                break;
            case "Corridor-Chest":
                botonUsar.innerText = "Open"; // "Abrir" becomes "Open"
                botonUsar.style.display = "inline-block";
                botonContinuar.style.display = "inline-block"; // "Seguir" becomes "Continue"
                break;
            case "Corridor-Trap":
            case "Corridor-Monster":
            case "Corridor-TrapHole":
                botonContinuar.style.display = "inline-block"; // "Continuar" stays "Continue"
                break;
            case "StartingRoom":
                botonExplorar.style.display = "inline-block";
                break;
            case "DeadScene":
                botonrestart.style.display = "inline-block";
                break;
            default:
                console.error("Unknown scenario:", nuevoEscenario);
        }
    } else {
        console.error("Escenario no encontrado:", nuevoEscenario);
    }
}

// =========================
// 4. Función para cambiar el escenario
// =========================
//REVISAR HAY QUE MODIFICAR ESTO. estado debe tener todas las variables modificar el llamado.
function cambiarEscenario(estado) {
    const sceneEffects = document.querySelector(".scene__effects");
    const background = document.querySelector(".scene__background");

    sceneEffects.classList.add("visible");

    setTimeout(() => {
        if (escenarioImages[estado.escenario]) {
            background.style.backgroundImage = `url(${
                escenarioImages[estado.escenario].src
            })`;
        }

        sceneEffects.classList.remove("visible");

        // Actualiza los parámetros con la función aplicarDaño
        const {
            vida: nuevaVida,
            escudo: nuevoEscudo,
            botas: nuevasBotas,
        } = aplicarDaño(
            estado.escenario,
            estado.vida,
            estado.escudo,
            estado.botas
        );

        // Actualiza el estado del personaje usando métodos de la clase
        estado.vida = nuevaVida;
        estado.escudo = nuevoEscudo;
        estado.botas = nuevasBotas;

        // Actualiza los filtros
        const { torch: nuevaAntorcha, stress: nuevoStress } = actualizarFiltros(
            estado.torch,
            estado.stress
        );
        estado.torch = nuevaAntorcha;
        estado.stress = nuevoStress;

        estado.ItemUsed = false;

        // Actualizar DOM mediante el método de la clase
        estado.actualizarDOM();

        // Llamada a la función para rellenar la descripción
        actualizarDescripcion(
            estado.escenario,
            estado.botas,
            estado.escudo,
            estado.lastFountainFloor
        );
        mostrarOpciones(estado.evento, estado.escenario);

        if (estado.escenario === "StartingRoom") {
            cargarDatosPersonaje(estado);
            estado.actualizarDOM();
        }

        if (estado.vida <= 0) {
            const tiempo = checkCharacterLife(estado.vida);

            // Verifica si tiempo es nulo antes de continuar
            if (tiempo === null) {
                console.error(
                    "Error: Tiempo no válido obtenido de checkCharacterLife."
                );
                return; // O maneja como desees
            }

            mostrarMensajeMuerte(estado.subsuelo, tiempo);
            mostrarOpciones("Neutro", "DeadScene");
            return;
        }
    }, 1000);
}

// Exportar todas las funciones necesarias
export {
    generarEvento,
    seleccionarEscenario,
    mostrarOpciones,
    cambiarEscenario,
};
