<?php
header('Content-Type: application/json; charset=UTF-8');

include 'db_connection.php';

$ranking = [];

// Verifica si la conexión fue exitosa
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

// Prepara y ejecuta la consulta SQL para obtener el ranking
$sql = "SELECT floor, time FROM usuarios ORDER BY floor DESC, time ASC";
$result = $conn->query($sql);

// Verifica si la consulta fue exitosa
if (!$result) {
    // Manejo de errores en caso de que la consulta falle
    echo json_encode(["error" => "Error en la consulta: " . $conn->error]);
    $conn->close();
    exit();
}

// Salida de cada fila en caso de que existan resultados
while ($row = $result->fetch_assoc()) {
    $ranking[] = $row;
}

// Cierra la conexión a la base de datos
$conn->close();

// Devolver resultados en formato JSON, incluso si no hay registros
echo json_encode($ranking);
?>
