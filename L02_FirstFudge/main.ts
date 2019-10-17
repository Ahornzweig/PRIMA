///<reference types = "../Fudge/FudgeCore"/>

namespace L02_FirstFudge {

    import f = FudgeCore;

    window.addEventListener("load", init);
    function init(_evevt: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");

        console.log(canvas);
        
        let viewport: f.Viewport = new f.Viewport();
        viewport.initialize("viewport", null, null, canvas);
        
         
    }
}