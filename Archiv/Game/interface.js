"use strict";
function howTo() {
    let howTo = document.getElementById("how-to-play");
    let userInterface = document.getElementById("user-interface");
    userInterface.style.display = "none";
    howTo.style.display = "flex";
}
function startScreen() {
    let howTo = document.getElementById("how-to-play");
    let userInterface = document.getElementById("user-interface");
    userInterface.style.display = "block";
    howTo.style.display = "none";
}
function loadGame() {
    let userInterface = document.getElementById("user-interface");
    userInterface.style.display = "none";
    let loadScreen = document.getElementById("load-screen");
    loadScreen.style.display = "block";
}
function newGame() {
    let userInterface = document.getElementById("user-interface");
    let newGame = document.getElementById("new-game");
    userInterface.style.display = "none";
    newGame.style.display = "flex";
}
function buildGame() {
    let newGame = document.getElementById("new-game");
    let input = document.getElementById("user-name");
    let name = document.getElementById("name");
    name.innerHTML = input.value;
    newGame.style.display = "none";
}
function reload() {
    window.location.reload(false);
}
//# sourceMappingURL=interface.js.map