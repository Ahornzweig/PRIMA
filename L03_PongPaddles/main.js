"use strict";
///<reference types = "../Fudge/FudgeCore"/>
var L03_PongPaddels;
///<reference types = "../Fudge/FudgeCore"/>
(function (L03_PongPaddels) {
    var f = FudgeCore;
    window.addEventListener("load", init);
    function init(_evevt) {
        let canvas = document.querySelector("canvas");
        console.log(canvas);
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let pong = L03_PongPaddels.createPong();
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(15);
        L03_PongPaddels.viewport = new f.Viewport();
        L03_PongPaddels.viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(L03_PongPaddels.viewport);
        L03_PongPaddels.viewport.draw();
    }
})(L03_PongPaddels || (L03_PongPaddels = {}));
//# sourceMappingURL=main.js.map