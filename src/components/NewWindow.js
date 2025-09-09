// components/NewWindow.js
export function openNewWindow(code) {
  const newWin = window.open("", "_blank");
  if (newWin) {
    newWin.document.write(code);
    newWin.document.close();
  }
}
