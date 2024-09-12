<?php
session_start();
require 'db_connection.php'; // Asegúrate de que este archivo no genere errores HTML
header('Content-Type: application/json'); // Asegúrate de que la respuesta sea JSON

// Habilitar reporte de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Mensaje inicial para depuración
$response = ['success' => false, 'message' => 'Unknown error.'];

try {
    // Verificar si el email y la sesión están presentes
    if (isset($_POST['newEmail']) && isset($_SESSION['user_id'])) {
        $newEmail = trim($_POST['newEmail']);
        $userId = $_SESSION['user_id'];

        // Validar y sanitizar el email
        if (filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
            // Preparar y ejecutar la consulta
            $stmt = $pdo->prepare("UPDATE usuarios SET mail = ? WHERE id = ?");
            $stmt->execute([$newEmail, $userId]);

            if ($stmt->rowCount() > 0) {
                // Actualizar el correo en la sesión si se desea reflejar el cambio inmediatamente
                $_SESSION['user_email'] = $newEmail; // Asegúrate de que 'user_email' esté en la sesión

                $response = ['success' => true];
            } else {
                $response = ['success' => false, 'message' => 'No changes made or update failed.'];
            }
        } else {
            $response = ['success' => false, 'message' => 'Invalid email format.'];
        }
    } else {
        $response = ['success' => false, 'message' => 'Missing parameters or user not logged in.'];
    }
} catch (PDOException $e) {
    $response = ['success' => false, 'message' => 'Database error: ' . $e->getMessage()];
} catch (Exception $e) {
    $response = ['success' => false, 'message' => 'General error: ' . $e->getMessage()];
}

echo json_encode($response);
?>
