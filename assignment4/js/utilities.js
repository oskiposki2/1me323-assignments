export async function loadHouses() {
    try {
        const response = await fetch("data/houses.json");
        if (!response.ok) throw new Error("Kunde inte hämta Spökhus")
        const houses = await response.json();

        return houses;
    } catch (error) {
        console.error(error)
    }
}

export function headerDisplay() {
    let header = document.querySelector("#heading")
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("ghostHeader")
    headerDiv.innerHTML = `
    <h1>SPÖKHUSBYRÅN</h1>
`
    header.append(headerDiv)
}

export function footerDisplay() {
    let footer = document.querySelector("footer");

    footer.innerHTML = `
    <h3>Spökhusbyrån AB - Världens läskigaste hus!</h3>
    `
}

export const scareLevels = {
    1: "Mysigt",
    2: "Lite läskigt",
    3: "Obehagligt",
    4: "Skräckinjagande",
    5: "Ren terror"
}