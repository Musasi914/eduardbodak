export function initVh() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
}
// function handleResize() {
//   initVh();
//   ScrollTrigger.refresh();
// }
