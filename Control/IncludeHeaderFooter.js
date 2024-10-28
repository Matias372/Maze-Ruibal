document.addEventListener("DOMContentLoaded", () => {
    const headerFile = "../../Visual/HTML/Header.html";
    const footerFile = "../../Visual/HTML/Footer.html";

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
        } catch (error) {
            console.error(`Failed to load ${file}: ${error.message}`);
        }
    }

    function toggleMenu() {
        document.getElementById("menu").classList.toggle("active");
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
