document.getElementById('solar-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const location = document.getElementById('location').value;
    const roofArea = document.getElementById('roof-area').value;

    if (!location || !roofArea) {
        alert("Please provide both location and roof area.");
        return;
    }

    // Default panel efficiency and electricity rate
    const panelEfficiency = 0.2; // 20% efficiency
    const electricityRate = 0.10; // $0.10 per kWh
    const co2EmissionFactor = 0.85; // 0.85 kg CO2 per kWh

    // Fetch solar data from Solcast or OpenWeather API
    fetchSolarData(location).then(solarIrradiance => {
        const annualEnergy = solarIrradiance * roofArea * panelEfficiency * 365; // Energy in kWh/year
        const costSavings = (annualEnergy * electricityRate)/100;
        const co2Savings = annualEnergy * co2EmissionFactor;

        // Display results
        document.getElementById('energy-output').innerText = annualEnergy.toFixed(2);
        document.getElementById('cost-savings').innerText = costSavings.toFixed(2);
        document.getElementById('co2-savings').innerText = co2Savings.toFixed(2);

        document.getElementById('results').style.display = 'block';

        // Plot the energy output chart
        plotEnergyChart(annualEnergy);
    });
});

// Fetch solar data (example using OpenWeather API)
async function fetchSolarData(location) {
    const apiKey = '357e4ca3d1396bf417f32fd5a1452f74'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    // Return an estimate of solar irradiance (W/m²)
    const solarIrradiance = data.main.temp; // Simplified (use actual solar API if possible)
    return solarIrradiance; // Return irradiance in W/m²
}

// Chart.js for visualizing energy output
function plotEnergyChart(annualEnergy) {
    const ctx = document.getElementById('energy-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Energy Output'],
            datasets: [{
                label: 'kWh/year',
                data: [annualEnergy],
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
