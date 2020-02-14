namespace Game {
    import f = FudgeCore;

    export class Object extends f.Node {

        private static sprite: Sprite;
        public index: number;
        private objects: number[][];
        private Z: number;

        public constructor(_name: string, _data: number[][], _index: number, _Z: number = 0) {
            super(_name);
            this.addComponent(new f.ComponentTransform());
            let nodeSprite: NodeSprite = new NodeSprite(_name, Object.sprite);
            this.appendChild(nodeSprite);

            this.objects = _data;
            this.index = _index;
            this.Z = _Z;

            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
        }

        public static generateSprites(_txtImage: f.TextureImage, _name: string, _values: number[]): void {//privat?
            let sprite: Sprite = new Sprite(_name);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(_values[0], _values[1], _values[2], _values[3]), _values[4], f.Vector2.ZERO(), _values[5], f.ORIGIN2D.BOTTOMCENTER);
            Object.sprite = sprite;
        }

        private moveObject(): void {

            if (direction == "right") {

                if (this.index < (this.objects.length - 1)) {
                    this.index++;

                    let newTranslation: f.Vector3 = f.Vector3.ZERO();
                    newTranslation.x = this.objects[this.index][0];
                    newTranslation.y = this.objects[this.index][1];
                    newTranslation.z = this.Z;

                    this.cmpTransform.local.translation = newTranslation;
                }
            } else if (direction == "left") {

                if (this.index > 0) {
                    this.index--;

                    let newTranslation: f.Vector3 = f.Vector3.ZERO();
                    newTranslation.x = this.objects[this.index][0];
                    newTranslation.y = this.objects[this.index][1];
                    newTranslation.z = this.Z;

                    this.cmpTransform.local.translation = newTranslation;
                }
            }
        }

        private update = (_event: f.Eventƒ): void => {

            let camPositionX: number = cmpCamera.pivot.translation.x;
            let test: number = this.cmpTransform.local.translation.x;

            if (direction == "right" && test <= camPositionX - 6) {
                this.moveObject();

            } else if (direction == "left" && test >= camPositionX + 6) {
                this.moveObject();

            }
            /*if (direction == "right" && test <= camPositionX - 6) {

                let transform: f.Matrix4x4 = this.cmpTransform.local;
                let index: number;

                for (let i: number = 0; i < this.objects.length; i++) {
                    console.log(this.objects, this);
                    if (this.objects[i][0] === Math.round((transform.translation.x + Number.EPSILON) * 100) / 100) {
                        index = i;
                        break;
                    }
                }

                let newTranslation: f.Vector3 = f.Vector3.ZERO();
                newTranslation.x = this.objects[(index + 1)][0];
                newTranslation.y = this.objects[(index + 1)][1];

                this.cmpTransform.local.translation = newTranslation;

            } else if (direction == "left" && test >= camPositionX + 6) {

                let transform: f.Matrix4x4 = this.cmpTransform.local;
                let index: number;

                for (let i: number = 0; i < this.objects.length; i++) {
                    if (this.objects[i][0] === Math.round((transform.translation.x + Number.EPSILON) * 100) / 100) {
                        index = i;
                        break;
                    }
                }

                let newTranslation: f.Vector3 = f.Vector3.ZERO();
                newTranslation.x = this.objects[(index - 1)][0];
                newTranslation.y = this.objects[(index - 1)][1];

                this.cmpTransform.local.translation = newTranslation;

            }*/


        }

    }

}
