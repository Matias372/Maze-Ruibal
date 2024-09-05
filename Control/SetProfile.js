document.addEventListener("DOMContentLoaded", () => {
    // Crear una solicitud AJAX para obtener los datos del perfil
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../../Module/Get_profile_data.php", true); // Cambia 'get_profile_data.php' por el nombre de tu script PHP
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                // Verificar si la respuesta contiene datos válidos
                if (response.loggedIn) {
                    // Actualizar los elementos del perfil con los datos obtenidos
                    document.querySelector(".profile__image").src =
                        response.profileImage;
                    document.querySelector("#username").textContent =
                        response.username;
                    document.querySelector("#mail").textContent = response.mail;
                    document.querySelector(
                        "#best-score"
                    ).textContent = `Floor: ${response.floor}, Time: ${response.time}`;
                } else {
                    // Redirigir al usuario a la página de inicio de sesión si no está autenticado
                    window.location.href = "LogIn.html";
                }
            } else {
                console.error("Error en la solicitud de perfil");
            }
        }
    };
    xhr.send();
});
