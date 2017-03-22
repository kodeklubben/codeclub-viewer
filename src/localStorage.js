import store from './store';
import {setUserProgress} from './action_creators';

export function loadUserProgress() {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("visitedBefore", "false");
  }
  else {
    console.log("Støttet ikke localStorage");
  }
  return localStorage.getItem("visitedBefore");
}

export function doNotShowAgain() {
  localStorage.setItem("visitedBefore", "true");
  store.dispatch(setUserProgress("true"));
}