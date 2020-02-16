namespace Game {

    function saveGame(): void {
        f.Loop.stop();

        let userName: string = document.getElementById("name").innerHTML;

        let levelData = data.Game.Levels[levelIndex];

        levelData.background.index = [];
        for (let bg of backgrounds.getChildren()) {
            levelData.background.index.push((<Object>bg).index);

        }
        let background: {} = levelData.background;

        let name: {} = levelData.name;
        let next: {} = levelData.next;

        levelData.ground.index = [];
        for (let floor of tiles.getChildren()) {
            levelData.ground.index.push((<Floor>floor).index);
        }
        let ground: {} = levelData.ground;

        for (let data of levelData.nature) {
            data.index = [];

            for (let tree of natures.getChildren()) {

                if ((<Object>tree).name == data.name) {
                    data.index.push((<Object>tree).index);
                }
            }
        }
        let nature: {} = levelData.nature;

        for (let data of levelData.enemys) {
            data.positions = [];
            data.index = [];

            for (let enemy of enemies.getChildren()) {
                if ((<Enemy>enemy).name == data.name) {
                    let positions: number[][] = (<Enemy>enemy).enemies;

                    data.positions.push(positions);
                    data.index.push((<Enemy>enemy).index);
                }
            }
        }
        let enemys: {} = levelData.enemys;
        let girlPos: number[] = [girl.cmpTransform.local.translation.x, girl.cmpTransform.local.translation.y];
        let camPos: number[] = [cmpCamera.pivot.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z];
        let camTranslatioX: number = levelData.camTranslatioX;
        let defeated: number = enemiesDefeated;


        let saveData: {} = {
            "Game": {
                "Levels": [{ background, name, ground, nature, enemys, next, userName, HP, girlPos, camPos, defeated, camTranslatioX }]
            }
        };


        saveData = JSON.stringify(saveData);
        let content: HTMLTextAreaElement = document.querySelector("textarea");
        content.value = saveData + "";

        let saveScreen: HTMLDivElement = <HTMLDivElement>document.getElementById("save-screen");
        saveScreen.style.display = "block";
    }

    function prepareSave(): void {
        let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("to-save");
        button.addEventListener("click", saveGame);
    }

    window.addEventListener("load", prepareSave);

}