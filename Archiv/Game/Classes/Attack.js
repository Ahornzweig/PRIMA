"use strict";
var Game;
(function (Game) {
    var f = FudgeCore;
    class Attack extends Game.MovingObject {
        constructor(_name, _speedMax, _id) {
            super(_name);
            this.speed = f.Vector3.ZERO();
            this.maxSpeed = f.Vector3.ZERO();
            this.exploded = false;
            this.check = false;
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                if (this.check) {
                    this.checkCollision();
                }
            };
            this.speed.x = _speedMax[0];
            this.speed.y = _speedMax[1];
            this.maxSpeed.x = _speedMax[0];
            this.maxSpeed.y = _speedMax[1];
            this.soundId = _id;
            for (let sprite of Attack.sprites) {
                let nodeSprite = new Game.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show(Game.ACTION.ATTACK);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage, _name, _values) {
            Attack.sprites = [];
            let sprite = new Game.Sprite(Game.ACTION.ATTACK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[0][0], _values[0][1], _values[0][2], _values[0][3]), _values[0][4], f.Vector2.ZERO(), _values[0][5], f.ORIGIN2D.CENTER);
            Attack.sprites.push(sprite);
            sprite = new Game.Sprite(Game.ACTION.HIT);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[1][0], _values[1][1], _values[1][2], _values[1][3]), _values[1][4], f.Vector2.ZERO(), _values[1][5], f.ORIGIN2D.CENTER);
            Attack.sprites.push(sprite);
        }
        checkCollision() {
            for (let enemy of Game.enemies.getChildren()) {
                let rect = enemy.getRectWorld();
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    this.explode();
                    enemy.defeated();
                    this.exploded = true;
                    Game.enemiesDefeated++;
                    Game.defElement = document.getElementById("defeated");
                    Game.defElement.innerHTML = "Defeated: " + Game.enemiesDefeated;
                }
            }
        }
        use(_time, _id, _use, _style, _colldown) {
            let attackDirection = (Game.direction == "right" ? 1 : -1);
            let newRotation = f.Vector3.ZERO();
            newRotation.z = Game.girl.getRotation() * attackDirection;
            newRotation.y = (90 - 90 * attackDirection);
            let newTranslation = f.Vector3.ZERO();
            newTranslation.x = Game.girl.cmpTransform.local.translation.x + (0.15 * attackDirection);
            newTranslation.y = Game.girl.cmpTransform.local.translation.y + 0.32;
            newTranslation.z = 0.1;
            this.cmpTransform.local.rotation = newRotation;
            this.cmpTransform.local.translation = newTranslation;
            Game.level.appendChild(this);
            Game.useAttack[_use][1] = false;
            let that = this;
            let attack = document.getElementById(_id);
            let name = attack.innerHTML;
            attack.style.backgroundColor = _colldown;
            let timeleft = _time;
            that.check = true;
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
                    Game.useAttack[_use][1] = true;
                    that.exploded = false;
                }
            }, 1000);
        }
        explode() {
            let audio = document.getElementById(this.soundId);
            audio.loop = false;
            audio.currentTime = 0;
            audio.play();
            let that = this;
            that.show(Game.ACTION.HIT);
            that.speed.x = that.maxSpeed.x / 3;
            setTimeout(function () {
                that.check = false;
                Game.level.removeChild(that);
                that.show(Game.ACTION.ATTACK);
                that.speed.x = that.maxSpeed.x;
            }, 800);
        }
    }
    Game.Attack = Attack;
})(Game || (Game = {}));
//# sourceMappingURL=Attack.js.map