"use strict";
var L03_PongPaddels;
(function (L03_PongPaddels) {
    var f = FudgeCore;
    function createPong() {
        let pong = new f.Node("Pong");
        let ball = new f.Node("Ball");
        let pLeft = new f.Node("pLeft");
        let pRight = new f.Node("pRight");
        let mesh = new f.MeshQuad();
        //let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        //let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(new f.ComponentMesh(mesh));
        ball.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        pLeft.addComponent(new f.ComponentMesh(mesh));
        pLeft.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        pRight.addComponent(new f.ComponentMesh(mesh));
        pRight.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        pong.appendChild(ball);
        pong.appendChild(pLeft);
        pong.appendChild(pRight);
        return pong;
    }
    L03_PongPaddels.createPong = createPong;
})(L03_PongPaddels || (L03_PongPaddels = {}));
//# sourceMappingURL=createPong.js.map