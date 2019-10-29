namespace L04_PongPaddels {

    import f = FudgeCore;

    export let ball: f.Node = new f.Node("Ball");
    export let pLeft: f.Node = new f.Node("pLeft");
    export let pRight: f.Node = new f.Node("pRight");

    export function createPong(): f.Node {

        let pong: f.Node = new f.Node("Pong");

        let mesh: f.MeshQuad = new f.MeshQuad();
        //let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        //let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
    
        ball.addComponent(new f.ComponentMesh(mesh));
        ball.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        ball.addComponent(new f.ComponentTransform());
    
        pLeft.addComponent(new f.ComponentMesh(mesh));
        pLeft.addComponent(new f.ComponentMaterial(new f.Material("LightBlue", f.ShaderUniColor, new f.CoatColored(new f.Color(.6, .6, 1, 1)))));
        pLeft.addComponent(new f.ComponentTransform());
    
        pRight.addComponent(new f.ComponentMesh(mesh));
        pRight.addComponent(new f.ComponentMaterial(new f.Material("lightRed", f.ShaderUniColor, new f.CoatColored(new f.Color(1, .3, .3, 1)))));
        pRight.addComponent(new f.ComponentTransform());

        pong.appendChild(ball);
        pong.appendChild(pLeft);
        pong.appendChild(pRight);

        return pong;
    }
}