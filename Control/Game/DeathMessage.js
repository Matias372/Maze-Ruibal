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
async function enviarDatosMuerte(piso, tiempoEnSegundos) {
    const formattedTime = formatTime(tiempoEnSegundos);

    try {
        // Primero, obtén el ranking actual desde el servidor
        const responseRanking = await fetch("../../Module/get_ranking.php");
        const ranking = await responseRanking.json(); // Supongamos que recibes un arreglo de objetos

        // Buscar el registro correspondiente al piso actual
        const currentRecord = ranking.find(
            (record) => record.floor === piso
        ) || { floor: 0, time: "00:00:00" };

        // Verifica si es un nuevo récord
        if (currentRecord.floor === 0 && currentRecord.time === "00:00:00") {
            // Guarda directamente si el piso es 0 y el tiempo es "00:00:00"
            await guardarDatos(piso, formattedTime);
        } else {
            const newFloor = piso;
            const currentFloor = currentRecord.floor;
            const currentTimeInSeconds = timeToSeconds(currentRecord.time);

            if (
                newFloor > currentFloor ||
                (newFloor === currentFloor &&
                    tiempoEnSegundos < currentTimeInSeconds)
            ) {
                // Solo guarda si el nuevo piso es mayor o si es el mismo piso pero con menor tiempo
                await guardarDatos(newFloor, formattedTime);
            }
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}

async function guardarDatos(piso, tiempo) {
    try {
        const response = await fetch("../../Module/update_user.php", {
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

function timeToSeconds(time) {
    const parts = time.split(":");
    return (
        parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
    );
}

// Exportar la función
export { mostrarMensajeMuerte };
