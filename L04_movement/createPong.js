"use strict";
var L03_PongPaddels;
(function (L03_PongPaddels) {
    var f = FudgeCore;
    L03_PongPaddels.ball = new f.Node("Ball");
    L03_PongPaddels.pLeft = new f.Node("pLeft");
    L03_PongPaddels.pRight = new f.Node("pRight");
    function createPong() {
        let pong = new f.Node("Pong");
        let mesh = new f.MeshQuad();
        //let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        //let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        L03_PongPaddels.ball.addComponent(new f.ComponentMesh(mesh));
        L03_PongPaddels.ball.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        L03_PongPaddels.ball.addComponent(new f.ComponentTransform());
        L03_PongPaddels.pLeft.addComponent(new f.ComponentMesh(mesh));
        L03_PongPaddels.pLeft.addComponent(new f.ComponentMaterial(new f.Material("LightBlue", f.ShaderUniColor, new f.CoatColored(new f.Color(.6, .6, 1, 1)))));
        L03_PongPaddels.pLeft.addComponent(new f.ComponentTransform());
        L03_PongPaddels.pRight.addComponent(new f.ComponentMesh(mesh));
        L03_PongPaddels.pRight.addComponent(new f.ComponentMaterial(new f.Material("lightRed", f.ShaderUniColor, new f.CoatColored(new f.Color(1, .3, .3, 1)))));
        L03_PongPaddels.pRight.addComponent(new f.ComponentTransform());
        pong.appendChild(L03_PongPaddels.ball);
        pong.appendChild(L03_PongPaddels.pLeft);
        pong.appendChild(L03_PongPaddels.pRight);
        return pong;
    }
    L03_PongPaddels.createPong = createPong;
})(L03_PongPaddels || (L03_PongPaddels = {}));
//# sourceMappingURL=createPong.js.map