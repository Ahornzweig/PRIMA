"use strict";
///<reference types = "../Fudge/FudgeCore"/>
var L03_PongPaddels;
///<reference types = "../Fudge/FudgeCore"/>
(function (L03_PongPaddels) {
    let keysPressed = {};
    let ballDirections = {};
    let max = 1;
    let min = -1;
    let vertical = roundIt(Math.random() * (max - min) + min);
    let horizontal = roundIt(Math.random() * (max - min) + min);
    ballDirections["vertical"] = vertical;
    ballDirections["horizontal"] = horizontal;
    let maxR = 0;
    let maxL = 0;
    let maxVertical = 0;
    let maxHorizontal = 0;
    //let type: string = "";
    var f = FudgeCore;
    window.addEventListener("load", init);
    let viewport;
    function init(_evevt) {
        let canvas = document.querySelector("canvas");
        console.log(ballDirections);
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let pong = L03_PongPaddels.createPong();
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);
        //let cmpTransform: f.ComponentTransform = pRight.getComponent(f.ComponentTransform);
        //console.log(cmpTransform);
        L03_PongPaddels.pRight.cmpTransform.local.translateX(20);
        //pRight.cmpTransform.local.scaleY(5);
        L03_PongPaddels.pRight.getComponent(f.ComponentMesh).pivot.scaleY(5);
        L03_PongPaddels.pLeft.cmpTransform.local.translateX(-20);
        //pLeft.cmpTransform.local.scaleY(5);
        L03_PongPaddels.pLeft.getComponent(f.ComponentMesh).pivot.scaleY(5);
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
    /*function newBallDirection(): void {

        let newVertical: number = roundIt(Math.random() * (max - min) + min);
        //let newVertical: number = roundIt(Math.random() * (max - min) + min);
        let newHorizontal: number = roundIt(Math.random() * (max - min) + min);
        //let newHorizontal: number = roundIt(Math.random() * (max - min) + min);
        //checkDifference(newVertical, newHorizontal);
        ballDirections["vertical"] = newVertical;
        ballDirections["horizontal"] = newHorizontal;

        console.log(ballDirections);
    }*/
    /*function checkDifference(_newVertical: number, _newHorizontal: number): void {
        switch (type) {
            case "horizontal":
                if (_newHorizontal != horizontal && _newHorizontal != 0) {
                    horizontal = _newHorizontal;
                } else {
                    newBallDirection();
                }
                break;
            case "vertical":
                if (_newVertical != vertical && _newVertical != 0) {
                    vertical = _newVertical;
                } else {
                    newBallDirection();
                }
                break;
        }

    }*/
    function update(_evevt) {
        //f.Debug.log("update");
        //paddles
        if (keysPressed[38] == true) {
            if (maxR <= 11) {
                maxR += .5;
                L03_PongPaddels.pRight.cmpTransform.local.translateY(.5);
            }
        }
        else if (keysPressed[40] == true) {
            if (maxR >= -11) {
                maxR -= .5;
                L03_PongPaddels.pRight.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
            }
        }
        if (keysPressed[87] == true) {
            if (maxL <= 11) {
                maxL += .5;
                L03_PongPaddels.pLeft.cmpTransform.local.translate(f.Vector3.Y(.5));
            }
        }
        else if (keysPressed[83] == true) {
            if (maxL >= -11) {
                maxL -= .5;
                L03_PongPaddels.pLeft.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
            }
        }
        //paddlesEnd
        maxHorizontal += horizontal;
        maxVertical += vertical;
        if (maxVertical > 21 || maxVertical < -21) {
            //type = "vertical";
            //newBallDirection();
            let temp = horizontal;
            horizontal = vertical;
            vertical = -temp;
        }
        else {
            L03_PongPaddels.ball.cmpTransform.local.translate(new f.Vector3(vertical, 0, 0));
        }
        if (maxHorizontal > 15 || maxHorizontal < -15) {
            //type = "horizontal";
            //newBallDirection();
            let temp = horizontal;
            horizontal = -vertical;
            vertical = temp;
        }
        else {
            L03_PongPaddels.ball.cmpTransform.local.translate(new f.Vector3(0, horizontal, 0));
        }
        console.log(maxVertical);
        f.RenderManager.update();
        viewport.draw();
    }
    function roundIt(_number) {
        return Math.round(_number * 100) / 100;
    }
})(L03_PongPaddels || (L03_PongPaddels = {}));
//# sourceMappingURL=main.js.map