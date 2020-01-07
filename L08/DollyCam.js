"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    var f = FudgeCore;
    class DollyCam extends f.Node {
        constructor(_maxRotX = 75) {
            super("DollyCam");
            this.minDis = 1;
            this.maxDis = 50;
            this.maxRotX = Math.min(_maxRotX, 89);
            console.log(this.maxRotX);
            this.addComponent(new f.ComponentTransform());
            let rotX = new f.Node("rotX");
            rotX.addComponent(new f.ComponentTransform());
            this.appendChild(rotX);
            let cmpCamera = new f.ComponentCamera();
            rotX.addComponent(cmpCamera);
            cmpCamera.backgroundColor = f.Color.WHITE;
            this.setDistance(20);
        }
        get rotatorX() {
            return this.getChildrenByName("rotX")[0];
        }
        get cmpCamera() {
            return this.rotatorX.getComponent(f.ComponentCamera);
        }
        rotateY(_delta) {
            this.cmpTransform.local.rotateY(_delta);
        }
        setRotationY(_angl) {
            this.cmpTransform.local.rotation = f.Vector3.Y(_angl);
        }
        setRotationX(_angl) {
            _angl = Math.min(Math.max(-this.maxRotX, _angl), this.maxRotX);
            this.rotatorX.cmpTransform.local.rotation = f.Vector3.X(_angl);
        }
        rotateX(_delta) {
            let angle = this.rotatorX.cmpTransform.local.rotation.x + _delta;
            this.setRotationX(angle);
        }
        setDistance(_distance) {
            let newDistance = Math.max(this.minDis, _distance);
            this.cmpCamera.pivot.translation = f.Vector3.Z(newDistance);
        }
        moveDistance(_delta) {
            let distance = this.cmpCamera.pivot.translation.z + _delta;
            this.setDistance(distance);
        }
    }
    L08_FudgeCraft_Collision.DollyCam = DollyCam;
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=DollyCam.js.map