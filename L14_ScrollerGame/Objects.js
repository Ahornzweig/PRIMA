"use strict";
var L14_ScrollerGame;
(function (L14_ScrollerGame) {
    var f = FudgeCore;
    class Object extends f.Node {
        constructor(_name, _data) {
            super(_name);
            this.update = (_event) => {
                let camPositionX = L14_ScrollerGame.cmpCamera.pivot.translation.x;
                let test = this.cmpTransform.local.translation.x;
                if (L14_ScrollerGame.direction == "right" && test <= camPositionX - 6) {
                    let transform = this.cmpTransform.local;
                    let index;
                    for (let i = 0; i < this.objects.length; i++) {
                        console.log(this.objects, this);
                        if (this.objects[i][0] === Math.round((transform.translation.x + Number.EPSILON) * 100) / 100) {
                            index = i;
                            break;
                        }
                    }
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.objects[(index + 1)][0];
                    newTranslation.y = this.objects[(index + 1)][1];
                    this.cmpTransform.local.translation = newTranslation;
                }
                else if (L14_ScrollerGame.direction == "left" && test >= camPositionX + 6) {
                    let transform = this.cmpTransform.local;
                    let index;
                    for (let i = 0; i < this.objects.length; i++) {
                        if (this.objects[i][0] === Math.round((transform.translation.x + Number.EPSILON) * 100) / 100) {
                            index = i;
                            break;
                        }
                    }
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.objects[(index - 1)][0];
                    newTranslation.y = this.objects[(index - 1)][1];
                    this.cmpTransform.local.translation = newTranslation;
                }
            };
            this.addComponent(new f.ComponentTransform());
            let nodeSprite = new L14_ScrollerGame.NodeSprite(_name, Object.sprite);
            this.appendChild(nodeSprite);
            this.objects = _data;
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage, _name, _values) {
            let sprite = new L14_ScrollerGame.Sprite(_name);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[0], _values[1], _values[2], _values[3]), _values[4], f.Vector2.ZERO(), _values[5], f.ORIGIN2D.BOTTOMCENTER);
            Object.sprite = sprite;
        }
    }
    L14_ScrollerGame.Object = Object;
})(L14_ScrollerGame || (L14_ScrollerGame = {}));
//# sourceMappingURL=Objects.js.map