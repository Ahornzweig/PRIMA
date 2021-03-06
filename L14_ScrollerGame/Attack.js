"use strict";
var L14_ScrollerGame;
(function (L14_ScrollerGame) {
    var f = FudgeCore;
    class Attack extends L14_ScrollerGame.MovingObject {
        constructor(_name, _speedMax, _id) {
            super(_name);
            this.speed = f.Vector3.ZERO();
            this.maxSpeed = f.Vector3.ZERO();
            this.exploded = false;
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision();
            };
            this.speed.x = _speedMax[0];
            this.speed.y = _speedMax[1];
            this.maxSpeed.x = _speedMax[0];
            this.maxSpeed.y = _speedMax[1];
            this.soundId = _id;
            for (let sprite of Attack.sprites) {
                let nodeSprite = new L14_ScrollerGame.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show(L14_ScrollerGame.ACTION.ATTACK);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage, _name, _values) {
            Attack.sprites = [];
            let sprite = new L14_ScrollerGame.Sprite(L14_ScrollerGame.ACTION.ATTACK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[0][0], _values[0][1], _values[0][2], _values[0][3]), _values[0][4], f.Vector2.ZERO(), _values[0][5], f.ORIGIN2D.CENTER);
            Attack.sprites.push(sprite);
            sprite = new L14_ScrollerGame.Sprite(L14_ScrollerGame.ACTION.HIT);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[1][0], _values[1][1], _values[1][2], _values[1][3]), _values[1][4], f.Vector2.ZERO(), _values[1][5], f.ORIGIN2D.CENTER);
            Attack.sprites.push(sprite);
        }
        /*public getRectWorld(): f.Rectangle {
            let rect: f.Rectangle = f.Rectangle.GET(0, 0, 100, 100);
            let topleft: f.Vector3 = new f.Vector3(-0.5, 0.5, 0);
            let bottomright: f.Vector3 = new f.Vector3(0.5, -0.5, 0);

            let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, this.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);

            let size: f.Vector2 = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;

            return rect;
        }*/
        checkCollision() {
            for (let enemy of L14_ScrollerGame.enemies.getChildren()) {
                let rect = enemy.getRectWorld();
                //console.log(rect.toString());
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    this.explode();
                    enemy.defeated();
                    this.exploded = true;
                }
            }
        }
        use(_time, _id, _use, _style, _colldown) {
            let attackDirection = (L14_ScrollerGame.direction == "right" ? 1 : -1);
            let newRotation = f.Vector3.ZERO();
            newRotation.z = L14_ScrollerGame.girl.getRotation() * attackDirection;
            newRotation.y = (90 - 90 * attackDirection);
            let newTranslation = f.Vector3.ZERO();
            newTranslation.x = L14_ScrollerGame.girl.cmpTransform.local.translation.x + (0.15 * attackDirection);
            newTranslation.y = L14_ScrollerGame.girl.cmpTransform.local.translation.y + 0.32;
            newTranslation.z = 0.1;
            this.cmpTransform.local.rotation = newRotation;
            this.cmpTransform.local.translation = newTranslation;
            L14_ScrollerGame.level.appendChild(this);
            L14_ScrollerGame.useAttack[_use][1] = false;
            let that = this;
            let attack = document.getElementById(_id);
            let name = attack.innerHTML;
            attack.style.backgroundColor = _colldown;
            let timeleft = _time;
            let downloadTimer = setInterval(function () {
                timeleft--;
                attack.innerHTML = timeleft + "";
                if (timeleft <= _time / 2) {
                    if (!that.exploded) {
                        that.explode();
                        that.exploded = true;
                    }
                }
                if (timeleft <= 0) {
                    clearInterval(downloadTimer);
                    attack.style.backgroundColor = _style;
                    attack.innerHTML = name;
                    L14_ScrollerGame.useAttack[_use][1] = true;
                    that.exploded = false;
                }
            }, 1000);
        }
        explode() {
            let audio = document.getElementById(this.soundId);
            audio.play();
            let that = this;
            that.show(L14_ScrollerGame.ACTION.HIT);
            that.speed.x = that.maxSpeed.x / 3;
            setTimeout(function () {
                L14_ScrollerGame.level.removeChild(that);
                that.show(L14_ScrollerGame.ACTION.ATTACK);
                that.speed.x = that.maxSpeed.x;
                audio.pause();
                audio.currentTime = 0;
            }, 800);
        }
    }
    L14_ScrollerGame.Attack = Attack;
})(L14_ScrollerGame || (L14_ScrollerGame = {}));
//# sourceMappingURL=Attack.js.map