"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    L08_FudgeCraft_Collision.f = FudgeCore;
    window.addEventListener("load", hndLoad);
    L08_FudgeCraft_Collision.game = new L08_FudgeCraft_Collision.f.Node("FudgeCraft");
    L08_FudgeCraft_Collision.grid = new L08_FudgeCraft_Collision.Grid();
    let control = new L08_FudgeCraft_Collision.Control();
    let viewport;
    let dollyCam = new L08_FudgeCraft_Collision.DollyCam;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L08_FudgeCraft_Collision.f.RenderManager.initialize(true);
        L08_FudgeCraft_Collision.f.Debug.log("Canvas", canvas);
        canvas.addEventListener("click", canvas.requestPointerLock);
        let cmpLight = new L08_FudgeCraft_Collision.f.ComponentLight(new L08_FudgeCraft_Collision.f.LightDirectional(L08_FudgeCraft_Collision.f.Color.WHITE));
        cmpLight.pivot.lookAt(new L08_FudgeCraft_Collision.f.Vector3(0.5, 1, 0.8));
        L08_FudgeCraft_Collision.game.addComponent(cmpLight);
        let cmpLightAmbient = new L08_FudgeCraft_Collision.f.ComponentLight(new L08_FudgeCraft_Collision.f.LightAmbient(L08_FudgeCraft_Collision.f.Color.DARK_GREY));
        L08_FudgeCraft_Collision.game.addComponent(cmpLightAmbient);
        L08_FudgeCraft_Collision.game.appendChild(dollyCam);
        dollyCam.setRotationX(-20);
        dollyCam.setRotationY(20);
        viewport = new L08_FudgeCraft_Collision.f.Viewport();
        viewport.initialize("Viewport", L08_FudgeCraft_Collision.game, dollyCam.cmpCamera, canvas);
        L08_FudgeCraft_Collision.f.Debug.log("Viewport", viewport);
        viewport.draw();
        startRandomFragment();
        L08_FudgeCraft_Collision.game.appendChild(control);
        viewport.draw();
        L08_FudgeCraft_Collision.f.Debug.log("Game", L08_FudgeCraft_Collision.game);
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        viewport.activateWheelEvent("\u0192wheel" /* WHEEL */, true);
        viewport.addEventListener("\u0192pointermove" /* MOVE */, hndMouseMove);
        viewport.addEventListener("\u0192wheel" /* WHEEL */, hndWheel);
        window.addEventListener("keydown", hndKeyDown);
        //window.addEventListener("mousemove", hndMouseMove);
        //window.addEventListener("wheel", hndWheel);
        //test();
    }
    function hndKeyDown(_event) {
        if (_event.code == L08_FudgeCraft_Collision.f.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }
        let transformation = L08_FudgeCraft_Collision.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        // ƒ.RenderManager.update();
        viewport.draw();
    }
    function hndMouseMove(_event) {
        dollyCam.rotateY(_event.movementX * 0.2);
        dollyCam.rotateX(_event.movementY * 0.2);
        viewport.draw();
    }
    function hndWheel(_event) {
        if (_event.deltaY < 0) {
            dollyCam.moveDistance(-1);
        }
        else {
            dollyCam.moveDistance(1);
        }
        viewport.draw();
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? L08_FudgeCraft_Collision.f.Vector3.SCALE(_transformation.rotation, fullRotation) : new L08_FudgeCraft_Collision.f.Vector3(),
            translation: _transformation.translation ? L08_FudgeCraft_Collision.f.Vector3.SCALE(_transformation.translation, fullTranslation) : new L08_FudgeCraft_Collision.f.Vector3()
        };
        let timers = L08_FudgeCraft_Collision.f.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        let collisions = control.checkCollisions(move);
        if (collisions.length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        L08_FudgeCraft_Collision.f.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            // ƒ.RenderManager.update();
            viewport.draw();
        });
    }
    function startRandomFragment() {
        let fragment = L08_FudgeCraft_Collision.Fragment.getRandom();
        control.cmpTransform.local = L08_FudgeCraft_Collision.f.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    L08_FudgeCraft_Collision.startRandomFragment = startRandomFragment;
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Main.js.map