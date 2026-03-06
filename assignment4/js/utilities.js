export async function loadHouses() {
    const response = await fetch("data/houses.json");
    const houses = await response.json();

    return houses;
}