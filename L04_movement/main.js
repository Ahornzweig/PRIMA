"use strict";
///<reference types = "../Fudge/FudgeCore"/>
var L04_PongPaddels;
///<reference types = "../Fudge/FudgeCore"/>
(function (L04_PongPaddels) {
    var f = FudgeCore;
    window.addEventListener("load", init);
    let viewport;
    function init(_evevt) {
        let canvas = document.querySelector("canvas");
        //console.log(canvas);
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let pong = L04_PongPaddels.createPong();
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);
        //let cmpTransform: f.ComponentTransform = pRight.getComponent(f.ComponentTransform);
        //console.log(cmpTransform);
        L04_PongPaddels.pRight.cmpTransform.local.translateX(20);
        //pRight.cmpTransform.local.scaleY(5);
        L04_PongPaddels.pRight.getComponent(f.ComponentMesh).pivot.scaleY(5);
        L04_PongPaddels.pLeft.cmpTransform.local.translateX(-20);
        //pLeft.cmpTransform.local.scaleY(5);
        L04_PongPaddels.pLeft.getComponent(f.ComponentMesh).pivot.scaleY(5);
        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(viewport);
        viewport.draw();
        document.addEventListener("keydown", down);
        document.addEventListener("keyup", up);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    }
    let keysPressed = {};
    function down(_evevt) {
        let keyCode = _evevt.keyCode;
        keysPressed[keyCode] = true;
        /*switch (keyCode) {
            case 38: //up
                //pRight.cmpTransform.local.translateY(.5);
                break;

            case 40: //down
                //pRight.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
                break;

            case 87: //w
                //pLeft.cmpTransform.local.translate(f.Vector3.Y(.5));
                break;

            case 83: //s
                //pLeft.cmpTransform.local.translateY(-.5);
                break;
        }*/
    }
    function up(_evevt) {
        let keyCode = _evevt.keyCode;
        keysPressed[keyCode] = false;
    }
    function update(_evevt) {
        //f.Debug.log("update");
        if (keysPressed[38] == true) {
            L04_PongPaddels.pRight.cmpTransform.local.translateY(.5);
        }
        else if (keysPressed[40] == true) {
            L04_PongPaddels.pRight.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
        }
        if (keysPressed[87] == true) {
            L04_PongPaddels.pLeft.cmpTransform.local.translate(f.Vector3.Y(.5));
        }
        else if (keysPressed[83] == true) {
            L04_PongPaddels.pLeft.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
        }
        f.RenderManager.update();
        viewport.draw();
    }
})(L04_PongPaddels || (L04_PongPaddels = {}));
//# sourceMappingURL=main.js.map