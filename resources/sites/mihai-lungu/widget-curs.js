const baseCurrencies = ['USD', 'EUR', 'RON', 'UAH', 'RUB'];
const icons = ['us', 'eu', 'ro', 'ua', 'ru'];
const sites = icons.map(icon => 
    `https://www.mihailungu.com/curs-valutar/contry/${icon}.png`
);

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

async function fetchXMLRates(date, retryCount = 3) {
    const formattedDate = formatDate(date);
    const proxyUrl = 'https://bnm-proxy.lungu-mihai03.workers.dev/?date=';

    try {
        const response = await fetch(proxyUrl + formattedDate);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        return xmlDoc;
    } catch (error) {
        console.error('Error fetching XML:', error);

        if (retryCount > 0) {
            return new Promise((resolve) => {
                setTimeout(async () => {
                    resolve(await fetchXMLRates(date, retryCount - 1));
                }, 5000);
            });
        }

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

    if (!ratesContainer) return;

    ratesContainer.innerHTML = 'Loading...';

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const todayXmlDoc = await fetchXMLRates(today);
    const yesterdayXmlDoc = await fetchXMLRates(yesterday);

    if (!todayXmlDoc || !yesterdayXmlDoc) {
        ratesContainer.innerHTML = 'Error loading rates.';
        return;
    }

    ratesContainer.innerHTML = '';

    baseCurrencies.forEach((currency, index) => {
        const todayRate = extractRate(todayXmlDoc, currency);
        const yesterdayRate = extractRate(yesterdayXmlDoc, currency);

        if (todayRate !== null && yesterdayRate !== null) {
            const change = todayRate - yesterdayRate;

            const rateDiv = document.createElement('div');
            rateDiv.className = 'rate';

            rateDiv.innerHTML = `
                <img src="${sites[index]}" 
                     alt="${currency} flag" 
                     style="width:35px; height:23px; margin-right:10px;">
                     
                ${currency}: ${todayRate.toFixed(4)} Lei
                &nbsp;&nbsp;&nbsp;
                
                <span class="${change >= 0 ? 'up' : 'down'}">
                    ${change >= 0 ? '▲' : '▼'}${change.toFixed(4)}
                </span>
            `;

            ratesContainer.appendChild(rateDiv);
        }
    });
}

// Load immediately
displayRates();

// Refresh every 2 hours
setInterval(displayRates, 60 * 120 * 1000);
