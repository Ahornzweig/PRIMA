namespace L08_FudgeCraft_Collision {
    import f = FudgeCore;

    export class DollyCam extends f.Node {
        maxRotX: number;
        minDis: number = 1;
        maxDis: number = 50;

        constructor(_maxRotX: number = 75) {
            super("DollyCam");
            this.maxRotX = Math.min(_maxRotX, 89);
            console.log(this.maxRotX);
            this.addComponent(new f.ComponentTransform());

            let rotX: f.Node = new f.Node("rotX");
            rotX.addComponent(new f.ComponentTransform());
            this.appendChild(rotX);

            let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
            rotX.addComponent(cmpCamera);
            cmpCamera.backgroundColor = f.Color.WHITE;
            this.setDistance(20);

        }

        get rotatorX(): f.Node {
            return this.getChildrenByName("rotX")[0];
        }

        get cmpCamera(): f.ComponentCamera {
            return this.rotatorX.getComponent(f.ComponentCamera);

        }

        rotateY(_delta: number): void {
            this.cmpTransform.local.rotateY(_delta);
        }

        setRotationY(_angl: number): void {
            this.cmpTransform.local.rotation = f.Vector3.Y(_angl);
        }

        setRotationX(_angl: number): void {
            _angl = Math.min(Math.max(-this.maxRotX, _angl), this.maxRotX);
            this.rotatorX.cmpTransform.local.rotation = f.Vector3.X(_angl);
        }

        rotateX(_delta: number): void {
            let angle: number = this.rotatorX.cmpTransform.local.rotation.x + _delta;
            this.setRotationX(angle);
        }

        setDistance(_distance: number): void {
            let newDistance: number = Math.max(this.minDis, _distance);
            this.cmpCamera.pivot.translation = f.Vector3.Z(newDistance);

        }

        moveDistance(_delta: number): void {
            let distance: number = this.cmpCamera.pivot.translation.z + _delta;
            this.setDistance(distance);
        }



    }


}