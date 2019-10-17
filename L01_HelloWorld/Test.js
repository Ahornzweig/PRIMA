"use strict";
var L01_HelloWorld;
(function (L01_HelloWorld) {
    console.log("hello World");
    window.addEventListener("load", init);
    //let text: HTMLBodyElement = document.getElementsByTagName("body")[0];
    //console.log(text);
    function init(_evevt) {
        let text = document.body;
        text.innerHTML = "hello world";
    }
})(L01_HelloWorld || (L01_HelloWorld = {}));
//# sourceMappingURL=Test.js.map