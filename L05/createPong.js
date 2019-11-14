"use strict";
var L05;
(function (L05) {
    var f = FudgeCore;
    function createPong() {
        let pong = new f.Node("Pong");
        let mesh = new f.MeshQuad();
        //let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let mtrBlack = new f.Material("Black", f.ShaderUniColor, new f.CoatColored(new f.Color(0, 0, 0, 1)));
        let mtrLightRed = new f.Material("lightRed", f.ShaderUniColor, new f.CoatColored(new f.Color(1, .3, .3, 1)));
        //let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        L05.ball = createNode("ball", mesh, mtrSolidWhite, f.Vector2.ZERO(), new f.Vector2(1, 1));
        L05.pLeft = createNode("pLeft", mesh, new f.Material("LightBlue", f.ShaderUniColor, new f.CoatColored(new f.Color(.6, .6, 1, 1))), new f.Vector2(-18, 0), new f.Vector2(1, 5));
        L05.pRight = createNode("pRight", mesh, mtrLightRed, new f.Vector2(18, 0), new f.Vector2(1, 5));
        L05.wallTop = createNode("wallTop", mesh, mtrLightRed, new f.Vector2(0, 13), new f.Vector2(41, 1));
        L05.wallBottom = createNode("wallBottom", mesh, new f.Material("LightBlue", f.ShaderUniColor, new f.CoatColored(new f.Color(.6, .6, 1, 1))), new f.Vector2(0, -13), new f.Vector2(41, 1));
        L05.wallLeft = createNode("wallLeft", mesh, mtrBlack, new f.Vector2(-20, 0), new f.Vector2(1, 27));
        L05.wallRight = createNode("wallRight", mesh, mtrBlack, new f.Vector2(20, 0), new f.Vector2(1, 27));
        pong.appendChild(L05.ball);
        pong.appendChild(L05.pLeft);
        pong.appendChild(L05.pRight);
        pong.appendChild(L05.wallTop);
        pong.appendChild(L05.wallBottom);
        pong.appendChild(L05.wallLeft);
        pong.appendChild(L05.wallRight);
        return pong;
    }
    L05.createPong = createPong;
    function createNode(_name, _mesh, _material, _translation, _scaling) {
        let node = new f.Node(_name);
        node.addComponent(new f.ComponentMesh(_mesh));
        node.addComponent(new f.ComponentMaterial(_material));
        node.addComponent(new f.ComponentTransform());
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(f.ComponentMesh).pivot.scale(_scaling.toVector3());
        return node;
    }
})(L05 || (L05 = {}));
//# sourceMappingURL=createPong.js.map