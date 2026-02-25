import { loadContenders } from "./data.js";
import { Match } from "./match.js";

let currentMatches = [];
let simulateBtn;
let restartBtn;
let contenders = [];

export async function initTournament() {
    contenders = await loadContenders();

    simulateBtn = document.createElement("button");
    simulateBtn.addEventListener("click", simulateRound);
    simulateBtn.classList.add("simulate-btn")
    document.body.appendChild(simulateBtn);

    restartBtn = document.createElement("button");
    restartBtn.textContent = "Starta om";
    restartBtn.addEventListener("click", restartTournament, simulateBtn)
    restartBtn.classList.add("restart-btn");
    document.body.appendChild(restartBtn);

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    btnContainer.appendChild(simulateBtn);
    btnContainer.appendChild(restartBtn);

    document.body.appendChild(btnContainer)

    currentMatches = createRound(contenders, "Kvartsfinal");
}

function createRound(contenders, roundName) {

    let bracket = document.querySelector(".bracket");
    if (!bracket) {
        bracket = document.createElement("div");
        bracket.classList.add("bracket");
        document.body.appendChild(bracket);
    }

    const round1 = document.createElement("div");
    round1.classList.add("round");

    const heading = document.createElement("h2");
    heading.textContent = roundName;
    heading.classList.add("tournament-heading");

    round1.appendChild(heading);

    const matches = [];
    for (let i = 0; i < contenders.length; i += 2) {
        const match = new Match(contenders[i], contenders[i + 1]);
        matches.push(match);
        round1.appendChild(match.renderToHTML());
    }

    bracket.appendChild(round1);
    simulateBtn.textContent = `Simulera ${roundName}`;

    return matches;
}

function restartTournament() {
    document.querySelector(".bracket").innerHTML = "";
    
    currentMatches = createRound(contenders, "Kvartsfinal");

    simulateBtn.style.display = "block";
}

function simulateRound() {
    const latestHeading = document.querySelector(".round:last-child h2");
    latestHeading?.classList.add("wow");

    currentMatches.forEach(match => {
        if (!match.isPlayed) {
            match.compete();
            match.renderToHTML();
        }
    });

    const winners = currentMatches.map(match => match.winner);

    if (winners.length > 1) {
        const roundName = winners.length === 2 ? "Final" : "Semifinal";
        currentMatches = createRound(winners, roundName);
    } else {
        simulateBtn.style.display = "none";
    }

}