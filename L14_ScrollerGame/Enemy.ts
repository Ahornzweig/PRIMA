namespace L14_ScrollerGame {
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
        private static mesh: f.MeshSprite = new f.MeshSprite();
        private static readonly pivot: f.Matrix4x4 = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));

        private enemies: number[][];

        public constructor(_name: string, _data: number[][]) {
            super(_name);
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Enemy.mesh);
            cmpMesh.pivot = Enemy.pivot;
            this.addComponent(cmpMesh);
            this.enemies = _data;
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

            sprite = new Sprite(ACTION.ATTACK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[2][0], _values[2][1], _values[2][2], _values[2][3]), _values[2][4], f.Vector2.ZERO(), _values[2][5], f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
        }

        public getRectWorld(): f.Rectangle {
            let rect: f.Rectangle = f.Rectangle.GET(0, 0, 100, 100);
            let topleft: f.Vector3 = new f.Vector3(-0.5, 0.5, 0);
            let bottomright: f.Vector3 = new f.Vector3(0.5, -0.5, 0);

            let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Enemy.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);

            let size: f.Vector2 = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;

            return rect;
        }

        private update = (_event: f.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));

            let timeFrame: number = f.Loop.timeFrameGame / 1000;
            let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);

            let camPositionX: number = cmpCamera.pivot.translation.x;
            let test: number = this.cmpTransform.local.translation.x;

            if (direction == "right" && test <= camPositionX - 6) {

                let transform: f.Matrix4x4 = this.cmpTransform.local;
                let index: number;

                for (let i: number = 0; i < this.enemies.length; i++) {
                    
                    if (this.enemies[i][0] === Math.round((transform.translation.x + Number.EPSILON) * 100) / 100) {
                        index = i;
                        break;
                    }
                }

                let newTranslation: f.Vector3 = f.Vector3.ZERO();
                newTranslation.x = this.enemies[(index + 1)][0];
                newTranslation.y = this.enemies[(index + 1)][1];

                this.cmpTransform.local.translation = newTranslation;

            } else if (direction == "left" && test >= camPositionX + 6) {

                let transform: f.Matrix4x4 = this.cmpTransform.local;
                let index: number;

                for (let i: number = 0; i < this.enemies.length; i++) {
                    if (this.enemies[i][0] ===  Math.round((transform.translation.x + Number.EPSILON) * 100) / 100) {
                        index = i;
                        break;
                    }
                }

                let newTranslation: f.Vector3 = f.Vector3.ZERO();
                newTranslation.x = this.enemies[(index - 1)][0];
                newTranslation.y = this.enemies[(index - 1)][1];

                this.cmpTransform.local.translation = newTranslation;

            }
        }
    }
}