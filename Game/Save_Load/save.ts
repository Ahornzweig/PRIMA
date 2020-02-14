namespace Game {

    function saveGame(): void {
        f.Loop.stop();

        let gameInterface: HTMLDivElement = <HTMLDivElement>document.getElementById("game-interface");
        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        gameInterface.style.display = "none";
        canvas.style.display = "none";

        let levelData = data.Game.Levels[2];

        let background: {} = levelData.background;
        let name: {} = levelData.name;
        let ground: {} = levelData.ground;
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

        let saveData: {} = {
            "Game": {
                "Levels": [{ background, name, ground, nature, enemys }]
            }
        };

        console.log(saveData);
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