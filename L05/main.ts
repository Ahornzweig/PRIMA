///<reference types = "../Fudge/FudgeCore"/>

namespace L05 {

    import f = FudgeCore;

    interface KeyPress {
        [keyCode: number]: boolean;
    }

    let keysPressed: KeyPress = {};

    let max: number = 1;
    let min: number = -1;
    let vertical: number = roundIt(Math.random() * (max - min) + min);
    let horizontal: number = roundIt(Math.random() * (max - min) + min);
    
    let ballVektor: f.Vector3 = new f.Vector3(horizontal, vertical, 0);

    let maxR: number = 0;
    let maxL: number = 0;
    let maxVertical: number = 0;
    let maxHorizontal: number = 0;

    window.addEventListener("load", init);
    let viewport: f.Viewport;

    function init(_evevt: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");

        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let pong: f.Node = createPong();

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);

        pRight.cmpTransform.local.translateX(20);
        (<f.ComponentMesh>pRight.getComponent(f.ComponentMesh)).pivot.scaleY(5);

        pLeft.cmpTransform.local.translateX(-20);
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

    }

    function up(_evevt: KeyboardEvent): void {

        let keyCode: number = _evevt.keyCode;
        keysPressed[keyCode] = false;

    }

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

        if (maxHorizontal > 21 || maxHorizontal < -21) {
            //horizontal = horizontal;
            horizontal = horizontal * -1;
        } else {
            ball.cmpTransform.local.translate(new f.Vector3(horizontal, 0, 0));
        }

        if (maxVertical > 14 || maxVertical < -14) {
            vertical = vertical * -1;
            //vertical = vertical;
        } else {
            ball.cmpTransform.local.translate(new f.Vector3(0, vertical, 0));
        }

        f.RenderManager.update();
        viewport.draw();
    }

    function roundIt(_number: number): number {

        return Math.round(_number * 100) / 100;
    }
}