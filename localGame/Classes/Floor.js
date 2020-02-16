"use strict";
var Game;
(function (Game) {
    var f = FudgeCore;
    class Floor extends f.Node {
        constructor(_data, _index) {
            super("Floor");
            this.update = (_event) => {
                let camPositionX = Game.cmpCamera.pivot.translation.x;
                let test = this.cmpTransform.local.translation.x;
                if (Game.direction == "right" && test <= camPositionX - 6) {
                    this.moveFloor();
                }
                else if (Game.direction == "left" && test >= camPositionX + 6) {
                    this.moveFloor();
                }
            };
            this.addComponent(new f.ComponentTransform());
            this.addComponent(new f.ComponentMaterial(Floor.material));
            let cmpMesh = new f.ComponentMesh(Floor.mesh);
            cmpMesh.pivot = Floor.pivot;
            this.addComponent(cmpMesh);
            this.index = _index;
            this.floors = _data;
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
        moveFloor() {
            if (Game.direction == "right") {
                if (this.index < (this.floors.length - 4)) {
                    this.index += 3;
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.floors[this.index][2];
                    newTranslation.y = this.floors[this.index][3];
                    this.cmpTransform.local.translation = newTranslation;
                }
            }
            else if (Game.direction == "left") {
                if ((this.index - 3) >= 0) {
                    this.index -= 3;
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.floors[this.index][2];
                    newTranslation.y = this.floors[this.index][3];
                    this.cmpTransform.local.translation = newTranslation;
                }
            }
        }
    }
    Floor.mesh = new f.MeshSprite();
    Floor.material = new f.Material("Floor", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("green", 0.5)));
    Floor.pivot = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));
    Game.Floor = Floor;
})(Game || (Game = {}));
//# sourceMappingURL=Floor.js.map