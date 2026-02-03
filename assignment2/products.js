import { addToBasket } from "./basket.js"; // Importerar addToBasket för att kunna koppla den till lägg i kundvagns-knappen.

export const products = [
    {
        id: 1,
        name: "Lumetra L50",
        description: "Spegellös APS-C systemkamera med de senaste funktionerna.",
        price: 14999,
        image: "img/LumetraL50.jpg",
        category: "Spegellösa kameror",
        stock: 5
    },

    {
        id: 2,
        name: "Lumetra L90",
        description: " Småbildsformat premiumkamera för professionella och hängivna amatörer.",
        price: 29900,
        image: "img/LumetraL90.jpg",
        category: "Spegellösa kameror",
        stock: 0
    },

    {
        id: 3,
        name: "Kronar X40",
        description: "Kompaktkamera i retrostil, perfekt för resor där portabilitet är viktigast.",
        price: 9900,
        image: "img/KronarX40.jpg",
        category: "Retro",
        stock: 4
    },

    {
        id: 4,
        name: "Kronar P40",
        description: "En DSLR systemkamera från Kronar, beprövad teknik i klassisk stil.",
        price: 11900,
        image: "img/KronarP40.jpg",
        category: "DSLR",
        stock: 6
    },

    {
        id: 5,
        name: "Lumetra D50",
        description: "En DSLR systemkamera från Lumetra, sista DSLR:en från Lumetra. En rejäl pjäs för garanterat lång livstid.",
        price: 12900,
        image: "img/LumetraD50.jpg",
        category: "DSLR",
        stock: 5
    },

    {
        id: 6,
        name: "Orbis F40",
        description: "En kamera från välkända Orbis, en äkta filmkamera för den som är intresserad av analog fotografering.",
        price: 7900,
        image: "img/OrbisF40.jpg",
        category: "Retro",
        stock: 6
    },

    {
        id: 7,
        name: "TerraCam Super",
        description: "Fantastiskt tålig actionkamera med de senaste funktionerna, videokvalitet på 8K 120FPS samt GPS funktion.",
        price: 6900,
        image: "img/TerraCam.jpg",
        category: "Actionkamera",
        stock: 5
    },

    {
        id: 8,
        name: "Lumetra K10",
        description: "Modern spegellös kompaktkamera från Lumetra, fantastisk resekompanjon till ett förmånligt pris.",
        price: 5900,
        image: "img/LumetraK10.jpg",
        category: "Spegellös",
        stock: 0
    }


]

const productcards = document.getElementById("productcards");

let productCardsHTML = ""; // Skapar en varibel som vi sedan lägger HTML i.

products.forEach(productcard => {
    productCardsHTML += // Lägger till HTML:en nedan i variabeln.
        `
    <div class="procards">
    <img src="${productcard.image}" alt="">
    <h3>${productcard.name}</h3>
    <p>Från ${productcard.price} SEK</p>
    <p>Inkl. Moms</p>
    <div id="description">
        <p><strong>Produktbeskrivning</strong>: ${productcard.description}</p>
        <p><strong>Kategori</strong>: ${productcard.category}</p>
        <p><strong>Lagerstatus</strong>: ${productcard.stock > 0 ? "I lager" : "Slut i lager"}</p>
    </div>
    <button class="add-button">Lägg i varukorg</button>
    </div>
    `
})
productcards.innerHTML = productCardsHTML; // Skriver ut HTML:en.

const buttons = document.querySelectorAll(".add-button") // Lägg i kundvagnsknapp

// Funktion för att lägga en produkt i korgen med hjälp av index i arrayen med products-objekten. 
buttons.forEach((button, index) => {
    if (products[index].stock > 0) {
        button.addEventListener("click", () => addToBasket(products[index]))
    } else { // Om stock är 0 görs detta med knappen och den blir inte klickbar
        button.disabled = true;
        button.textContent = "Slut i lager";
        button.classList.add("disabledBtn")
    }
});
