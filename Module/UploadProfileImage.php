<?php
session_start();
require 'db_connection.php'; // Asegúrate de tener un archivo para conectar a la base de datos

error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_FILES['profileImage']) && isset($_SESSION['user_id'])) {
    $file = $_FILES['profileImage'];
    $userId = $_SESSION['user_id'];

    // Validar archivo
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($file['type'], $allowedTypes)) {
        echo json_encode(['success' => false, 'message' => 'Tipo de archivo no válido']);
        exit;
    }

    // Validar tamaño del archivo (por ejemplo, hasta 2 MB)
    if ($file['size'] > 2 * 1024 * 1024) {
        echo json_encode(['success' => false, 'message' => 'El tamaño del archivo excede el límite']);
        exit;
    }

    // Leer la imagen
    $imageData = file_get_contents($file['tmp_name']);
    
    // Redimensionar imagen si es necesario (GD)
    $image = imagecreatefromstring($imageData);
    if (!$image) {
        echo json_encode(['success' => false, 'message' => 'No se pudo crear la imagen']);
        exit;
    }

    // Redimensionar imagen
    $maxWidth = 400;
    $width = imagesx($image);
    $height = imagesy($image);

    if ($width > $maxWidth) {
        $newWidth = $maxWidth;
        $newHeight = (int)($height * ($maxWidth / $width));
        $newImage = imagecreatetruecolor($newWidth, $newHeight);

        // Mantener la calidad de la imagen redimensionada
        imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        imagedestroy($image);
        $image = $newImage;
    }

    // Guardar la imagen en formato WebP
    ob_start();
    imagewebp($image); // Guardar como WebP
    $imageData = ob_get_contents();
    ob_end_clean();

    // Liberar recursos
    imagedestroy($image);

    // Preparar y ejecutar la consulta
    $stmt = $conn->prepare("UPDATE usuarios SET imagen = ? WHERE id = ?");
    if ($stmt) {
        // 'b' indica el tipo de datos binarios
        $null = NULL;
        $stmt->bind_param("bi", $null, $userId);

        // Enviar los datos largos de la imagen
        $stmt->send_long_data(0, $imageData);

        if ($stmt->execute()) {
            // Actualizar la imagen en la sesión
            $_SESSION['imagen'] = 'data:image/webp;base64,' . base64_encode($imageData);
            echo json_encode([
                'success' => true,
                'newImageUrl' => $_SESSION['imagen'],
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No se pudo actualizar la imagen']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error en la consulta']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Solicitud inválida']);
}

$conn->close();
?>
