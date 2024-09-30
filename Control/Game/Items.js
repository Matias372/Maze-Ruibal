import { abrirCofre } from "./ChestRewards.js";
import { manejarClicBoton } from "./UserInputHandler.js";

// Items.js

// Procesa la recompensa seleccionada y actualiza los atributos del personaje
// Items.js

// Definición de la función procesarRecompensa
export function procesarRecompensa(
    recompensa,
    vida,
    escudo,
    botas,
    torch,
    maxTorch
) {
    // Lógica de procesamiento de recompensa
    // Ejemplo simple:
    switch (recompensa) {
        case "boots":
            // lógica para agregar botas
            botas = true;
            break;
        case "shield":
            // lógica para agregar escudo
            escudo = true;
            break;
        case "torch":
            // lógica para agregar antorcha
            torch = Math.min(torch + 1, maxTorch);
            break;
        case "trap":
            // lógica para manejar trampas
            vida -= 10; // Por ejemplo, pierde 10 de vida
            break;
        default:
            console.error("Recompensa desconocida:", recompensa);
            break;
    }
    return { vida, escudo, botas, torch }; // Asegúrate de devolver los valores actualizados
}

// =========================
// 2. Función para manejar el botón "Usar"
// =========================
export function usarAccion(personaje) {
    if (!personaje.ItemUsed) {
        switch (personaje.escenario) {
            case "Corridor-Fountain (panic)":
            case "Corridor-Fountain (w/ torch)":
            case "Corridor-Fountain":
                personaje.vida = Math.min(
                    personaje.vida + 25,
                    personaje.MAX_VIDA
                );
                personaje.actualizarDOM(); // Llamar al método actualizarDOM de la clase Personaje
                console.log(
                    "Has bebido en la fuente y recuperado vida. Vida actual:",
                    personaje.vida
                );
                break;

            case "Corridor-Chest":
                // Llamar a abrirCofre y actualizar los valores del personaje
                abrirCofre(personaje);
                // No es necesario actualizar DOM manualmente, ya se hace en abrirCofre
                break;

            case "Corridor-Stairs":
                personaje.subsuelo += 1;
                personaje.actualizarDOM(); // Llamar al método actualizarDOM de la clase Personaje
                manejarClicBoton(
                    {
                        target: {
                            matches: (selector) => {
                                return (
                                    selector !== "#boton-explorar" &&
                                    selector !== "#btn-restart"
                                );
                            },
                            classList: {
                                contains: (className) =>
                                    className === "menu__option", // Simula que es un botón de opción del menú
                            },
                        },
                    },
                    personaje
                );
                console.log(
                    "Has subido al siguiente piso. Piso actual:",
                    personaje.subsuelo
                );
                break;

            default:
                console.log("No hay una acción definida para este escenario.");
                break;
        }

        personaje.ItemUsed = true;
    } else {
        console.log("Ya has usado el objeto en este escenario.");
    }
}
