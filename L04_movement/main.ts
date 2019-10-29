///<reference types = "../Fudge/FudgeCore"/>

namespace L04_PongPaddels {

    interface KeyPress {
        [keyCode: number]: boolean;
    }

    import f = FudgeCore;

    window.addEventListener("load", init);
    let viewport: f.Viewport;

    function init(_evevt: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        //console.log(canvas);

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

    let keysPressed: KeyPress = {};

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

    function update(_evevt: Event): void {
        //f.Debug.log("update");

        if (keysPressed[38] == true) {

            pRight.cmpTransform.local.translateY(.5);

        } else if (keysPressed[40] == true) {

            pRight.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
        }

        if (keysPressed[87] == true) {

            pLeft.cmpTransform.local.translate(f.Vector3.Y(.5));

        } else if (keysPressed[83] == true) {

            pLeft.cmpTransform.local.translate(new f.Vector3(0, -.5, 0));
        }
        
        f.RenderManager.update();
        viewport.draw();
    }
}