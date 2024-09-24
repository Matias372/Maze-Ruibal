<?php
session_start();
require 'db_connection.php';

// Habilitar reporte de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_POST['floor']) && isset($_POST['time']) && isset($_SESSION['user_id'])) {
    $floor = intval($_POST['floor']); // Asegúrate de que sea un número entero
    $time = $_POST['time']; // Mantenlo como string
    $userId = $_SESSION['user_id'];

    // Preparar la consulta
    $stmt = $conn->prepare("UPDATE usuarios SET floor = ?, time = ? WHERE id = ?");
    $stmt->bind_param("ssi", $floor, $time, $userId); // Cambiar "iii" a "ssi"

    // Ejecutar la consulta
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["status" => "success", "message" => "Datos actualizados correctamente."]);
        } else {
            echo json_encode(["status" => "error", "message" => "No se realizaron cambios."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Error en la base de datos: " . $conn->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Parámetros faltantes o usuario no autenticado."]);
}

$conn->close();
?>
