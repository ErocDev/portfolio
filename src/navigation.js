import { animateSelected } from "./animations.js";
import { projects } from "./projectData.js";
import {
  transitionToAbout,
  transitionToHero,
  transitionToProjects,
  getIsTransitioning,
  getCurrentSection,
} from "./transitions.js";
import { isOnStartScreen } from "./main.js";
import gsap from "gsap";
import enterSrc from "./assets/enter.mp3";
import selectSrc from "./assets/select.mp3";

const menuItems = document.querySelectorAll("#menu ul li");
const selectNoise = new Audio(selectSrc);
selectNoise.volume = 0.2;
const enterNoise = new Audio(enterSrc);
enterNoise.volume = 0.2;
let selectedIndex = 0;
let animationsReady = false;

// PROJECT ROW NAVIGATION
const projectRows = document.querySelectorAll(".project-row");
let projectIndex = 0;

function updateProjectPanel(index) {
  const p = projects[index];

  document.getElementById("project-info-name").textContent = p.name;
  document.getElementById("project-info-desc").textContent = p.desc;
  document.getElementById("project-info-label").textContent = p.label;

  // swap preview image
  const placeholder = document.getElementById("project-preview-placeholder");
  const img = document.getElementById("project-preview-img");

  if (p.image) {
    img.src = p.image;
    img.style.display = "block";
    placeholder.style.display = "none";
  } else {
    img.style.display = "none";
    placeholder.style.display = "flex";
  }

  // stack tags
  const stackEl = document.getElementById("project-stack-list");
  stackEl.innerHTML = p.stack
    .map((t) => `<span class="stack-tag">${t}</span>`)
    .join("");

  // links
  const githubLink = document.getElementById("proj-link-github");
  const liveLink = document.getElementById("proj-link-live");

  if (p.github) {
    githubLink.href = p.github;
    githubLink.style.display = "inline-block";
  } else {
    githubLink.style.display = "none";
  }

  if (p.live) {
    liveLink.href = p.live;
    liveLink.style.display = "inline-block";
  } else {
    liveLink.style.display = "none";
  }
}

function updateProjectRows(index) {
  projectRows.forEach((row, i) => {
    if (i === index && !row.classList.contains("wip")) {
      row.classList.add("active");
    } else {
      row.classList.remove("active");
    }
  });
  updateProjectPanel(index);
}

export function initProjectNavigation() {
  updateProjectRows(0);
}

// HERO MENU
export function setAnimationsReady(value = true) {
  animationsReady = value;
}

export function updateMenu() {
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

  const section = getCurrentSection();

  // ── PROJECTS section keys ──
  if (section === "projects" && !getIsTransitioning()) {
    if (e.key === "s" || e.key === "S") {
      selectNoise.play();
      const next = projectIndex + 1;
      if (next < projectRows.length && !projects[next].wip) {
        projectIndex = next;
        updateProjectRows(projectIndex);
      }
    }

    if (e.key === "w" || e.key === "W") {
      selectNoise.play();
      const prev = projectIndex - 1;
      if (prev >= 0 && !projects[prev].wip) {
        projectIndex = prev;
        updateProjectRows(projectIndex);
      }
    }
    if (e.key === "Enter") {
      const p = projects[projectIndex];
      if (!p.wip && p.github) {
        enterNoise.play();
        window.open(p.github, "_blank");
      }
    }
    if (e.key === "Escape" && !getIsTransitioning()) {
      projectIndex = 0;
      updateProjectRows(0);
      transitionToHero();
    }
    return; // stop hero keys firing in projects
  }

  // ── HERO section keys ──
  if (section === "hero" && !getIsTransitioning()) {
    if (e.key === "w" || e.key === "W") {
      selectNoise.play();
      if (selectedIndex === 0) {
        selectedIndex = 3;
      } else {
        selectedIndex = Math.max(0, selectedIndex - 1);
      }
      updateMenu();
    }
    if (e.key === "s" || e.key === "S") {
      selectNoise.play();
      if (selectedIndex === 3) {
        selectedIndex = 0;
      } else {
        selectedIndex = Math.min(menuItems.length - 1, selectedIndex + 1);
      }
      updateMenu();
    }
    if (e.key === "Enter" && !isOnStartScreen()) {
      if (!getIsTransitioning() || getCurrentSection() == "hero") {
        if (selectedIndex === 0) {
          enterNoise.play();
          transitionToAbout();
        } else if (selectedIndex === 1) {
          enterNoise.play();
          transitionToProjects();
        }
      }
    }
  }
  if (e.key === "Escape" && !getIsTransitioning()) {
    transitionToHero();
  }
});

export function initNavigation() {
  updateMenu();
  initProjectNavigation();
}
