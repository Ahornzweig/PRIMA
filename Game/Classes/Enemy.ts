namespace Game {
    import f = FudgeCore;
    /* export enum ACTION {
         IDLE = "Idle",
         WALK = "Walk",
         JUMP = "Jump",
         HIT = "Hit"
     }
 
     export enum DIRECTION {
         LEFT, RIGHT
     }*/

    export class Enemy extends MovingObject {
        static gravity: f.Vector2 = f.Vector2.Y(-3);

        public attack: EnemyAttack;
        public enemies: number[][];
        public index: number;
        private mesh: f.MeshSprite = new f.MeshSprite();
        private pivot: f.Matrix4x4;

        public constructor(_name: string, _data: number[][], _pivot: number, _index: number, _speed: number[]) {
            super(_name, _speed);
            this.pivot = f.Matrix4x4.TRANSLATION(f.Vector3.Y(_pivot));
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(this.mesh);
            cmpMesh.pivot = this.pivot;
            this.addComponent(cmpMesh);
            this.enemies = _data;
            this.index = _index;

            this.attack = new EnemyAttack("energyBall", [1.4, 0], "boom", this);

            for (let sprite of Enemy.sprites) {

                let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);

                nodeSprite.addEventListener(
                    "showNext",
                    (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
                    true
                );
                this.appendChild(nodeSprite);
            }
            this.show(ACTION.IDLE);
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);


        }

        public static generateSprites(_txtImage: f.TextureImage, _name: string, _values: number[][]): void {
            Enemy.sprites = [];
            let sprite: Sprite = new Sprite(ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[0][0], _values[0][1], _values[0][2], _values[0][3]), _values[0][4], f.Vector2.ZERO(), _values[0][5], f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);

            sprite = new Sprite(ACTION.IDLE);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[1][0], _values[1][1], _values[1][2], _values[1][3]), _values[1][4], f.Vector2.ZERO(), _values[1][5], f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);

            /*sprite = new Sprite(ACTION.ATTACK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[2][0], _values[2][1], _values[2][2], _values[2][3]), _values[2][4], f.Vector2.ZERO(), _values[2][5], f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);*/
        }

        public getRectWorld(): f.Rectangle {
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
        }

        public defeated(): void {
            let tempIndex: number = this.index;

            if (direction == "right" && this.enemies.length > 1) {
                if (this.index < (this.enemies.length - 1)) {
                    this.index++;

                    let newTranslation: f.Vector3 = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[this.index][0];
                    newTranslation.y = this.enemies[this.index][1];

                    this.cmpTransform.local.translation = newTranslation;

                    this.enemies.splice(tempIndex, 1);
                    this.index--;
                } else {
                    this.index--;

                    let newTranslation: f.Vector3 = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[this.index][0];
                    newTranslation.y = this.enemies[this.index][1];

                    this.cmpTransform.local.translation = newTranslation;

                    this.enemies.splice(tempIndex, 1);
                }
            } else if (direction == "left" && this.enemies.length > 1) {

                if (this.index > 0) {
                    this.index--;

                    let newTranslation: f.Vector3 = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[this.index][0];
                    newTranslation.y = this.enemies[this.index][1];

                    this.cmpTransform.local.translation = newTranslation;

                    this.enemies.splice(tempIndex, 1);
                } else {
                    this.index++;

                    let newTranslation: f.Vector3 = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[this.index][0];
                    newTranslation.y = this.enemies[this.index][1];

                    this.cmpTransform.local.translation = newTranslation;

                    this.enemies.splice(tempIndex, 1);
                    this.index--;
                }
            } else if (this.enemies.length == 1) {
               
                let newTranslation: f.Vector3 = f.Vector3.ZERO();
                newTranslation.x = -5;
                newTranslation.y = -3;
                this.cmpTransform.local.translation = newTranslation;

                this.enemies.splice(tempIndex, 1);
                //enemies.removeChild(this);
            }
            console.log(this.enemies);
        }

        private moveEnemy(): void {

            if (direction == "right") {
                if (this.index < (this.enemies.length - 1)) {
                    this.index++;

                    let newTranslation: f.Vector3 = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[this.index][0];
                    newTranslation.y = this.enemies[this.index][1];

                    this.cmpTransform.local.translation = newTranslation;
                }
            } else if (direction == "left") {

                if (this.index > 0) {
                    this.index--;

                    let newTranslation: f.Vector3 = f.Vector3.ZERO();
                    newTranslation.x = this.enemies[this.index][0];
                    newTranslation.y = this.enemies[this.index][1];

                    this.cmpTransform.local.translation = newTranslation;
                }
            }
        }

        private update = (_event: f.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));

            let timeFrame: number = f.Loop.timeFrameGame / 1000;
            let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);

            let camPositionX: number = cmpCamera.pivot.translation.x;
            let test: number = this.cmpTransform.local.translation.x;

            if (direction == "right" && test <= camPositionX - 4) {
                this.moveEnemy();

            } else if (direction == "left" && test >= camPositionX + 4) {
                this.moveEnemy();

            }
        }
    }
}