"use strict";
///// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L14_ScrollerGame;
///// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L14_ScrollerGame) {
    L14_ScrollerGame.f = FudgeCore;
    //export import Sprite = L14_ScrollerFoundation.Sprite;
    //export import NodeSprite = L14_ScrollerFoundation.NodeSprite;
    let OBJECTTYPE;
    (function (OBJECTTYPE) {
        OBJECTTYPE["OBJECT"] = "Object";
        OBJECTTYPE["ENEMY"] = "Enemy";
    })(OBJECTTYPE = L14_ScrollerGame.OBJECTTYPE || (L14_ScrollerGame.OBJECTTYPE = {}));
    let keysPressed = {};
    L14_ScrollerGame.useAttack = { 1: [true, true], 2: [false, true], 3: [false, true] };
    L14_ScrollerGame.direction = "right";
    let data;
    let canvas;
    let lookAt = L14_ScrollerGame.f.Vector3.ZERO();
    let txtImage;
    let rotationSpeed = .2;
    let energy;
    let water;
    let fire;
    let energyBall;
    let waterArrow;
    async function loadData() {
        let response = await fetch("gameData.json"); //https://ahornzweig.github.io/PRIMA/L14_ScrollerGame/gameData.json
        let offer = await response.text();
        data = await JSON.parse(offer);
        console.log(data);
        main(data);
    }
    function main(_data) {
        energy = document.getElementById("energy");
        water = document.getElementById("water");
        fire = document.getElementById("fire");
        let img = document.querySelector("img");
        canvas = document.querySelector("canvas");
        //let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
        txtImage = new L14_ScrollerGame.f.TextureImage();
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
        L14_ScrollerGame.girl = new L14_ScrollerGame.Girl("GirlHero");
        L14_ScrollerGame.level.appendChild(L14_ScrollerGame.girl);
        let viewport = new L14_ScrollerGame.f.Viewport();
        viewport.initialize("Viewport", L14_ScrollerGame.game, L14_ScrollerGame.cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keydown", handleAttack);
        document.addEventListener("keyup", handleKeyboard);
        document.addEventListener("mousemove", armMovement);
        document.addEventListener("click", attack);
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
            L14_ScrollerGame.girl.act(L14_ScrollerGame.ACTION.JUMP);
        }
    }
    function handleAttack(_event) {
        if (_event.keyCode == 49 || _event.code == L14_ScrollerGame.f.KEYBOARD_CODE.NUMPAD1) {
            L14_ScrollerGame.useAttack[1][0] = true;
            L14_ScrollerGame.useAttack[2][0] = false;
            L14_ScrollerGame.useAttack[3][0] = false;
            energy.className = "active";
            water.className = "";
            fire.className = "";
        }
        if (_event.keyCode == 50 || _event.code == L14_ScrollerGame.f.KEYBOARD_CODE.NUMPAD2) {
            L14_ScrollerGame.useAttack[1][0] = false;
            L14_ScrollerGame.useAttack[2][0] = true;
            L14_ScrollerGame.useAttack[3][0] = false;
            energy.className = "";
            water.className = "active";
            fire.className = "";
        }
        if (_event.keyCode == 51 || _event.code == L14_ScrollerGame.f.KEYBOARD_CODE.NUMPAD3) {
            L14_ScrollerGame.useAttack[1][0] = false;
            L14_ScrollerGame.useAttack[2][0] = false;
            L14_ScrollerGame.useAttack[3][0] = true;
            energy.className = "";
            water.className = "";
            fire.className = "active";
        }
    }
    function attack(_event) {
        //style="background-color: rgb(124, 190, 212);"
        let time;
        let style;
        let styleCooldown;
        if (L14_ScrollerGame.useAttack[1][0] && L14_ScrollerGame.useAttack[1][1]) {
            time = 6;
            style = "rgba(124, 190, 212, 1)";
            styleCooldown = "rgba(124, 190, 212, 0.5)";
            energyBall.use(time, "energy", 1, style, styleCooldown);
        }
        else if (L14_ScrollerGame.useAttack[2][0] && L14_ScrollerGame.useAttack[2][1]) {
            time = 10;
            style = "rgba(0, 0, 255, 1)";
            styleCooldown = "rgba(0, 0, 100, 1)";
            waterArrow.use(time, "water", 2, style, styleCooldown);
        }
        else if (L14_ScrollerGame.useAttack[3][0] && L14_ScrollerGame.useAttack[3][1]) {
            console.log("test3");
        }
    }
    L14_ScrollerGame.attack = attack;
    function processInput() {
        if (keysPressed[L14_ScrollerGame.f.KEYBOARD_CODE.A]) {
            L14_ScrollerGame.girl.act(L14_ScrollerGame.ACTION.WALK, L14_ScrollerGame.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[L14_ScrollerGame.f.KEYBOARD_CODE.D]) {
            L14_ScrollerGame.girl.act(L14_ScrollerGame.ACTION.WALK, L14_ScrollerGame.DIRECTION.RIGHT);
            return;
        }
        L14_ScrollerGame.girl.act(L14_ScrollerGame.ACTION.IDLE);
    }
    function buildLevel(_txtImage) {
        let levelData = data.Game.Level1;
        let level = new L14_ScrollerGame.f.Node(levelData.name);
        let that;
        L14_ScrollerGame.enemies = new L14_ScrollerGame.f.Node("enemies");
        L14_ScrollerGame.Attack.generateSprites(txtImage, "energyBall", [[0, 1000, 50, 48, 1, 250], [0, 1000, 50, 48, 1, 125]]);
        energyBall = new L14_ScrollerGame.Attack("energyBall", [1.5, 0], "boom");
        L14_ScrollerGame.Attack.generateSprites(_txtImage, "waterArrow", [[50, 1000, 150, 50, 2, 250], [50, 1000, 150, 50, 1, 150]]);
        waterArrow = new L14_ScrollerGame.Attack("waterArrow", [1.5, 0], "splash");
        for (let key in levelData.enemys) {
            that = levelData.enemys[key];
            L14_ScrollerGame.Enemy.generateSprites(_txtImage, that.name, that.spritsheetData);
            let enemy = new L14_ScrollerGame.Enemy(that.name, that.positions, that.positions[0][1], that.index);
            enemy.cmpTransform.local.translateX(that.positions[0][0]);
            enemy.cmpTransform.local.translateY(that.positions[0][1]);
            enemy.cmpTransform.local.scaleX(that.scale[0]);
            enemy.cmpTransform.local.scaleY(that.scale[1]);
            L14_ScrollerGame.enemies.appendChild(enemy);
        }
        level.appendChild(L14_ScrollerGame.enemies);
        for (let key in levelData.nature) {
            that = levelData.nature[key];
            L14_ScrollerGame.Object.generateSprites(_txtImage, that.name, that.spritsheetData);
            let object = new L14_ScrollerGame.Object(that.name, that.positions);
            object.cmpTransform.local.translateX(that.positions[0][0]);
            object.cmpTransform.local.translateY(that.positions[0][1]);
            level.appendChild(object);
        }
        L14_ScrollerGame.tiles = new L14_ScrollerGame.f.Node("checkKolision");
        for (let i = 0; i < 3; i++) {
            let that = levelData.ground.transform[i];
            let floor = new L14_ScrollerGame.Floor(levelData.ground.transform);
            floor.cmpTransform.local.scaleX(that[0]);
            floor.cmpTransform.local.scaleY(that[1]);
            floor.cmpTransform.local.translateX(that[2]);
            floor.cmpTransform.local.translateY(that[3]);
            L14_ScrollerGame.tiles.appendChild(floor);
        }
        level.appendChild(L14_ScrollerGame.tiles);
        return level;
    }
    function armMovement(_event) {
        let currentY = -_event.movementY * rotationSpeed;
        L14_ScrollerGame.girl.rotateZ(currentY);
    }
    window.addEventListener("load", loadData);
})(L14_ScrollerGame || (L14_ScrollerGame = {}));
//# sourceMappingURL=Main.js.map