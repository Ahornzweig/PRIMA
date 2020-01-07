namespace L08_FudgeCraft_Collision {
    export import f = FudgeCore;

    window.addEventListener("load", hndLoad);

    export let game: f.Node = new f.Node("FudgeCraft");
    export let grid: Grid = new Grid();
    let control: Control = new Control();

    let viewport: f.Viewport;
    let dollyCam: DollyCam = new DollyCam;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize(true);
        f.Debug.log("Canvas", canvas);

        canvas.addEventListener("click", canvas.requestPointerLock);

        let cmpLight: f.ComponentLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.lookAt(new f.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        let cmpLightAmbient: f.ComponentLight = new f.ComponentLight(new f.LightAmbient(f.Color.DARK_GREY));
        game.addComponent(cmpLightAmbient);

        game.appendChild(dollyCam);
        dollyCam.setRotationX(-20);
        dollyCam.setRotationY(20);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", game, dollyCam.cmpCamera, canvas);
        f.Debug.log("Viewport", viewport);
        viewport.draw();

        startRandomFragment();
        game.appendChild(control);

        viewport.draw();
        f.Debug.log("Game", game);
        viewport.activatePointerEvent(f.EVENT_POINTER.MOVE, true);
        viewport.activateWheelEvent(f.EVENT_WHEEL.WHEEL, true);
        viewport.addEventListener(f.EVENT_POINTER.MOVE, hndMouseMove);
        viewport.addEventListener(f.EVENT_WHEEL.WHEEL, hndWheel);
        window.addEventListener("keydown", hndKeyDown);
        //window.addEventListener("mousemove", hndMouseMove);
        //window.addEventListener("wheel", hndWheel);

        //test();
    }

    function hndKeyDown(_event: KeyboardEvent): void {
        if (_event.code == f.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }

        let transformation: Transformation = Control.transformations[_event.code];
        if (transformation)
            move(transformation);

        // ƒ.RenderManager.update();
        viewport.draw();
    }


    function hndMouseMove(_event: MouseEvent): void {
      
        dollyCam.rotateY(_event.movementX * 0.2);
        dollyCam.rotateX(_event.movementY * 0.2);
        viewport.draw();
    }

    function hndWheel(_event: WheelEvent): void {
        if (_event.deltaY < 0) {
            dollyCam.moveDistance(-1);
        } else {
            dollyCam.moveDistance(1);
        }
        viewport.draw();
    }

    function move(_transformation: Transformation): void {
        let animationSteps: number = 10;
        let fullRotation: number = 90;
        let fullTranslation: number = 1;
        let move: Transformation = {
            rotation: _transformation.rotation ? f.Vector3.SCALE(_transformation.rotation, fullRotation) : new f.Vector3(),
            translation: _transformation.translation ? f.Vector3.SCALE(_transformation.translation, fullTranslation) : new f.Vector3()
        };

        let timers: f.Timers = f.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;

        let collisions: GridElement[] = control.checkCollisions(move);
        if (collisions.length > 0)
            return;

        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);

        f.Time.game.setTimer(10, animationSteps, function (): void {
            control.move(move);
            // ƒ.RenderManager.update();
            viewport.draw();
        });
    }

    export function startRandomFragment(): void {
        let fragment: Fragment = Fragment.getRandom();
        control.cmpTransform.local = f.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
}