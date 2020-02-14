namespace Game {
  import f = FudgeCore;
  export class Floor extends f.Node {

    private static mesh: f.MeshSprite = new f.MeshSprite();
    private static material: f.Material = new f.Material("Floor", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("green", 0.5)));
    private static readonly pivot: f.Matrix4x4 = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));

    public index: number;

    private floors: number[][];

    public constructor(_data: number[][], _index: number) {
      super("Floor");

      this.addComponent(new f.ComponentTransform());
      this.addComponent(new f.ComponentMaterial(Floor.material));
      let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Floor.mesh);
      cmpMesh.pivot = Floor.pivot;
      this.addComponent(cmpMesh);

      this.index = _index;
      this.floors = _data;
      f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
    }

    public getRectWorld(): f.Rectangle {
      let rect: f.Rectangle = f.Rectangle.GET(0, 0, 100, 100);
      let topleft: f.Vector3 = new f.Vector3(-0.5, 0.5, 0);
      let bottomright: f.Vector3 = new f.Vector3(0.5, -0.5, 0);

      let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: f.Vector2 = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
      rect.position = topleft.toVector2();
      rect.size = size;

      return rect;
    }

    private moveFloor(): void {

      if (direction == "right") {
        if (this.index < (this.floors.length - 4)) {
          this.index += 3;

          let newTranslation: f.Vector3 = f.Vector3.ZERO();
          newTranslation.x = this.floors[this.index][2];
          newTranslation.y = this.floors[this.index][3];

          this.cmpTransform.local.translation = newTranslation;
        }
      } else if (direction == "left") {

        if ((this.index - 3) > 0) {
          this.index -= 3;

          let newTranslation: f.Vector3 = f.Vector3.ZERO();
          newTranslation.x = this.floors[this.index][0];
          newTranslation.y = this.floors[this.index][1];

          this.cmpTransform.local.translation = newTranslation;
        }
      }
    }


    private update = (_event: f.Eventƒ): void => {

      let camPositionX: number = cmpCamera.pivot.translation.x;
      let test: number = this.cmpTransform.local.translation.x;

      if (direction == "right" && test <= camPositionX - 6) {
        this.moveFloor();

      } else if (direction == "left" && test >= camPositionX + 6) {
        this.moveFloor();

      }


      /*if (direction == "right" && test <= camPositionX - 6) {

        let transform: f.Matrix4x4 = this.cmpTransform.local;
        let index: number;

        for (let i: number = 0; i < Floor.floors.length; i++) {
          if (Floor.floors[i][2] === transform.translation.x) {
            index = i;
            break;
          }
        }

        let newTranslation: f.Vector3 = f.Vector3.ZERO();
        newTranslation.x = Floor.floors[(index + 3)][2];
        newTranslation.y = Floor.floors[(index + 3)][3];

        this.cmpTransform.local.translation = newTranslation;

      } else if (direction == "left" && test >= camPositionX + 6) {

        let transform: f.Matrix4x4 = this.cmpTransform.local;
        let index: number;

        for (let i: number = 0; i < Floor.floors.length; i++) {
          if (Floor.floors[i][2] === transform.translation.x) {
            index = i;
            break;
          }
        }

        let newTranslation: f.Vector3 = f.Vector3.ZERO();
        newTranslation.x = Floor.floors[(index - 3)][2];
        newTranslation.y = Floor.floors[(index - 3)][3];

        this.cmpTransform.local.translation = newTranslation;

      }*/


    }


  }
}