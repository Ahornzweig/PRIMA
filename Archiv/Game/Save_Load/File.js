"use strict";
var Game;
(function (Game) {
    window.addEventListener("load", init);
    let loadFunctions = {
        "Response": loadFilesWithResponse
    };
    let selector;
    let downloader;
    let filenameDisplay;
    let content;
    function init(_event) {
        //console.log("Start");
        filenameDisplay = document.querySelector("input#Filename");
        content = document.querySelector("textarea");
        selector = document.createElement("input");
        selector.setAttribute("type", "file");
        selector.setAttribute("multiple", "true");
        selector.addEventListener("change", handleFileSelect);
        downloader = document.createElement("a");
        let buttons = document.querySelectorAll("button");
        for (let button of buttons)
            if (button.id == "Load")
                button.addEventListener("click", handleLoad);
            else if (button.id == "Save")
                button.addEventListener("click", handleSave);
    }
    function handleLoad(_event) {
        selector.click();
    }
    function handleSave(_event) {
        let blob = new Blob([content.value], { type: "text/plain" });
        let url = window.URL.createObjectURL(blob);
        //*/ using anchor element for download
        downloader.setAttribute("href", url);
        downloader.setAttribute("download", getFilenameDisplay());
        document.body.appendChild(downloader);
        downloader.click();
        document.body.removeChild(downloader);
        window.URL.revokeObjectURL(url);
        //*/
    }
    function handleFileSelect(_event) {
        let fileList = _event.target.files;
        if (fileList.length == 0)
            return;
        let load = loadFunctions["Response"];
        load(fileList);
    }
    async function loadFilesWithResponse(_fileList) {
        //console.group("Load with Response");
        for (let file of _fileList) {
            //logFile(file);
            const offer = await new Response(file).text();
            Game.data = await JSON.parse(offer);
            Game.levelIndex = 0;
            Game.enemiesDefeated = Game.data.Game.Levels[Game.levelIndex].defeated;
            Game.main(Game.data);
            let loadScreen = document.getElementById("load-screen");
            loadScreen.style.display = "none";
            let name = document.getElementById("name");
            name.innerHTML = Game.data.Game.Levels[Game.levelIndex].userName;
            Game.HP = Game.data.Game.Levels[Game.levelIndex].HP;
            Game.healtBar.innerHTML = Game.HP + " HP";
            Game.healtBar.style.width = Game.HP * 2 + "px";
            //levelIndex = data.Game.Levels[levelIndex].next - 1;
            console.log(Game.data);
            //logContent(data);
        }
        //console.groupEnd();
    }
    function getFilenameDisplay() {
        return filenameDisplay.value;
    }
})(Game || (Game = {}));
//# sourceMappingURL=File.js.map