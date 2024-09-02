const baseCurrencies = ['USD', 'EUR', 'RON', 'UAH', 'RUB'];
const icons = ['us', 'eu', 'ro', 'ua', 'ru'];
const sites = icons.map(icon => `https://www.mihailungu.com/curs-valutar/contry/${icon}.png`);

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

async function fetchXMLRates() {
    const today = new Date();
    const formattedDate = formatDate(today);
    const url = `https://bnm.md/ro/official_exchange_rates?get_xml=1&date=${formattedDate}`;
    const proxyUrl = 'https://api.allorigins.win/raw?url=';

    try {
        const response = await fetch(proxyUrl + encodeURIComponent(url));
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        return xmlDoc;
    } catch (error) {
        console.error('Error fetching XML:', error);
        return null;
    }
}

function extractRate(xmlDoc, charCode) {
    const valutes = xmlDoc.getElementsByTagName('Valute');
    for (let valute of valutes) {
        const charCodeElement = valute.getElementsByTagName('CharCode')[0];
        if (charCodeElement && charCodeElement.textContent === charCode) {
            const valueElement = valute.getElementsByTagName('Value')[0];
            if (valueElement) {
                return parseFloat(valueElement.textContent);
            }
        }
    }
    return null;
}

async function displayRates() {
    const ratesContainer = document.getElementById('rates-container');
    ratesContainer.innerHTML = 'Loading...';

    const xmlDoc = await fetchXMLRates();
    if (!xmlDoc) {
        ratesContainer.innerHTML = 'Error loading rates';
        return;
    }

    ratesContainer.innerHTML = '';
    baseCurrencies.forEach((currency, index) => {
        const rate = extractRate(xmlDoc, currency);
        if (rate !== null) {
            const rateDiv = document.createElement('div');
            rateDiv.className = 'rate';
            rateDiv.innerHTML = `<img src="${sites[index]}" alt="${currency} flag" style="width:35px; height:23px; margin-right: 10px;"> ${currency}: ${rate.toFixed(4)} Lei`;
            ratesContainer.appendChild(rateDiv);
        }
    });
}

// Verificăm imediat când pagina se încarcă
displayRates();

// Setăm un interval de 15 minute pentru a actualiza cursurile
setInterval(displayRates, 15 * 60 * 1000); // 15 minute în milisecunde
