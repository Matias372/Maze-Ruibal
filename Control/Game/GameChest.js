// GameChests.js
import { actualizarDOM } from "./DOMUtils.js";

// Modifica la función abrirCofre para recibir los datos del personaje como parámetros
export function abrirCofre(
    subsuelo,
    vida,
    stress,
    escudo,
    botas,
    torch,
    MAX_TORCH
) {
    console.log("Parámetros recibidos:", {
        subsuelo,
        vida,
        stress,
        escudo,
        botas,
        torch,
        MAX_TORCH,
    });

    const opciones = [];
    if (!botas) opciones.push("boots");
    if (!escudo) opciones.push("shield");
    opciones.push("torch", "trap");

    // Generar un índice aleatorio para seleccionar la recompensa
    const recompensa = opciones[Math.floor(Math.random() * opciones.length)];

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

    // Actualizar el DOM con los nuevos valores
    actualizarDOM(subsuelo, vida, stress, escudo, botas, torch);

    // Retornar los nuevos valores
    return { vida, escudo, botas, torch };
}
