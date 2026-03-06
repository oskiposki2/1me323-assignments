import { loadHouses } from "./utilities.js";
import { headerDisplay } from "./utilities.js";
import { footerDisplay } from "./utilities.js";
import { initBooking } from "./booking.js";


footerDisplay();
headerDisplay();
initBooking();

const houseContainer = document.getElementById("houseContainer");

let houses = await loadHouses();

const scareLevels = {
    1: "Mysigt",
    2: "Lite läskigt",
    3: "Obehagligt",
    4: "Skräckinjagande",
    5: "Ren terror"
}

const params = new URLSearchParams(window.location.search);
const houseId = params.get("id");

const house = houses.find(h => h.id == houseId);

if (!house) {
    const msg = document.createElement("p")
    msg.classList.add("houseNotFound")
    msg.textContent = "Huset kunde inte hittas"
    houseContainer.append(msg)
} else {
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
}