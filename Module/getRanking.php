<?php
header('Content-Type: application/json');

include 'db_connection.php';

// Consulta SQL para obtener el top 10 de jugadores
$sql = "SELECT user, floor, time FROM usuarios ORDER BY floor DESC, time ASC LIMIT 10";
$result = $conn->query($sql);

$ranking = [];

if ($result->num_rows > 0) {
    // Salida de cada fila
    while($row = $result->fetch_assoc()) {
        $ranking[] = $row;
    }
}

$conn->close();

// Devolver resultados en formato JSON
echo json_encode($ranking);
?>
