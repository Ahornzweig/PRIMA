"use strict";
/// <reference path="L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L14_ScrollerGame;
/// <reference path="L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L14_ScrollerGame) {
    L14_ScrollerGame.f = FudgeCore;
    let OBJECTTYPE;
    (function (OBJECTTYPE) {
        OBJECTTYPE["OBJECT"] = "Object";
        OBJECTTYPE["ENEMY"] = "Enemy";
    })(OBJECTTYPE = L14_ScrollerGame.OBJECTTYPE || (L14_ScrollerGame.OBJECTTYPE = {}));
    let keysPressed = {};
    let girl;
    /*let leafTree: Object;
    let pineTree: Object;
    let slimTree: Object;*/
    let data;
    let canvas;
    let lookAt = L14_ScrollerGame.f.Vector3.ZERO();
    let rotationSpeed = .2;
    async function loadData() {
        let response = await fetch("https://ahornzweig.github.io/PRIMA/L14_ScrollerGame/gameData.json");
        let offer = await response.text();
        data = JSON.parse(offer);
        console.log(data);
        main();
    }
    function readTextFile(file, callback) {
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
        }
      }
      rawFile.send(null);
    }
  
    //usage:
    readTextFile("https://ahornzweig.github.io/PRIMA/L14_ScrollerGame/gameData.json", function (text) {
      var data = JSON.parse(text);
      console.log(data);
    });
    function main() {
        let img = document.querySelector("img");
        canvas = document.querySelector("canvas");
        //let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
        let txtImage = new L14_ScrollerGame.f.TextureImage();
        txtImage.image = img;
        L14_ScrollerGame.f.RenderManager.initialize(true, false);
        L14_ScrollerGame.cmpCamera = new L14_ScrollerGame.f.ComponentCamera();
        L14_ScrollerGame.cmpCamera.pivot.translateZ(6);
        L14_ScrollerGame.cmpCamera.pivot.translateY(1.5);
        L14_ScrollerGame.cmpCamera.pivot.translateX(2);
        lookAt.set(2, 1.5, 0);
        L14_ScrollerGame.cmpCamera.pivot.lookAt(lookAt);
        L14_ScrollerGame.cmpCamera.backgroundColor = L14_ScrollerGame.f.Color.CSS("aliceblue");
        L14_ScrollerGame.game = new L14_ScrollerGame.f.Node("Game");
        L14_ScrollerGame.level = buildLevel(txtImage);
        L14_ScrollerGame.game.appendChild(L14_ScrollerGame.level);
        L14_ScrollerGame.Girl.generateSprites(txtImage, [[0, 0, 650, 1000, 7, 1000], [3168, 1000, 650, 1000, 1, 1000], [3818, 1000, 650, 1000, 1, 1000]]);
        girl = new L14_ScrollerGame.Girl("GirlHero");
        L14_ScrollerGame.level.appendChild(girl);
        let viewport = new L14_ScrollerGame.f.Viewport();
        viewport.initialize("Viewport", L14_ScrollerGame.game, L14_ScrollerGame.cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        document.addEventListener("mousemove", armMovement);
        L14_ScrollerGame.f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        L14_ScrollerGame.f.Loop.start(L14_ScrollerGame.f.LOOP_MODE.TIME_GAME, 14);
        function update(_event) {
            processInput();
            let speed = L14_ScrollerGame.f.Vector3.ZERO();
            speed.x = 1.3;
            let timeFrame = L14_ScrollerGame.f.Loop.timeFrameGame / 1000;
            let distance = L14_ScrollerGame.f.Vector3.SCALE(speed, timeFrame);
            if (keysPressed[L14_ScrollerGame.f.KEYBOARD_CODE.A]) {
                L14_ScrollerGame.cmpCamera.pivot.translateX(-distance.x);
                L14_ScrollerGame.direction = "left";
                lookAt.x += -distance.x;
                L14_ScrollerGame.cmpCamera.pivot.lookAt(lookAt);
            }
            if (keysPressed[L14_ScrollerGame.f.KEYBOARD_CODE.D]) {
                L14_ScrollerGame.cmpCamera.pivot.translateX(distance.x);
                lookAt.x += distance.x;
                L14_ScrollerGame.direction = "right";
                L14_ScrollerGame.cmpCamera.pivot.lookAt(lookAt);
            }
            L14_ScrollerGame.Girl.armNode.activate(true);
            viewport.draw();
            //crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            //crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == L14_ScrollerGame.f.KEYBOARD_CODE.SPACE && _event.type == "keydown") {
            girl.act(L14_ScrollerGame.ACTION.JUMP);
        }
    }
    /* if (direction == "right") {
       floors.sort(function (a: number[], b: number[]): number { return a[2] - b[2]; });
     } else {
       floors.sort(function (a: number[], b: number[]): number { return b[2] - a[2]; });
     */
    function processInput() {
        if (keysPressed[L14_ScrollerGame.f.KEYBOARD_CODE.A]) {
            girl.act(L14_ScrollerGame.ACTION.WALK, L14_ScrollerGame.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[L14_ScrollerGame.f.KEYBOARD_CODE.D]) {
            girl.act(L14_ScrollerGame.ACTION.WALK, L14_ScrollerGame.DIRECTION.RIGHT);
            return;
        }
        girl.act(L14_ScrollerGame.ACTION.IDLE);
    }
    function buildLevel(_txtImage) {
        let levelData = data.Game.Level1;
        let level = new L14_ScrollerGame.f.Node(levelData.name);
        let that;
        for (let key in levelData.enemys) {
            that = levelData.enemys[key];
            L14_ScrollerGame.Enemy.generateSprites(_txtImage, that.name, that.spritsheetData);
            let enemy = new L14_ScrollerGame.Enemy(that.name, that.positions);
            enemy.cmpTransform.local.translateX(that.positions[0][0]);
            enemy.cmpTransform.local.translateY(that.positions[0][1]);
            level.appendChild(enemy);
        }
        for (let key in levelData.nature) {
            that = levelData.nature[key];
            //console.log(that);
            L14_ScrollerGame.Object.generateSprites(_txtImage, that.name, that.spritsheetData);
            let object = new L14_ScrollerGame.Object(that.name, that.positions);
            object.cmpTransform.local.translateX(that.positions[0][0]);
            object.cmpTransform.local.translateY(that.positions[0][1]);
            level.appendChild(object);
        }
        L14_ScrollerGame.checkColision = new L14_ScrollerGame.f.Node("checkKolision");
        for (let i = 0; i < 3; i++) {
            let that = levelData.ground.transform[i];
            let floor = new L14_ScrollerGame.Floor(levelData.ground.transform);
            floor.cmpTransform.local.scaleX(that[0]);
            floor.cmpTransform.local.scaleY(that[1]);
            floor.cmpTransform.local.translateX(that[2]);
            floor.cmpTransform.local.translateY(that[3]);
            L14_ScrollerGame.checkColision.appendChild(floor);
        }
        level.appendChild(L14_ScrollerGame.checkColision);
        return level;
    }
    function armMovement(_event) {
        let currentY = -_event.movementY * rotationSpeed;
        girl.rotateZ(currentY);
    }
    window.addEventListener("load", loadData);
})(L14_ScrollerGame || (L14_ScrollerGame = {}));
//# sourceMappingURL=Main.js.map
