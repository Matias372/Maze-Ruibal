// =========================
// 1. Inicialización y Toma de Datos
// =========================

// Declarar variables fuera del fetch para poder utilizarlas en todo el archivo
let subsuelo, escenario, evento, vida, stress, escudo, botas, torch;
// Definir las variables para almacenar el último evento y escenario
let lastEvent, lastScenario;
//guardamos piso de la ultima fuente.
let lastFountainFloor;
let ItemUsed = false;

// Definir los valores máximos permitidos
const MAX_VIDA = 100;
const MAX_STRESS = 100;
const MAX_TORCH = 10;

// Inicializar las probabilidades de los eventos
const PROB_EVENTO_NEUTRO = 0.5; // 60% de probabilidad de ser un evento neutro
const PROB_EVENTO_POSITIVO = 0.25; // 20% de probabilidad de ser un evento positivo
const PROB_EVENTO_NEGATIVO = 0.25; // 20% de probabilidad de ser un evento negativo

// =========================
// 1-1. PRE-CARGA DE BACKGROUD
// =========================
const escenarioImages = {};

// Precargar imágenes
function precargarImagenes() {
    const imagenes = [
        {
            id: "Corridor-Straigth",
            src: "../../Assets/Background/Corridor-Straigth.webp",
        },
        {
            id: "Corridor-3Ways",
            src: "../../Assets/Background/Corridor-3ways.webp",
        },
        {
            id: "Corridor-LF",
            src: "../../Assets/Background/Corridor-LF.webp",
        },
        {
            id: "Corridor-RF",
            src: "../../Assets/Background/Corridor-RF.webp",
        },
        {
            id: "Corridor-RL",
            src: "../../Assets/Background/Corridor-RL.webp",
        },
        {
            id: "Corridor-DeadEnd",
            src: "../../Assets/Background/Corridor-DeadEnd.webp",
        },
        {
            id: "Corridor-Stairs",
            src: "../../Assets/Background/Corridor-Stairs.webp",
        },
        {
            id: "Corridor-Trap",
            src: "../../Assets/Background/Corridor-Trap.webp",
        },
        {
            id: "Corridor-TrapHole",
            src: "../../Assets/Background/Corridor-TrapHole.webp",
        },
        {
            id: "Corridor-Wall",
            src: "../../Assets/Background/Corridor-Wall.webp",
        },
        {
            id: "filter-dark",
            src: "../../Assets/Background/filter-dark.png",
        },
        {
            id: "filter-light-Wp",
            src: "../../Assets/Background/filter-light-Wp.webp",
        },
        {
            id: "Corridor-Monster",
            src: "../../Assets/Background/Corridor-Straigth.webp",
        }, //CAMBIAR DESPUES POR IMAGEN DE MONSTER
        {
            id: "Corridor-Chest",
            src: "../../Assets/Background/Wall-Chest.webp",
        },
        {
            id: "Corridor-Fountain",
            src: "../../Assets/Background/Wall-Fountain.webp",
        },
    ];

    imagenes.forEach((imagen) => {
        const img = new Image();
        img.src = imagen.src;
        escenarioImages[imagen.id] = img;
    });
}

// Llamar a la función para precargar las imágenes
precargarImagenes();

// =========================
// 1-2. Cargar los datos del personaje
// =========================

fetch("../../Control/JSON/Personaje.json")
    .then((response) => response.json())
    .then((personaje) => {
        // Aquí puedes manipular el objeto `personaje`
        subsuelo = personaje.subsuelo;
        escenario = personaje.escenario;
        evento = personaje.evento;
        vida = Math.min(personaje.vida, MAX_VIDA); // Limitar a MAX_VIDA
        stress = Math.min(personaje.stress, MAX_STRESS); // Limitar a MAX_STRESS
        escudo = personaje.escudo;
        botas = personaje.botas;
        torch = Math.min(personaje.torch, MAX_TORCH); // Limitar a MAX_TORCH

        // Aquí puedes usar las variables para actualizar el DOM o la lógica del juego
        console.log(
            "Datos del personaje cargados:",
            subsuelo,
            escenario,
            evento,
            vida,
            stress,
            escudo,
            botas,
            torch
        );

        // Llamar a las funciones que actualizan el DOM una vez que se tienen los datos
        actualizarDOM();
    })
    .catch((error) =>
        console.error("Error al cargar los datos del personaje:", error)
    );

// =========================
// 2. Función para actualizar el DOM
// =========================
function actualizarDOM() {
    document.getElementById("player-floor").innerText = subsuelo;

    // Actualizar vida
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`player-health-${i}`).style.filter =
            i <= vida / 25 ? "none" : "grayscale(100%)";
    }

    // Actualizar stress
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`player-brain-${i}`).style.filter =
            i <= stress / 25 ? "none" : "grayscale(100%)";
    }

    // Actualizar escudo
    document.getElementById("player-shield").style.filter = escudo
        ? "none"
        : "grayscale(100%)";

    // Actualizar botas
    document.getElementById("player-boots").style.filter = botas
        ? "none"
        : "grayscale(100%)";

    // Actualizar antorcha
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`player-torch-${i}`).style.filter =
            i <= torch ? "none" : "grayscale(100%)";
    }
}

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
function seleccionarEscenario(evento) {
    switch (evento) {
        case "Neutro":
            return seleccionarEscenarioNeutro();
        case "Positivo":
            return seleccionarEscenarioPositivo();
        case "Negativo":
            return seleccionarEscenarioNegativo();
        default:
            console.error("Tipo de evento desconocido");
            return null;
    }
}

// Funciones para seleccionar escenarios según su tipo
function seleccionarEscenarioNeutro() {
    const opciones = [
        "Corridor-3Ways",
        "Corridor-RL",
        "Corridor-RF",
        "Corridor-LF",
        "Corridor-DeadEnd",
    ];
    return opciones[Math.floor(Math.random() * opciones.length)];
}

function seleccionarEscenarioPositivo() {
    const opciones = ["Corridor-Stairs", "Corridor-Fountain", "Corridor-Chest"];
    return opciones[Math.floor(Math.random() * opciones.length)];
}

function seleccionarEscenarioNegativo() {
    const opciones = ["Corridor-Trap", "Corridor-Monster", "Corridor-TrapHole"];
    return opciones[Math.floor(Math.random() * opciones.length)];
}

// =========================
// 4. Función para cambiar el escenario (implementación futura)
// =========================
function mostrarOpciones(nuevoEscenario) {
    const botonIzquierda = document.querySelector(".options-Izquierda");
    const botonFrente = document.querySelector(".options-Frente");
    const botonDerecha = document.querySelector(".options-Derecha");
    const botonVolver = document.querySelector(".options-Volver");
    const botonUsar = document.querySelector(".options-Usar");
    const botonExplorar = document.getElementById("boton-explorar");
    const botonContinuar = document.querySelector(".options-Continuar");

    // Ocultar todos los botones antes de mostrar las opciones relevantes
    [
        botonIzquierda,
        botonFrente,
        botonDerecha,
        botonVolver,
        botonUsar,
        botonExplorar,
        botonContinuar,
    ].forEach((boton) => {
        boton.style.display = "none";
    });

    // Mostrar botones según el escenario
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
            botonUsar.innerText = "Go up"; // "subir" becomes "Drink"
            botonUsar.style.display = "inline-block";
            break;
        case "Corridor-Fountain":
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
        default:
            console.error("Unknown scenario:", nuevoEscenario);
    }
}

// =========================
// 6. Función para actualizar la interfaz al cambiar de escenario
// =========================
function actualizarInterfaz() {
    // Reducir Torch en 1
    torch = Math.max(torch - 1, 0);

    // Si la Torch llega a 0, cambiar el filtro y reducir Stress
    if (torch === 0) {
        document.querySelector(
            ".scene__filter"
        ).style.backgroundImage = `url(${escenarioImages["filter-dark"].src})`;
        stress = Math.max(stress - 10, 0);
    }

    // Actualizar antorcha en el DOM
    actualizarDOM();

    ItemUsed = false;
}

// =========================
// 7. Función para verificar escenarios de trampa o monstruo
// =========================
function verificarEscenarioPeligroso(nuevoEscenario) {
    const DamageEffects = document.querySelector(".scene__damage-effects");

    // Verificar si es un escenario peligroso
    if (nuevoEscenario === "Corridor-Trap") {
        if (!botas) {
            // Si el jugador no tiene botas, aplicar daño
            vida = Math.max(vida - 25, 0);
            DamageEffects.classList.add("visible");
            setTimeout(() => {
                DamageEffects.classList.remove("visible");
            }, 500);
        } else {
            // Si el jugador tiene botas, eliminarlas
            botas = false;
            console.log(
                "Botas usadas para evitar daño en el escenario 'Trap'."
            );
        }
    }

    if (nuevoEscenario === "Corridor-Monster") {
        if (!escudo) {
            // Si el jugador no tiene escudo, aplicar daño
            vida = Math.max(vida - 25, 0);
            DamageEffects.classList.add("visible");
            setTimeout(() => {
                DamageEffects.classList.remove("visible");
            }, 500);
        } else {
            // Si el jugador tiene escudo, eliminarlo
            escudo = false;
            console.log(
                "Escudo usado para evitar daño en el escenario 'Monster'."
            );
        }
    }

    // Actualizar la interfaz del jugador
    actualizarDOM();
}

// =========================
// 8. Función para cambiar el escenario
// =========================
function cambiarEscenario(nuevoEscenario) {
    const sceneEffects = document.querySelector(".scene__effects");
    const background = document.querySelector(".scene__background");

    // Mostrar el efecto de oscurecimiento
    sceneEffects.classList.add("visible");

    // Esperar la animación de oscurecimiento
    setTimeout(() => {
        // Cambiar la imagen del fondo
        if (escenarioImages[nuevoEscenario]) {
            background.style.backgroundImage = `url(${escenarioImages[nuevoEscenario].src})`;
        }

        // Ocultar el efecto de oscurecimiento
        sceneEffects.classList.remove("visible");

        // Verificar si es un escenario peligroso
        verificarEscenarioPeligroso(nuevoEscenario);

        // Actualizar la interfaz relacionada con el escenario
        actualizarInterfaz();

        // Mostrar las opciones para el nuevo escenario
        mostrarOpciones(nuevoEscenario);
    }, 1000);
}

// =========================
// 9. Manejar el clic en el botón para cambiar escenario
// =========================
document
    .getElementById("options-container")
    .addEventListener("click", (event) => {
        if (event.target && event.target.matches("button.menu__option")) {
            lastEvent = evento;
            lastScenario = escenario;

            // Generar un nuevo evento y escenario
            evento = generarEvento();
            escenario = seleccionarEscenario(evento);

            // Evitar escenarios repetidos
            const restrictedScenarios = [
                "Corridor-DeadEnd",
                "Corridor-Stairs",
                "Corridor-Fountain",
                "Corridor-Chest",
                "Corridor-Monster",
                "Corridor-TrapHole",
                "Corridor-Trap",
            ];

            // Si el nuevo escenario es el mismo que el anterior y está en los escenarios restringidos, se vuelve a generar
            while (
                restrictedScenarios.includes(lastScenario) &&
                escenario === lastScenario
            ) {
                evento = generarEvento();
                escenario = seleccionarEscenario(evento);
            }

            // Nueva verificación: evitar el escenario "TrapHole" si el floor es 0
            while (escenario === "Corridor-TrapHole" && subsuelo === 0) {
                evento = generarEvento();
                escenario = seleccionarEscenario(evento);
            }

            // Ejecutar el cambio de escenario
            cambiarEscenario(escenario);
        }
    });

// =========================
// 10. Función para manejar el botón "Usar"
// =========================
function usarAccion() {
    if (ItemUsed === false) {
        // Verifica si el objeto no ha sido usado
        switch (escenario) {
            case "Corridor-Fountain":
                // Al usar la fuente, aumentar la vida en 25, sin exceder el máximo permitido
                vida = Math.min(vida + 25, MAX_VIDA);
                actualizarDOM();
                console.log(
                    "Has bebido en la fuente y recuperado vida. Vida actual:",
                    vida
                );
                break;

            case "Corridor-Chest":
                // Al abrir el cofre, generar una recompensa basada en probabilidades
                abrirCofre();
                break;

            case "Corridor-Stairs":
                // Al usar las escaleras, aumentar el valor del piso
                subsuelo += 1;
                actualizarDOM();
                console.log(
                    "Has subido al siguiente piso. Piso actual:",
                    subsuelo
                );
                break;

            default:
                console.log("No hay una acción definida para este escenario.");
                break;
        }

        // Cambiar ItemUsed a true después de usar el objeto
        ItemUsed = true;
    } else {
        console.log("Ya has usado el objeto en este escenario.");
    }
}

// Función para abrir el cofre y generar recompensa
// Función para abrir el cofre y generar recompensa
function abrirCofre() {
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

    actualizarDOM();
}

// Agregar un listener para el botón "Usar"
document.getElementById("btn-usar").addEventListener("click", usarAccion);
