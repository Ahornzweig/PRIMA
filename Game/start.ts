
function howTo(): void {
    let howTo: HTMLDivElement = <HTMLDivElement>document.getElementById("how-to-play");
    let userInterface: HTMLDivElement = <HTMLDivElement>document.getElementById("user-interface");

    userInterface.style.display = "none";
    howTo.style.display = "flex";

}

function startScreen(): void {
    let howTo: HTMLDivElement = <HTMLDivElement>document.getElementById("how-to-play");
    let userInterface: HTMLDivElement = <HTMLDivElement>document.getElementById("user-interface");

    userInterface.style.display = "block";
    howTo.style.display = "none";

}

function loadGame(): void {
    let userInterface: HTMLDivElement = <HTMLDivElement>document.getElementById("user-interface");
    userInterface.style.display = "none";
}

function newGame(): void {
    let userInterface: HTMLDivElement = <HTMLDivElement>document.getElementById("user-interface");
    let newGame: HTMLDivElement = <HTMLDivElement>document.getElementById("new-game");

    userInterface.style.display = "none";
    newGame.style.display = "flex";
}

function buildGame(): void {
    let newGame: HTMLDivElement = <HTMLDivElement>document.getElementById("new-game");
    let gameInterface: HTMLDivElement = <HTMLDivElement>document.getElementById("game-interface");
    let input: HTMLInputElement = <HTMLInputElement>document.getElementById("user-name");
    let name: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById("name");

    name.innerHTML = input.value;
    gameInterface.style.display = "block";
    newGame.style.display = "none";

}

/*function saveGame(): void {
    let newGame: HTMLDivElement = <HTMLDivElement>document.getElementById("new-game");

    newGame.style.display = "none";

}*/
