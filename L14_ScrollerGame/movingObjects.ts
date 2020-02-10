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

    export class MovingObject extends f.Node {//speed y/gravity entfernen;

        static sprites: Sprite[];
        static speedMax: f.Vector2 = new f.Vector2(1.3, 5); // units per second

        public speed: f.Vector3 = f.Vector3.ZERO();

        public constructor(_name: string) {
            super(_name);
            this.addComponent(new f.ComponentTransform());

        }

        public show(_action: ACTION): void {
            if (_action == ACTION.JUMP)
                return;
            for (let child of this.getChildren()) {

                child.activate(child.name == _action);
            }
            // this.action = _action;
        }

        public act(_action: ACTION, _direction?: DIRECTION): void {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = MovingObject.speedMax.x; // * direction;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    // console.log(direction);
                    break;
                case ACTION.JUMP:
                    this.speed.y = 3;
                    break;
                case ACTION.HIT:
                    this.speed.x = 0;
                    break;
            }
            this.show(_action);
        }

        /*checkCollision(): void {
            for (let floor of checkColision.getChildren()) {
                let rect: f.Rectangle = (<Floor>floor).getRectWorld();
                //console.log(rect.toString());
                let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    let translation: f.Vector3 = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
            }
        }

        private update = (_event: f.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));

            let timeFrame: number = f.Loop.timeFrameGame / 1000;
            let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);

            //this.checkCollision();
        }*/

    }
}