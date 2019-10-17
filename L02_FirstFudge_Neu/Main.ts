namespace L02_FirstFudge
{
    import f = FudgeCore;
    window.addEventListener("load", handleLoad);
    export let viewport: f.Viewport;

    function handleLoad(_event: Event):void
    {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let node: f.Node = new f.Node("Quad");
        let mesh: f.MeshQuad = new f.MeshQuad();
        let cmpMesh: f.Component = new f.ComponentMesh(mesh);
        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(35);
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        f.Debug.log(viewport);

        viewport.draw();
    }    
}