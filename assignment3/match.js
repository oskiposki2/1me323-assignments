export class Match {
    #contender1;
    #contender2;
    #winner;
    #element;

    constructor(contender1, contender2) {
        this.#contender1 = contender1;
        this.#contender2 = contender2;
        this.#winner = null;
        this.#element = null;
    }

    get contender1() {
        return this.#contender1;
    }

    get contender2() {
        return this.#contender2;
    }

    get winner() {
        return this.#winner;
    }

    get isPlayed() {
        return this.#winner !== null;
    }

    compete() {
        const skillA = this.#contender1.skillLevel ?? 1;
        const skillB = this.#contender2.skillLevel ?? 1;
        const chanceA = skillA / (skillA + skillB);
        const rand = Math.random();
        this.#winner = rand < chanceA ? this.#contender1 : this.#contender2;

        this.renderToHTML();
    }

    renderToHTML() {
        if (!this.#element) {
            this.#element = document.createElement("div");
            this.#element.classList.add("match");
        }

        const c1 = this.#contender1;
        const c2 = this.#contender2;
        const c1Class = this.#winner === c1 ? "winner" : (this.#winner ? "loser" : "");
        const c2Class = this.#winner === c2 ? "winner" : (this.#winner ? "loser" : "");

        this.#element.innerHTML = `
        <div class="${c1Class}">
            <h3>${c1.name ?? "Okänd"}</h3>
            <p>Skill: ${c1.skillLevel ?? "N/A"}</p>
            <p>${c1.catchphrase ?? "Ingen catchphrase"}</p>
        </div>
    <div class="${c2Class}">
        <h3>${c2.name ?? "Unknown"}</h3>
        <p>Skill: ${c2.skillLevel ?? "N/A"}</p>
        <p>${c2.catchphrase ?? "No catchphrase"}</p>
    </div>
        `;

        return this.#element;
    }
}