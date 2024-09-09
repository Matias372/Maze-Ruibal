// =========================
// 1. Inicialización y Toma de Datos
// =========================

// Importación de la clase Personaje
import { Personaje } from "./Personaje.js";

// Crear instancia del personaje
const personaje = new Personaje(); // Suponiendo que la clase Personaje ya inicializa atributos como vida, calma, etc.

// Referencias a los botones del menú de opciones
const botonIzquierda = document.getElementById("option-left");
const botonFrente = document.getElementById("option-forward");
const botonDerecha = document.getElementById("option-right");
const botonVolver = document.createElement("button");
const botonUsar = document.createElement("button");
const botonExplorar = document.createElement("button");
const botonContinuar = document.createElement("button");

// Referencias a los elementos del juego en el HTML
const mainMenu = document.getElementById("main-menu");
const gameMain = document.getElementById("game-main");
const sceneBackground = document.querySelector(".scene__background");
const sceneFilter = document.querySelector(".scene__filter");
const sceneEffects = document.querySelector(".scene__effects");
const sceneDescription = document.getElementById("scene-description");

// Referencias a los elementos de la interfaz del jugador
const playerHealthElement = document.getElementById("player-health");
const playerCalmElement = document.getElementById("player-calm");
const playerFloorElement = document.getElementById("player-floor");
const playerTorchElement = document.getElementById("player-torch");

// Variables de control del juego
let escenaActual = "Menu-start"; // Escena inicial

// =========================
// 2. Configuración de Eventos y Funciones Iniciales
// =========================

// Asignación de manejadores de eventos a los botones
botonIzquierda.addEventListener("click", generarEventoAleatorio);
botonFrente.addEventListener("click", generarEventoAleatorio);
botonDerecha.addEventListener("click", generarEventoAleatorio);
botonVolver.addEventListener("click", generarEventoAleatorio);
botonUsar.addEventListener("click", usarObjeto);
botonExplorar.addEventListener("click", generarEventoAleatorio);
botonContinuar.addEventListener("click", verificarVida);

// Inicializar el juego al presionar el botón "Comenzar"
document.getElementById("start-button").addEventListener("click", function () {
    mainMenu.style.display = "none";
    gameMain.style.display = "block";
    actualizarOpciones("Bifurcación"); // Escenario inicial
});

// Ocultar todos los botones de opciones
function ocultarTodosLosBotones() {
    const botones = document.querySelectorAll(".menu__option");
    botones.forEach((boton) => {
        boton.style.display = "none";
    });
}

// Mostrar un botón específico basado en la clase
function mostrarBoton(claseBoton) {
    const boton = document.querySelector("." + claseBoton);
    if (boton) {
        boton.style.display = "block";
    }
}

// =========================
// 3. Funciones Principales del Juego
// =========================

// Genera un evento aleatorio basado en probabilidades
function generarEventoAleatorio() {
    let tipoEscenario = Math.random();
    let escenario;

    if (tipoEscenario < 0.5) {
        escenario = "Bifurcación";
    } else if (tipoEscenario < 0.8) {
        escenario = "Encrucijada";
    } else {
        escenario = "Pelea";
    }

    ejecutarCambioDeEscenario(escenario);
}

// Ejecuta el cambio de escenario con efectos
function ejecutarCambioDeEscenario(escenario) {
    // Aplicar efecto de cambio
    sceneEffects.style.backgroundColor = "black";
    sceneEffects.style.display = "block";

    let audio = new Audio("sonido_transicion.mp3"); // Archivo de sonido de transición
    audio.play();

    setTimeout(function () {
        sceneEffects.style.display = "none"; // Oculta el efecto de cambio

        cambiarEscenario(escenario); // Cambia el escenario mientras el efecto se reproduce
    }, 3000); // Ajusta el tiempo según la duración del efecto y sonido
}

// Cambia el escenario, actualiza la interfaz y filtro
function cambiarEscenario(escenario) {
    // Cambia la imagen de fondo y el texto de descripción según el escenario
    switch (escenario) {
        case "Bifurcación":
            sceneBackground.style.backgroundImage =
                "url('../images/bifurcacion.jpg')";
            sceneDescription.textContent =
                "Te encuentras en una bifurcación. Decide tu camino.";
            break;
        case "Encrucijada":
            sceneBackground.style.backgroundImage =
                "url('../images/encrucijada.jpg')";
            sceneDescription.textContent =
                "Has llegado a una encrucijada. ¿Qué harás?";
            break;
        case "Pelea":
            sceneBackground.style.backgroundImage =
                "url('../images/pelea.jpg')";
            sceneDescription.textContent =
                "¡Una criatura aparece! Prepárate para pelear.";
            break;
        // Otros escenarios pueden ser añadidos aquí
    }

    // Verificar uso de antorcha y ajustar el filtro
    if (personaje.antorchaTurnos > 0) {
        sceneFilter.style.backgroundImage =
            "url('../images/filtro_antorcha.png')";
        personaje.antorchaTurnos--;
    } else {
        sceneFilter.style.backgroundImage = "none"; // Quita el filtro si no hay antorcha
    }

    actualizarInterfazJugador();
    escenarioResultado(escenario);
}

// =========================
// 4. Actualización de la Interfaz del Jugador y Resultados del Escenario
// =========================

// Actualiza la interfaz del jugador (estadísticas)
function actualizarInterfazJugador() {
    playerHealthElement.textContent = personaje.vida;
    playerCalmElement.textContent = personaje.calma;
    playerFloorElement.textContent = personaje.piso;
    playerTorchElement.textContent = personaje.antorchaTurnos;
}

// Ejecuta efectos adicionales según el resultado del escenario
function escenarioResultado(escenario) {
    if (escenario === "Pelea") {
        // Simula daño y efectos visuales
        personaje.vida -= 20;
        sceneEffects.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // Filtro rojo
        sceneBackground.classList.add("shake");

        setTimeout(function () {
            sceneEffects.style.backgroundColor = "transparent"; // Remueve filtro rojo
            sceneBackground.classList.remove("shake");
        }, 1000); // Duración del efecto de sacudida
    }

    actualizarInterfazJugador(); // Actualiza la interfaz después del resultado
}
