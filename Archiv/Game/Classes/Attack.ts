namespace Game {
    import f = FudgeCore;


    export class Attack extends MovingObject {

        public speed: f.Vector3 = f.Vector3.ZERO();
        public maxSpeed: f.Vector3 = f.Vector3.ZERO();
        public soundId: string;
        private exploded: boolean = false;
        private check: boolean = false;

        constructor(_name: string, _speedMax: number[], _id: string) {
            super(_name);
            this.speed.x = _speedMax[0];
            this.speed.y = _speedMax[1];
            this.maxSpeed.x = _speedMax[0];
            this.maxSpeed.y = _speedMax[1];
            this.soundId = _id;

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
            this.show(ACTION.ATTACK);
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
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
            for (let enemy of enemies.getChildren()) {
                let rect: f.Rectangle = (<Enemy>enemy).getRectWorld();

                let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
              
                if (hit) {
                    this.explode();
                    (<Enemy>enemy).defeated();
                    this.exploded = true;
                    enemiesDefeated++;

                    defElement = <HTMLHeadingElement>document.getElementById("defeated");
                    defElement.innerHTML = "Defeated: " + enemiesDefeated;
                }
            }
        }

        public use(_time: number, _id: string, _use: number, _style: string, _colldown: string): void {
            let attackDirection: number = (direction == "right" ? 1 : -1);

            let newRotation: f.Vector3 = f.Vector3.ZERO();
            newRotation.z = girl.getRotation() * attackDirection;
            newRotation.y = (90 - 90 * attackDirection);

            let newTranslation: f.Vector3 = f.Vector3.ZERO();
            newTranslation.x = girl.cmpTransform.local.translation.x + (0.15 * attackDirection);
            newTranslation.y = girl.cmpTransform.local.translation.y + 0.32;
            newTranslation.z = 0.1;

            this.cmpTransform.local.rotation = newRotation;
            this.cmpTransform.local.translation = newTranslation;

            level.appendChild(this);
            useAttack[_use][1] = false;

            let that: Attack = this;
            let attack: HTMLDivElement = <HTMLDivElement>document.getElementById(_id);
            let name: string = attack.innerHTML;
            attack.style.backgroundColor = _colldown;

            let timeleft: number = _time;

            that.check = true;
            let downloadTimer = setInterval(function (): void {

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
                    useAttack[_use][1] = true;
                    that.exploded = false;
                }


            }, 1000);
        }

        private update = (_event: f.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));

            let timeFrame: number = f.Loop.timeFrameGame / 1000;
            let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);
            if (this.check) {
                this.checkCollision();
            }
        }

        private explode(): void {
            let audio: HTMLAudioElement = <HTMLAudioElement>document.getElementById(this.soundId);
            audio.loop = false;
            audio.currentTime = 0;
            audio.play();

            let that: Attack = this;
            that.show(ACTION.HIT);
            that.speed.x = that.maxSpeed.x / 3;
            setTimeout(function (): void {
                that.check = false;
                level.removeChild(that);
                that.show(ACTION.ATTACK);
                that.speed.x = that.maxSpeed.x;
                
               
            }, 800);
        }

    }
}
