// Importar datos del juego
import { gameData } from "./GameData.js";

const PROB_EVENTO_POSITIVO = 0.25; // 25% de probabilidad de ser un evento positivo
const PROB_EVENTO_NEGATIVO = 0.25; // 25% de probabilidad de ser un evento negativo

// =========================
// 3. Función para generar el tipo de evento
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
// 4. Función para seleccionar escenario según evento
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

// Función auxiliar para seleccionar un escenario aleatorio
function seleccionarEscenarioAleatorio(escenarios) {
    const escenario = escenarios[Math.floor(Math.random() * escenarios.length)];
    return escenario; // Devuelve el objeto completo para obtener el nombre en la función principal
}

// =========================
// 5. Función para mostrar opciones del escenario
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
                botonUsar.innerText = "Drink"; // "Beber" becomes "Drink"
                botonUsar.style.display = "inline-block";
                botonContinuar.style.display = "inline-block"; // "Seguir" becomes "Continue"
                break;
            case "Corridor-Fountain (w/ torch)":
                botonUsar.innerText = "Drink"; // "Beber" becomes "Drink"
                botonUsar.style.display = "inline-block";
                botonContinuar.style.display = "inline-block"; // "Seguir" becomes "Continue"
                break;
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

export { generarEvento, seleccionarEscenario, mostrarOpciones };
