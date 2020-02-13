"use strict";
var Game;
(function (Game) {
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
    class Enemy extends Game.MovingObject {
        constructor(_name, _data, _pivot, _index, _speed) {
            super(_name, _speed);
            this.mesh = new f.MeshSprite();
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                let camPositionX = Game.cmpCamera.pivot.translation.x;
                let test = this.cmpTransform.local.translation.x;
                if (Game.direction == "right" && test <= camPositionX - 4) {
                    this.moveEnemy();
                }
                else if (Game.direction == "left" && test >= camPositionX + 4) {
                    this.moveEnemy();
                }
            };
            this.pivot = f.Matrix4x4.TRANSLATION(f.Vector3.Y(_pivot));
            let cmpMesh = new f.ComponentMesh(this.mesh);
            cmpMesh.pivot = this.pivot;
            this.addComponent(cmpMesh);
            this.enemies = _data;
            this.index = _index;
            for (let sprite of Enemy.sprites) {
                let nodeSprite = new Game.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show(Game.ACTION.IDLE);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage, _name, _values) {
            Enemy.sprites = [];
            let sprite = new Game.Sprite(Game.ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[0][0], _values[0][1], _values[0][2], _values[0][3]), _values[0][4], f.Vector2.ZERO(), _values[0][5], f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
            sprite = new Game.Sprite(Game.ACTION.IDLE);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[1][0], _values[1][1], _values[1][2], _values[1][3]), _values[1][4], f.Vector2.ZERO(), _values[1][5], f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
            /*sprite = new Sprite(ACTION.ATTACK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[2][0], _values[2][1], _values[2][2], _values[2][3]), _values[2][4], f.Vector2.ZERO(), _values[2][5], f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);*/
        }
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topleft = new f.Vector3(-0.5, 0.5, 0);
            let bottomright = new f.Vector3(0.5, -0.5, 0);
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, this.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
        defeated() {
            let tempIndex = this.index;
            if (Game.direction == "right" && this.enemies.length > 1) {
                if (this.index < (this.enemies.length - 1)) {
                    this.index++;
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[this.index][0];
                    newTranslation.y = this.enemies[this.index][1];
                    this.cmpTransform.local.translation = newTranslation;
                    this.enemies.splice(tempIndex, 1);
                    this.index--;
                }
                else {
                    this.index--;
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[this.index][0];
                    newTranslation.y = this.enemies[this.index][1];
                    this.cmpTransform.local.translation = newTranslation;
                    this.enemies.splice(tempIndex, 1);
                }
            }
            else if (Game.direction == "left" && this.enemies.length > 1) {
                if (this.index > 0) {
                    this.index--;
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[this.index][0];
                    newTranslation.y = this.enemies[this.index][1];
                    this.cmpTransform.local.translation = newTranslation;
                    this.enemies.splice(tempIndex, 1);
                }
                else {
                    this.index++;
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[this.index][0];
                    newTranslation.y = this.enemies[this.index][1];
                    this.cmpTransform.local.translation = newTranslation;
                    this.enemies.splice(tempIndex, 1);
                    this.index--;
                }
            }
            else if (this.enemies.length == 1) {
                this.enemies.splice(tempIndex, 1);
                Game.enemies.removeChild(this);
            }
        }
        moveEnemy() {
            if (Game.direction == "right") {
                if (this.index < (this.enemies.length - 1)) {
                    this.index++;
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[this.index][0];
                    newTranslation.y = this.enemies[this.index][1];
                    this.cmpTransform.local.translation = newTranslation;
                }
            }
            else if (Game.direction == "left") {
                if (this.index > 0) {
                    this.index--;
                    let newTranslation = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[this.index][0];
                    newTranslation.y = this.enemies[this.index][1];
                    this.cmpTransform.local.translation = newTranslation;
                }
            }
        }
    }
    Enemy.gravity = f.Vector2.Y(-3);
    Game.Enemy = Enemy;
})(Game || (Game = {}));
//# sourceMappingURL=Enemy.js.map