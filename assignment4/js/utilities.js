export async function loadHouses() {
    const response = await fetch("data/houses.json");
    const houses = await response.json();

    return houses;
}

export function headerDisplay() {
    let header = document.querySelector("header")
    const headerDiv = document.createElement("div");
    headerDiv.innerHTML = `
    <h1>SPÖKHUSBYRÅN</h1>
    <h3>Världens läskigaste resebyrå</h3>
`
header.append(headerDiv)
}

export function footerDisplay() {
    let footer = document.querySelector("footer");
    
    footer.innerHTML = `
    <h3>Spökhusbyrån AB - Världens läskigaste hus!</h3>
    `
}