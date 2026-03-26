import { loadHouses, headerDisplay, footerDisplay, scareLevels } from "./utilities.js";
import { Booking } from "./booking.js";
import { weatherDisplay } from "./weatherAPI.js";


footerDisplay();
headerDisplay();

const houseContainer = document.getElementById("houseContainer");
const weatherDiv = document.createElement("div")
weatherDiv.classList.add("weatherDiv")

let houses = await loadHouses();

let houseDiv = document.createElement("div");
houseDiv.classList.add("houseDisplay");

if (!houses) {
    houseContainer.innerHTML = `<p class="errorMsg">Kunde inte hämta Spökhus</p>`;
} else {

    const params = new URLSearchParams(window.location.search);
    const houseId = params.get("id");
    const house = houses.find(h => h.id == houseId);

    if (!house) {
        houseContainer.innerHTML = `<p class="errorMsg">Kunde inte hitta det spökhuset du letar efter!</p>`;
    } 

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

    const booking = new Booking(house);
    booking.attachListeners();
    booking.updateDisplay();

    const weather = await weatherDisplay(house.coordinates.lat, house.coordinates.lng)

    weatherDiv.innerHTML = `
    <h3>AKUTELL TEMPERATUR</h3>
    <p class="temp">${weather.current_weather.temperature} °C</p>
    
`

houseDiv.appendChild(weatherDiv)
}