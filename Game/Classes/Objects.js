"use strict";
var Game;
(function (Game) {
    var f = FudgeCore;
    class Object extends f.Node {
        constructor(_name, _data, _index, _Z = 0) {
            super(_name);
            this.offset = 6;
            this.update = (_event) => {
                let camPositionX = Game.cmpCamera.pivot.translation.x;
                let test = this.cmpTransform.local.translation.x;
                if (Game.direction == "right" && test <= camPositionX - this.offset) {
                    this.moveObject();
                }
                else if (Game.direction == "left" && test >= camPositionX + this.offset) {
                    this.moveObject();
                }
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
            this.sprite = sprite;
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