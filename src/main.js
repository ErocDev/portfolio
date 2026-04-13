import gsap from "gsap";
import "./screenguard.js";
import { initNavigation } from "./navigation.js";
import { initAnimations } from "./animations.js";
import { setIsTransitioning } from "./transitions.js";
import selectedSrc from "./assets/selected.mp3";

let onStartScreen = true;

export function isOnStartScreen() {
  console.log("start screen: " + onStartScreen);
  return onStartScreen;
}

export function SetOnStartScreen(value) {
  onStartScreen = value;
}

const startNoise = new Audio(selectedSrc);
startNoise.volume = 0.2;
const startScreen = document.querySelector("#start-screen");

function dismissStart() {
  startNoise.play();
  document.removeEventListener("keydown", dismissStart);
  document.removeEventListener("click", dismissStart);

  gsap.to("#start-screen", {
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    onComplete: () => startScreen.remove(),
  });
  initAnimations();
}

setTimeout(() => {
  document.addEventListener("keydown", dismissStart);
  document.addEventListener("click", dismissStart);
}, 500);
initNavigation();
