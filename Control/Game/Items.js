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
export function usarAccion() {
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
