<?php
session_start();
require 'db_connection.php'; // Asegúrate de tener un archivo para conectar a la base de datos

header('Content-Type: application/json'); // Asegurarse de que la respuesta sea JSON

if (isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];

    // Preparar la consulta usando MySQLi y bind_param
    $stmt = $conn->prepare("DELETE FROM usuarios WHERE id = ?");
    $stmt->bind_param("s", $userId); // "s" indica un string

    // Ejecutar la consulta
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            session_destroy(); // Destruir la sesión si la fila se elimina
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No rows affected.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    }

    $stmt->close(); // Cerrar la declaración preparada
} else {
    echo json_encode(['success' => false, 'message' => 'No user logged in.']);
}

$conn->close();
?>
