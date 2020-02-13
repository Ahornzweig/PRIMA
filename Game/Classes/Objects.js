"use strict";
var Game;
(function (Game) {
    var f = FudgeCore;
    class Object extends f.Node {
        constructor(_name, _data, _index, _Z = 0) {
            super(_name);
            this.update = (_event) => {
                let camPositionX = Game.cmpCamera.pivot.translation.x;
                let test = this.cmpTransform.local.translation.x;
                if (Game.direction == "right" && test <= camPositionX - 6) {
                    this.moveObject();
                }
                else if (Game.direction == "left" && test >= camPositionX + 6) {
                    this.moveObject();
                }
                /*if (direction == "right" && test <= camPositionX - 6) {
    
                    let transform: f.Matrix4x4 = this.cmpTransform.local;
                    let index: number;
    
                    for (let i: number = 0; i < this.objects.length; i++) {
                        console.log(this.objects, this);
                        if (this.objects[i][0] === Math.round((transform.translation.x + Number.EPSILON) * 100) / 100) {
                            index = i;
                            break;
                        }
                    }
    
                    let newTranslation: f.Vector3 = f.Vector3.ZERO();
                    newTranslation.x = this.objects[(index + 1)][0];
                    newTranslation.y = this.objects[(index + 1)][1];
    
                    this.cmpTransform.local.translation = newTranslation;
    
                } else if (direction == "left" && test >= camPositionX + 6) {
    
                    let transform: f.Matrix4x4 = this.cmpTransform.local;
                    let index: number;
    
                    for (let i: number = 0; i < this.objects.length; i++) {
                        if (this.objects[i][0] === Math.round((transform.translation.x + Number.EPSILON) * 100) / 100) {
                            index = i;
                            break;
                        }
                    }
    
                    let newTranslation: f.Vector3 = f.Vector3.ZERO();
                    newTranslation.x = this.objects[(index - 1)][0];
                    newTranslation.y = this.objects[(index - 1)][1];
    
                    this.cmpTransform.local.translation = newTranslation;
    
                }*/
            };
            this.addComponent(new f.ComponentTransform());
            let nodeSprite = new Game.NodeSprite(_name, Object.sprite);
            this.appendChild(nodeSprite);
            this.objects = _data;
            this.index = _index;
            this.Z = _Z;
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage, _name, _values) {
            let sprite = new Game.Sprite(_name);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[0], _values[1], _values[2], _values[3]), _values[4], f.Vector2.ZERO(), _values[5], f.ORIGIN2D.BOTTOMCENTER);
            Object.sprite = sprite;
        }
        moveObject() {
            if (Game.direction == "right") {
                if (this.index < (this.objects.length - 1)) {
                    this.index++;
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.objects[this.index][0];
                    newTranslation.y = this.objects[this.index][1];
                    newTranslation.z = this.Z;
                    this.cmpTransform.local.translation = newTranslation;
                }
            }
            else if (Game.direction == "left") {
                if (this.index > 0) {
                    this.index--;
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.objects[this.index][0];
                    newTranslation.y = this.objects[this.index][1];
                    newTranslation.z = this.Z;
                    this.cmpTransform.local.translation = newTranslation;
                }
            }
        }
    }
    Game.Object = Object;
})(Game || (Game = {}));
//# sourceMappingURL=Objects.js.map