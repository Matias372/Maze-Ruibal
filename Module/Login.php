<?php
require 'db_connection.php';

error_reporting(E_ALL);
ini_set('display_errors', 1); // Activar para ver errores en desarrollo

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = urldecode(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
    $password = $_POST['password'];

    // Depuración: Verifica el correo recibido
    error_log("Correo recibido: " . $email);
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        error_log("Correo electrónico no válido: " . $email);
        echo json_encode(["status" => "error", "message" => "Correo electrónico no válido"]);
        exit();
    }

    $query = "SELECT * FROM usuarios WHERE mail = ?";
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        // Depuración: Verificar número de filas devueltas
        error_log("Número de filas devueltas: " . $result->num_rows);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $userId = $row['id'];
            $username = $row['user'];
            $hashedPassword = $row['password'];
            $imagenBlob = $row['imagen'];
            $floor = $row['floor'];
            $time = $row['time'];

            if (password_verify($password, $hashedPassword)) {
                session_start();
                session_regenerate_id();

                $current_time = date("Y-m-d H:i:s");
                $update_sql = $conn->prepare("UPDATE usuarios SET ultimo_acceso = ? WHERE id = ?");
                $update_sql->bind_param("si", $current_time, $userId);
                $update_sql->execute();

                $imagenBase64 = $imagenBlob ? 'data:image/webp;base64,' . base64_encode($imagenBlob) : '../../Assets/session/icon-perfil.svg';

                $_SESSION['user_id'] = $userId;
                $_SESSION['user'] = $username;
                $_SESSION['mail'] = $email;
                $_SESSION['imagen'] = $imagenBase64;
                $_SESSION['floor'] = $floor;
                $_SESSION['time'] = $time;

                echo json_encode(["status" => "success", "message" => "Inicio de sesión exitoso"]);
            } else {
                error_log("Contraseña incorrecta para el usuario: " . $email);
                echo json_encode(["status" => "error", "message" => "Contraseña incorrecta"]);
            }
        } else {
            error_log("El correo no existe: " . $email);
            echo json_encode(["status" => "error", "message" => "El correo no existe"]);
        }

        $stmt->close();
    } else {
        error_log("Error en la consulta: " . $conn->error);
        echo json_encode(["status" => "error", "message" => "Error en la consulta"]);
    }

    $conn->close();
} else {
    error_log("Datos incompletos en la solicitud");
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
}
?>
