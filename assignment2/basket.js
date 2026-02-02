let basket = [];

const savedBasket = localStorage.getItem("basket");
if (savedBasket) {
    basket = JSON.parse(savedBasket);
}

const basketContainer = document.getElementById("basketList");
const totalElement = document.getElementById("total");
const emptyBtn = document.getElementById("emptyBtn");
const basketItem = document.getElementById("basketItem")

renderBasket();

function renderBasket() {
    basketContainer.innerHTML = "";
    totalElement.innerHTML = "";
        if (basket.length === 0){
        basketContainer.innerHTML = `<p>Tomt i varukorgen</p>`;
    }

    let total = 0;

    for (let i = 0; i < basket.length; i++){
        const item = basket[i];
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal
    }

    basket.forEach(productInfo =>{
         basketContainer.innerHTML +=
         `
         <div id="basketItem">
        <p>${productInfo.product.name}</p>
        <p>${productInfo.product.price} SEK</p>
        <p>Antal: ${productInfo.quantity}
        </div>
        `
    })

    totalElement.innerHTML = `
    <p>Totalt: ${total} SEK</p>
    `

}

export function addToBasket(product) {

    const existingItems = basket.find(function (item) {
        return item.product.id === product.id;
    })

    if(existingItems) {
        existingItems.quantity++
    } else {
        basket.push({
            product: product,
            quantity: 1
        })
    }

    saveBasket();
    renderBasket();
}

emptyBtn.addEventListener("click", () => {
    basketContainer.innerHTML = `<p>Tomt i varukorgen</p>`;

    basket = [];
    saveBasket();
    renderBasket();

})

function saveBasket () {
    localStorage.setItem("basket", JSON.stringify(basket));
}