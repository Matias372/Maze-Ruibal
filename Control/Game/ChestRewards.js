import { actualizarDOM } from "./PlayerStatusDisplay.js";
import { procesarRecompensa } from "./Items.js"; // Importa la función para procesar la recompensa

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

    // Define las opciones y sus probabilidades
    const opciones = [];
    const probabilidades = [];

    if (!botas) {
        opciones.push("boots");
        probabilidades.push(0.25); // 25% de probabilidad
    }
    if (!escudo) {
        opciones.push("shield");
        probabilidades.push(0.25); // 25% de probabilidad
    }
    opciones.push("torch");
    probabilidades.push(0.4); // 40% de probabilidad
    opciones.push("trap");
    probabilidades.push(0.1); // 10% de probabilidad

    // Generar un número aleatorio
    const random = Math.random();
    let acumulado = 0;
    let recompensa;

    for (let i = 0; i < opciones.length; i++) {
        acumulado += probabilidades[i];
        if (random < acumulado) {
            recompensa = opciones[i];
            break;
        }
    }

    // Procesar la recompensa
    const resultados = procesarRecompensa(
        recompensa,
        vida,
        escudo,
        botas,
        torch,
        MAX_TORCH
    );

    // Actualizar el DOM con los nuevos valores
    actualizarDOM(
        subsuelo,
        resultados.vida,
        stress,
        resultados.escudo,
        resultados.botas,
        resultados.torch
    );

    // Retornar los nuevos valores
    return resultados;
}
