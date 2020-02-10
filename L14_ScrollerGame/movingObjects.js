"use strict";
var L14_ScrollerGame;
(function (L14_ScrollerGame) {
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
        constructor(_name) {
            super(_name);
            this.speed = f.Vector3.ZERO();
            this.addComponent(new f.ComponentTransform());
        }
        show(_action) {
            if (_action == L14_ScrollerGame.ACTION.JUMP)
                return;
            for (let child of this.getChildren()) {
                child.activate(child.name == _action);
            }
            // this.action = _action;
        }
        act(_action, _direction) {
            switch (_action) {
                case L14_ScrollerGame.ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case L14_ScrollerGame.ACTION.WALK:
                    let direction = (_direction == L14_ScrollerGame.DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = MovingObject.speedMax.x; // * direction;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    // console.log(direction);
                    break;
                case L14_ScrollerGame.ACTION.JUMP:
                    this.speed.y = 3;
                    break;
                case L14_ScrollerGame.ACTION.HIT:
                    this.speed.x = 0;
                    break;
            }
            this.show(_action);
        }
    }
    MovingObject.speedMax = new f.Vector2(1.3, 5); // units per second
    L14_ScrollerGame.MovingObject = MovingObject;
})(L14_ScrollerGame || (L14_ScrollerGame = {}));
//# sourceMappingURL=movingObjects.js.map