"use strict";
var Game;
(function (Game) {
    var f = FudgeCore;
    class EnemyAttack extends Game.MovingObject {
        constructor(_name, _speedMax, _id, _enemy) {
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
            this.maxSpeed.x = _speedMax[0];
            this.maxSpeed.y = _speedMax[1];
            this.soundId = _id;
            this.user = _enemy;
            let newTranslation = f.Vector3.ZERO();
            newTranslation.x = 0;
            newTranslation.y = -1;
            newTranslation.z = 0.1;
            this.cmpTransform.local.translation = newTranslation;
            for (let sprite of Game.Attack.sprites) {
                let nodeSprite = new Game.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            //let that: EnemyAttack = this;
            this.show(Game.ACTION.ATTACK);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage, _name, _values) {
            Game.Attack.sprites = [];
            let sprite = new Game.Sprite(Game.ACTION.ATTACK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[0][0], _values[0][1], _values[0][2], _values[0][3]), _values[0][4], f.Vector2.ZERO(), _values[0][5], f.ORIGIN2D.CENTER);
            Game.Attack.sprites.push(sprite);
            sprite = new Game.Sprite(Game.ACTION.HIT);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[1][0], _values[1][1], _values[1][2], _values[1][3]), _values[1][4], f.Vector2.ZERO(), _values[1][5], f.ORIGIN2D.CENTER);
            Game.Attack.sprites.push(sprite);
        }
        checkCollision() {
            let rect = Game.girl.getRectWorld();
            let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
            if (hit) {
                if (!this.exploded) {
                    Game.HP -= 10;
                    Game.healtBar.innerHTML = Game.HP + " HP";
                    Game.healtBar.style.width = Game.HP * 2 + "px";
                    if (Game.HP == 0) {
                        f.Loop.stop();
                        let gameOver = document.getElementById("gameover-screen");
                        gameOver.style.display = "block";
                    }
                    this.explode();
                }
                this.exploded = true;
            }
        }
        use() {
            let attackDirection = (Game.direction == "right" ? 1 : -1);
            let newRotation = f.Vector3.ZERO();
            newRotation.z = 205 * attackDirection;
            newRotation.y = (90 - 90 * attackDirection);
            let newTranslation = f.Vector3.ZERO();
            newTranslation.x = this.user.cmpTransform.local.translation.x;
            newTranslation.y = this.user.cmpTransform.local.translation.y;
            newTranslation.z = 0.1;
            this.cmpTransform.local.rotation = newRotation;
            this.cmpTransform.local.translation = newTranslation;
            this.speed.x = this.maxSpeed.x;
            this.speed.y = this.maxSpeed.y;
            Game.level.appendChild(this);
            let that = this;
            setTimeout(function () {
                that.explode();
                setTimeout(function () {
                    that.exploded = false;
                    that.use();
                }, 2000);
            }, 3000);
        }
        explode() {
            let audio = document.getElementById(this.soundId);
            audio.loop = false;
            audio.currentTime = 0;
            audio.play();
            this.exploded = true;
            let that = this;
            that.show(Game.ACTION.HIT);
            that.speed.x = that.maxSpeed.x / 3;
            setTimeout(function () {
                Game.level.removeChild(that);
                that.show(Game.ACTION.ATTACK);
                that.speed.x = that.maxSpeed.x;
            }, 800);
        }
    }
    Game.EnemyAttack = EnemyAttack;
})(Game || (Game = {}));
//# sourceMappingURL=EnemyAttack.js.map