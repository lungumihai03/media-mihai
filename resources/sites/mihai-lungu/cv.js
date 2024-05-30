	
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

 


		function mp3_mod(){
			document.getElementById("mp3").style.display = "block";
		}
		function closemp3(event) {
            if (event.target === document.getElementById("mp3")) {
                document.getElementById("mp3").style.display = "none";
            }
        }
		function calc_mod(){
			document.getElementById("calc").style.display = "block";
		}
		function closecalc(event) {
            if (event.target === document.getElementById("calc")) {
                document.getElementById("calc").style.display = "none";
            }
        }
		function about_mod(){
			document.getElementById("aboutpc").style.display = "block";
		}
		function closeabout(event) {
            if (event.target === document.getElementById("aboutpc")) {
                document.getElementById("aboutpc").style.display = "none";
            }
        }
		function gen_mod(){
			document.getElementById("gen").style.display = "block";
		}
		function closegen(event) {
            if (event.target === document.getElementById("gen")) {
                document.getElementById("gen").style.display = "none";
            }
        }
		function hr_mod(){
			document.getElementById("hr").style.display = "block";
		}
		function closehr(event) {
            if (event.target === document.getElementById("hr")) {
                document.getElementById("hr").style.display = "none";
            }
        }
		function tr_mod(){
			document.getElementById("tr").style.display = "block";
		}
		function closetr(event) {
            if (event.target === document.getElementById("tr")) {
                document.getElementById("tr").style.display = "none";
            }
        }
		function note_mod(){
			document.getElementById("note").style.display = "block";
		}
		function closenote(event) {
            if (event.target === document.getElementById("note")) {
                document.getElementById("note").style.display = "none";
            }
        }
		function tts_mod(){
			document.getElementById("tts").style.display = "block";
		}
		function closetts(event) {
            if (event.target === document.getElementById("tts")) {
                document.getElementById("tts").style.display = "none";
            }
        }
		function mihai_mod(){
			document.getElementById("mihai").style.display = "block";
		}
		function closemihai(event) {
            if (event.target === document.getElementById("mihai")) {
                document.getElementById("mihai").style.display = "none";
            }
        }
		function tpa_mod(){
			document.getElementById("tpa").style.display = "block";
		}
		function closetpa(event) {
            if (event.target === document.getElementById("tpa")) {
                document.getElementById("tpa").style.display = "none";
            }
        }
		function dev_mod(){
			document.getElementById("dev").style.display = "block";
		}
		function closedev(event) {
            if (event.target === document.getElementById("dev")) {
                document.getElementById("dev").style.display = "none";
            }
        }
		function fmti_mod(){
			document.getElementById("fmti").style.display = "block";
		}
		function closefmti(event) {
            if (event.target === document.getElementById("fmti")) {
                document.getElementById("fmti").style.display = "none";
            }
        }
		
	
