<?php
session_start();
require 'db_connection.php'; // Asegúrate de tener un archivo para conectar a la base de datos

if (isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];

    // Preparar y ejecutar la consulta
    $stmt = $pdo->prepare("DELETE FROM usuarios WHERE id = ?");
    $stmt->execute([$userId]);

    if ($stmt->rowCount() > 0) {
        session_destroy();
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}
?>
