"use strict";
var Game;
(function (Game) {
    var f = FudgeCore;
    /* export enum ACTION {
         IDLE = "Idle",
         WALK = "Walk",
         JUMP = "Jump",
         HIT = "Hit"
     }
 
     export enum DIRECTION {
         LEFT, RIGHT
     }*/
    class MovingObject extends f.Node {
        constructor(_name, _speedMax = [1.3, 5]) {
            super(_name);
            this.speed = f.Vector3.ZERO();
            this.speedMax = new f.Vector2(1.3, 5); // units per second
            this.addComponent(new f.ComponentTransform());
            this.speedMax.x = _speedMax[0];
            this.speedMax.y = _speedMax[1];
        }
        show(_action) {
            if (_action == Game.ACTION.JUMP)
                return;
            for (let child of this.getChildren()) {
                child.activate(child.name == _action);
            }
            // this.action = _action;
        }
        act(_action, _direction) {
            switch (_action) {
                case Game.ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case Game.ACTION.WALK:
                    let direction = (_direction == Game.DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = this.speedMax.x; // * direction;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    // console.log(direction);
                    break;
                case Game.ACTION.JUMP:
                    this.speed.y = 3;
                    break;
                case Game.ACTION.HIT:
                    this.speed.x = 0;
                    break;
            }
            this.show(_action);
        }
    }
    Game.MovingObject = MovingObject;
})(Game || (Game = {}));
//# sourceMappingURL=movingObjects.js.map