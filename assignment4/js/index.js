import { footerDisplay, loadHouses, headerDisplay, scareLevels } from "./utilities.js";

headerDisplay();
footerDisplay();

const houseCardContainer = document.getElementById("housecards");
let houses = [];

houses = await loadHouses();
let bookingBtn;

const horrorSlider = document.querySelector("#horrorLevel");
const horrorInput = document.querySelector("#horror-value");
const priceSlider = document.querySelector("#price");
const priceInput = document.querySelector("#price-value");
const ghostTypeSelecet = document.querySelector("#ghostType")
const wifiRequierement = document.querySelector("#wifi");

displayHouses(houses)

// Funktion som generar "hotellkort"
function displayHouses(housesToShow) {

    houseCardContainer.innerHTML = "";

    if (!houses) {
        houseCardContainer.innerHTML = `<p class="errorMsg">Kunde inte hämta Spökhus</p>`;
    } else {
        if (housesToShow.length === 0) {
            const msg = document.createElement("p");
            msg.classList.add("message");
            msg.textContent = "Tyvärr finns inga träffar för denna sökning";

            houseCardContainer.append(msg)
        }

        for (const house of housesToShow) {
            const houseDiv = document.createElement("div");

            houseDiv.classList.add("house-div")

            houseDiv.innerHTML = `
    <img src="./img/${house.image}">
    <h3>${house.name}</h3>
    <p>Plats: ${house.location}</p>
    <p>Pris: ${house.pricePerNight} KR/natt</p>
    <p>Skräcknivå: ${scareLevels[house.scareLevel]}</p>
    `
            bookingBtn = document.createElement("button");
            bookingBtn.textContent = "Läs mer och boka";
            bookingBtn.classList.add("booking-btn")

            bookingBtn.addEventListener("click", () => {
                window.location.href = `house.html?id=${house.id}`;
            })


            houseDiv.append(bookingBtn)
            houseCardContainer.append(houseDiv)
        }
    }

}
//-----------------------------------------------------

// Skapar option-element för dropdown-meny
const allGhostTypes = [];

houses.forEach(house => {
    house.ghostTypes.forEach(type => {
        if (!allGhostTypes.includes(type)) {
            allGhostTypes.push(type);
        }
    });
});

allGhostTypes.unshift("Alla typer...");

allGhostTypes.forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    ghostTypeSelecet.append(option)
})
//-----------------------------------------------------

// Filter funktion
function filterHouses() {
    const horrorLevel = Number(horrorSlider.value);
    const maxPrice = Number(priceSlider.value);
    const selectedGhost = ghostTypeSelecet.value;

    let filtered = houses;

    if (horrorLevel > 0) {
        filtered = filtered.filter(house => house.scareLevel >= horrorLevel);
    } else {
        horrorInput.textContent = "Inget valt"
    }

    if (maxPrice > 0) {
        filtered = filtered.filter(house => house.pricePerNight <= maxPrice);
    } else {
        priceInput.textContent = "Inget valt"
    }

    if (selectedGhost !== "Alla typer...") {
        filtered = filtered.filter(house => house.ghostTypes.includes(selectedGhost));
    }

    if (wifiRequierement.checked) {
        filtered = filtered.filter(house => house.hasWifi)
    }

    displayHouses(filtered);
}
//-----------------------------------------------------

// Event-listeners för val vid filtrering
horrorSlider.addEventListener("input", () => {
    horrorInput.textContent = scareLevels[horrorSlider.value];
    filterHouses();
})

priceSlider.addEventListener("input", () => {
    priceInput.textContent = priceSlider.value + " KR";
    filterHouses();
});

ghostTypeSelecet.addEventListener("change", () => {
    const selectedType = ghostTypeSelecet.value;
    filterHouses();
})

wifiRequierement.addEventListener("change", () => {
    filterHouses();
})