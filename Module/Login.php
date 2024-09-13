<?php
require 'db_connection.php';

error_reporting(E_ALL);
ini_set('display_errors', 0); // Desactivar en producción

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Correo electrónico no válido"]);
        exit();
    }

    $query = "SELECT * FROM usuarios WHERE mail = ?";
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

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
                echo json_encode(["status" => "error", "message" => "Contraseña incorrecta"]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "El correo no existe"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Error en la consulta"]);
    }

    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
}
?>
