"use strict";
var Game;
(function (Game) {
    var f = FudgeCore;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
        ACTION["HIT"] = "Hit";
        ACTION["ATTACK"] = "Attack";
        ACTION["W_ARM"] = "WandArm";
    })(ACTION = Game.ACTION || (Game.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = Game.DIRECTION || (Game.DIRECTION = {}));
    class Girl extends Game.MovingObject {
        constructor(_name) {
            super(_name);
            this.speed = f.Vector3.ZERO();
            this.maxRotation = 50;
            this.mesh = new f.MeshSprite();
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                this.speed.y += Girl.gravity.y; //* timeFrame;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision();
            };
            Girl.armNode = new f.Node("Arm");
            Girl.armNode.addComponent(new f.ComponentTransform());
            Girl.armNode.appendChild(Girl.arm);
            Girl.armNode.cmpTransform.local.translateX(0.15);
            Girl.armNode.cmpTransform.local.translateY(0.42);
            this.appendChild(Girl.armNode);
            this.pivot = f.Matrix4x4.TRANSLATION(f.Vector3.Y(0.5));
            let cmpMesh = new f.ComponentMesh(this.mesh);
            cmpMesh.pivot = this.pivot;
            this.addComponent(cmpMesh);
            for (let sprite of Girl.sprites) {
                let nodeSprite = new Game.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show(ACTION.IDLE);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage, _values) {
            Girl.sprites = [];
            let sprite = new Game.Sprite(ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[0][0], _values[0][1], _values[0][2], _values[0][3]), _values[0][4], f.Vector2.ZERO(), _values[0][5], f.ORIGIN2D.BOTTOMCENTER);
            Girl.sprites.push(sprite);
            sprite = new Game.Sprite(ACTION.IDLE);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[1][0], _values[1][1], _values[1][2], _values[1][3]), _values[1][4], f.Vector2.ZERO(), _values[1][5], f.ORIGIN2D.BOTTOMCENTER);
            Girl.sprites.push(sprite);
            sprite = new Game.Sprite(ACTION.W_ARM);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[2][0], _values[2][1], _values[2][2], _values[2][3]), _values[2][4], f.Vector2.ZERO(), _values[2][5], f.ORIGIN2D.TOPLEFT);
            Girl.arm = new Game.NodeSprite(sprite.name, sprite);
        }
        checkCollision() {
            for (let floor of Game.tiles.getChildren()) {
                let rect = floor.getRectWorld();
                //console.log(rect.toString());
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                //console.log(hit);
                if (hit) {
                    let translation = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
            }
        }
        setRotationZ(_angle) {
            _angle = Math.min(Math.max(-this.maxRotation, _angle), this.maxRotation);
            Girl.armNode.cmpTransform.local.rotation = f.Vector3.Z(_angle);
        }
        rotateZ(_delta) {
            let angle = Girl.armNode.cmpTransform.local.rotation.z + _delta;
            this.setRotationZ(angle);
        }
        getRotation() {
            let angle = Girl.armNode.cmpTransform.local.rotation.z;
            return angle;
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
    }
    Girl.gravity = f.Vector2.Y(-.3);
    Game.Girl = Girl;
})(Game || (Game = {}));
//# sourceMappingURL=Girl.js.map