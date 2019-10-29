///<reference types = "../Fudge/FudgeCore"/>

namespace L03_PongPaddels {

    interface KeyPress {
        [keyCode: number]: boolean;
    }

    interface BallDirection {
        [direction: string]: number;
    }

    let keysPressed: KeyPress = {};
    let ballDirections: BallDirection = {};
    let max: number = 1;
    let min: number = -1;
    let vertical: number = roundIt(Math.random() * (max - min) + min);
    let horizontal: number = roundIt(Math.random() * (max - min) + min);
    ballDirections["vertical"] = vertical;
    ballDirections["horizontal"] = horizontal;
    let maxR: number = 0;
    let maxL: number = 0;
    let maxVertical: number = 0;
    let maxHorizontal: number = 0;
    //let type: string = "";

    import f = FudgeCore;

    window.addEventListener("load", init);
    let viewport: f.Viewport;

    function init(_evevt: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        console.log(ballDirections);

        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let pong: f.Node = createPong();

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);

        //let cmpTransform: f.ComponentTransform = pRight.getComponent(f.ComponentTransform);
        //console.log(cmpTransform);

        pRight.cmpTransform.local.translateX(20);
        //pRight.cmpTransform.local.scaleY(5);
        (<f.ComponentMesh>pRight.getComponent(f.ComponentMesh)).pivot.scaleY(5);

        pLeft.cmpTransform.local.translateX(-20);
        //pLeft.cmpTransform.local.scaleY(5);
        (<f.ComponentMesh>pLeft.getComponent(f.ComponentMesh)).pivot.scaleY(5);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(viewport);
        viewport.draw();

        document.addEventListener("keydown", down);
        document.addEventListener("keyup", up);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();

    }

    function down(_evevt: KeyboardEvent): void {

        let keyCode: number = _evevt.keyCode;
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

    function up(_evevt: KeyboardEvent): void {

        let keyCode: number = _evevt.keyCode;
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

    function update(_evevt: Event): void {
        //f.Debug.log("update");
        //paddles
        if (keysPressed[38] == true) {
            if (maxR <= 11) {
                maxR += .5;
                pRight.cmpTransform.local.translateY(.5);
            }

        } else if (keysPressed[40] == true) {
            if (maxR >= -11) {
                maxR -= .5;
                pRight.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
            }
        }

        if (keysPressed[87] == true) {
            if (maxL <= 11) {
                maxL += .5;
                pLeft.cmpTransform.local.translate(f.Vector3.Y(.5));
            }

        } else if (keysPressed[83] == true) {
            if (maxL >= -11) {
                maxL -= .5;
                pLeft.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
            }
        }
        //paddlesEnd


        maxHorizontal += horizontal;
        maxVertical += vertical;

        if (maxVertical > 21 || maxVertical < -21) {
            //type = "vertical";
            //newBallDirection();
            let temp: number = horizontal;
            horizontal = vertical;
            vertical = -temp;
        } else {
            ball.cmpTransform.local.translate(new f.Vector3(vertical, 0, 0));
        }

        if (maxHorizontal > 15 || maxHorizontal < -15) {
            //type = "horizontal";
            //newBallDirection();
            let temp: number = horizontal;
            horizontal = -vertical;
            vertical = temp;
        } else {
            ball.cmpTransform.local.translate(new f.Vector3(0, horizontal, 0));
        }

        console.log(maxVertical);
        f.RenderManager.update();
        viewport.draw();
    }
    function roundIt(_number: number): number {

        return Math.round(_number * 100) / 100;
    }
}