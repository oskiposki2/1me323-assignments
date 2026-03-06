import { loadHouses } from "./utilities.js";

export async function initBooking() {
    const houses = await loadHouses();

    const currentBookingDiv = document.getElementById("currentBooking")
    const breakfast = document.querySelector("#breakfast")
    const ghostTour = document.querySelector("#ghostTours")
    const chargingPole = document.querySelector("#chargingPole")
    const discountCode = document.querySelector("#discountCode")

    const params = new URLSearchParams(window.location.search);
    const houseId = params.get("id");

    const house = houses.find(h => h.id == houseId);

    const numberOfDays = document.querySelector("#numberOfDays");
    const displayCost = document.createElement("p")
    displayCost.innerHTML = `<p>Nätter: ${numberOfDays.value} X ${numberOfDays.value * house.pricePerNight} KR</p>
    <p>Tillägg:</p>
    <p>Ingen rabatt</p>
    <p>TOTAL KOSTNAD: ${numberOfDays.value * house.pricePerNight} KR`;
    currentBookingDiv.append(displayCost)

    function updateCost() {
        const days = Number(numberOfDays.value);
        let totalDays = days * house.pricePerNight
        let total = totalDays;

        if (breakfast.checked) total += Number(breakfast.value) * days;
        if (ghostTour.checked) total += Number(ghostTour.value);
        if (chargingPole.checked) total += Number(chargingPole.value);

        if (discountCode.value === "GHOST20") total *= 0.8;

        displayCost.innerHTML = `<p>Nätter: ${numberOfDays.value} X ${totalDays} KR</p>
        <p>Tillägg: ${!breakfast.checked ? `` : `Frukost`} ${!ghostTour.checked ? `` : `Spökvandring`} ${!chargingPole.checked ? `` : `Laddstolpe`} </p>
        <p>${discountCode.value === "GHOST20" ? `Rabatt: ${total * 0.2} KR` : `Ingen rabatt`}
        <p>TOTAL KOSTNAD: ${total} KR</p>
        `
    }

    numberOfDays.addEventListener("input", updateCost);
    breakfast.addEventListener("change", updateCost);
    ghostTour.addEventListener("change", updateCost);
    chargingPole.addEventListener("change", updateCost)
    discountCode.addEventListener("input", updateCost)

    
}