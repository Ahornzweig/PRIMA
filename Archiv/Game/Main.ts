///<reference types="../Game/FUDGE/FudgeCore.js"/>
namespace Game {

  export import f = FudgeCore;
  /* export enum OBJECTTYPE {
     OBJECT = "Object",
     ENEMY = "Enemy"
   }*/

  interface KeyPressed {
    [code: string]: boolean;
  }
  interface AttackType {
    [type: number]: boolean[];
  }

  let keysPressed: KeyPressed = {};
  export let useAttack: AttackType = { 1: [true, true], 2: [false, true] };

  export let game: f.Node;
  export let level: f.Node;
  export let tiles: f.Node;
  export let enemies: f.Node;
  export let natures: f.Node;
  export let backgrounds: f.Node;
  export let girl: Girl;
  export let cmpCamera: f.ComponentCamera;
  export let direction: string = "right";

  export let data: Data;
  export let levelIndex: number;
  let canvas: HTMLCanvasElement;
  let lookAt: f.Vector3 = f.Vector3.ZERO();
  let txtImage: f.TextureImage;
  let rotationSpeed: number = .2;

  let energy: HTMLDivElement;
  let water: HTMLDivElement;
  let energyBall: Attack;
  let waterArrow: Attack;
  export let healtBar: HTMLDivElement;
  export let HP: number = 100;
  export let defElement: HTMLHeadingElement;
  export let enemiesDefeated: number = 0;

  let jumpAudio: HTMLAudioElement;

  async function loadData(): Promise<void> {
    let response: Response = await fetch("https://ahornzweig.github.io/PRIMA/Game/gameData.json"); //muss lokal zu gameData.json geändert werden
    let offer: string = await response.text();
    data = await JSON.parse(offer);

    main(data);
  }

  export function main(_data): void {

    loadHud();
    energy = <HTMLDivElement>document.getElementById("energy");
    water = <HTMLDivElement>document.getElementById("water");
    healtBar = <HTMLDivElement>document.getElementById("life");

    defElement = <HTMLHeadingElement>document.getElementById("defeated");
    defElement.innerHTML = "Defeated: " + enemiesDefeated;

    let audio: HTMLAudioElement = <HTMLAudioElement>document.getElementById("background");
    audio.play();
    audio.volume = 0.15;

    jumpAudio = <HTMLAudioElement>document.getElementById("jump");
    jumpAudio.volume = 0.05;

    let img: HTMLImageElement = document.querySelector("img");
    canvas = document.querySelector("canvas");
    txtImage = new f.TextureImage();
    txtImage.image = img;

    f.RenderManager.initialize(true, false);

    let levelData = data.Game.Levels[levelIndex];

    cmpCamera = new f.ComponentCamera();
    cmpCamera.pivot.translateZ(levelData.camPos[2]);
    cmpCamera.pivot.translateY(levelData.camPos[1]);
    cmpCamera.pivot.translateX(levelData.camPos[0]);
    lookAt.set(levelData.camPos[0], levelData.camPos[1], 0);
    cmpCamera.pivot.lookAt(lookAt);
    cmpCamera.backgroundColor = f.Color.CSS("aliceblue");

    game = new f.Node("Game");
    level = buildLevel(txtImage);
    game.appendChild(level);
    Girl.generateSprites(txtImage, [[0, 0, 650, 1000, 7, 1000], [3168, 1000, 650, 1000, 1, 1000], [3818, 1000, 650, 1000, 1, 1000]]);

    girl = new Girl("GirlHero");

    girl.cmpTransform.local.translateX(levelData.girlPos[0]);
    girl.cmpTransform.local.translateY(levelData.girlPos[1]);
    
    level.appendChild(girl);

    let viewport: f.Viewport = new f.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();

    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("keydown", handleAttack);
    document.addEventListener("keyup", handleKeyboard);
    document.addEventListener("mousemove", armMovement);
    document.addEventListener("click", attack);

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    f.Loop.start(f.LOOP_MODE.TIME_GAME, 14);

    for (let enemy of enemies.getChildren()) {
      setTimeout(function (): void {
        (<Enemy>enemy).attack.use();
      }, 5000);
    }


    function update(_event: f.Eventƒ): void {
      processInput();
      let newTranslation: f.Vector3 = cmpCamera.pivot.translation;
      newTranslation.x = girl.cmpTransform.local.translation.x + data.Game.Levels[levelIndex].camTranslatioX;
      cmpCamera.pivot.translation = newTranslation;
      //lookAt.x += distance.x;
      lookAt.x = newTranslation.x;
      cmpCamera.pivot.lookAt(lookAt);


      if (keysPressed[f.KEYBOARD_CODE.A] && girl.cmpTransform.local.translation.x > -1) {
        direction = "left";
      }
      if (keysPressed[f.KEYBOARD_CODE.D]) {
        direction = "right";
      }

      let endOfLevel: number[][] = data.Game.Levels[levelIndex].ground.transform;
      if (cmpCamera.pivot.translation.x > endOfLevel[endOfLevel.length - 2][2]) {
        f.Loop.stop();
        levelIndex = data.Game.Levels[levelIndex].next;
        if (levelIndex < 3) {
          loadNextData();
        } else {
          let endScreen: HTMLDivElement = <HTMLDivElement>document.getElementById("end-screen");
          let good: HTMLDivElement = <HTMLDivElement>document.getElementById("good");
          let bad: HTMLDivElement = <HTMLDivElement>document.getElementById("bad");

          endScreen.style.display = "block";

          if (enemiesDefeated < 6) {
            good.style.display = "block";
          } else {
            bad.style.display = "block";
          }
        }
      }
      Girl.armNode.activate(true);
      viewport.draw();

    }
  }

  let allowJump: boolean = true;

  function handleKeyboard(_event: KeyboardEvent): void {
    keysPressed[_event.code] = (_event.type == "keydown");
    if (_event.code == f.KEYBOARD_CODE.SPACE && _event.type == "keydown") {
      if (allowJump) {
        girl.act(ACTION.JUMP);
        jumpAudio.loop = false;
        jumpAudio.currentTime = 0;
        jumpAudio.play();
        allowJump = false;
        setTimeout(function (): void {
          allowJump = true;
        }, 1200);
      }
    }
  }

  function handleAttack(_event: KeyboardEvent): void {
    if (_event.keyCode == 49 || _event.code == f.KEYBOARD_CODE.NUMPAD1) {
      useAttack[1][0] = true;
      useAttack[2][0] = false;
      energy.className = "active";
      water.className = "";
    }
    if (_event.keyCode == 50 || _event.code == f.KEYBOARD_CODE.NUMPAD2) {
      useAttack[1][0] = false;
      useAttack[2][0] = true;
      energy.className = "";
      water.className = "active";
    }
  }

  function attack(_event: MouseEvent): void {
    //style="background-color: rgb(124, 190, 212);"
    let time: number;
    let style: string;
    let styleCooldown: string;

    if (useAttack[1][0] && useAttack[1][1]) {

      time = 6;
      style = "rgba(124, 190, 212, 1)";
      styleCooldown = "rgba(124, 190, 212, 0.5)";
      energyBall.use(time, "energy", 1, style, styleCooldown);

    } else if (useAttack[2][0] && useAttack[2][1]) {
      time = 10;
      style = "rgba(0, 0, 255, 1)";
      styleCooldown = "rgba(0, 0, 100, 1)";
      waterArrow.use(time, "water", 2, style, styleCooldown);

    }

  }

  function processInput(): void {
    if (keysPressed[f.KEYBOARD_CODE.A]) {
      if (girl.cmpTransform.local.translation.x > -1) {
        girl.act(ACTION.WALK, DIRECTION.LEFT);
      } else {
        girl.speed.x = 0;
      }
      return;
    }
    if (keysPressed[f.KEYBOARD_CODE.D]) {
      girl.act(ACTION.WALK, DIRECTION.RIGHT);
      return;
    }

    girl.act(ACTION.IDLE);
  }


  function buildLevel(_txtImage: f.TextureImage): f.Node {

    let levelData = data.Game.Levels[levelIndex];

    let level: f.Node = new f.Node(levelData.name);
    let that;

    Attack.generateSprites(_txtImage, "waterArrow", [[50, 1000, 150, 50, 2, 250], [50, 1000, 150, 50, 1, 200]]);
    waterArrow = new Attack("waterArrow", [1.5, 0], "splash");

    Attack.generateSprites(txtImage, "energyBall", [[0, 1000, 50, 48, 1, 150], [0, 1000, 50, 48, 1, 100]]);
    energyBall = new Attack("energyBall", [1.4, 0], "boom");

    let txtImageBackground: f.TextureImage;
    let bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById(levelData.background.id);
    txtImageBackground = new f.TextureImage();
    txtImageBackground.image = bgImg;

    backgrounds = new f.Node("background");

    that = levelData.background;
    Object.generateSprites(txtImageBackground, that.name, that.spritsheetData);

    for (let i: number = 0; i < that.positions.length; i++) {
      let object: Object = new Object(that.name, that.positions[i], that.index[i], that.Z);
      object.cmpTransform.local.translateX(that.positions[i][that.index[i]][0]);
      object.cmpTransform.local.translateY(that.positions[i][that.index[i]][1]);
      object.cmpTransform.local.translateZ(that.Z);
      object.cmpTransform.local.scaleX(that.scale[0]);
      object.cmpTransform.local.scaleY(that.scale[1]);
      object.offset = that.scale[1];
      if (i == 1) {
        object.cmpTransform.local.rotateY(-180);
      }
      backgrounds.appendChild(object);
    }
    level.appendChild(backgrounds);

    enemies = new f.Node("enemies");

    EnemyAttack.generateSprites(txtImage, "energyBall", [[0, 1000, 50, 48, 1, 150], [0, 1000, 50, 48, 1, 100]]);

    for (let key in levelData.enemys) {
      that = levelData.enemys[key];
      Enemy.generateSprites(_txtImage, that.name, that.spritsheetData);

      for (let i: number = 0; i < that.positions.length; i++) {

        let enemy: Enemy = new Enemy(that.name, that.positions[i], that.scale[0], that.index[i], that.speed); 
        enemy.cmpTransform.local.translateX(that.positions[i][that.index[i]][0]);
        enemy.cmpTransform.local.translateY(that.positions[i][that.index[i]][1]);
        enemy.cmpTransform.local.scaleX(that.scale[0]);
        enemy.cmpTransform.local.scaleY(that.scale[1]);
        if (that.name == "fish") {
          enemy.cmpTransform.local.rotateY(180);
          enemy.act(ACTION.WALK);
        }
        enemies.appendChild(enemy);
      }
    }
    level.appendChild(enemies);

    natures = new f.Node("Nature");

    for (let key in levelData.nature) {
      that = levelData.nature[key];
      Object.generateSprites(_txtImage, that.name, that.spritsheetData);

      for (let i: number = 0; i < that.positions.length; i++) {
        let object: Object = new Object(that.name, that.positions[i], that.index[i]);
        object.cmpTransform.local.translateX(that.positions[i][that.index[i]][0]);
        object.cmpTransform.local.translateY(that.positions[i][that.index[i]][1]);
        natures.appendChild(object);
      }
    }
    level.appendChild(natures);

    tiles = new f.Node("checkKolision");

    for (let i: number = 0; i < 3; i++) {
      let that: number[] = levelData.ground.transform[levelData.ground.index[i]];
      let floor: Floor = new Floor(levelData.ground.transform, levelData.ground.index[i]);
      floor.cmpTransform.local.scaleX(that[0]);
      floor.cmpTransform.local.scaleY(that[1]);
      floor.cmpTransform.local.translateX(that[2]);
      floor.cmpTransform.local.translateY(that[3]);
      tiles.appendChild(floor);
    }
    level.appendChild(tiles);
    return level;
  }

  function armMovement(_event: MouseEvent): void {
    let currentY: number = - _event.movementY * rotationSpeed;
    girl.rotateZ(currentY);
  }

  function continueGame(): void {
    let saveScreen: HTMLDivElement = <HTMLDivElement>document.getElementById("save-screen");
    saveScreen.style.display = "none";
    f.Loop.start();
  }

  async function loadNextData(): Promise<void> {
    let response: Response = await fetch("https://ahornzweig.github.io/PRIMA/Game/gameData.json"); //muss lokal zu gameData.json geändert werden
    let offer: string = await response.text();
    data = await JSON.parse(offer);

    rebuildLevel(data);
  }

  function rebuildLevel(_data): void {

    let levelData = data.Game.Levels[levelIndex];

    let gameOver: HTMLDivElement = <HTMLDivElement>document.getElementById("gameover-screen");
    gameOver.style.display = "none";
    let gameInterface: HTMLDivElement = <HTMLDivElement>document.getElementById("game-interface");
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    gameInterface.style.display = "block";
    canvas.style.display = "block";

    HP = 100;
    healtBar.innerHTML = HP + " HP";
    healtBar.style.width = HP * 2 + "px";

    let newTranslation: f.Vector3 = f.Vector3.ZERO();

    newTranslation.x = levelData.girlPos[0];
    newTranslation.y = levelData.girlPos[1];
    newTranslation.z = 0;
    girl.cmpTransform.local.translation = newTranslation;

    //girl.cmpTransform.local.translateX(levelData.girlPos[0]);
    //girl.cmpTransform.local.translateY(levelData.girlPos[0]);

    newTranslation.x = levelData.camPos[0];
    newTranslation.y = levelData.camPos[1];
    newTranslation.z = levelData.camPos[2];
    cmpCamera.pivot.translation = newTranslation;
    lookAt.set(levelData.camPos[0], levelData.camPos[1], 0);
    cmpCamera.pivot.lookAt(lookAt);

    let that;

    let fishI: number = 0;
    let monkyI: number = 0;

    for (let i: number = 0; i < enemies.getChildren().length; i++) {
      let enemy: Enemy = <Enemy>enemies.getChildren()[i];
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
      } else if (enemy.name == "monky") {
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

    let leafI: number = 0;
    let pineI: number = 0;
    let slimI: number = 0;

    for (let i: number = 0; i < natures.getChildren().length; i++) {
      let nature: Object = <Object>natures.getChildren()[i];
      if (nature.name == "LeafTree") {
        that = levelData.nature[0];

        nature.objects = that.positions[leafI];
        nature.index = that.index[leafI];
        newTranslation.x = that.positions[leafI][nature.index][0];
        newTranslation.y = that.positions[leafI][nature.index][1];
        newTranslation.z = 0;
        nature.cmpTransform.local.translation = newTranslation;

        leafI++;
      } else if (nature.name == "PineTree") {
        that = levelData.nature[1];

        nature.objects = that.positions[pineI];
        nature.index = that.index[pineI];

        newTranslation.x = that.positions[pineI][nature.index][0];
        newTranslation.y = that.positions[pineI][nature.index][1];
        newTranslation.z = 0;
        nature.cmpTransform.local.translation = newTranslation;

        pineI++;
      } else if (nature.name == "SlimTree") {
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

    let txtImageBackground: f.TextureImage;
    let bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById(levelData.background.id);
    txtImageBackground = new f.TextureImage();
    txtImageBackground.image = bgImg;

    backgrounds.removeChild(backgrounds.getChildren()[0]);
    backgrounds.removeChild(backgrounds.getChildren()[0]);

    that = levelData.background;
    Object.generateSprites(txtImageBackground, that.name, that.spritsheetData);

    for (let i: number = 0; i < that.positions.length; i++) {
      let object: Object = new Object(that.name, that.positions[i], that.index[i], that.Z);
      object.cmpTransform.local.translateX(that.positions[i][that.index[i]][0]);
      object.cmpTransform.local.translateY(that.positions[i][that.index[i]][1]);
      object.cmpTransform.local.translateZ(that.Z);
      object.cmpTransform.local.scaleX(that.scale[0]);
      object.cmpTransform.local.scaleY(that.scale[1]);
      object.offset = that.scale[1];
      if (i == 1) {
        object.cmpTransform.local.rotateY(-180);
      }
      backgrounds.appendChild(object);
    }

    for (let i: number = 0; i < tiles.getChildren().length; i++) {
      let tile: Floor = <Floor>tiles.getChildren()[i];

      that = levelData.ground;

      tile.index = that.index[i];
      tile.floors = that.transform;

      newTranslation.x = that.transform[i][2];
      newTranslation.y = that.transform[i][3];
      newTranslation.z = 0;
      tile.cmpTransform.local.translation = newTranslation;

    }
    f.Loop.timeFrameGame = 0;
    f.Loop.start(f.LOOP_MODE.TIME_GAME, 14);

  }

  function loadHud(): void {

    let gameInterface: HTMLDivElement = <HTMLDivElement>document.getElementById("game-interface");
    gameInterface.style.display = "block";

    let continueButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("continue");
    continueButton.addEventListener("click", continueGame);
  }

  function loadLevel(_event: MouseEvent): void {
    levelIndex = 0;
    let id: string = _event.target.id;
    if (id == "level2") {
      levelIndex = 1;
    } else if (id == "level3") {
      levelIndex = 2;
    }
    let loadScreen: HTMLDivElement = <HTMLDivElement>document.getElementById("load-screen");
    loadScreen.style.display = "none";
    loadData();
  }

  function loadGame(): void {
    /*let loadScreen: HTMLDivElement = <HTMLDivElement>document.getElementById("load-screen");
    loadScreen.style.display = "block";*/

    let level1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("level1");
    level1.addEventListener("click", loadLevel);
    let level2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("level2");
    level2.addEventListener("click", loadLevel);
    let level3: HTMLButtonElement = <HTMLButtonElement>document.getElementById("level3");
    level3.addEventListener("click", loadLevel);
  }

  function start(): void {
    levelIndex = 0;
    let startButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start");
    startButton.addEventListener("click", loadData);

    let loadButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("load-game");
    loadButton.addEventListener("click", loadGame);
  }

  window.addEventListener("load", start);
}