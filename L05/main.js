"use strict";
///<reference types = "../Fudge/FudgeCore"/>
var L05;
///<reference types = "../Fudge/FudgeCore"/>
(function (L05) {
    var f = FudgeCore;
    let keysPressed = {};
    let max = .3;
    let min = -.3;
    let vertical = roundIt(Math.random() * (max - min) + min);
    let horizontal = roundIt(Math.random() * (max - min) + min);
    //let ballVektor: f.Vector3 = new f.Vector3(horizontal, vertical, 0);
    let points = [0, 0];
    let maxR = 0;
    let maxL = 0;
    window.addEventListener("load", init);
    let viewport;
    function init(_evevt) {
        let canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let pong = L05.createPong();
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);
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
            if (maxR <= 10) {
                maxR += .5;
                L05.pRight.cmpTransform.local.translateY(.5);
            }
        }
        else if (keysPressed[40] == true) {
            if (maxR >= -10) {
                maxR -= .5;
                L05.pRight.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
            }
        }
        if (keysPressed[87] == true) {
            if (maxL <= 10) {
                maxL += .5;
                L05.pLeft.cmpTransform.local.translate(f.Vector3.Y(.5));
            }
        }
        else if (keysPressed[83] == true) {
            if (maxL >= -10) {
                maxL -= .5;
                L05.pLeft.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
            }
        }
        //paddlesEnd
        L05.ball.cmpTransform.local.translate(new f.Vector3(horizontal, vertical, 0));
        moveBall();
        f.RenderManager.update();
        viewport.draw();
    }
    function moveBall() {
        let detectpLeft = detectHit(L05.ball.cmpTransform.local.translation, L05.pLeft.cmpTransform.local, L05.pLeft.getComponent(f.ComponentMesh));
        let detectpRight = detectHit(L05.ball.cmpTransform.local.translation, L05.pRight.cmpTransform.local, L05.pRight.getComponent(f.ComponentMesh));
        let detectRight = detectHit(L05.ball.cmpTransform.local.translation, L05.wallRight.cmpTransform.local, L05.wallRight.getComponent(f.ComponentMesh));
        let detectLeft = detectHit(L05.ball.cmpTransform.local.translation, L05.wallLeft.cmpTransform.local, L05.wallLeft.getComponent(f.ComponentMesh));
        let detectTop = detectHit(L05.ball.cmpTransform.local.translation, L05.wallTop.cmpTransform.local, L05.wallTop.getComponent(f.ComponentMesh));
        let detectBottom = detectHit(L05.ball.cmpTransform.local.translation, L05.wallBottom.cmpTransform.local, L05.wallBottom.getComponent(f.ComponentMesh));
        if (detectpLeft || detectpRight) {
            horizontal = horizontal * -1.0;
            vertical = vertical * 1.0;
        }
        else if (detectRight || detectLeft) {
            horizontal = horizontal * -1;
            if (detectRight) {
                points[0] += 1;
            }
            else if (detectLeft) {
                points[1] += 1;
            }
            let score = document.getElementById("score");
            score.innerHTML = "" + points[0] + " | " + points[1] + "";
            vertical = roundIt(Math.random() * (max - min) + min);
            horizontal = roundIt(Math.random() * (max - min) + min);
            L05.ball.cmpTransform.local.translation = new f.Vector3(0, 0, 0);
        }
        if (detectTop || detectBottom) {
            vertical = vertical * -1;
        }
    }
    function detectHit(_position, _mtxBox, _scale) {
        let testPosition = _mtxBox.translation;
        let testScale = _scale.pivot.scaling;
        let topLeft = new f.Vector3(testPosition.x - testScale.x / 2, testPosition.y + testScale.y / 2, 0);
        let bottomRight = new f.Vector3(testPosition.x + testScale.x / 2, testPosition.y - testScale.y / 2, 0);
        if (_position.x > topLeft.x && _position.y < topLeft.y && _position.x < bottomRight.x && _position.y > bottomRight.y) {
            return true;
        }
        else {
            return false;
        }
    }
    function roundIt(_number) {
        return Math.round(_number * 100) / 100;
    }
})(L05 || (L05 = {}));
//# sourceMappingURL=main.js.map