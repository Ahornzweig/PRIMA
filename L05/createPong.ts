namespace L05 {

    import f = FudgeCore;

    export let ball: f.Node = new f.Node("Ball");
    export let pLeft: f.Node = new f.Node("pLeft");
    export let pRight: f.Node = new f.Node("pRight");
    export let wallTop: f.Node = new f.Node("wallTop");
    export let wallBottom: f.Node = new f.Node("wallBottom");
    export let wallLeft: f.Node = new f.Node("wallLeft");
    export let wallRight: f.Node = new f.Node("wallRight");

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

        wallTop.addComponent(new f.ComponentMesh(mesh));
        wallTop.addComponent(new f.ComponentMaterial(new f.Material("lightRed", f.ShaderUniColor, new f.CoatColored(new f.Color(1, .3, .3, 1)))));
        wallTop.addComponent(new f.ComponentTransform());

        wallBottom.addComponent(new f.ComponentMesh(mesh));
        wallBottom.addComponent(new f.ComponentMaterial(new f.Material("LightBlue", f.ShaderUniColor, new f.CoatColored(new f.Color(.6, .6, 1, 1)))));
        wallBottom.addComponent(new f.ComponentTransform());

        wallLeft.addComponent(new f.ComponentMesh(mesh));
        wallLeft.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        wallLeft.addComponent(new f.ComponentTransform());

        wallRight.addComponent(new f.ComponentMesh(mesh));
        wallRight.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        wallRight.addComponent(new f.ComponentTransform());

        pong.appendChild(ball);
        pong.appendChild(pLeft);
        pong.appendChild(pRight);
        pong.appendChild(wallTop);
        pong.appendChild(wallBottom);
        pong.appendChild(wallLeft);
        pong.appendChild(wallRight);

        return pong;
    }
}