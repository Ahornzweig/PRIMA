namespace L05 {

    import f = FudgeCore;

    export let ball: f.Node;
    export let pLeft: f.Node;
    export let pRight: f.Node;
    export let wallTop: f.Node;
    export let wallBottom: f.Node;
    export let wallLeft: f.Node;
    export let wallRight: f.Node;

    export function createPong(): f.Node {

        let pong: f.Node = new f.Node("Pong");

        let mesh: f.MeshQuad = new f.MeshQuad();
        //let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let mtrBlack: f.Material = new f.Material("Black", f.ShaderUniColor, new f.CoatColored(new f.Color(0, 0, 0, 1)));
        let mtrLightRed: f.Material = new f.Material("lightRed", f.ShaderUniColor, new f.CoatColored(new f.Color(1, .3, .3, 1)));
        //let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);

        ball = createNode("ball", mesh, mtrSolidWhite, f.Vector2.ZERO, new f.Vector2(1, 1));
        pLeft = createNode("pLeft", mesh, new f.Material("LightBlue", f.ShaderUniColor, new f.CoatColored(new f.Color(.6, .6, 1, 1))), new f.Vector2(-18, 0), new f.Vector2(1, 5));
        pRight = createNode("pRight", mesh, mtrLightRed, new f.Vector2(18, 0), new f.Vector2(1, 5));

        wallTop = createNode("wallTop", mesh, mtrLightRed, new f.Vector2(0, 13), new f.Vector2(41, 1));
        wallBottom = createNode("wallBottom", mesh, new f.Material("LightBlue", f.ShaderUniColor, new f.CoatColored(new f.Color(.6, .6, 1, 1))), new f.Vector2(0, -13), new f.Vector2(41, 1));
        wallLeft = createNode("wallLeft", mesh, mtrBlack, new f.Vector2(-20, 0), new f.Vector2(1, 27));
        wallRight = createNode("wallRight", mesh, mtrBlack, new f.Vector2(20, 0), new f.Vector2(1, 27));

        pong.appendChild(ball);
        pong.appendChild(pLeft);
        pong.appendChild(pRight);
        pong.appendChild(wallTop);
        pong.appendChild(wallBottom);
        pong.appendChild(wallLeft);
        pong.appendChild(wallRight);

        return pong;
    }

    function createNode(_name: string, _mesh: f.Mesh, _material: f.Material, _translation: f.Vector2, _scaling: f.Vector2): f.Node {

        let node: f.Node = new f.Node(_name);
        node.addComponent(new f.ComponentMesh(_mesh));
        node.addComponent(new f.ComponentMaterial(_material));
        node.addComponent(new f.ComponentTransform());

        node.cmpTransform.local.translate(_translation.toVector3());
        (<f.ComponentMesh>node.getComponent(f.ComponentMesh)).pivot.scale(_scaling.toVector3());

        return node;
    }
}