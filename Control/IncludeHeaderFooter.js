document.addEventListener("DOMContentLoaded", () => {
    const headerFile = "../../Visual/HTML/Header.html";
    const footerFile = "../../Visual/HTML/Footer.html";
    const checkSessionUrl = "../../Module/check_session.php";

    async function loadHTML(file, elementId) {
        try {
            const response = await fetch(file);
            if (!response.ok)
                throw new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
            const text = await response.text();
            document.getElementById(elementId).innerHTML = text;
            console.log(`Loaded ${file} into #${elementId}`);
            if (elementId === "Header") {
                await checkIfLoggedIn();
            }
        } catch (error) {
            console.error(`Failed to load ${file}: ${error.message}`);
        }
    }

    async function checkIfLoggedIn() {
        try {
            const response = await fetch(checkSessionUrl);
            if (!response.ok) {
                throw new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
            }
            const result = await response.json(); // Aquí ocurre el error si no es JSON
            const sessionLinks = document.getElementById(
                "header__session-links"
            );

            if (result.loggedIn) {
                sessionLinks.innerHTML = `
                    <div class="header__profile d-flex align-items-center">
                        <img src="${result.profileImage}" alt="Profile Image" class="header__profile-img me-2" width="30" height="30"/>
                        <div class="header__profile-menu">
                            <a href="Profile.html" class="header__link nav-link">Profile</a>
                            <a href="../../Module/logout.php" class="header__link nav-link">Log Out</a>
                        </div>
                    </div>
                `;
                initializeProfileMenu();
            } else {
                sessionLinks.innerHTML = `
                    <a href="LogIn.html" class="header__link nav-link">Log in</a>
                    <a href="SignUp.php" class="header__link nav-link">Sign up</a>
                `;
            }
        } catch (error) {
            console.error(`Failed to check session status: ${error.message}`);

            // Log the response body to check what's being returned
            const responseText = await error.response?.text();
            console.error(`Response received: ${responseText}`);
        }
    }

    function toggleMenu() {
        document.getElementById("menu").classList.toggle("active");
    }

    function initializeProfileMenu() {
        const profileImage = document.querySelector(".header__profile-img");
        const profileMenu = document.querySelector(".header__profile-menu");

        if (profileImage) {
            profileImage.addEventListener("click", (e) => {
                profileMenu.classList.toggle("active");
                e.stopPropagation();
            });
        }

        document.addEventListener("click", () => {
            if (profileMenu) profileMenu.classList.remove("active");
        });
    }

    // Load Header and Footer
    loadHTML(headerFile, "Header");
    loadHTML(footerFile, "Footer");

    // Expose toggleMenu to global scope
    window.toggleMenu = toggleMenu;
});

// Donation popup functions
function showDonationPopup() {
    document.getElementById("donationPopup").style.display = "flex";
}

function closeDonationPopup() {
    document.getElementById("donationPopup").style.display = "none";
}
