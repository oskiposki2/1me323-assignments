import { loadHouses, headerDisplay, footerDisplay } from "./utilities.js";
import { Booking } from "./booking.js";
import { weatherDisplay } from "./weatherAPI.js";
import { scareLevels } from "./utilities.js";

footerDisplay();
headerDisplay();

const houseContainer = document.getElementById("houseContainer");
const weatherDiv = document.querySelector("#weatherDiv");

let houses = await loadHouses();
const params = new URLSearchParams(window.location.search);
const houseId = params.get("id");
const house = houses.find(h => h.id == houseId);

const booking = new Booking(house);
booking.attachListeners();
booking.updateDisplay();

try {
    let houseDiv = document.createElement("div");
    houseDiv.classList.add("houseDisplay");

    houseDiv.innerHTML = `
<img src="./img/${house.image}">
<h1>${house.name}</h1>
<p>Plats: ${house.location}</p>
<p>${house.description}</p>
<p>Pris: ${house.pricePerNight} KR/natt</p>
<p>Skräcknivå: ${scareLevels[house.scareLevel]}</p>
<p>Wifi: ${house.hasWifi ? "Ja" : "Nej"}</p>
<p>Här kan du träffa på dessa typer:</p>
`

    const ghostUl = document.createElement("ul")

    for (const ghosts of house.ghostTypes) {
        const ghostLi = document.createElement("li")
        ghostLi.classList.add("ghostlist")

        ghostLi.innerHTML = `${ghosts}`

        ghostUl.append(ghostLi)
    }
    houseContainer.append(houseDiv)
    houseDiv.append(ghostUl)
} catch (error) {
    const msg = document.createElement("p")
    msg.classList.add("houseNotFound")
    msg.textContent = "Huset kunde inte hittas"
    houseContainer.append(msg)
}

async function showWeather() {

    const weather = await weatherDisplay(house.coordinates.lat, house.coordinates.lng)

    weatherDiv.innerHTML = `
    <h3>Akutellt väder vid ${house.name}</h3>
    <p>Temperatur: ${weather.current_weather.temperature} °C</p>
    <p>Upplevd temperatur: ${weather.hourly.apparent_temperature[0]} °C</p>
    <p>Molntäckning: ${weather.hourly.cloud_cover[0]}%</p>
`
}

showWeather(house)