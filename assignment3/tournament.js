import { loadContenders } from "./data.js";
import { Match } from "./match.js";

let currentMatches = [];

export async function initTournament() {
    const contenders = await loadContenders();

    createQuarterFinals(contenders);
}

function createQuarterFinals(contenders) {

    const bracket = document.createElement("div");
    bracket.classList.add("bracket");

    const round1 = document.createElement("div");
    round1.classList.add("round");

    const heading = document.createElement("h2");
    heading.textContent = "Kvartsfinal";
    heading.classList.add("quarterFinals")
    round1.appendChild(heading);

    for (let i = 0; i < contenders.length; i += 2) {
        const match = new Match(contenders[i], contenders[i + 1]);
        currentMatches.push(match);
        round1.appendChild(match.renderToHTML());
    }

    const simulateBtn = document.createElement("button");
    simulateBtn.addEventListener("click", simulateRound);
    simulateBtn.textContent = "Simulera Kvartsfinal";
    simulateBtn.id = "simulate-btn";
    document.body.appendChild(simulateBtn)

    bracket.appendChild(round1);
    document.body.appendChild(bracket)
}

function simulateRound() {
    currentMatches.forEach(match => {
        if (!match.isPlayed) {
            match.compete();
            match.renderToHTML();
        }
    })
}

