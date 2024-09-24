import { actualizarDOM } from "./Character.js";
import { abrirCofre } from "./ChestRewards.js";
import { manejarClicBoton } from "./UserInputHandler.js";
// Items.js

// Procesa la recompensa seleccionada y actualiza los atributos del personaje
export function procesarRecompensa(
    recompensa,
    vida,
    escudo,
    botas,
    torch,
    MAX_TORCH
) {
    switch (recompensa) {
        case "boots":
            botas = true;
            console.log("Has obtenido unas botas.");
            break;
        case "shield":
            escudo = true;
            console.log("Has obtenido un escudo.");
            break;
        case "torch":
            torch = Math.min(torch + 5, MAX_TORCH); // Aumenta el valor de la antorcha hasta el máximo
            console.log("Has obtenido 5 unidades de antorcha.");
            break;
        case "trap":
            vida = Math.max(vida - 25, 0); // Reducir la vida al caer en una trampa
            console.log("Has caído en una trampa. Vida actual:", vida);
            break;
        default:
            console.error("Recompensa desconocida:", recompensa);
    }

    // Retornar los nuevos valores
    return { vida, escudo, botas, torch };
}

// =========================
// 2. Función para manejar el botón "Usar"
// =========================
export function usarAccion(estado) {
    if (!estado.ItemUsed) {
        switch (estado.escenario) {
            case "Corridor-Fountain (panic)":
                estado.vida = Math.min(estado.vida + 25, estado.MAX_VIDA); // valor minimo entre vida y MAX_VIDA, recordar...
                actualizarDOM(
                    estado.subsuelo,
                    estado.vida,
                    estado.stress,
                    estado.escudo,
                    estado.botas,
                    estado.torch
                );
                console.log(
                    "Has bebido en la fuente y recuperado vida. Vida actual:",
                    estado.vida
                );
                break;

            case "Corridor-Fountain (w/ torch)":
                estado.vida = Math.min(estado.vida + 25, estado.MAX_VIDA); // valor minimo entre vida y MAX_VIDA, recordar...
                actualizarDOM(
                    estado.subsuelo,
                    estado.vida,
                    estado.stress,
                    estado.escudo,
                    estado.botas,
                    estado.torch
                );
                console.log(
                    "Has bebido en la fuente y recuperado vida. Vida actual:",
                    estado.vida
                );
                break;

            case "Corridor-Fountain":
                estado.vida = Math.min(estado.vida + 25, estado.MAX_VIDA); // valor minimo entre vida y MAX_VIDA, recordar...
                actualizarDOM(
                    estado.subsuelo,
                    estado.vida,
                    estado.stress,
                    estado.escudo,
                    estado.botas,
                    estado.torch
                );
                console.log(
                    "Has bebido en la fuente y recuperado vida. Vida actual:",
                    estado.vida
                );
                break;

            case "Corridor-Chest":
                // Llamar a abrirCofre y actualizar los valores del personaje
                const resultadosCofre = abrirCofre(
                    estado.subsuelo,
                    estado.vida,
                    estado.stress,
                    estado.escudo,
                    estado.botas,
                    estado.torch,
                    estado.MAX_TORCH
                );

                // Actualizar las variables con los valores retornados
                estado.vida = resultadosCofre.vida;
                estado.escudo = resultadosCofre.escudo;
                estado.botas = resultadosCofre.botas;
                estado.torch = resultadosCofre.torch;

                // El DOM ya se actualiza dentro de abrirCofre
                break;

            case "Corridor-Stairs":
                estado.subsuelo += 1;
                actualizarDOM(
                    estado.subsuelo,
                    estado.vida,
                    estado.stress,
                    estado.escudo,
                    estado.botas,
                    estado.torch
                );
                //"{ target: { matches: () => true } }" hace que el evento se active.
                manejarClicBoton(
                    {
                        target: {
                            matches: (selector) => {
                                // Devuelve true solo si el botón NO es explorar ni reiniciar
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
                    estado
                );
                console.log(
                    "Has subido al siguiente piso. Piso actual:",
                    estado.subsuelo
                );
                break;

            default:
                console.log("No hay una acción definida para este escenario.");
                break;
        }

        estado.ItemUsed = true;
    } else {
        console.log("Ya has usado el objeto en este escenario.");
    }
}
