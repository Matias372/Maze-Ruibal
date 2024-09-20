<?php
session_start();
require 'db_connection.php';

// Habilitar reporte de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_POST['newEmail']) && isset($_SESSION['user_id'])) {
    $newEmail = trim($_POST['newEmail']);
    $userId = $_SESSION['user_id'];

    // Validar el nuevo email
    if (filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
        // Preparar la consulta usando MySQLi y bind_param
        $stmt = $conn->prepare("UPDATE usuarios SET mail = ? WHERE id = ?");
        $stmt->bind_param("si", $newEmail, $userId); // "si" indica un string y un entero

        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Verificar si la consulta afectó alguna fila
            if ($stmt->affected_rows > 0) {
                $_SESSION['mail'] = $newEmail; // Actualizar el email en la sesión
                echo json_encode(["status" => "success", "message" => "Email actualizado con éxito."]);
            } else {
                echo json_encode(["status" => "error", "message" => "No se realizaron cambios o la actualización falló."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Error en la base de datos: " . $conn->error]);
        }

        $stmt->close(); // Cerrar la declaración preparada
    } else {
        echo json_encode(["status" => "error", "message" => "Formato de correo electrónico no válido."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Parámetros faltantes o usuario no autenticado."]);
}

$conn->close(); // Cerrar la conexión a la base de datos
?>
