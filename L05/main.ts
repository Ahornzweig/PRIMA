///<reference types = "../Fudge/FudgeCore"/>

namespace L05 {

    import f = FudgeCore;

    interface KeyPress {
        [keyCode: number]: boolean;
    }

    let keysPressed: KeyPress = {};

    let max: number = .3;
    let min: number = -.3;
    let vertical: number = roundIt(Math.random() * (max - min) + min);
    let horizontal: number = roundIt(Math.random() * (max - min) + min);
    //let ballVektor: f.Vector3 = new f.Vector3(horizontal, vertical, 0);

    let points: number[] = [0, 0];

    let maxR: number = 0;
    let maxL: number = 0;

    window.addEventListener("load", init);
    let viewport: f.Viewport;

    function init(_evevt: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");

        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let pong: f.Node = createPong();

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);

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
            if (maxR <= 10) {
                maxR += .5;
                pRight.cmpTransform.local.translateY(.5);
            }

        } else if (keysPressed[40] == true) {
            if (maxR >= -10) {
                maxR -= .5;
                pRight.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
            }
        }

        if (keysPressed[87] == true) {
            if (maxL <= 10) {
                maxL += .5;
                pLeft.cmpTransform.local.translate(f.Vector3.Y(.5));
            }

        } else if (keysPressed[83] == true) {
            if (maxL >= -10) {
                maxL -= .5;
                pLeft.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
            }
        }
        //paddlesEnd

        ball.cmpTransform.local.translate(new f.Vector3(horizontal, vertical, 0));
        moveBall();
        console.log("left:" + points[0], "right:" + points[1]);
        f.RenderManager.update();
        viewport.draw();
    }

    function moveBall(): void {

        let detectpLeft: boolean = detectHit(ball.cmpTransform.local.translation, pLeft.cmpTransform.local, pLeft.getComponent(f.ComponentMesh));
        let detectpRight: boolean = detectHit(ball.cmpTransform.local.translation, pRight.cmpTransform.local, pRight.getComponent(f.ComponentMesh));
        let detectRight: boolean = detectHit(ball.cmpTransform.local.translation, wallRight.cmpTransform.local, wallRight.getComponent(f.ComponentMesh));
        let detectLeft: boolean = detectHit(ball.cmpTransform.local.translation, wallLeft.cmpTransform.local, wallLeft.getComponent(f.ComponentMesh));
        let detectTop: boolean = detectHit(ball.cmpTransform.local.translation, wallTop.cmpTransform.local, wallTop.getComponent(f.ComponentMesh));
        let detectBottom: boolean = detectHit(ball.cmpTransform.local.translation, wallBottom.cmpTransform.local, wallBottom.getComponent(f.ComponentMesh));

        if (detectpLeft || detectpRight) {
            horizontal = horizontal * -1.0;
            vertical = vertical * 1.0;

        } else if (detectRight || detectLeft) {
            horizontal = horizontal * -1;
            if (detectRight) {
                points[0] += 1;
            } else if (detectLeft) {
                points[1] += 1;
            }
        }

        if (detectTop || detectBottom) {
            vertical = vertical * -1;
        }
    }

    function detectHit(_position: f.Vector3, _mtxBox: f.Matrix4x4, _scale: f.ComponentMesh): boolean {

        let testPosition: f.Vector3 = _mtxBox.translation;
        let testScale: f.Vector3 = _scale.pivot.scaling;

        let topLeft: f.Vector3 = new f.Vector3(testPosition.x - testScale.x / 2, testPosition.y + testScale.y / 2, 0);
        let bottomRight: f.Vector3 = new f.Vector3(testPosition.x + testScale.x / 2, testPosition.y - testScale.y / 2, 0);

        if (_position.x > topLeft.x && _position.y < topLeft.y && _position.x < bottomRight.x && _position.y > bottomRight.y) {
           
            return true;
        } else {
            return false;
        }
    }

    function roundIt(_number: number): number {
        return Math.round(_number * 100) / 100;
    }
}