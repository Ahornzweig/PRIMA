namespace Game {
    window.addEventListener("load", init);
    let loadFunctions: { [key: string]: Function } = {

        "Response": loadFilesWithResponse
    };

    let selector: HTMLInputElement;
    let downloader: HTMLAnchorElement;
    let filenameDisplay: HTMLInputElement;
    let content: HTMLTextAreaElement;

    function init(_event: Event): void {
        //console.log("Start");
        filenameDisplay = document.querySelector("input#Filename");
        content = document.querySelector("textarea");

        selector = document.createElement("input");
        selector.setAttribute("type", "file");
        selector.setAttribute("multiple", "true");
        selector.addEventListener("change", handleFileSelect);

        downloader = document.createElement("a");

        let buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll("button");
        for (let button of buttons)
            if (button.id == "Load")
                button.addEventListener("click", handleLoad);
            else if (button.id == "Save")
                button.addEventListener("click", handleSave);
    }

    function handleLoad(_event: Event): void {
        selector.click();
    }

    function handleSave(_event: Event): void {
        let blob: Blob = new Blob([content.value], { type: "text/plain" });
        let url: string = window.URL.createObjectURL(blob);
        //*/ using anchor element for download
        downloader.setAttribute("href", url);
        downloader.setAttribute("download", getFilenameDisplay());
        document.body.appendChild(downloader);
        downloader.click();
        document.body.removeChild(downloader);
        window.URL.revokeObjectURL(url);
        //*/
    }

    function handleFileSelect(_event: Event): void {
        let fileList: FileList = (<HTMLInputElement>_event.target).files;
        if (fileList.length == 0)
            return;

        let load: Function = loadFunctions["Response"];
        load(fileList);
    }

    async function loadFilesWithResponse(_fileList: FileList): Promise<void> {
        //console.group("Load with Response");
        for (let file of _fileList) {
            //logFile(file);
            const offer: string = await new Response(file).text();
            data = await JSON.parse(offer);
            levelIndex = 0;
            enemiesDefeated = data.Game.Levels[levelIndex].defeated;
            console.log(data);
            main(data);
            let loadScreen: HTMLDivElement = <HTMLDivElement>document.getElementById("load-screen");
            loadScreen.style.display = "none";
            let name: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById("name");
            name.innerHTML = data.Game.Levels[levelIndex].userName;
            HP = data.Game.Levels[levelIndex].HP;
            healtBar.innerHTML = HP + " HP";
            healtBar.style.width = HP * 2 + "px";

            //levelIndex = data.Game.Levels[levelIndex].next - 1;
            
            //logContent(data);
        }
        //console.groupEnd();
    }

    function getFilenameDisplay(): string {
        return filenameDisplay.value;
    }

}   