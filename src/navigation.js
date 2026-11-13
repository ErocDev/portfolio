import { animateSelected } from "./animations.js";
import { projects } from "./projectData.js";
import {
  transitionToAbout,
  transitionToHero,
  transitionToProjects,
  transitionToSkills,
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

let currentMediaIndex = 0;

function getMedia(p) {
  return p.media && p.media.length ? p.media : [];
}

function renderMedia(p, mediaIdx) {
  const media = getMedia(p);
  const placeholder = document.getElementById("project-preview-placeholder");
  const imgEl = document.getElementById("project-preview-img");
  const videoEl = document.getElementById("project-preview-video");

  videoEl.pause();
  videoEl.removeAttribute("src");
  videoEl.load();

  if (media.length === 0) {
    placeholder.style.display = "flex";
    imgEl.style.display = "none";
    videoEl.style.display = "none";
    return;
  }

  const item = media[mediaIdx];
  placeholder.style.display = "none";

  if (item.type === "video") {
    imgEl.style.display = "none";
    videoEl.style.display = "block";
    videoEl.src = item.src;
    videoEl.load();
  } else {
    videoEl.style.display = "none";
    imgEl.style.display = "block";
    imgEl.src = item.src;
  }
}

function renderDots(p, mediaIdx) {
  const media = getMedia(p);
  const dotsEl = document.getElementById("preview-dots");
  dotsEl.innerHTML = "";

  if (media.length <= 1) {
    dotsEl.style.display = "none";
    return;
  }

  dotsEl.style.display = "flex";
  media.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("preview-dot");
    if (i === mediaIdx) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentMediaIndex = i;
      renderMedia(p, currentMediaIndex);
      renderDots(p, currentMediaIndex);
    });
    dotsEl.appendChild(dot);
  });
}

function updateArrows(p) {
  const media = getMedia(p);
  const prevBtn = document.getElementById("preview-arrow-prev");
  const nextBtn = document.getElementById("preview-arrow-next");
  if (media.length <= 1) {
    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
  }
}

function updateProjectPanel(index) {
  const p = projects[index];
  currentMediaIndex = 0;

  document.getElementById("project-info-name").textContent = p.name;
  document.getElementById("project-info-desc").textContent = p.desc;
  document.getElementById("project-info-label").textContent = p.label;

  renderMedia(p, currentMediaIndex);
  renderDots(p, currentMediaIndex);
  updateArrows(p);

  const stackEl = document.getElementById("project-stack-list");
  stackEl.innerHTML = p.stack
    .map((t) => `<span class="stack-tag">${t}</span>`)
    .join("");

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
      item.classList.add("active");
    } else {
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
        selectedIndex = menuItems.length - 1;
      } else {
        selectedIndex = Math.max(0, selectedIndex - 1);
      }
      updateMenu();
    }
    if (e.key === "s" || e.key === "S") {
      selectNoise.play();
      if (selectedIndex === menuItems.length - 1) {
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
        } else if (selectedIndex === 2) {
          enterNoise.play();
          transitionToSkills();
        }
      }
    }
  }
  if (e.key === "Escape" && !getIsTransitioning()) {
    transitionToHero();
  }
});

// ── MOUSE / CLICK SUPPORT ──────────────────────────────────────

// Menu items (About / Projects) — Contact are no-op until built
menuItems.forEach((item, index) => {
  item.style.cursor = "pointer";

  item.addEventListener("mouseenter", () => {
    if (isOnStartScreen() || getIsTransitioning() || getCurrentSection() !== "hero") return;
    selectedIndex = index;
    selectNoise.pause()
    selectNoise.currentTime = 0;
    selectNoise.play();
    updateMenu();
  });

  item.addEventListener("click", () => {
    if (isOnStartScreen() || getIsTransitioning() || getCurrentSection() !== "hero") return;

    selectedIndex = index;
    updateMenu();

    if (index === 0) {
      enterNoise.play();
      transitionToAbout();
    } else if (index === 1) {
      enterNoise.play();
      transitionToProjects();
    } else if (index === 2) {
      enterNoise.play();
      transitionToSkills();
    }
  });
});

// Project rows — click to select (GitHub/Live links already work natively as <a> tags)
projectRows.forEach((row, index) => {
  if (projects[index].wip) return; // don't make W.I.P rows clickable
  row.style.cursor = "pointer";
  row.addEventListener("click", () => {
    if (getIsTransitioning()) return;
    selectNoise.play();
    projectIndex = index;
    updateProjectRows(projectIndex);
  });
});

document.getElementById("preview-arrow-prev").addEventListener("click", () => {
  const p = projects[projectIndex];
  const media = getMedia(p);
  if (media.length <= 1) return;
  currentMediaIndex = (currentMediaIndex - 1 + media.length) % media.length;
  renderMedia(p, currentMediaIndex);
  renderDots(p, currentMediaIndex);
});

document.getElementById("preview-arrow-next").addEventListener("click", () => {
  const p = projects[projectIndex];
  const media = getMedia(p);
  if (media.length <= 1) return;
  currentMediaIndex = (currentMediaIndex + 1) % media.length;
  renderMedia(p, currentMediaIndex);
  renderDots(p, currentMediaIndex);
});

// "ESC Back to Menu" controls — clickable back-out
const aboutBackControl = document.querySelector("#about-controls");
if (aboutBackControl) {
  aboutBackControl.style.cursor = "pointer";
  aboutBackControl.addEventListener("click", () => {
    if (!getIsTransitioning()) transitionToHero();
  });
}

const projectsBackControl = document.getElementById("projects-back-control");
if (projectsBackControl) {
  projectsBackControl.style.cursor = "pointer";
  projectsBackControl.addEventListener("click", () => {
    if (!getIsTransitioning()) {
      projectIndex = 0;
      updateProjectRows(0);
      transitionToHero();
    }
  });
}

const skillsBackControl = document.getElementById("skills-back-control");
if (skillsBackControl) {
  skillsBackControl.style.cursor = "pointer";
  skillsBackControl.addEventListener("click", () => {
    if (!getIsTransitioning()) transitionToHero();
  });
}

export function initNavigation() {
  updateMenu();
  initProjectNavigation();
}
