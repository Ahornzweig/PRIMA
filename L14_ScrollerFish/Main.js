"use strict";
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L14_ScrollerFish;
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L14_ScrollerFish) {
    var f = FudgeCore;
    var Sprite = L14_ScrollerFoundation.Sprite;
    var NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", main);
    let spriteGirl;
    let spriteFish;
    let root;
    function main() {
        let keysPressed = {};
        let img = document.querySelector("img");
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let txtImage = new f.TextureImage();
        txtImage.image = img;
        spriteGirl = new Sprite("walkingGirl");
        spriteGirl.generateByGrid(txtImage, f.Rectangle.GET(4000, 0, 600, 1000), 8, f.Vector2.ZERO(), 1000, f.ORIGIN2D.BOTTOMCENTER);
        spriteFish = new Sprite("FlyingFish");
        spriteFish.generateByGrid(txtImage, f.Rectangle.GET(0, 0, 500, 300), 8, f.Vector2.ZERO(), 500, f.ORIGIN2D.BOTTOMCENTER);
        f.RenderManager.initialize(true, false);
        root = new f.Node("Root");
        let mtxGirl;
        let girl;
        let mtxFish;
        let fish;
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
        fish.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        cmpCamera.backgroundColor = f.Color.CSS("aliceblue");
        let viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        viewport.draw();
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 14);
        function update(_event) {
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
            }
            else if (keysPressed[65] == true) {
                girl.showFrameNext();
                girl.cmpTransform.local.translateX(-0.1);
            }
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
        function down(_evevt) {
            let keyCode = _evevt.keyCode;
            keysPressed[keyCode] = true;
        }
        function up(_evevt) {
            let keyCode = _evevt.keyCode;
            keysPressed[keyCode] = false;
        }
        document.addEventListener("keydown", down);
        document.addEventListener("keyup", up);
    }
})(L14_ScrollerFish || (L14_ScrollerFish = {}));
//# sourceMappingURL=Main.js.map