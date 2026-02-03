let basket = []; // Array för produkterna som läggs i varukorgen. 

// Hämtar sparad data i localStorage, om data finns laddar den in det i basket.
const savedBasket = localStorage.getItem("basket");
if (savedBasket) {
    basket = JSON.parse(savedBasket);
}

const basketContainer = document.getElementById("basketList");
const totalElement = document.getElementById("total");
const emptyBtn = document.getElementById("emptyBtn");

renderBasket(); // Kör funktionen renderBasket så att "tomt i varukorgen" ska visas samt totala kostnaden.

function renderBasket() {
    basketContainer.innerHTML = "";
    totalElement.innerHTML = "";
        if (basket.length === 0){ // Om varukorg-arrayen (basket) är tom visas detta.
        basketContainer.innerHTML = `<p>Tomt i varukorgen</p>`;
    }

    let total = 0; // Varibel som håller totala kostnaden för produkterna i korgen.

    // Räknar ut kostnaden på den valda produkten.
    for (let i = 0; i < basket.length; i++){
        const item = basket[i];
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal
    }

    basket.forEach(productInfo =>{ // Skriver ut HTML:en i kundvagnen.
         basketContainer.innerHTML +=
         `
         <div id="basketItem">
        <p>${productInfo.product.name}</p>
        <p>${productInfo.product.price} SEK</p>
        <p>Antal: ${productInfo.quantity}
        </div>
        `
    })

    // Skriver ut totala kostnaden i HTML. 
    totalElement.innerHTML = `  
    <p><strong>Totalt</strong>: ${total} SEK</p>
    `

}

export function addToBasket(product) {

    const existingItems = basket.find(function (item) { // Kollar om en vald produkt redan finns i korgen
        return item.product.id === product.id;
    })

    if(existingItems) { // Om produkten finns, lägg till ett i antal.
        existingItems.quantity++
    } else { // Annars lägg till produkten i korgen.
        basket.push({
            product: product,
            quantity: 1
        })
    }

    saveBasket(); // Sparar datan i kundvagnen i localStorage
    renderBasket(); // Måste köras för att kunna lägga till varor i korgen.
}

emptyBtn.addEventListener("click", () => { // Funktion för att tomma varukorgen via en knapp.
    basketContainer.innerHTML = `<p>Tomt i varukorgen</p>`;

    basket = []; // Rensar hela varukorg-arrayen. 
    saveBasket();
    renderBasket();

})

function saveBasket () { // Funktion för att spara datan i varukorgen. 
    localStorage.setItem("basket", JSON.stringify(basket));
}