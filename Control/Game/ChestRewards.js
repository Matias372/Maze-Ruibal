import { procesarRecompensa } from "./Items.js"; // Importa la función para procesar la recompensa

// Modifica la función abrirCofre para recibir el objeto Personaje
// Modifica la función abrirCofre
export function abrirCofre(personaje) {
    console.log("Personaje antes de abrir el cofre:", personaje);

    // Define las opciones y sus probabilidades
    const opciones = [];
    const probabilidades = [];
    let totalProbabilidad = 0;

    if (!personaje.botas) {
        opciones.push("boots");
        probabilidades.push(0.25); // 25% de probabilidad
        totalProbabilidad += 0.25;
    }
    if (!personaje.escudo) {
        opciones.push("shield");
        probabilidades.push(0.25); // 25% de probabilidad
        totalProbabilidad += 0.25;
    }

    opciones.push("torch");
    probabilidades.push(0.4); // 40% de probabilidad
    totalProbabilidad += 0.4;

    opciones.push("trap");
    probabilidades.push(0.1); // 10% de probabilidad
    totalProbabilidad += 0.1;

    // Asegurarse de que las probabilidades sumen a 1
    if (totalProbabilidad < 1) {
        // Ajustar probabilidades para que sumen 1
        const ajustar = 1 - totalProbabilidad;
        probabilidades[probabilidades.length - 1] += ajustar; // Añadir el resto a la última opción
    }

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
        personaje.vida,
        personaje.escudo,
        personaje.botas,
        personaje.torch,
        personaje.MAX_TORCH
    );

    // Actualizar los valores en la instancia de personaje
    personaje.vida = resultados.vida;
    personaje.escudo = resultados.escudo;
    personaje.botas = resultados.botas;
    personaje.torch = resultados.torch;

    // Actualizar el DOM usando el método de la clase Personaje
    personaje.actualizarDOM();

    // Retornar el objeto personaje actualizado (si es necesario)
    return personaje;
}
