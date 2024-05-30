	
		// Definim un obiect cu numărul la care vrem să ajungem pentru fiecare limbaj
var numereDeIncarcat = {
    html: 64,
    css: 42,
    js: 53,
    cpp: 58,
    csharp: 73,
    sql: 24,
    python: 32,
	office: 47,
	adobe: 40
};

// Funcția care actualizează bara de progres pentru fiecare limbaj
function incarcaAnimatie() {
    Object.keys(numereDeIncarcat).forEach(function(limbaj) {
        var procent = 0; // Inițial, progresul este 0
        var interval = setInterval(function() {
            // Creștem procentul până la valoarea dorită pentru limbajul respectiv
            procent++;
            document.querySelector('.' + limbaj).style.width = procent + '%';
            // Dacă am ajuns la numărul dorit, oprim intervalul
            if (procent >= numereDeIncarcat[limbaj]) {
                clearInterval(interval);
            }
        }, 10); // Viteza de actualizare a barei de progres (10ms în acest caz)
    });
}

// Apelăm funcția când documentul este încărcat complet
document.addEventListener('DOMContentLoaded', incarcaAnimatie);

	
   function updateHeight() {
        var spanElement = document.getElementById("dynamicHeight");
        var viewportWidth = window.innerWidth; // Lățimea ferestrei vizibile
        var viewportHeight = window.innerHeight; // Înălțimea ferestrei vizibile
        
        // Calculăm o valoare pentru înălțime bazată pe lățimea și înălțimea ferestrei vizibile
        var newHeight = (viewportWidth + viewportHeight) / 10;
        
        // Setăm noua înălțime
        spanElement.style.height = newHeight + "px";
    }

    // Apelăm funcția pentru a seta înălțimea inițială și pentru a reacționa la redimensionarea ferestrei
    updateHeight();
    window.addEventListener("resize", updateHeight);

 


	
