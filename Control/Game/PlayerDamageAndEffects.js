// Función auxiliar para aplicar daño
export function aplicarDaño(escenario, vida, escudo, botas) {
    const DamageEffects = document.querySelector(".scene__damage-effects");
    const sceneBackground = document.querySelector(".scene__background");
    let mensaje = "";

    if (escenario === "Corridor-Trap") {
        if (!botas) {
            vida = Math.max(vida - 25, 0);
            mostrarEfectoDeDaño(sceneBackground, DamageEffects);
        } else {
            botas = false;
            mensaje = "Botas usadas para evitar daño en el escenario 'Trap'.";
        }
    }

    if (escenario === "Corridor-Monster") {
        if (!escudo) {
            vida = Math.max(vida - 25, 0);
            mostrarEfectoDeDaño(sceneBackground, DamageEffects);
        } else {
            escudo = false;
            mensaje =
                "Escudo usado para evitar daño en el escenario 'Monster'.";
        }
    }

    if (mensaje) {
        console.log(mensaje);
    }

    return { vida, escudo, botas };
}

// Función para mostrar efectos de daño
function mostrarEfectoDeDaño(sceneBackground, DamageEffects) {
    DamageEffects.classList.add("visible");
    sceneBackground.classList.add("animate__animated", "animate__shakeX");

    setTimeout(() => {
        sceneBackground.classList.remove("animate__shakeX");
    }, 500);

    setTimeout(() => {
        DamageEffects.classList.remove("visible");
    }, 500);
}

import { escenarioImages } from "./ImageLoader.js";

// Función auxiliar para actualizar la interfaz
export function actualizarFiltros(torch, stress) {
    const sceneFilter = document.querySelector(".scene__filter");
    const darkFilterImage = escenarioImages["filter-dark"].src;
    const lightFilterImage = escenarioImages["filter-light-Wp"].src;

    torch = Math.max(torch - 1, 0);

    if (
        torch > 0 &&
        sceneFilter.style.backgroundImage === `url("${darkFilterImage}")`
    ) {
        sceneFilter.style.backgroundImage = `url("${lightFilterImage}")`;
        console.log("Antorcha encendida, el filtro oscuro ha sido removido.");
    } else if (torch === 0) {
        sceneFilter.style.backgroundImage = `url(${darkFilterImage})`;
        stress = Math.max(stress - 10, 0);
        console.log("El filtro oscuro ha sido aplicado.");
    } else if (torch > 0 && stress < 100) {
        stress += 5;
    }

    return { torch, stress };
}
