"use strict";
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L14_ScrollerFish;
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L14_ScrollerFish) {
    var ƒ = FudgeCore;
    var Sprite = L14_ScrollerFoundation.Sprite;
    var NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", main);
    let sprite;
    let root;
    let fishDirection = {};
    fishDirection["right"] = true;
    fishDirection["left"] = false;
    let rotateing = false;
    function main() {
        let img = document.querySelector("img");
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let txtImage = new ƒ.TextureImage();
        txtImage.image = img;
        sprite = new Sprite("FlyingFish");
        sprite.generateByGrid(txtImage, ƒ.Rectangle.GET(0, 0, 500, 300), 6, ƒ.Vector2.ZERO(), 500, ƒ.ORIGIN2D.BOTTOMCENTER);
        ƒ.RenderManager.initialize(true, false);
        root = new ƒ.Node("Root");
        let mtxFish;
        let fish;
        fish = new NodeSprite("Fish", sprite);
        fish.setFrameDirection(-1);
        mtxFish = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(-1));
        fish.addComponent(new ƒ.ComponentTransform(mtxFish));
        root.appendChild(fish);
        /*fish = new NodeSprite("Hare3", sprite);
        mtxFish = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(-1));
        fish.addComponent(new ƒ.ComponentTransform(mtxFish));
        root.appendChild(fish);*/
        for (let child of root.getChildren())
            child.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.CSS("aliceblue");
        let viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        viewport.draw();
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            ƒ.Debug.log("frame");
            // root.showFrameNext();
            root.broadcastEvent(new CustomEvent("showNext"));
            mtxFish = root.getChildren()[0].cmpTransform.local;
            mtxFish.translateX(0.1);
            if (mtxFish.translation.x > 2)
                mtxFish.translation = ƒ.Vector3.X(-2);
            /*if (!rotateing && mtxFish.translation.x > 2 || mtxFish.translation.x < -2 ) {
      
              mtxFish.rotateY(5);
              
              if (fishDirection["right"]) {
                fishDirection["left"] = true;
                fishDirection["right"] = false;
              } else {
                fishDirection["right"] = true;
                fishDirection["left"] = false;
              }
              rotateing = true;
            } else if (fishDirection["right"]) {
              mtxFish.translateX(0.1);
              rotateing = false;
            } else if (fishDirection["left"]) {
              mtxFish.translateX(-0.1);
              rotateing = false;
            }*/
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
})(L14_ScrollerFish || (L14_ScrollerFish = {}));
//# sourceMappingURL=Main.js.map