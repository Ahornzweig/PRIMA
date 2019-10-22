namespace L03_PongPaddels {

    import f = FudgeCore;

    export function createPong(): f.Node {

        let pong: f.Node = new f.Node("Pong");

        let ball: f.Node = new f.Node("Ball");
        let pLeft: f.Node = new f.Node("pLeft");
        let pRight: f.Node = new f.Node("pRight");
        
        let mesh: f.MeshQuad = new f.MeshQuad();
        //let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
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


}