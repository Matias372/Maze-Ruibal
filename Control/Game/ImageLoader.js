// ImageLoader.js

// Datos de imágenes para precargar
const imagenes = [
    {
        id: "StartingRoom",
        src: "../../Assets/Background/Corridor-Straigth.webp",
    },
    {
        id: "Corridor-Straigth",
        src: "../../Assets/Background/Corridor-Straigth.webp",
    },
    {
        id: "Corridor-3Ways",
        src: "../../Assets/Background/Corridor-3ways.webp",
    },
    { id: "Corridor-LF", src: "../../Assets/Background/Corridor-LF.webp" },
    { id: "Corridor-RF", src: "../../Assets/Background/Corridor-RF.webp" },
    { id: "Corridor-RL", src: "../../Assets/Background/Corridor-RL.webp" },
    {
        id: "Corridor-DeadEnd",
        src: "../../Assets/Background/Corridor-DeadEnd.webp",
    },
    {
        id: "Corridor-Stairs",
        src: "../../Assets/Background/Corridor-Stairs.webp",
    },
    { id: "Corridor-Trap", src: "../../Assets/Background/Corridor-Trap.webp" },
    {
        id: "Corridor-TrapHole",
        src: "../../Assets/Background/Corridor-TrapHole.webp",
    },
    { id: "Corridor-Wall", src: "../../Assets/Background/Corridor-Wall.webp" },
    { id: "filter-dark", src: "../../Assets/Background/filter-dark.png" },
    {
        id: "filter-light-Wp",
        src: "../../Assets/Background/filter-light-Wp.webp",
    },
    {
        id: "Corridor-Monster",
        src: "../../Assets/Monster/Monster-background.png",
    },
    { id: "Corridor-Chest", src: "../../Assets/Background/Wall-Chest.webp" },
    {
        id: "Corridor-Fountain",
        src: "../../Assets/Background/Wall-Fountain.webp",
    },
    {
        id: "Corridor-Fountain (w/ torch)",
        src: "../../Assets/Background/Wall-Fountain.webp",
    },
    {
        id: "Corridor-Fountain (panic)",
        src: "../../Assets/Background/Wall-Fountain.webp",
    },
];

// Objeto para almacenar las imágenes precargadas
export const escenarioImages = {};

// Función para precargar las imágenes
export function precargarImagenes() {
    imagenes.forEach((imagen) => {
        const img = new Image();
        img.src = imagen.src;
        escenarioImages[imagen.id] = img;
    });
}
