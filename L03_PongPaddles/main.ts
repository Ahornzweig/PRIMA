///<reference types = "../Fudge/FudgeCore"/>

namespace L03_PongPaddels {

    import f = FudgeCore;

    window.addEventListener("load", init);
    export let viewport: f.Viewport;

    function init(_evevt: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");

        console.log(canvas);

        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let pong: f.Node = createPong();

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(15);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(viewport);
        
        viewport.draw();

    }

}