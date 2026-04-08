import gsap from "gsap";
import { setAnimationsReady } from "./navigation.js";
import { setIsTransitioning } from "./transitions.js";
import { SetOnStartScreen } from "./main.js";

export const audio = new Audio("/src/assets/new_days.mp3");
audio.loop = true;
audio.volume = 0.2;

export function animateSelected() {
  const selected = document.querySelector("#menu ul li.active");
  if (selected) {
    gsap.killTweensOf(selected);
    gsap.to(selected, {
      x: 8,
      duration: 0.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }
}

export function startFloating() {
  setAnimationsReady();
  gsap.to("#wave", {
    y: -15,
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
  gsap.to("#wave2", {
    y: -10,
    duration: 4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 0.5,
  });
  gsap.to("#character", {
    y: -15,
    rotation: 5,
    duration: 3.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 0.2,
  });
  gsap.to(".geo-1", {
    rotation: 360,
    duration: 20,
    ease: "none",
    repeat: -1,
    transformOrigin: "center center",
  });

  gsap.to(".geo-2", {
    rotation: -360,
    duration: 30,
    ease: "none",
    repeat: -1,
    transformOrigin: "center center",
  });

  animateSelected();
}

export function startWaveMorph() {
  gsap.to("#wave-path", {
    attr: {
      d: "M600,0 C800,80 1000,160 1200,80 C1320,40 1400,140 1440,100 L1440,0 Z",
    },
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 1,
  });
  gsap.to("#wave-path2", {
    attr: {
      d: "M700,0 C900,50 1100,130 1300,60 C1380,30 1420,110 1440,50 L1440,0 Z",
    },
    duration: 4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 0.5,
  });
}

export function initAnimations() {
  gsap.set(".geo-1", { rotation: 45 });
  gsap.set(".geo-2", { rotation: 20 });

  const tl = gsap.timeline({
    onComplete: () => {
      startFloating();
      setIsTransitioning(false);
      SetOnStartScreen(false);
    },
  });

  tl.from(".geo-3", { x: -810, duration: 0.8, ease: "sine.out", delay: 1 })
    .from(
      "#name",
      { x: 100, opacity: 0, duration: 0.6, ease: "power3.out" },
      "-=0.2",
    )
    .from("#handle", { opacity: 0, x: 50, duration: 0.4 }, "-=0.3")
    .from("#tagline", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2")
    .from(
      "#menu ul li",
      { x: -60, opacity: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
      "-=0.3",
    )
    .from("#controls", { opacity: 0, duration: 0.4 }, "-=0.1")
    .from(
      "#character",
      { y: -800, duration: 1, ease: "power3.out", onStart: () => audio.play() },
      "-=0.4",
    )
    .from("#wave", { y: -800, duration: 0.8, ease: "power2.out" }, "<")
    .from("#wave2", { y: -800, duration: 1, ease: "power2.out" }, "<");

  startWaveMorph();
}
