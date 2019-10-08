console.log("hello World");
window.addEventListener("load", init);
//let text: HTMLBodyElement = document.getElementsByTagName("body")[0];
//console.log(text);
function init(_evevt: Event): void {
    let text: HTMLElement = document.body;
    text.innerHTML = "hello world";
}