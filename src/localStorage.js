export function loadUserProgress() {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("visitedBefore", "false");
  }
  else {
    console.log("Støttet ikke localStorage");
  }
  return localStorage.getItem("visitedBefore");
}