export async function loadContenders() {
    const response = await fetch("contestants.json");
    const contenders = await response.json();
    return contenders;
}