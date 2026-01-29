import { assignments } from "./assignments.js";
import { createNavigation } from "./nav.js";

const nav = document.getElementById("main-nav");
const cards = document.getElementById("card-container");

createNavigation(assignments, nav)

let cardsHTML = "";

assignments.forEach(assignmentcard => {
    cardsHTML +=
    `<div class="cards">
    <h3>${assignmentcard.title}</h3>
    <p>${assignmentcard.description}</p>
    <a href="${assignmentcard.link}">Länk till uppgiften</a>
    </div>`

})

cards.innerHTML = cardsHTML