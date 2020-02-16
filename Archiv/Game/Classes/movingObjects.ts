namespace Game {
    import f = FudgeCore;

    export class MovingObject extends f.Node {//speed y/gravity entfernen;

        static sprites: Sprite[];
        public speed: f.Vector3 = f.Vector3.ZERO();
        private speedMax: f.Vector2 = f.Vector2.ZERO(); // units per second

        public constructor(_name: string, _speedMax: number[] = [1.3, 5]) {
            super(_name);
            this.addComponent(new f.ComponentTransform());
            this.speedMax.x = _speedMax[0];
            this.speedMax.y = _speedMax[1];

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
                    this.speed.x = this.speedMax.x; // * direction;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    
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

    }
}