"use strict";
var L04_PongPaddels;
(function (L04_PongPaddels) {
    var f = FudgeCore;
    L04_PongPaddels.ball = new f.Node("Ball");
    L04_PongPaddels.pLeft = new f.Node("pLeft");
    L04_PongPaddels.pRight = new f.Node("pRight");
    function createPong() {
        let pong = new f.Node("Pong");
        let mesh = new f.MeshQuad();
        //let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        //let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        L04_PongPaddels.ball.addComponent(new f.ComponentMesh(mesh));
        L04_PongPaddels.ball.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        L04_PongPaddels.ball.addComponent(new f.ComponentTransform());
        L04_PongPaddels.pLeft.addComponent(new f.ComponentMesh(mesh));
        L04_PongPaddels.pLeft.addComponent(new f.ComponentMaterial(new f.Material("LightBlue", f.ShaderUniColor, new f.CoatColored(new f.Color(.6, .6, 1, 1)))));
        L04_PongPaddels.pLeft.addComponent(new f.ComponentTransform());
        L04_PongPaddels.pRight.addComponent(new f.ComponentMesh(mesh));
        L04_PongPaddels.pRight.addComponent(new f.ComponentMaterial(new f.Material("lightRed", f.ShaderUniColor, new f.CoatColored(new f.Color(1, .3, .3, 1)))));
        L04_PongPaddels.pRight.addComponent(new f.ComponentTransform());
        pong.appendChild(L04_PongPaddels.ball);
        pong.appendChild(L04_PongPaddels.pLeft);
        pong.appendChild(L04_PongPaddels.pRight);
        return pong;
    }
    L04_PongPaddels.createPong = createPong;
})(L04_PongPaddels || (L04_PongPaddels = {}));
//# sourceMappingURL=createPong.js.map