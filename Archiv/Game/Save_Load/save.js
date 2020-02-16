"use strict";
var Game;
(function (Game) {
    function saveGame() {
        Game.f.Loop.stop();
        let userName = document.getElementById("name").innerHTML;
        let levelData = Game.data.Game.Levels[Game.levelIndex];
        levelData.background.index = [];
        for (let bg of Game.backgrounds.getChildren()) {
            levelData.background.index.push(bg.index);
        }
        let background = levelData.background;
        let name = levelData.name;
        let next = levelData.next;
        levelData.ground.index = [];
        for (let floor of Game.tiles.getChildren()) {
            levelData.ground.index.push(floor.index);
        }
        let ground = levelData.ground;
        for (let data of levelData.nature) {
            data.index = [];
            for (let tree of Game.natures.getChildren()) {
                if (tree.name == data.name) {
                    data.index.push(tree.index);
                }
            }
        }
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
        let girlPos = [Game.girl.cmpTransform.local.translation.x, Game.girl.cmpTransform.local.translation.y];
        let camPos = [Game.cmpCamera.pivot.translation.x, Game.cmpCamera.pivot.translation.y, Game.cmpCamera.pivot.translation.z];
        let camTranslatioX = levelData.camTranslatioX;
        let defeated = Game.enemiesDefeated;
        let saveData = {
            "Game": {
                "Levels": [{ background, name, ground, nature, enemys, next, userName, HP: Game.HP, girlPos, camPos, defeated, camTranslatioX }]
            }
        };
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