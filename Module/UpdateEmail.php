<?php
session_start();
require 'db_connection.php';

// Habilitar reporte de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_POST['newEmail']) && isset($_SESSION['user_id'])) {
    $newEmail = trim($_POST['newEmail']);
    $userId = $_SESSION['user_id'];

    // Validar el email
    if ($newEmail !== '') {
        // Preparar la consulta usando MySQLi y bind_param
        $stmt = $conn->prepare("UPDATE usuarios SET mail = ? WHERE id = ?");
        $stmt->bind_param("ss", $newEmail, $userId); // "ss" indica dos strings: el email y el user ID

        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Verificar si la consulta afectó alguna fila
            if ($stmt->affected_rows > 0) {
                $_SESSION['user_email'] = $newEmail; // Actualizar el email en la sesión
                echo "Email updated successfully.";
            } else {
                echo "No changes made or update failed.";
            }
        } else {
            echo "Database error: " . $conn->error;
        }

        $stmt->close(); // Cerrar la declaración preparada
    } else {
        echo "Invalid email format.";
    }
} else {
    echo "Missing parameters or user not logged in.";
}

$conn->close(); // Cerrar la conexión a la base de datos
?>
