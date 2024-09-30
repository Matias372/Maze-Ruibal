<?php
header('Content-Type: application/json; charset=UTF-8');
session_start();
require 'db_connection.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Verifica si la sesión y user_id están configurados
if (!isset($_SESSION['user_id'])) {
    error_log("user_id no proporcionado.");
    echo json_encode(["error" => "user_id no proporcionado."]);
    exit();
}

$user_id = $_SESSION['user_id'];
$ranking = [];

// Verifica si la conexión fue exitosa
if ($conn->connect_error) {
    error_log("Error de conexión: " . $conn->connect_error);
    echo json_encode(["error" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

// Prepara la consulta SQL
$sql = "SELECT floor, time FROM usuarios WHERE id = ? ORDER BY floor DESC, time ASC";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    error_log("Error en la preparación de la consulta: " . $conn->error);
    echo json_encode(["error" => "Error en la preparación de la consulta: " . $conn->error]);
    exit();
}

$stmt->bind_param("i", $user_id);
if (!$stmt->execute()) {
    error_log("Error en la ejecución de la consulta: " . $stmt->error);
    echo json_encode(["error" => "Error en la ejecución de la consulta: " . $stmt->error]);
    exit();
}

$result = $stmt->get_result();

// Salida de cada fila
while ($row = $result->fetch_assoc()) {
    $ranking[] = $row;
}

// Cierra la conexión
$stmt->close();
$conn->close();

// Devuelve resultados en formato JSON
if (empty($ranking)) {
    echo json_encode(["message" => "No se encontraron registros."]);
} else {
    echo json_encode($ranking);
}
?>
