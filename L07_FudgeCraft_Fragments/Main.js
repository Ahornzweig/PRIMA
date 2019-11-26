"use strict";
var L07_FudgeCraft_Fragments;
(function (L07_FudgeCraft_Fragments) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    let game;
    let rotate = f.Vector3.ZERO();
    let grid = [[20], [20], [20]];
    let usedGridSpace = new Map();
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true);
        f.Debug.log("Canvas", canvas);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translate(new f.Vector3(2, 3, 30));
        cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        game = new f.Node("FudgeCraft");
        // let cube: Cube = new Cube(CUBE_TYPE.BLUE);
        let fragment = new L07_FudgeCraft_Fragments.Fragment(0);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new f.ComponentTransform());
        game.appendChild(fragment);
        let key = calcPosition([0, 0, 0]);
        usedGridSpace.set(key, fragment);
        fragment = new L07_FudgeCraft_Fragments.Fragment(1);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-2, 1, 0))));
        game.appendChild(fragment);
        key = calcPosition([-2, 1, 0]);
        usedGridSpace.set(key, fragment);
        fragment = new L07_FudgeCraft_Fragments.Fragment(2);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(-3))));
        game.appendChild(fragment);
        key = calcPosition([-3, 0, 0]);
        usedGridSpace.set(key, fragment);
        let cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.lookAt(new f.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        console.log(usedGridSpace);
        viewport = new f.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        f.Debug.log("Viewport", viewport);
        viewport.draw();
        f.Debug.log("Game", game);
        window.addEventListener("keydown", hndKeyDown);
        checkGrid();
    }
    function hndKeyDown(_event) {
        //let rotate: ƒ.Vector3 = ƒ.Vector3.ZERO();
        switch (_event.code) {
            case f.KEYBOARD_CODE.ARROW_UP:
                rotate.add(f.Vector3.X(-1));
                break;
            case f.KEYBOARD_CODE.ARROW_DOWN:
                rotate.add(f.Vector3.X(1));
                break;
            case f.KEYBOARD_CODE.ARROW_LEFT:
                rotate.add(f.Vector3.Y(-1));
                break;
            case f.KEYBOARD_CODE.ARROW_RIGHT:
                rotate.add(f.Vector3.Y(1));
                break;
        }
        for (let fragment of game.getChildren()) {
            // fragment.cmpTransform.local.rotate(rotate);
            fragment.cmpTransform.local.rotation = rotate;
        }
        f.RenderManager.update();
        viewport.draw();
    }
    function calcPosition(_pos) {
        let corect = 10;
        let position = "" + (_pos[0] + corect) + "," + (_pos[1] + corect) + "," + (_pos[2] + corect) + "";
        return position;
    }
    function checkGrid() {
        for (let i = 0; grid[0][0] >= i; i++) {
            for (let iy = 0; grid[1][0] >= iy; iy++) {
                for (let iz = 0; grid[2][0] >= iz; iz++) {
                    let serchFor = "" + (i) + "," + (iy) + "," + (iz) + "";
                    let exists = usedGridSpace.has(serchFor);
                    if (exists == true) {
                        let result = usedGridSpace.get(serchFor);
                        console.log(serchFor, result);
                    }
                }
            }
        }
        //return;
    }
})(L07_FudgeCraft_Fragments || (L07_FudgeCraft_Fragments = {}));
//# sourceMappingURL=Main.js.map