"use strict";
///<reference types = "../Fudge/FudgeCore"/>
var L02_FirstFudge;
///<reference types = "../Fudge/FudgeCore"/>
(function (L02_FirstFudge) {
    var f = FudgeCore;
    window.addEventListener("load", init);
    function init(_evevt) {
        let canvas = document.querySelector("canvas");
        console.log(canvas);
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let node = new f.Node("Quad");
        let mesh = new f.MeshCube();
        let cmpMesh = new f.ComponentMesh(mesh);
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let cmpMaterial = new f.ComponentMaterial(mtrSolidWhite);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        L02_FirstFudge.viewport = new f.Viewport();
        L02_FirstFudge.viewport.initialize("Viewport", node, cmpCamera, canvas);
        f.Debug.log(L02_FirstFudge.viewport);
        setInterval(function () {
            cmpMesh.pivot.rotateY(1);
            L02_FirstFudge.viewport.draw();
        }, 1000 / 25);
    }
})(L02_FirstFudge || (L02_FirstFudge = {}));
//# sourceMappingURL=main.js.map