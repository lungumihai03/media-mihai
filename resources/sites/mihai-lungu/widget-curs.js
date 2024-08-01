const apiKey = '495eaa3e059175b43d98a158'; // Replace with your API key
const baseCurrencies = ['USD', 'EUR', 'RON', 'UAH', 'RUB'];
const icons = ['us', 'eu', 'ro', 'ua', 'ru'];
const sites = [];

for (let i = 0; i < 5; i++) {
    sites[i] = `https://www.mihailungu.com/curs-valutar/contry/${icons[i]}.png`;
}

const fetchRates = (baseCurrency) => {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                return { base: baseCurrency, rate: data.conversion_rates.MDL };
            } else {
                console.error('Error fetching exchange rates:', data['error-type']);
                return null;
            }
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            return null;
        });
};

const displayRates = async () => {
    const ratesContainer = document.getElementById('rates-container');
    ratesContainer.innerHTML = 'Loading...';

    const ratesPromises = baseCurrencies.map(fetchRates);
    const rates = await Promise.all(ratesPromises);

    ratesContainer.innerHTML = '';
    rates.forEach((rate, index) => {
        if (rate) {
            const rateDiv = document.createElement('div');
            rateDiv.className = 'rate';
            rateDiv.innerHTML = `<img src="${sites[index]}" alt="${rate.base} flag" style="width:35px; height:23px; margin-right: 10px;"> ${rate.base}: ${rate.rate.toFixed(4)} Lei`;
            ratesContainer.appendChild(rateDiv);
        }
    });
};

displayRates();
