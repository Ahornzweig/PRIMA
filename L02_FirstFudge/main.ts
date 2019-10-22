///<reference types = "../Fudge/FudgeCore"/>

namespace L02_FirstFudge {

    import f = FudgeCore;

    window.addEventListener("load", init);
    export let viewport: f.Viewport;

    function init(_evevt: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");

        console.log(canvas);

        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let node: f.Node = new f.Node("Quad");
        let mesh: f.MeshCube = new f.MeshCube();
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);

        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        f.Debug.log(viewport);

        setInterval(function (): void {
            cmpMesh.pivot.rotateY(1);
            viewport.draw();
        }, 1000/25);

    }

}