export function isTouchDevice(): boolean {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.userAgent.toLowerCase().includes("android") ||
    navigator.userAgent.toLowerCase().includes("iphone") ||
    navigator.userAgent.toLowerCase().includes("ipad")
  );
}
