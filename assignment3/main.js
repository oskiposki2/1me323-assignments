import { createNavigation } from "../JS/nav.js";
import { assignments } from "../JS/assignments.js";
import { initTournament } from "./tournament.js";

initTournament()

const nav = document.getElementById("main-nav");
createNavigation(assignments, nav, true)