// Función para convertir segundos a formato HH:MM:SS
function formatTime(seconds) {
    if (typeof seconds !== "number" || isNaN(seconds)) {
        return "00:00:00"; // Retorna un formato por defecto en caso de error
    }
    const hours = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}:${secs}`;
}

// Función para mostrar el mensaje de muerte
function mostrarMensajeMuerte(piso, tiempo) {
    const deathMessageDiv = document.getElementById("death-message");
    const formattedTime = formatTime(tiempo);

    deathMessageDiv.innerHTML = `
        <h2>You have died!</h2>
        <p>You reached floor: ${piso}</p>
        <p>Your time was: ${formattedTime}</p>
    `;

    deathMessageDiv.style.display = "flex"; // Mostrar el div
}

// Exportar la función
export { mostrarMensajeMuerte };
