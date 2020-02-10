/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
namespace L14_ScrollerGame {
  export import f = FudgeCore;
  export import Sprite = L14_ScrollerFoundation.Sprite;
  export import NodeSprite = L14_ScrollerFoundation.NodeSprite;

  export enum OBJECTTYPE {
    OBJECT = "Object",
    ENEMY = "Enemy"
  }

  interface KeyPressed {
    [code: string]: boolean;
  }
  let keysPressed: KeyPressed = {};

  //let spriteGirl: Sprite;
  //let spriteFish: Sprite;
  //let spriteGround: Sprite;
  export let game: f.Node;
  export let level: f.Node;
  export let cmpCamera: f.ComponentCamera;
  export let direction: string;
  export let checkColision: f.Node;
  let girl: Girl;
  let name: string;

  /*let leafTree: Object;
  let pineTree: Object;
  let slimTree: Object;*/
  let data: Data;
  let canvas: HTMLCanvasElement;
  let lookAt: f.Vector3 = f.Vector3.ZERO();
  let rotationSpeed: number = .2;


  async function loadData(): Promise<T> {
    let response: Response = await fetch("gameData.json");
    let offer: string = await response.text();
    data = JSON.parse(offer);
    main();
  }


  function main(): void {
    let img: HTMLImageElement = document.querySelector("img");
    canvas = document.querySelector("canvas");
    //let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let txtImage: f.TextureImage = new f.TextureImage();
    txtImage.image = img;

    f.RenderManager.initialize(true, false);

    cmpCamera = new f.ComponentCamera();
    cmpCamera.pivot.translateZ(6);
    cmpCamera.pivot.translateY(1.5);
    cmpCamera.pivot.translateX(2);
    lookAt.set(2, 1.5, 0);
    cmpCamera.pivot.lookAt(lookAt);
    cmpCamera.backgroundColor = f.Color.CSS("aliceblue");

    game = new f.Node("Game");
    level = buildLevel(txtImage);
    game.appendChild(level);
    Girl.generateSprites(txtImage, [[0, 0, 650, 1000, 7, 1000], [3168, 1000, 650, 1000, 1, 1000], [3818, 1000, 650, 1000, 1, 1000]]);

    girl = new Girl("GirlHero");
    level.appendChild(girl);

    let viewport: f.Viewport = new f.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();

    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("keyup", handleKeyboard);
    document.addEventListener("mousemove", armMovement);

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
  /* if (direction == "right") {
     floors.sort(function (a: number[], b: number[]): number { return a[2] - b[2]; });
   } else {
     floors.sort(function (a: number[], b: number[]): number { return b[2] - a[2]; });
   */

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

    let levelData = data.Game.Level1;
    let level: f.Node = new f.Node(levelData.name);
    let that;

    for (let key in levelData.enemys) {
      that = levelData.enemys[key];
      Enemy.generateSprites(_txtImage, that.name, that.spritsheetData);
      let enemy: Enemy = new Enemy(that.name, that.positions);
      enemy.cmpTransform.local.translateX(that.positions[0][0]);
      enemy.cmpTransform.local.translateY(that.positions[0][1]);
      level.appendChild(enemy);
    }

    for (let key in levelData.nature) {
      that = levelData.nature[key];
      //console.log(that);
      Object.generateSprites(_txtImage, that.name, that.spritsheetData);
      let object: Object = new Object(that.name, that.positions);
      object.cmpTransform.local.translateX(that.positions[0][0]);
      object.cmpTransform.local.translateY(that.positions[0][1]);
      level.appendChild(object);
    }

    checkColision = new f.Node("checkKolision");


    for (let i: number = 0; i < 3; i++) {
      let that: number[] = levelData.ground.transform[i];
      let floor: Floor = new Floor(levelData.ground.transform);
      floor.cmpTransform.local.scaleX(that[0]);
      floor.cmpTransform.local.scaleY(that[1]);
      floor.cmpTransform.local.translateX(that[2]);
      floor.cmpTransform.local.translateY(that[3]);
      checkColision.appendChild(floor);
    }

    level.appendChild(checkColision);
    return level;
  }

  function armMovement(_event: MouseEvent): void {
    let currentY: number = - _event.movementY * rotationSpeed;
    girl.rotateZ(currentY);
  }

  window.addEventListener("load", loadData);
}