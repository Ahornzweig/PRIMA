namespace Game {
    import f = FudgeCore;


    export class EnemyAttack extends MovingObject {

        public speed: f.Vector3 = f.Vector3.ZERO();
        private user: Enemy;
        private maxSpeed: f.Vector3 = f.Vector3.ZERO();
        private soundId: string;
        private exploded: boolean = false;

        constructor(_name: string, _speedMax: number[], _id: string, _enemy: Enemy) {
            super(_name);

            this.maxSpeed.x = _speedMax[0];
            this.maxSpeed.y = _speedMax[1];
            this.soundId = _id;
            this.user = _enemy;

            let newTranslation: f.Vector3 = f.Vector3.ZERO();
            newTranslation.x = 0;
            newTranslation.y = -1;
            newTranslation.z = 0.1;

            this.cmpTransform.local.translation = newTranslation;

            for (let sprite of Attack.sprites) {

                let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);

                nodeSprite.addEventListener(
                    "showNext",
                    (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
                    true
                );
                this.appendChild(nodeSprite);
            }

            //let that: EnemyAttack = this;

            this.show(ACTION.ATTACK);
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
            /*setTimeout(function (): void {
                that.use(5);
            }, 20000);*/
        }


        public static generateSprites(_txtImage: f.TextureImage, _name: string, _values: number[][]): void {
            Attack.sprites = [];
            let sprite: Sprite = new Sprite(ACTION.ATTACK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[0][0], _values[0][1], _values[0][2], _values[0][3]), _values[0][4], f.Vector2.ZERO(), _values[0][5], f.ORIGIN2D.CENTER);
            Attack.sprites.push(sprite);

            sprite = new Sprite(ACTION.HIT);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[1][0], _values[1][1], _values[1][2], _values[1][3]), _values[1][4], f.Vector2.ZERO(), _values[1][5], f.ORIGIN2D.CENTER);
            Attack.sprites.push(sprite);
        }

        checkCollision(): void {

            let rect: f.Rectangle = (<Girl>girl).getRectWorld();
            let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());

            if (hit) {
                if (!this.exploded) {
                    HP -= 10;
                    HealtBar.innerHTML = HP + " HP";
                    HealtBar.style.width = HP * 2 + "px";
                    if (HP == 0) {
                        f.Loop.stop();

                        let gameOver: HTMLDivElement = <HTMLDivElement>document.getElementById("gameover-screen");
                        gameOver.style.display = "block";
                        let gameInterface: HTMLDivElement = <HTMLDivElement>document.getElementById("game-interface");
                        let canvas: HTMLCanvasElement = document.querySelector("canvas");
                        gameInterface.style.display = "none";
                        canvas.style.display = "none";
                    }
                }
                this.exploded = true;
                this.explode();
            }

        }

        public use(_time: number): void {
            let attackDirection: number = (direction == "right" ? 1 : -1);

            let newRotation: f.Vector3 = f.Vector3.ZERO();
            newRotation.z = 225 * attackDirection;
            newRotation.y = (90 - 90 * attackDirection);

            let newTranslation: f.Vector3 = f.Vector3.ZERO();
            newTranslation.x = this.user.cmpTransform.local.translation.x;
            newTranslation.y = this.user.cmpTransform.local.translation.y;
            newTranslation.z = 0.1;

            this.cmpTransform.local.rotation = newRotation;
            this.cmpTransform.local.translation = newTranslation;

            this.speed.x = this.maxSpeed.x;
            this.speed.y = this.maxSpeed.y;

            level.appendChild(this);
            let that: EnemyAttack = this;
            setTimeout(function (): void {
                that.explode();
                setTimeout(function (): void {
                    that.exploded = false;
                    that.use(_time);
                }, 3000);
            }, 3000);
        }

        private explode(): void {
            let audio: HTMLAudioElement = <HTMLAudioElement>document.getElementById(this.soundId);
            audio.play();
            this.exploded = true;
            let that: EnemyAttack = this;
            that.show(ACTION.HIT);
            that.speed.x = that.maxSpeed.x / 3;
            setTimeout(function (): void {
                level.removeChild(that);
                that.show(ACTION.ATTACK);
                that.speed.x = that.maxSpeed.x;
                audio.pause();
                audio.currentTime = 0;
            }, 800);
        }

        private update = (_event: f.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));

            let timeFrame: number = f.Loop.timeFrameGame / 1000;
            let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);

            this.checkCollision();
        }



    }
}
