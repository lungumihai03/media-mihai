 document.addEventListener("DOMContentLoaded", function() {
      var currentYear = new Date().getFullYear();
      var footerYear = document.getElementById("footer-year");
      footerYear.textContent = currentYear;
    });
   // Verificăm ora pentru a decide modul de afișare (luminos sau întunecat)
      // script.js

const currentHour = new Date().getHours();
const body = document.body;

body.classList.toggle("dark-mode", currentHour >= 21 || currentHour < 7);
body.classList.toggle("light-mode", !(currentHour >= 21 || currentHour < 7));
