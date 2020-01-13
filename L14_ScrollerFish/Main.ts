/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
namespace L14_ScrollerFish {
  import f = FudgeCore;
  import Sprite = L14_ScrollerFoundation.Sprite;
  import NodeSprite = L14_ScrollerFoundation.NodeSprite;

  /*interface Directions {
    [direction: string]: boolean;
  }*/

  interface KeyPress {
    [keyCode: number]: boolean;
  }

  window.addEventListener("load", main);
  let spriteGirl: Sprite;
  let spriteFish: Sprite;
  let root: f.Node;


  function main(): void {

    let keysPressed: KeyPress = {};
    let img: HTMLImageElement = document.querySelector("img");
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let txtImage: f.TextureImage = new f.TextureImage();
    txtImage.image = img;

    spriteGirl = new Sprite("walkingGirl");
    spriteGirl.generateByGrid(txtImage, f.Rectangle.GET(4000, 0, 600, 1000), 8, f.Vector2.ZERO(), 1000, f.ORIGIN2D.BOTTOMCENTER);

    spriteFish = new Sprite("FlyingFish");
    spriteFish.generateByGrid(txtImage, f.Rectangle.GET(0, 0, 500, 300), 8, f.Vector2.ZERO(), 500, f.ORIGIN2D.BOTTOMCENTER);

    f.RenderManager.initialize(true, false);
    root = new f.Node("Root");
    let mtxGirl: f.Matrix4x4;
    let girl: NodeSprite;
    let mtxFish: f.Matrix4x4;
    let fish: NodeSprite;

    fish = new NodeSprite("Fish", spriteFish);
    fish.setFrameDirection(-1);
    mtxFish = f.Matrix4x4.TRANSLATION(f.Vector3.X(3.5));
    fish.addComponent(new f.ComponentTransform(mtxFish));
    fish.cmpTransform.local.translateY(1);
    root.appendChild(fish);

    girl = new NodeSprite("Fish", spriteGirl);
    girl.setFrameDirection(-1);
    mtxGirl = f.Matrix4x4.TRANSLATION(f.Vector3.X(-2));
    girl.addComponent(new f.ComponentTransform(mtxGirl));
    root.appendChild(girl);


    fish.addEventListener(
      "showNext",
      (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
      true
    );

    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(f.Vector3.ZERO());
    cmpCamera.backgroundColor = f.Color.CSS("aliceblue");

    let viewport: f.Viewport = new f.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    f.Loop.start(f.LOOP_MODE.TIME_GAME, 14);

    function update(_event: f.Eventƒ): void {
      //ƒ.Debug.log("frame");
      // root.showFrameNext();
      //console.log(keysPressed[83]);
      //console.log(keysPressed[87]);
      root.broadcastEvent(new CustomEvent("showNext"));

      mtxFish = fish.cmpTransform.local;
      mtxFish.translateX(-0.1);

      if (mtxFish.translation.x < -3.5) {
        mtxFish.translation = f.Vector3.X(3.5);
        mtxFish.translateY(1);
      }

      if (keysPressed[68] == true) {
        girl.showFrameNext();
        girl.cmpTransform.local.translateX(0.1);

      } else if (keysPressed[65] == true) {

        girl.showFrameNext();
        girl.cmpTransform.local.translateX(-0.1);

      }

      viewport.draw();

      crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
    }

    function down(_evevt: KeyboardEvent): void {

      let keyCode: number = _evevt.keyCode;
      keysPressed[keyCode] = true;

    }

    function up(_evevt: KeyboardEvent): void {

      let keyCode: number = _evevt.keyCode;
      keysPressed[keyCode] = false;


    }
    document.addEventListener("keydown", down);
    document.addEventListener("keyup", up);
  }
}