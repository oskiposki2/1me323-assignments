import { loadContenders } from "./data.js";
import { Match } from "./match.js";

async function initTournament() {
    const contenders = await loadContenders();
}

