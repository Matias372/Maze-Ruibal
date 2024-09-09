document.addEventListener("DOMContentLoaded", function () {
    // Carga Header y Footer en html.
    function loadHTML(file, elementId) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", file, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    document.getElementById(elementId).innerHTML =
                        xhr.responseText;
                    console.log("Loaded " + file + " into #" + elementId);

                    // Verificar el estado de la sesión después de cargar el header
                    if (elementId === "Header") {
                        checkIfLoggedIn();
                    }
                } else {
                    console.error(
                        "Error loading " + file + ": " + xhr.statusText
                    );
                }
            }
        };
        xhr.onerror = function () {
            console.error("Request error for " + file);
        };
        xhr.send();
    }

    loadHTML("../../Visual/Html/Header.html", "Header");
    loadHTML("../../Visual/Html/Footer.html", "Footer");

    function toggleMenu() {
        var menu = document.getElementById("menu");
        menu.classList.toggle("active");
    }

    // Función para verificar el estado de la sesión
    function checkIfLoggedIn() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../../Module/check_session.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    var sessionLinks = document.getElementById(
                        "header__session-links"
                    );

                    if (response.loggedIn) {
                        // Cambiar el contenido del header para usuarios autenticados
                        sessionLinks.innerHTML = `
                            <div class="header__profile d-flex align-items-center">
                                <img src="${response.profileImage}" alt="Profile Image" class="header__profile-img rounded-circle me-2" width="30" height="30"/>
                                <div class="header__profile-menu">
                                    <a href="Profile.html" class="header__link nav-link">Profile</a>
                                    <a href="../../Module/logout.php" class="header__link nav-link">Log Out</a>
                                </div>
                            </div>
                        `;
                        initializeProfileMenu(); // Inicializar el menú de perfil después de cargarlo
                    } else {
                        // Cambiar el contenido del header para usuarios no autenticados
                        sessionLinks.innerHTML = `
                            <a href="LogIn.html" class="header__link nav-link">Log in</a>
                            <a href="SignUp.html" class="header__link nav-link">Sign up</a>
                        `;
                    }
                } else {
                    console.error(
                        "Error checking session status: " + xhr.statusText
                    );
                }
            }
        };
        xhr.onerror = function () {
            console.error("Request error for check-session.php");
        };
        xhr.send();
    }

    // Función para mostrar/ocultar el menú de perfil
    function initializeProfileMenu() {
        const profileImage = document.querySelector(".header__profile-img");
        const profileMenu = document.querySelector(".header__profile-menu");

        if (profileImage) {
            profileImage.addEventListener("click", function (e) {
                profileMenu.classList.toggle("active"); // Muestra/Oculta el menú al hacer clic en la imagen
                e.stopPropagation(); // Evita que el clic se propague
            });
        }

        // Cerrar el menú al hacer clic fuera de él
        document.addEventListener("click", function () {
            if (profileMenu) profileMenu.classList.remove("active");
        });
    }

    window.toggleMenu = toggleMenu; // Exponer toggleMenu para uso en el HTML
});
