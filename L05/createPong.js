"use strict";
var L05;
(function (L05) {
    var f = FudgeCore;
    L05.ball = new f.Node("Ball");
    L05.pLeft = new f.Node("pLeft");
    L05.pRight = new f.Node("pRight");
    function createPong() {
        let pong = new f.Node("Pong");
        let mesh = new f.MeshQuad();
        //let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        //let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        L05.ball.addComponent(new f.ComponentMesh(mesh));
        L05.ball.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        L05.ball.addComponent(new f.ComponentTransform());
        L05.pLeft.addComponent(new f.ComponentMesh(mesh));
        L05.pLeft.addComponent(new f.ComponentMaterial(new f.Material("LightBlue", f.ShaderUniColor, new f.CoatColored(new f.Color(.6, .6, 1, 1)))));
        L05.pLeft.addComponent(new f.ComponentTransform());
        L05.pRight.addComponent(new f.ComponentMesh(mesh));
        L05.pRight.addComponent(new f.ComponentMaterial(new f.Material("lightRed", f.ShaderUniColor, new f.CoatColored(new f.Color(1, .3, .3, 1)))));
        L05.pRight.addComponent(new f.ComponentTransform());
        pong.appendChild(L05.ball);
        pong.appendChild(L05.pLeft);
        pong.appendChild(L05.pRight);
        return pong;
    }
    L05.createPong = createPong;
})(L05 || (L05 = {}));
//# sourceMappingURL=createPong.js.map