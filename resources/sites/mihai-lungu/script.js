document.addEventListener("DOMContentLoaded", function() {
    var currentYear = new Date().getFullYear();
    var footerYear = document.getElementById("footer-year");
    footerYear.textContent = currentYear;

    // Funcție care verifică ora și setează modul dark/light
    function checkTimeForDarkMode() {
        const currentHour = new Date().getHours();
        const body = document.body;

        body.classList.toggle("dark-mode", currentHour >= 20 || currentHour < 7);
        body.classList.toggle("light-mode", !(currentHour >= 20 || currentHour < 7));
    }

    // Verificăm imediat când pagina se încarcă
    checkTimeForDarkMode();

    // Setăm un interval de 30 minute pentru a verifica din nou ora
    setInterval(checkTimeForDarkMode, 30 * 60 * 1000); // 30 minute în milisecunde
});
