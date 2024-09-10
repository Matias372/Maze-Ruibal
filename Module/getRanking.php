<?php
header('Content-Type: application/json; charset=UTF-8');

include 'db_connection.php';

$ranking = [];

// Verifica si la conexión fue exitosa
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

// Prepara la consulta SQL para obtener el top 10 de jugadores
$sql = "SELECT user, floor, time FROM usuarios ORDER BY floor DESC, time ASC LIMIT 10";
$result = $conn->query($sql);

// Verifica si la consulta fue exitosa
if ($result) {
    if ($result->num_rows > 0) {
        // Salida de cada fila
        while ($row = $result->fetch_assoc()) {
            $ranking[] = $row;
        }
    }
} else {
    // Manejo de errores en caso de que la consulta falle
    echo json_encode(["error" => "Error en la consulta: " . $conn->error]);
    $conn->close();
    exit();
}

$conn->close();

// Devolver resultados en formato JSON
echo json_encode($ranking);
?>
