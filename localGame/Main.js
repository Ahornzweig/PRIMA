"use strict";
///<reference types="../Game/FUDGE/FudgeCore.js"/>
var Game;
///<reference types="../Game/FUDGE/FudgeCore.js"/>
(function (Game) {
    Game.f = FudgeCore;
    let keysPressed = {};
    Game.useAttack = { 1: [true, true], 2: [false, true] };
    Game.direction = "right";
    let canvas;
    let lookAt = Game.f.Vector3.ZERO();
    let txtImage;
    let rotationSpeed = .2;
    let energy;
    let water;
    let energyBall;
    let waterArrow;
    Game.HP = 100;
    Game.enemiesDefeated = 0;
    let jumpAudio;
    async function loadData() {
        let response = await fetch("gameData.json"); //muss lokal zu gameData.json geändert werden
        let offer = await response.text();
        Game.data = await JSON.parse(offer);
        main(Game.data);
    }
    function main(_data) {
        loadHud();
        energy = document.getElementById("energy");
        water = document.getElementById("water");
        Game.healtBar = document.getElementById("life");
        Game.defElement = document.getElementById("defeated");
        Game.defElement.innerHTML = "Defeated: " + Game.enemiesDefeated;
        let audio = document.getElementById("background");
        audio.play();
        audio.volume = 0.15;
        jumpAudio = document.getElementById("jump");
        jumpAudio.volume = 0.05;
        let img = document.querySelector("img");
        canvas = document.querySelector("canvas");
        txtImage = new Game.f.TextureImage();
        txtImage.image = img;
        Game.f.RenderManager.initialize(true, false);
        let levelData = Game.data.Game.Levels[Game.levelIndex];
        console.log(levelData);
        Game.cmpCamera = new Game.f.ComponentCamera();
        Game.cmpCamera.pivot.translateZ(levelData.camPos[2]);
        Game.cmpCamera.pivot.translateY(levelData.camPos[1]);
        Game.cmpCamera.pivot.translateX(levelData.camPos[0]);
        lookAt.set(levelData.camPos[0], levelData.camPos[1], 0);
        Game.cmpCamera.pivot.lookAt(lookAt);
        Game.cmpCamera.backgroundColor = Game.f.Color.CSS("aliceblue");
        Game.game = new Game.f.Node("Game");
        Game.level = buildLevel(txtImage);
        Game.game.appendChild(Game.level);
        Game.Girl.generateSprites(txtImage, [[0, 0, 650, 1000, 7, 1000], [3168, 1000, 650, 1000, 1, 1000], [3818, 1000, 650, 1000, 1, 1000]]);
        Game.girl = new Game.Girl("GirlHero");
        Game.girl.cmpTransform.local.translateX(levelData.girlPos[0]);
        Game.girl.cmpTransform.local.translateY(levelData.girlPos[1]);
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
        for (let enemy of Game.enemies.getChildren()) {
            setTimeout(function () {
                enemy.attack.use();
            }, 5000);
        }
        function update(_event) {
            processInput();
            let newTranslation = Game.cmpCamera.pivot.translation;
            newTranslation.x = Game.girl.cmpTransform.local.translation.x + Game.data.Game.Levels[Game.levelIndex].camTranslatioX;
            Game.cmpCamera.pivot.translation = newTranslation;
            //lookAt.x += distance.x;
            lookAt.x = newTranslation.x;
            Game.cmpCamera.pivot.lookAt(lookAt);
            if (keysPressed[Game.f.KEYBOARD_CODE.A] && Game.girl.cmpTransform.local.translation.x > -1) {
                Game.direction = "left";
            }
            if (keysPressed[Game.f.KEYBOARD_CODE.D]) {
                Game.direction = "right";
            }
            let endOfLevel = Game.data.Game.Levels[Game.levelIndex].ground.transform;
            if (Game.cmpCamera.pivot.translation.x > endOfLevel[endOfLevel.length - 2][2]) {
                Game.f.Loop.stop();
                Game.levelIndex = Game.data.Game.Levels[Game.levelIndex].next;
                if (Game.levelIndex < 3) {
                    loadNextData();
                }
                else {
                    let endScreen = document.getElementById("end-screen");
                    let good = document.getElementById("good");
                    let bad = document.getElementById("bad");
                    endScreen.style.display = "block";
                    if (Game.enemiesDefeated < 6) {
                        good.style.display = "block";
                    }
                    else {
                        bad.style.display = "block";
                    }
                }
            }
            Game.Girl.armNode.activate(true);
            viewport.draw();
        }
    }
    Game.main = main;
    let allowJump = true;
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == Game.f.KEYBOARD_CODE.SPACE && _event.type == "keydown") {
            if (allowJump) {
                Game.girl.act(Game.ACTION.JUMP);
                jumpAudio.loop = false;
                jumpAudio.currentTime = 0;
                jumpAudio.play();
                allowJump = false;
                setTimeout(function () {
                    allowJump = true;
                }, 1200);
            }
        }
    }
    function handleAttack(_event) {
        if (_event.keyCode == 49 || _event.code == Game.f.KEYBOARD_CODE.NUMPAD1) {
            Game.useAttack[1][0] = true;
            Game.useAttack[2][0] = false;
            energy.className = "active";
            water.className = "";
        }
        if (_event.keyCode == 50 || _event.code == Game.f.KEYBOARD_CODE.NUMPAD2) {
            Game.useAttack[1][0] = false;
            Game.useAttack[2][0] = true;
            energy.className = "";
            water.className = "active";
        }
    }
    function attack(_event) {
        //style="background-color: rgb(124, 190, 212);"
        let time;
        let style;
        let styleCooldown;
        if (Game.useAttack[1][0] && Game.useAttack[1][1]) {
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
    }
    function processInput() {
        if (keysPressed[Game.f.KEYBOARD_CODE.A]) {
            if (Game.girl.cmpTransform.local.translation.x > -1) {
                Game.girl.act(Game.ACTION.WALK, Game.DIRECTION.LEFT);
            }
            else {
                Game.girl.speed.x = 0;
            }
            return;
        }
        if (keysPressed[Game.f.KEYBOARD_CODE.D]) {
            Game.girl.act(Game.ACTION.WALK, Game.DIRECTION.RIGHT);
            return;
        }
        Game.girl.act(Game.ACTION.IDLE);
    }
    function buildLevel(_txtImage) {
        let levelData = Game.data.Game.Levels[Game.levelIndex];
        let level = new Game.f.Node(levelData.name);
        let that;
        Game.Attack.generateSprites(_txtImage, "waterArrow", [[50, 1000, 150, 50, 2, 250], [50, 1000, 150, 50, 1, 200]]);
        waterArrow = new Game.Attack("waterArrow", [1.5, 0], "splash");
        Game.Attack.generateSprites(txtImage, "energyBall", [[0, 1000, 50, 48, 1, 150], [0, 1000, 50, 48, 1, 100]]);
        energyBall = new Game.Attack("energyBall", [1.4, 0], "boom");
        let txtImageBackground;
        let bgImg = document.getElementById(levelData.background.id);
        txtImageBackground = new Game.f.TextureImage();
        txtImageBackground.image = bgImg;
        Game.backgrounds = new Game.f.Node("background");
        that = levelData.background;
        Game.Object.generateSprites(txtImageBackground, that.name, that.spritsheetData);
        for (let i = 0; i < that.positions.length; i++) {
            let object = new Game.Object(that.name, that.positions[i], that.index[i], that.Z);
            object.cmpTransform.local.translateX(that.positions[i][that.index[i]][0]);
            object.cmpTransform.local.translateY(that.positions[i][that.index[i]][1]);
            object.cmpTransform.local.translateZ(that.Z);
            object.cmpTransform.local.scaleX(that.scale[0]);
            object.cmpTransform.local.scaleY(that.scale[1]);
            object.offset = that.scale[1];
            if (i == 1) {
                object.cmpTransform.local.rotateY(-180);
            }
            Game.backgrounds.appendChild(object);
        }
        level.appendChild(Game.backgrounds);
        Game.enemies = new Game.f.Node("enemies");
        Game.EnemyAttack.generateSprites(txtImage, "energyBall", [[0, 1000, 50, 48, 1, 150], [0, 1000, 50, 48, 1, 100]]);
        for (let key in levelData.enemys) {
            that = levelData.enemys[key];
            Game.Enemy.generateSprites(_txtImage, that.name, that.spritsheetData);
            for (let i = 0; i < that.positions.length; i++) {
                let enemy = new Game.Enemy(that.name, that.positions[i], that.scale[0], that.index[i], that.speed);
                enemy.cmpTransform.local.translateX(that.positions[i][that.index[i]][0]);
                enemy.cmpTransform.local.translateY(that.positions[i][that.index[i]][1]);
                enemy.cmpTransform.local.scaleX(that.scale[0]);
                enemy.cmpTransform.local.scaleY(that.scale[1]);
                if (that.name == "fish") {
                    enemy.cmpTransform.local.rotateY(180);
                    enemy.act(Game.ACTION.WALK);
                }
                Game.enemies.appendChild(enemy);
            }
        }
        level.appendChild(Game.enemies);
        Game.natures = new Game.f.Node("Nature");
        for (let key in levelData.nature) {
            that = levelData.nature[key];
            Game.Object.generateSprites(_txtImage, that.name, that.spritsheetData);
            for (let i = 0; i < that.positions.length; i++) {
                let object = new Game.Object(that.name, that.positions[i], that.index[i]);
                object.cmpTransform.local.translateX(that.positions[i][that.index[i]][0]);
                object.cmpTransform.local.translateY(that.positions[i][that.index[i]][1]);
                Game.natures.appendChild(object);
            }
        }
        level.appendChild(Game.natures);
        Game.tiles = new Game.f.Node("checkKolision");
        for (let i = 0; i < 3; i++) {
            let that = levelData.ground.transform[levelData.ground.index[i]];
            let floor = new Game.Floor(levelData.ground.transform, levelData.ground.index[i]);
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
    function continueGame() {
        let saveScreen = document.getElementById("save-screen");
        saveScreen.style.display = "none";
        Game.f.Loop.start();
    }
    async function loadNextData() {
        let response = await fetch("gameData.json"); //muss lokal zu gameData.json geändert werden
        let offer = await response.text();
        Game.data = await JSON.parse(offer);
        rebuildLevel(Game.data);
    }
    function rebuildLevel(_data) {
        let levelData = Game.data.Game.Levels[Game.levelIndex];
        let gameOver = document.getElementById("gameover-screen");
        gameOver.style.display = "none";
        let gameInterface = document.getElementById("game-interface");
        let canvas = document.querySelector("canvas");
        gameInterface.style.display = "block";
        canvas.style.display = "block";
        Game.HP = 100;
        Game.healtBar.innerHTML = Game.HP + " HP";
        Game.healtBar.style.width = Game.HP * 2 + "px";
        let newTranslation = Game.f.Vector3.ZERO();
        newTranslation.x = levelData.girlPos[0];
        newTranslation.y = levelData.girlPos[1];
        newTranslation.z = 0;
        Game.girl.cmpTransform.local.translation = newTranslation;
        //girl.cmpTransform.local.translateX(levelData.girlPos[0]);
        //girl.cmpTransform.local.translateY(levelData.girlPos[0]);
        newTranslation.x = levelData.camPos[0];
        newTranslation.y = levelData.camPos[1];
        newTranslation.z = levelData.camPos[2];
        Game.cmpCamera.pivot.translation = newTranslation;
        lookAt.set(levelData.camPos[0], levelData.camPos[1], 0);
        Game.cmpCamera.pivot.lookAt(lookAt);
        let that;
        let fishI = 0;
        let monkyI = 0;
        for (let i = 0; i < Game.enemies.getChildren().length; i++) {
            let enemy = Game.enemies.getChildren()[i];
            if (enemy.name == "fish") {
                that = levelData.enemys[0];
                //moveObjects(enemy, that, fishI);
                enemy.enemies = that.positions[fishI];
                enemy.index = that.index[fishI];
                newTranslation.x = that.positions[fishI][enemy.index][0];
                newTranslation.y = that.positions[fishI][enemy.index][1];
                newTranslation.z = 0;
                enemy.cmpTransform.local.translation = newTranslation;
                fishI++;
            }
            else if (enemy.name == "monky") {
                that = levelData.enemys[1];
                enemy.enemies = that.positions[monkyI];
                enemy.index = that.index[monkyI];
                newTranslation.x = that.positions[monkyI][enemy.index][0];
                newTranslation.y = that.positions[monkyI][enemy.index][1];
                newTranslation.z = 0;
                enemy.cmpTransform.local.translation = newTranslation;
                monkyI++;
            }
        }
        let leafI = 0;
        let pineI = 0;
        let slimI = 0;
        for (let i = 0; i < Game.natures.getChildren().length; i++) {
            let nature = Game.natures.getChildren()[i];
            if (nature.name == "LeafTree") {
                that = levelData.nature[0];
                nature.objects = that.positions[leafI];
                nature.index = that.index[leafI];
                newTranslation.x = that.positions[leafI][nature.index][0];
                newTranslation.y = that.positions[leafI][nature.index][1];
                newTranslation.z = 0;
                nature.cmpTransform.local.translation = newTranslation;
                leafI++;
            }
            else if (nature.name == "PineTree") {
                that = levelData.nature[1];
                nature.objects = that.positions[pineI];
                nature.index = that.index[pineI];
                newTranslation.x = that.positions[pineI][nature.index][0];
                newTranslation.y = that.positions[pineI][nature.index][1];
                newTranslation.z = 0;
                nature.cmpTransform.local.translation = newTranslation;
                pineI++;
            }
            else if (nature.name == "SlimTree") {
                that = levelData.nature[2];
                nature.objects = that.positions[slimI];
                nature.index = that.index[slimI];
                newTranslation.x = that.positions[slimI][nature.index][0];
                newTranslation.y = that.positions[slimI][nature.index][1];
                newTranslation.z = 0;
                nature.cmpTransform.local.translation = newTranslation;
                slimI++;
            }
        }
        let txtImageBackground;
        let bgImg = document.getElementById(levelData.background.id);
        txtImageBackground = new Game.f.TextureImage();
        txtImageBackground.image = bgImg;
        Game.backgrounds.removeChild(Game.backgrounds.getChildren()[0]);
        Game.backgrounds.removeChild(Game.backgrounds.getChildren()[0]);
        that = levelData.background;
        Game.Object.generateSprites(txtImageBackground, that.name, that.spritsheetData);
        for (let i = 0; i < that.positions.length; i++) {
            let object = new Game.Object(that.name, that.positions[i], that.index[i], that.Z);
            object.cmpTransform.local.translateX(that.positions[i][that.index[i]][0]);
            object.cmpTransform.local.translateY(that.positions[i][that.index[i]][1]);
            object.cmpTransform.local.translateZ(that.Z);
            object.cmpTransform.local.scaleX(that.scale[0]);
            object.cmpTransform.local.scaleY(that.scale[1]);
            object.offset = that.scale[1];
            if (i == 1) {
                object.cmpTransform.local.rotateY(-180);
            }
            Game.backgrounds.appendChild(object);
        }
        for (let i = 0; i < Game.tiles.getChildren().length; i++) {
            let tile = Game.tiles.getChildren()[i];
            that = levelData.ground;
            tile.index = that.index[i];
            tile.floors = that.transform;
            newTranslation.x = that.transform[i][2];
            newTranslation.y = that.transform[i][3];
            newTranslation.z = 0;
            tile.cmpTransform.local.translation = newTranslation;
        }
        Game.f.Loop.timeFrameGame = 0;
        Game.f.Loop.start(Game.f.LOOP_MODE.TIME_GAME, 14);
    }
    function loadHud() {
        let gameInterface = document.getElementById("game-interface");
        gameInterface.style.display = "block";
        let continueButton = document.getElementById("continue");
        continueButton.addEventListener("click", continueGame);
    }
    function loadLevel(_event) {
        Game.levelIndex = 0;
        let id = _event.target.id;
        if (id == "level2") {
            Game.levelIndex = 1;
        }
        else if (id == "level3") {
            Game.levelIndex = 2;
        }
        let loadScreen = document.getElementById("load-screen");
        loadScreen.style.display = "none";
        loadData();
    }
    function loadGame() {
        /*let loadScreen: HTMLDivElement = <HTMLDivElement>document.getElementById("load-screen");
        loadScreen.style.display = "block";*/
        let level1 = document.getElementById("level1");
        level1.addEventListener("click", loadLevel);
        let level2 = document.getElementById("level2");
        level2.addEventListener("click", loadLevel);
        let level3 = document.getElementById("level3");
        level3.addEventListener("click", loadLevel);
    }
    function start() {
        Game.levelIndex = 0;
        let startButton = document.getElementById("start");
        startButton.addEventListener("click", loadData);
        let loadButton = document.getElementById("load-game");
        loadButton.addEventListener("click", loadGame);
    }
    window.addEventListener("load", start);
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map