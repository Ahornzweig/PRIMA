"use strict";
var L14_ScrollerGame;
(function (L14_ScrollerGame) {
    var f = FudgeCore;
    /* export enum ACTION {
         IDLE = "Idle",
         WALK = "Walk",
         JUMP = "Jump",
         HIT = "Hit"
     }
 
     export enum DIRECTION {
         LEFT, RIGHT
     }*/
    class Enemy extends L14_ScrollerGame.MovingObject {
        constructor(_name, _data) {
            super(_name);
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                let camPositionX = L14_ScrollerGame.cmpCamera.pivot.translation.x;
                let test = this.cmpTransform.local.translation.x;
                if (L14_ScrollerGame.direction == "right" && test <= camPositionX - 6) {
                    let transform = this.cmpTransform.local;
                    let index;
                    for (let i = 0; i < this.enemies.length; i++) {
                        if (this.enemies[i][0] === Math.round((transform.translation.x + Number.EPSILON) * 100) / 100) {
                            index = i;
                            break;
                        }
                    }
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[(index + 1)][0];
                    newTranslation.y = this.enemies[(index + 1)][1];
                    this.cmpTransform.local.translation = newTranslation;
                }
                else if (L14_ScrollerGame.direction == "left" && test >= camPositionX + 6) {
                    let transform = this.cmpTransform.local;
                    let index;
                    for (let i = 0; i < this.enemies.length; i++) {
                        if (this.enemies[i][0] === Math.round((transform.translation.x + Number.EPSILON) * 100) / 100) {
                            index = i;
                            break;
                        }
                    }
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[(index - 1)][0];
                    newTranslation.y = this.enemies[(index - 1)][1];
                    this.cmpTransform.local.translation = newTranslation;
                }
            };
            let cmpMesh = new f.ComponentMesh(Enemy.mesh);
            cmpMesh.pivot = Enemy.pivot;
            this.addComponent(cmpMesh);
            this.enemies = _data;
            for (let sprite of Enemy.sprites) {
                let nodeSprite = new L14_ScrollerGame.NodeSprite(sprite.name, sprite);
                //nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show(L14_ScrollerGame.ACTION.IDLE);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage, _name, _values) {
            Enemy.sprites = [];
            let sprite = new L14_ScrollerGame.Sprite(L14_ScrollerGame.ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[0][0], _values[0][1], _values[0][2], _values[0][3]), _values[0][4], f.Vector2.ZERO(), _values[0][5], f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
            sprite = new L14_ScrollerGame.Sprite(L14_ScrollerGame.ACTION.IDLE);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[1][0], _values[1][1], _values[1][2], _values[1][3]), _values[1][4], f.Vector2.ZERO(), _values[1][5], f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
            sprite = new L14_ScrollerGame.Sprite(L14_ScrollerGame.ACTION.ATTACK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[2][0], _values[2][1], _values[2][2], _values[2][3]), _values[2][4], f.Vector2.ZERO(), _values[2][5], f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
        }
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topleft = new f.Vector3(-0.5, 0.5, 0);
            let bottomright = new f.Vector3(0.5, -0.5, 0);
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Enemy.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
    }
    Enemy.gravity = f.Vector2.Y(-3);
    Enemy.mesh = new f.MeshSprite();
    Enemy.pivot = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));
    L14_ScrollerGame.Enemy = Enemy;
})(L14_ScrollerGame || (L14_ScrollerGame = {}));
//# sourceMappingURL=Enemy.js.map
