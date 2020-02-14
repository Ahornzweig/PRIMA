"use strict";
///<reference types="../Game/FUDGE/FudgeCore.js"/>
var Game;
///<reference types="../Game/FUDGE/FudgeCore.js"/>
(function (Game) {
    Game.f = FudgeCore;
    let keysPressed = {};
    Game.useAttack = { 1: [true, true], 2: [false, true], 3: [false, true] };
    Game.direction = "right";
    let canvas;
    let levelIndex;
    let lookAt = Game.f.Vector3.ZERO();
    let txtImage;
    let rotationSpeed = .2;
    let energy;
    let water;
    let fire;
    let energyBall;
    let waterArrow;
    let fireBall;
    Game.HP = 100;
    async function loadData() {
        let response = await fetch("https://ahornzweig.github.io/PRIMA/Game/gameData.json"); //https://ahornzweig.github.io/PRIMA/Game/gameData.json
        let offer = await response.text();
        Game.data = await JSON.parse(offer);
        console.log(Game.data);
        main(Game.data);
    }
    function main(_data) {
        energy = document.getElementById("energy");
        water = document.getElementById("water");
        fire = document.getElementById("fire");
        Game.HealtBar = document.getElementById("life");
        let img = document.querySelector("img");
        canvas = document.querySelector("canvas");
        //let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
        txtImage = new Game.f.TextureImage();
        txtImage.image = img;
        Game.f.RenderManager.initialize(true, false);
        Game.cmpCamera = new Game.f.ComponentCamera();
        Game.cmpCamera.pivot.translateZ(6);
        Game.cmpCamera.pivot.translateY(1.5);
        Game.cmpCamera.pivot.translateX(2);
        lookAt.set(2, 1.5, 0);
        Game.cmpCamera.pivot.lookAt(lookAt);
        Game.cmpCamera.backgroundColor = Game.f.Color.CSS("aliceblue");
        Game.game = new Game.f.Node("Game");
        Game.level = buildLevel(txtImage);
        Game.game.appendChild(Game.level);
        Game.Girl.generateSprites(txtImage, [[0, 0, 650, 1000, 7, 1000], [3168, 1000, 650, 1000, 1, 1000], [3818, 1000, 650, 1000, 1, 1000]]);
        Game.girl = new Game.Girl("GirlHero");
        Game.level.appendChild(Game.girl);
        let viewport = new Game.f.Viewport();
        viewport.initialize("Viewport", Game.game, Game.cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keydown", handleAttack);
        document.addEventListener("keyup", handleKeyboard);
        document.addEventListener("mousemove", armMovement);
        document.addEventListener("click", attack);
        Game.f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        Game.f.Loop.start(Game.f.LOOP_MODE.TIME_GAME, 14);
        function update(_event) {
            processInput();
            let speed = Game.f.Vector3.ZERO();
            speed.x = 1.3;
            let timeFrame = Game.f.Loop.timeFrameGame / 1000;
            let distance = Game.f.Vector3.SCALE(speed, timeFrame);
            if (keysPressed[Game.f.KEYBOARD_CODE.A]) {
                Game.cmpCamera.pivot.translateX(-distance.x);
                Game.direction = "left";
                lookAt.x += -distance.x;
                Game.cmpCamera.pivot.lookAt(lookAt);
            }
            if (keysPressed[Game.f.KEYBOARD_CODE.D]) {
                Game.cmpCamera.pivot.translateX(distance.x);
                lookAt.x += distance.x;
                Game.direction = "right";
                Game.cmpCamera.pivot.lookAt(lookAt);
            }
            Game.Girl.armNode.activate(true);
            viewport.draw();
            //crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            //crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == Game.f.KEYBOARD_CODE.SPACE && _event.type == "keydown") {
            Game.girl.act(Game.ACTION.JUMP);
        }
    }
    function handleAttack(_event) {
        if (_event.keyCode == 49 || _event.code == Game.f.KEYBOARD_CODE.NUMPAD1) {
            Game.useAttack[1][0] = true;
            Game.useAttack[2][0] = false;
            Game.useAttack[3][0] = false;
            energy.className = "active";
            water.className = "";
            fire.className = "";
        }
        if (_event.keyCode == 50 || _event.code == Game.f.KEYBOARD_CODE.NUMPAD2) {
            Game.useAttack[1][0] = false;
            Game.useAttack[2][0] = true;
            Game.useAttack[3][0] = false;
            energy.className = "";
            water.className = "active";
            fire.className = "";
        }
        if (_event.keyCode == 51 || _event.code == Game.f.KEYBOARD_CODE.NUMPAD3) {
            Game.useAttack[1][0] = false;
            Game.useAttack[2][0] = false;
            Game.useAttack[3][0] = true;
            energy.className = "";
            water.className = "";
            fire.className = "active";
        }
    }
    let firstAttck = true;
    function attack(_event) {
        //style="background-color: rgb(124, 190, 212);"
        let time;
        let style;
        let styleCooldown;
        if (firstAttck) {
            for (let enemy of Game.enemies.getChildren()) {
                setTimeout(function () {
                    enemy.attack.use(5);
                }, 2000);
            }
            firstAttck = false;
        }
        if (Game.useAttack[1][0] && Game.useAttack[1][1]) {
            console.log("test");
            time = 6;
            style = "rgba(124, 190, 212, 1)";
            styleCooldown = "rgba(124, 190, 212, 0.5)";
            energyBall.use(time, "energy", 1, style, styleCooldown);
        }
        else if (Game.useAttack[2][0] && Game.useAttack[2][1]) {
            time = 10;
            style = "rgba(0, 0, 255, 1)";
            styleCooldown = "rgba(0, 0, 100, 1)";
            waterArrow.use(time, "water", 2, style, styleCooldown);
        }
        else if (Game.useAttack[3][0] && Game.useAttack[3][1]) {
            time = 10;
            style = "rgba(255, 0, 0, 1)";
            styleCooldown = "rgba(100, 0, 0, 1)";
            fireBall.use(time, "fire", 2, style, styleCooldown);
        }
    }
    Game.attack = attack;
    function processInput() {
        if (keysPressed[Game.f.KEYBOARD_CODE.A]) {
            Game.girl.act(Game.ACTION.WALK, Game.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[Game.f.KEYBOARD_CODE.D]) {
            Game.girl.act(Game.ACTION.WALK, Game.DIRECTION.RIGHT);
            return;
        }
        Game.girl.act(Game.ACTION.IDLE);
    }
    function buildLevel(_txtImage) {
        let levelData = Game.data.Game.Levels[levelIndex];
        let level = new Game.f.Node(levelData.name);
        let that;
        let txtImageBackground;
        let bgImg = document.getElementById(levelData.background.id);
        txtImageBackground = new Game.f.TextureImage();
        txtImageBackground.image = bgImg;
        that = levelData.background;
        Game.Object.generateSprites(txtImageBackground, that.name, that.spritsheetData);
        for (let i = 0; i < that.positions.length; i++) {
            let object = new Game.Object(that.name, that.positions[i], that.index, that.Z);
            object.cmpTransform.local.translateX(that.positions[i][0][0]);
            object.cmpTransform.local.translateY(that.positions[i][0][1]);
            object.cmpTransform.local.translateZ(that.Z);
            object.cmpTransform.local.scaleX(that.scale[0]);
            object.cmpTransform.local.scaleY(that.scale[1]);
            if (i == 1) {
                object.cmpTransform.local.rotateY(-180);
            }
            level.appendChild(object);
        }
        Game.enemies = new Game.f.Node("enemies");
        Game.Attack.generateSprites(_txtImage, "waterArrow", [[50, 1000, 150, 50, 2, 250], [50, 1000, 150, 50, 1, 200]]);
        waterArrow = new Game.Attack("waterArrow", [1.5, 0], "splash");
        Game.Attack.generateSprites(_txtImage, "fireBall", [[5200, 0, 240, 130, 2, 340], [5200, 0, 240, 130, 1, 300]]);
        fireBall = new Game.Attack("fireBall", [1.5, 0], "boom");
        Game.Attack.generateSprites(txtImage, "energyBall", [[0, 1000, 50, 48, 1, 150], [0, 1000, 50, 48, 1, 100]]);
        energyBall = new Game.Attack("energyBall", [1.4, 0], "boom");
        Game.EnemyAttack.generateSprites(txtImage, "energyBall", [[0, 1000, 50, 48, 1, 150], [0, 1000, 50, 48, 1, 100]]);
        for (let key in levelData.enemys) {
            that = levelData.enemys[key];
            Game.Enemy.generateSprites(_txtImage, that.name, that.spritsheetData);
            for (let i = 0; i < that.positions.length; i++) {
                let enemy = new Game.Enemy(that.name, that.positions[i], that.scale[0], that.index, that.speed); //that.positions[i][0][1]
                enemy.cmpTransform.local.translateX(that.positions[i][0][0]);
                enemy.cmpTransform.local.translateY(that.positions[i][0][1]);
                enemy.cmpTransform.local.scaleX(that.scale[0]);
                enemy.cmpTransform.local.scaleY(that.scale[1]);
                if (that.name == "fish") {
                    enemy.cmpTransform.local.rotateY(180);
                    enemy.act(Game.ACTION.WALK);
                }
                Game.enemies.appendChild(enemy);
            }
        }
        //console.log(enemies);
        level.appendChild(Game.enemies);
        for (let key in levelData.nature) {
            that = levelData.nature[key];
            Game.Object.generateSprites(_txtImage, that.name, that.spritsheetData);
            for (let i = 0; i < that.positions.length; i++) {
                let object = new Game.Object(that.name, that.positions[i], that.index);
                object.cmpTransform.local.translateX(that.positions[i][0][0]);
                object.cmpTransform.local.translateY(that.positions[i][0][1]);
                level.appendChild(object);
            }
        }
        Game.tiles = new Game.f.Node("checkKolision");
        for (let i = 0; i < 3; i++) {
            let that = levelData.ground.transform[i];
            let floor = new Game.Floor(levelData.ground.transform);
            floor.cmpTransform.local.scaleX(that[0]);
            floor.cmpTransform.local.scaleY(that[1]);
            floor.cmpTransform.local.translateX(that[2]);
            floor.cmpTransform.local.translateY(that[3]);
            Game.tiles.appendChild(floor);
        }
        level.appendChild(Game.tiles);
        return level;
    }
    function armMovement(_event) {
        let currentY = -_event.movementY * rotationSpeed;
        Game.girl.rotateZ(currentY);
    }
    function start() {
        levelIndex = 0;
        let button = document.getElementById("start");
        button.addEventListener("click", loadData);
    }
    window.addEventListener("load", start);
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map