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
  export let useAttack: AttackType = { 1: [true, true], 2: [false, true], 3: [false, true] };

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
  let nextLevelIndex: number;
  let lookAt: f.Vector3 = f.Vector3.ZERO();
  let txtImage: f.TextureImage;
  let rotationSpeed: number = .2;
  let energy: HTMLDivElement;
  let water: HTMLDivElement;
  let fire: HTMLDivElement;
  let energyBall: Attack;
  let waterArrow: Attack;
  let fireBall: Attack;
  export let HealtBar: HTMLDivElement;
  export let HP: number = 100;

  async function loadData(): Promise<void> {
    let response: Response = await fetch("gameData.json"); //https://ahornzweig.github.io/PRIMA/Game/gameData.json
    let offer: string = await response.text();
    data = await JSON.parse(offer);
    console.log(data);
    main(data);
  }

  export function main(_data: Data): void {

    energy = <HTMLDivElement>document.getElementById("energy");
    water = <HTMLDivElement>document.getElementById("water");
    fire = <HTMLDivElement>document.getElementById("fire");
    HealtBar = <HTMLDivElement>document.getElementById("life");

    let img: HTMLImageElement = document.querySelector("img");
    canvas = document.querySelector("canvas");
    //let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
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
    girl.cmpTransform.local.translateY(levelData.girlPos[0]);
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

    function update(_event: f.Eventƒ): void {
      processInput();
      let speed: f.Vector3 = f.Vector3.ZERO();
      speed.x = 1.3;
      let timeFrame: number = f.Loop.timeFrameGame / 1000;
      let distance: f.Vector3 = f.Vector3.SCALE(speed, timeFrame);

      if (keysPressed[f.KEYBOARD_CODE.A]) {
        cmpCamera.pivot.translateX(-distance.x);
        direction = "left";
        lookAt.x += - distance.x;
        cmpCamera.pivot.lookAt(lookAt);
      }
      if (keysPressed[f.KEYBOARD_CODE.D]) {
        cmpCamera.pivot.translateX(distance.x);
        lookAt.x += distance.x;
        direction = "right";
        cmpCamera.pivot.lookAt(lookAt);
      }
      Girl.armNode.activate(true);
      viewport.draw();

      //crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      //crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
    }
  }

  function handleKeyboard(_event: KeyboardEvent): void {
    keysPressed[_event.code] = (_event.type == "keydown");
    if (_event.code == f.KEYBOARD_CODE.SPACE && _event.type == "keydown") {
      girl.act(ACTION.JUMP);
    }
  }

  function handleAttack(_event: KeyboardEvent): void {
    if (_event.keyCode == 49 || _event.code == f.KEYBOARD_CODE.NUMPAD1) {
      useAttack[1][0] = true;
      useAttack[2][0] = false;
      useAttack[3][0] = false;
      energy.className = "active";
      water.className = "";
      fire.className = "";
    }
    if (_event.keyCode == 50 || _event.code == f.KEYBOARD_CODE.NUMPAD2) {
      useAttack[1][0] = false;
      useAttack[2][0] = true;
      useAttack[3][0] = false;
      energy.className = "";
      water.className = "active";
      fire.className = "";
    }
    if (_event.keyCode == 51 || _event.code == f.KEYBOARD_CODE.NUMPAD3) {
      useAttack[1][0] = false;
      useAttack[2][0] = false;
      useAttack[3][0] = true;
      energy.className = "";
      water.className = "";
      fire.className = "active";
    }
  }

  let firstAttck: boolean = true;
  export function attack(_event: MouseEvent): void {
    //style="background-color: rgb(124, 190, 212);"
    let time: number;
    let style: string;
    let styleCooldown: string;

    if (firstAttck) {
      for (let enemy of enemies.getChildren()) {
        setTimeout(function (): void {
          (<Enemy>enemy).attack.use(5);
        }, 2000);
      }
      firstAttck = false;
    }

    if (useAttack[1][0] && useAttack[1][1]) {
      console.log("test");
      time = 6;
      style = "rgba(124, 190, 212, 1)";
      styleCooldown = "rgba(124, 190, 212, 0.5)";
      energyBall.use(time, "energy", 1, style, styleCooldown);

    } else if (useAttack[2][0] && useAttack[2][1]) {
      time = 10;
      style = "rgba(0, 0, 255, 1)";
      styleCooldown = "rgba(0, 0, 100, 1)";
      waterArrow.use(time, "water", 2, style, styleCooldown);

    } else if (useAttack[3][0] && useAttack[3][1]) {
      time = 10;
      style = "rgba(255, 0, 0, 1)";
      styleCooldown = "rgba(100, 0, 0, 1)";
      fireBall.use(time, "fire", 2, style, styleCooldown);
    }

  }

  function processInput(): void {
    if (keysPressed[f.KEYBOARD_CODE.A]) {
      girl.act(ACTION.WALK, DIRECTION.LEFT);
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
    nextLevelIndex = levelData.next;

    let level: f.Node = new f.Node(levelData.name);
    let that;

    Attack.generateSprites(_txtImage, "waterArrow", [[50, 1000, 150, 50, 2, 250], [50, 1000, 150, 50, 1, 200]]);
    waterArrow = new Attack("waterArrow", [1.5, 0], "splash");

    Attack.generateSprites(_txtImage, "fireBall", [[5200, 0, 240, 130, 2, 340], [5200, 0, 240, 130, 1, 300]]);
    fireBall = new Attack("fireBall", [1.5, 0], "boom");

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

        let enemy: Enemy = new Enemy(that.name, that.positions[i], that.scale[0], that.index[i], that.speed); //that.positions[i][0][1]
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
    //console.log(enemies);
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

  export function loadHud(): void {

    let saveScreen: HTMLDivElement = <HTMLDivElement>document.getElementById("save-screen");
    saveScreen.style.display = "none";

    let gameInterface: HTMLDivElement = <HTMLDivElement>document.getElementById("game-interface");

    gameInterface.style.display = "block";
  }

  function loadGame(): void {
    levelIndex = 0;
    let saveScreen: HTMLDivElement = <HTMLDivElement>document.getElementById("save-screen");
    saveScreen.style.display = "block";
    let loadButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("Load");
    loadButton.addEventListener("click", loadHud);

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