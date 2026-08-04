const BREAKPOINT_WIDTH = 1024;
const BREAKPOINT_HEIGHT = 600;
const overlay = document.querySelector("#too-small");

function blockInput(e) {
  e.stopImmediatePropagation();
}

function check() {
  if (window.innerWidth < BREAKPOINT_WIDTH || window.innerHeight < BREAKPOINT_HEIGHT) {
    overlay.classList.add("visible");
    window.addEventListener("keydown", blockInput, true);
    window.addEventListener("click", blockInput, true);
  } else {
    overlay.classList.remove("visible");
    window.removeEventListener("keydown", blockInput, true);
    window.removeEventListener("click", blockInput, true);
  }
}

check();
window.addEventListener("resize", check);
