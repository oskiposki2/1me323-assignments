export async function weatherDisplay(lat, lng) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=apparent_temperature,cloud_cover`);

        const data = await response.json();

        return data;

    } catch (error) {
        weatherDiv.textContent = "Kunde inte hämta väderdata"
    }
}