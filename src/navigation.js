import { animateSelected } from "./animations.js";
import gsap from "gsap";

const menuItems = document.querySelectorAll("#menu ul li");
const sections = ["#about", "#projects", "#skills", "#contact"];
const selectNoise = new Audio("/src/assets/select.mp3");
selectNoise.volume = 0.2;
let selectedIndex = 0;
let animationsReady = false;

export function setAnimationsReady() {
  animationsReady = true;
}

function updateMenu() {
  menuItems.forEach((item, index) => {
    if (index === selectedIndex) {
      item.style.color = "var(--accent-yellow)";
      item.classList.add("active");
    } else {
      item.style.color = "var(--text-secondary)";
      item.classList.remove("active");
      gsap.killTweensOf(item);
      gsap.set(item, { x: 0 });
    }
  });
  if (animationsReady) animateSelected();
}

document.addEventListener("keydown", (e) => {
  selectNoise.currentTime = 0;
  if (e.key === "w" || e.key === "W") {
    selectNoise.play();
    selectedIndex = Math.max(0, selectedIndex - 1);
    updateMenu();
  }
  if (e.key === "s" || e.key === "S") {
    selectNoise.play();
    selectedIndex = Math.min(menuItems.length - 1, selectedIndex + 1);
    updateMenu();
  }
  if (e.key === "Enter") {
    const target = document.querySelector(sections[selectedIndex]);
    target.scrollIntoView({ behavior: "smooth" });
  }
});

export function initNavigation() {
  updateMenu();
}
