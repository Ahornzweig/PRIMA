
namespace Game {
    import f = FudgeCore;

    export enum ACTION {
        IDLE = "Idle",
        WALK = "Walk",
        JUMP = "Jump",
        HIT = "Hit",
        ATTACK = "Attack",
        W_ARM = "WandArm"
    }

    export enum DIRECTION {
        LEFT, RIGHT
    }
    export class Girl extends MovingObject {

        static gravity: f.Vector2 = f.Vector2.Y(-.3);
        static armNode: f.Node;
        private static arm: NodeSprite;
        public speed: f.Vector3 = f.Vector3.ZERO();
        private maxRotation: number = 50;
        private mesh: f.MeshSprite = new f.MeshSprite();
        private pivot: f.Matrix4x4;

        public constructor(_name: string) {
            super(_name);

            Girl.armNode = new f.Node("Arm");
            Girl.armNode.addComponent(new f.ComponentTransform());
            Girl.armNode.appendChild(Girl.arm);
            Girl.armNode.cmpTransform.local.translateX(0.15);
            Girl.armNode.cmpTransform.local.translateY(0.42);
            this.appendChild(Girl.armNode);

            this.pivot = f.Matrix4x4.TRANSLATION(f.Vector3.Y(0.5));
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(this.mesh);
            cmpMesh.pivot = this.pivot;
            this.addComponent(cmpMesh);

            for (let sprite of Girl.sprites) {

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

        public static generateSprites(_txtImage: f.TextureImage, _values: number[][]): void {
            Girl.sprites = [];
            let sprite: Sprite = new Sprite(ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[0][0], _values[0][1], _values[0][2], _values[0][3]), _values[0][4], f.Vector2.ZERO(), _values[0][5], f.ORIGIN2D.BOTTOMCENTER);
            Girl.sprites.push(sprite);

            sprite = new Sprite(ACTION.IDLE);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[1][0], _values[1][1], _values[1][2], _values[1][3]), _values[1][4], f.Vector2.ZERO(), _values[1][5], f.ORIGIN2D.BOTTOMCENTER);
            Girl.sprites.push(sprite);

            sprite = new Sprite(ACTION.W_ARM);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[2][0], _values[2][1], _values[2][2], _values[2][3]), _values[2][4], f.Vector2.ZERO(), _values[2][5], f.ORIGIN2D.TOPLEFT);
            Girl.arm = new NodeSprite(sprite.name, sprite);
        }

        checkCollision(): void {
            for (let floor of tiles.getChildren()) {
                let rect: f.Rectangle = (<Floor>floor).getRectWorld();
               
                let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
                
                if (hit) {
                    let translation: f.Vector3 = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
            }
        }

        public setRotationZ(_angle: number): void {
            _angle = Math.min(Math.max(-this.maxRotation, _angle), this.maxRotation);
            Girl.armNode.cmpTransform.local.rotation = f.Vector3.Z(_angle);
        }

        public rotateZ(_delta: number): void {
            let angle: number = Girl.armNode.cmpTransform.local.rotation.z + _delta;
            this.setRotationZ(angle);
        }

        public getRotation(): number {
            let angle: number = Girl.armNode.cmpTransform.local.rotation.z;
            return angle;
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

        private update = (_event: f.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));

            let timeFrame: number = f.Loop.timeFrameGame / 1000;
            this.speed.y += Girl.gravity.y; //* timeFrame;
            let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);

            this.checkCollision();
        }
    }
}