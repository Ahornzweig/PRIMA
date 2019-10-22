///<reference types = "../Fudge/FudgeCore"/>

namespace L03_PongPaddels {

    import f = FudgeCore;

    window.addEventListener("load", init);
    export let viewport: f.Viewport;

    function init(_evevt: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");

        //console.log(canvas);

        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let pong: f.Node = createPong();

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);

        let cmpTransform: f.ComponentTransform = pRight.getComponent(f.ComponentTransform);

        pRight.cmpTransform.local.translateX(20);
        //pRight.cmpTransform.local.scaleY(5);
        ( <f.ComponentMesh> pRight.getComponent(f.ComponentMesh) ).pivot.scaleY(5);

        pLeft.cmpTransform.local.translateX(-20);
        //pLeft.cmpTransform.local.scaleY(5);
        ( <f.ComponentMesh> pLeft.getComponent(f.ComponentMesh) ).pivot.scaleY(5);
        console.log(cmpTransform);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(viewport);
        
        viewport.draw();
    }
}