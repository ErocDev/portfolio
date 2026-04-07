import gsap from "gsap";
import { initNavigation } from "./navigation.js";
import { initAnimations } from "./animations.js";

const startNoise = new Audio("/src/assets/selected.mp3");
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
}, 250);

initNavigation();
