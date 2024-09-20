// Función para convertir segundos a formato HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0"); // Calcula las horas
    const minutes = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0"); // Calcula los minutos
    const secs = (seconds % 60).toString().padStart(2, "0"); // Calcula los segundos

    return `${hours}:${minutes}:${secs}`;
}

// Función para mostrar el mensaje de muerte
// Función para mostrar el mensaje de muerte
async function mostrarMensajeMuerte(piso, tiempo) {
    const deathMessageDiv = document.getElementById("death-message");

    // Convertir el tiempo a formato HH:MM:SS
    const formattedTime = formatTime(tiempo);

    // Cambiar el contenido del mensaje de muerte
    deathMessageDiv.innerHTML = `
        <h2>You have died!</h2>
        <p>You reached floor: ${piso}</p>
        <p>Your time was: ${formattedTime}</p>
    `;

    // Mostrar el mensaje
    deathMessageDiv.style.display = "flex"; // Mostrar el div

    // Enviar el piso y el tiempo al servidor
    await enviarDatosMuerte(piso, tiempo);
}

// Función para enviar datos al servidor
async function enviarDatosMuerte(piso, tiempo) {
    try {
        const response = await fetch("../../Module/update_user.php", {
            // Cambia el nombre del archivo según sea necesario
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                floor: piso,
                time: tiempo,
            }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }

        const result = await response.json();
        if (result.status === "success") {
            console.log("Datos actualizados correctamente.");
        } else {
            console.error("Error al actualizar datos:", result.message);
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}

// Exportar la función
export { mostrarMensajeMuerte };
