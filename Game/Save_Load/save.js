"use strict";
var Game;
(function (Game) {
    function saveGame() {
        Game.f.Loop.stop();
        let gameInterface = document.getElementById("game-interface");
        let canvas = document.querySelector("canvas");
        gameInterface.style.display = "none";
        canvas.style.display = "none";
        let levelData = Game.data.Game.Levels[2];
        let background = levelData.background;
        let name = levelData.name;
        let ground = levelData.ground;
        let nature = levelData.nature;
        for (let data of levelData.enemys) {
            data.positions = [];
            data.index = [];
            for (let enemy of Game.enemies.getChildren()) {
                if (enemy.name == data.name) {
                    let positions = enemy.enemies;
                    data.positions.push(positions);
                    data.index.push(enemy.index);
                }
            }
        }
        let enemys = levelData.enemys;
        let saveData = {
            "Game": {
                "Levels": [{ background, name, ground, nature, enemys }]
            }
        };
        console.log(saveData);
        saveData = JSON.stringify(saveData);
        let content = document.querySelector("textarea");
        content.value = saveData + "";
        let saveScreen = document.getElementById("save-screen");
        saveScreen.style.display = "block";
    }
    function prepareSave() {
        let button = document.getElementById("to-save");
        button.addEventListener("click", saveGame);
    }
    window.addEventListener("load", prepareSave);
})(Game || (Game = {}));
//# sourceMappingURL=save.js.map