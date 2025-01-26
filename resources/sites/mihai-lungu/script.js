 document.addEventListener("DOMContentLoaded", function() {
      var currentYear = new Date().getFullYear();
      var footerYear = document.getElementById("footer-year");
      footerYear.textContent = currentYear;

      // Funcție care verifică ora și setează modul dark/light
      function checkTimeForDarkMode() {
        const currentHour = new Date().getHours();
        const body = document.body;

        body.classList.toggle("dark-mode", currentHour >= 18 || currentHour < 7);
        body.classList.toggle("light-mode", !(currentHour >= 18 || currentHour < 7));

        // Setăm imaginea în funcție de modul dark/light
        if (body.classList.contains('dark-mode')) {
          document.getElementById('cetate').innerHTML = '<img src="https://media.mihailungu.com/resources/images/dark-cetate.png" alt="Source Wikipedia.org" title="Source Wikipedia.org" class="cetate">';
        } else {
          document.getElementById('cetate').innerHTML = '<img src="https://media.mihailungu.com/resources/images/cetate.png" alt="Source Wikipedia.org" title="Source Wikipedia.org" class="cetate">';
        }
      }

      // Verificăm imediat când pagina se încarcă
      checkTimeForDarkMode();

      // Setăm un interval de 30 minute pentru a verifica din nou ora
      setInterval(checkTimeForDarkMode, 30 * 60 * 1000); // 30 minute în milisecunde
    });
