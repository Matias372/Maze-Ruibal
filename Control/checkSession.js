document.addEventListener("DOMContentLoaded", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../../Module/check_session.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                // Redirigir si no hay sesión activa
                if (!response.loggedIn) {
                    window.location.href = "LogIn.html";
                }
            } else {
                console.error("Error en la solicitud de sesión");
            }
        }
    };
    xhr.send();
});
