document.addEventListener("DOMContentLoaded", () => {
    // Función para cargar los datos del perfil
    function loadProfileData() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "../../Module/Get_profile_data.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);

                    if (response.loggedIn) {
                        document.querySelector(".profile__image").src =
                            response.profileImage;
                        document.querySelector("#username").textContent =
                            response.username;
                        document.querySelector("#mail").textContent =
                            response.mail;
                        document.querySelector(
                            "#best-score"
                        ).textContent = `Floor: ${response.floor}, Time: ${response.time}`;
                    } else {
                        window.location.href = "LogIn.html";
                    }
                } else {
                    console.error(
                        "Error en la solicitud de perfil",
                        xhr.statusText
                    );
                }
            }
        };
        xhr.send();
    }

    // Cargar los datos del perfil al cargar la página
    loadProfileData();

    // Manejar el clic en el botón "Change Image" para abrir el selector de archivos
    document.querySelector("#change-image").addEventListener("click", () => {
        document.querySelector("#profileImageInput").click();
    });

    // Manejar el cambio en el selector de archivos
    document
        .querySelector("#profileImageInput")
        .addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                console.log("Selected file:", file);

                const formData = new FormData();
                formData.append("profileImage", file);

                const xhr = new XMLHttpRequest();
                xhr.open("POST", "../../Module/UploadProfileImage.php", true);
                xhr.onload = function () {
                    console.log("Response received:", xhr.responseText);

                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            document.querySelector(".profile__image").src =
                                response.newImageUrl;
                            alert("Image updated successfully!");
                            location.reload();
                        } else {
                            alert(
                                "Error: " +
                                    (response.message ||
                                        "Failed to update image")
                            );
                        }
                    } catch (e) {
                        console.error("Error parsing JSON response", e);
                        alert("An unexpected error occurred.");
                    }
                };
                xhr.onerror = function () {
                    console.error("Network error:", xhr.statusText);
                    alert("An error occurred while updating the image.");
                };
                console.log("Sending form data:", formData);
                xhr.send(formData);
            }
        });

    // Manejar el clic en el botón "Change Mail"
    document.querySelector("#change-mail").addEventListener("click", () => {
        $("#emailModal").modal("show"); // Muestra el modal
    });

    // Manejar el clic en el botón "Change Email" dentro del modal
    document.querySelector("#submitEmail").addEventListener("click", () => {
        const newEmail = document.querySelector("#newEmail").value.trim();

        if (newEmail) {
            const formData = new FormData();
            formData.append("newEmail", newEmail);

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "../../Module/UpdateEmail.php", true);

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const response = xhr.responseText;
                    if (response.includes("successfully")) {
                        document.querySelector("#mail").textContent = newEmail;
                        console.log(response); // Mensaje de éxito a la consola
                        alert("Email updated successfully!"); // Mensaje de éxito
                        $("#emailModal").modal("hide");
                    } else {
                        console.error("Error: " + response); // Error registrado en la consola
                    }
                } else {
                    console.error("HTTP error:", xhr.status, xhr.statusText); // Error HTTP registrado en la consola
                }
            };

            xhr.onerror = function () {
                console.error("Network error:", xhr.statusText); // Error de red registrado en la consola
            };

            xhr.send(formData);
        } else {
            console.warn("Please enter a valid email address."); // Mensaje de advertencia si el email es inválido
        }
    });

    // Manejar el clic en el botón "Delete Account"
    // Mostrar el div de confirmación
    function showConfirmationDialog(message, onConfirm) {
        const dialog = document.getElementById("confirmationDialog");
        const messageText = document.getElementById("confirmationMessageText");
        const yesButton = document.getElementById("confirmYes");
        const noButton = document.getElementById("confirmNo");

        messageText.textContent = message;
        dialog.style.display = "flex";

        yesButton.onclick = function () {
            dialog.style.display = "none";
            if (typeof onConfirm === "function") {
                onConfirm();
            }
        };

        noButton.onclick = function () {
            dialog.style.display = "none";
        };
    }

    // Manejo del botón de eliminar cuenta
    document
        .querySelector(".profile__delete .btn-danger")
        .addEventListener("click", () => {
            showConfirmationDialog(
                "Are you sure you want to delete your account? This action cannot be undone.",
                function () {
                    // Código para eliminar la cuenta
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", "../../Module/DeleteAccount.php", true);
                    xhr.onload = function () {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            if (response.success) {
                                // Llamar al script de logout.php para cerrar la sesión
                                const logoutXhr = new XMLHttpRequest();
                                logoutXhr.open(
                                    "POST",
                                    "../../Module/logout.php",
                                    true
                                );
                                logoutXhr.onload = function () {
                                    if (
                                        logoutXhr.status >= 200 &&
                                        logoutXhr.status < 300
                                    ) {
                                        showConfirmationMessage(
                                            "Account deleted successfully!",
                                            "success"
                                        );
                                        setTimeout(() => {
                                            window.location.href = "SignIn.php"; // Redirigir a la página de inicio de sesión
                                        }, 2000); // Esperar 2 segundos antes de redirigir
                                    } else {
                                        showConfirmationMessage(
                                            "An error occurred during logout.",
                                            "error"
                                        );
                                    }
                                };
                                logoutXhr.onerror = function () {
                                    showConfirmationMessage(
                                        "An error occurred while logging out.",
                                        "error"
                                    );
                                };
                                logoutXhr.send();
                            } else {
                                showConfirmationMessage(
                                    "Failed to delete account",
                                    "error"
                                );
                            }
                        } catch (e) {
                            showConfirmationMessage(
                                "An unexpected error occurred.",
                                "error"
                            );
                        }
                    };
                    xhr.onerror = function () {
                        showConfirmationMessage(
                            "An error occurred while deleting the account.",
                            "error"
                        );
                    };
                    xhr.send();
                }
            );
        });

    function showConfirmationMessage(message, type) {
        const confirmationDiv = document.getElementById("confirmationMessage");
        confirmationDiv.textContent = message;
        confirmationDiv.style.display = "block";
        confirmationDiv.style.color = type === "success" ? "green" : "red";
    }
});
