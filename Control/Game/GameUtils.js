// Función auxiliar para aplicar daño
export function aplicarDaño(escenario, vida, escudo, botas) {
    const DamageEffects = document.querySelector(".scene__damage-effects");
    const sceneBackground = document.querySelector(".scene__background"); // Selecciona el div de fondo
    let mensaje = "";

    if (escenario === "Corridor-Trap") {
        if (!botas) {
            vida = Math.max(vida - 25, 0);
            DamageEffects.classList.add("visible");

            // Añadir clase de animación de sacudida
            sceneBackground.classList.add(
                "animate__animated",
                "animate__shakeX"
            );
            setTimeout(
                () => sceneBackground.classList.remove("animate__shakeX"),
                500
            ); // Remover la animación después de 500ms

            setTimeout(() => DamageEffects.classList.remove("visible"), 500);
        } else {
            botas = false;
            mensaje = "Botas usadas para evitar daño en el escenario 'Trap'.";
        }
    }

    if (escenario === "Corridor-Monster") {
        if (!escudo) {
            vida = Math.max(vida - 25, 0);
            DamageEffects.classList.add("visible");

            // Añadir clase de animación de sacudida
            sceneBackground.classList.add(
                "animate__animated",
                "animate__shakeX"
            );
            setTimeout(
                () => sceneBackground.classList.remove("animate__shakeX"),
                500
            ); // Remover la animación después de 500ms

            setTimeout(() => DamageEffects.classList.remove("visible"), 500);
        } else {
            escudo = false;
            mensaje =
                "Escudo usado para evitar daño en el escenario 'Monster'.";
        }
    }

    if (mensaje) {
        console.log(mensaje);
    }

    // Actualizar la interfaz del jugador
    return { vida, escudo, botas };
}

import { escenarioImages } from "./ImageLoader.js";
// Función auxiliar para actualizar la interfaz
export function actualizarFiltros(torch, stress) {
    const sceneFilter = document.querySelector(".scene__filter");
    const darkFilterImage = escenarioImages["filter-dark"].src;
    const lightFilterImage = escenarioImages["filter-light-Wp"].src;

    torch = Math.max(torch - 1, 0);
    // Si la antorcha es mayor a 0 y el fondo es "filter-dark", se cambia
    if (
        torch > 0 &&
        sceneFilter.style.backgroundImage === `url("${darkFilterImage}")`
    ) {
        sceneFilter.style.backgroundImage = `url("${lightFilterImage}")`; // Restablecer a un estado más claro
        console.log("Antorcha encendida, el filtro oscuro ha sido removido.");
    }

    // Caso normal: si la antorcha está en 0, aplicar el filtro oscuro

    if (torch === 0) {
        console.log("escenarioImages:", escenarioImages); // Verifica si escenarioImages está definido
        console.log(
            "Ruta de filtro oscuro:",
            escenarioImages["filter-dark"]
                ? escenarioImages["filter-dark"].src
                : "No se encuentra el filtro oscuro"
        );

        sceneFilter.style.backgroundImage = `url(${darkFilterImage})`;

        stress = Math.max(stress - 10, 0);
    }

    if (torch > 0 && stress < 100) {
        stress = stress + 5;
    }

    // Llamada a la función actualizarDOM que necesita los parámetros
    // Deberías definir actualizarDOM en GameLogic.js y pasarle los parámetros
    return { torch, stress };
}
