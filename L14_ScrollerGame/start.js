"use strict";
function howTo() {
    let howTo = document.getElementById("how-to-play");
    let userInterface = document.getElementById("user-interface");
    userInterface.style.display = "none";
    howTo.style.display = "flex";
}
function loadGame() {
    let userInterface = document.getElementById("user-interface");
    let gameInterface = document.getElementById("game-interface");
    gameInterface.style.display = "block";
    userInterface.style.display = "none";
}
function newGame() {
    let userInterface = document.getElementById("user-interface");
    let newGame = document.getElementById("new-game");
    userInterface.style.display = "none";
    newGame.style.display = "flex";
}
function buildGame() {
    let newGame = document.getElementById("new-game");
    let gameInterface = document.getElementById("game-interface");
    let input = document.getElementById("user-name");
    let name = document.getElementById("name");
    //console.log(input.value);
    name.innerHTML = input.value;
    gameInterface.style.display = "block";
    newGame.style.display = "none";
}
function saveGame() {
    let newGame = document.getElementById("new-game");
    newGame.style.display = "none";
}
//# sourceMappingURL=start.js.map