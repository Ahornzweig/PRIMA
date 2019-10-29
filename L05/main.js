"use strict";
///<reference types = "../Fudge/FudgeCore"/>
var L05;
///<reference types = "../Fudge/FudgeCore"/>
(function (L05) {
    var f = FudgeCore;
    let keysPressed = {};
    let max = 1;
    let min = -1;
    let vertical = roundIt(Math.random() * (max - min) + min);
    let horizontal = roundIt(Math.random() * (max - min) + min);
    let ballVektor = new f.Vector3(horizontal, vertical, 0);
    let maxR = 0;
    let maxL = 0;
    let maxVertical = 0;
    let maxHorizontal = 0;
    window.addEventListener("load", init);
    let viewport;
    function init(_evevt) {
        let canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let pong = L05.createPong();
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);
        L05.pRight.cmpTransform.local.translateX(20);
        L05.pRight.getComponent(f.ComponentMesh).pivot.scaleY(5);
        L05.pLeft.cmpTransform.local.translateX(-20);
        L05.pLeft.getComponent(f.ComponentMesh).pivot.scaleY(5);
        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(viewport);
        viewport.draw();
        document.addEventListener("keydown", down);
        document.addEventListener("keyup", up);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    }
    function down(_evevt) {
        let keyCode = _evevt.keyCode;
        keysPressed[keyCode] = true;
    }
    function up(_evevt) {
        let keyCode = _evevt.keyCode;
        keysPressed[keyCode] = false;
    }
    function update(_evevt) {
        //f.Debug.log("update");
        //paddles
        if (keysPressed[38] == true) {
            if (maxR <= 11) {
                maxR += .5;
                L05.pRight.cmpTransform.local.translateY(.5);
            }
        }
        else if (keysPressed[40] == true) {
            if (maxR >= -11) {
                maxR -= .5;
                L05.pRight.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
            }
        }
        if (keysPressed[87] == true) {
            if (maxL <= 11) {
                maxL += .5;
                L05.pLeft.cmpTransform.local.translate(f.Vector3.Y(.5));
            }
        }
        else if (keysPressed[83] == true) {
            if (maxL >= -11) {
                maxL -= .5;
                L05.pLeft.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
            }
        }
        //paddlesEnd
        maxHorizontal += horizontal;
        maxVertical += vertical;
        if (maxHorizontal > 21 || maxHorizontal < -21) {
            //horizontal = horizontal;
            horizontal = horizontal * -1;
        }
        else {
            L05.ball.cmpTransform.local.translate(new f.Vector3(horizontal, 0, 0));
        }
        if (maxVertical > 14 || maxVertical < -14) {
            vertical = vertical * -1;
            //vertical = vertical;
        }
        else {
            L05.ball.cmpTransform.local.translate(new f.Vector3(0, vertical, 0));
        }
        f.RenderManager.update();
        viewport.draw();
    }
    function roundIt(_number) {
        return Math.round(_number * 100) / 100;
    }
})(L05 || (L05 = {}));
//# sourceMappingURL=main.js.map