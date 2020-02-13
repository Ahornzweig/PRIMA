"use strict";
var Game;
(function (Game) {
    var f = FudgeCore;
    class Floor extends f.Node {
        constructor(_data) {
            super("Floor");
            this.update = (_event) => {
                let camPositionX = Game.cmpCamera.pivot.translation.x;
                let test = this.cmpTransform.local.translation.x;
                if (Game.direction == "right" && test <= camPositionX - 6) {
                    let transform = this.cmpTransform.local;
                    let index;
                    for (let i = 0; i < Floor.floors.length; i++) {
                        if (Floor.floors[i][2] === transform.translation.x) {
                            index = i;
                            break;
                        }
                    }
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = Floor.floors[(index + 3)][2];
                    newTranslation.y = Floor.floors[(index + 3)][3];
                    this.cmpTransform.local.translation = newTranslation;
                }
                else if (Game.direction == "left" && test >= camPositionX + 6) {
                    let transform = this.cmpTransform.local;
                    let index;
                    for (let i = 0; i < Floor.floors.length; i++) {
                        if (Floor.floors[i][2] === transform.translation.x) {
                            index = i;
                            break;
                        }
                    }
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = Floor.floors[(index - 3)][2];
                    newTranslation.y = Floor.floors[(index - 3)][3];
                    this.cmpTransform.local.translation = newTranslation;
                }
            };
            this.addComponent(new f.ComponentTransform());
            this.addComponent(new f.ComponentMaterial(Floor.material));
            let cmpMesh = new f.ComponentMesh(Floor.mesh);
            cmpMesh.pivot = Floor.pivot;
            this.addComponent(cmpMesh);
            Floor.floors = _data;
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topleft = new f.Vector3(-0.5, 0.5, 0);
            let bottomright = new f.Vector3(0.5, -0.5, 0);
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
    }
    Floor.mesh = new f.MeshSprite();
    Floor.material = new f.Material("Floor", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("green", 0.5)));
    Floor.pivot = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));
    Game.Floor = Floor;
})(Game || (Game = {}));
//# sourceMappingURL=Floor.js.map