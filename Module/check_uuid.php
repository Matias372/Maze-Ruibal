<?php
require 'db_connection.php';


// Obtener UUID enviado
$uuid = $_POST['uuid'];

// Verificar que el UUID no exista en la base de datos
$sql = "SELECT COUNT(*) FROM usuarios WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $uuid);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();

if ($count > 0) {
    echo "duplicate";
} else {
    echo "unique";
}

// Cerrar conexión
$conn->close();
?>
