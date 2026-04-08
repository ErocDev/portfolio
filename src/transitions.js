import gsap from "gsap";
import { updateMenu, setAnimationsReady } from "./navigation.js";
import { startFloating, startWaveMorph } from "./animations.js";

let isTransitioning = false;

const menuNoise = new Audio("/src/assets/menu.mp3");
menuNoise.volume = 0.6;

export function getIsTransitioning() {
  return isTransitioning;
}

export function setIsTransitioning(value) {
  isTransitioning = value;
}

let currentSection = "hero";

export function getCurrentSection() {
  return currentSection;
}

const heroElements = [
  "#menu",
  "#hero-text",
  "#controls",
  ".geo-3",
  "#wave",
  "#wave2",
  ".geo-1",
  ".geo-2",
];

function hideAbout() {
  gsap.killTweensOf(".box-1");
  gsap.killTweensOf(".box-2");
  gsap.killTweensOf(".box-3");
  gsap.killTweensOf(".box-4");
  gsap.killTweensOf("#about-info-card");
  gsap.killTweensOf("#about-header");
  gsap.killTweensOf("#about-content");
  gsap.killTweensOf("#about-divider");
  gsap.set("#about-header-bar", { opacity: 0, x: -50 });
  gsap.set("#about-meta", { opacity: 0, x: -50 });
  gsap.set("#about-bio", { opacity: 0, x: -50 });
  gsap.set("#about-list", { opacity: 0 });
  gsap.set("#about-list .list-item", { opacity: 0, x: -20 });
  gsap.set("#about-links", { opacity: 0 });
  gsap.set("#about-divider", { opacity: 0 });
  gsap.set(".photo-box", { opacity: 0 });
  gsap.set("#about-info-card", { opacity: 0, y: 30 });
}

function hideHero() {
  const tl = gsap.timeline();
  gsap.killTweensOf("#wave");
  gsap.killTweensOf("#wave2");
  gsap.killTweensOf("#wave-path");
  gsap.killTweensOf("#wave-path2");
  gsap.killTweensOf("#character");
  gsap.killTweensOf("ul li");

  tl.to("#name", { x: 100, opacity: 0, duration: 0.6, ease: "power1.out" })
    .to("#handle", { opacity: 0, x: 50, duration: 0.4 }, "-=0.3")
    .to("#tagline", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2")
    .to(
      "#menu ul li",
      { x: -60, opacity: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
      "-=0.3",
    )
    .to("#controls", { opacity: 0, duration: 0.4 }, "-=0.1")
    .to(".geo-1", { y: -300, duration: 0.8, ease: "Sine.out" }, "<")
    .to(".geo-2", { y: 600, duration: 0.8, ease: "Sine.out" }, "<")
    .to("#wave", { y: -800, duration: 0.8, ease: "power2.out" }, "<")
    .to("#wave2", { y: -800, duration: 1, ease: "power2.out" }, "<")
    .to("#character", { y: -700, duration: 1, ease: "sine.out" }, "<")
    .to(".geo-3", { x: -810, duration: 0.8, ease: "Sine.in" }, "<")
    .to("#character", { x: 700, duration: 0.01 })
    .to("#character", { y: 800, opacity: 0.5, duration: 0.01 })
    .to("#character", { rotate: 180, duration: 0.01 })
    .to("#character", { x: -500, duration: 0.01 })
    .to("#character", { y: 150, duration: 0.6, ease: "expo" });
  return tl;
}

function showAbout() {
  const tl = gsap.timeline();
  gsap.killTweensOf("#character");
  tl.to("#about-header-bar", {
    opacity: 1,
    x: 0,
    duration: 0.5,
    ease: "power3.out",
  })
    .to(
      "#about-meta",
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
      "-=0.2",
    )
    .to(
      "#about-bio",
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
      "-=0.2",
    )
    .to("#about-list", { opacity: 1, duration: 0.1 }, "-=0.3")
    .to(
      "#about-list .list-item",
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.08, ease: "power2.out" },
      "-=0.1",
    )
    .to(
      "#about-links",
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" },
      "-=0.1",
    )
    .to(
      "#about-divider",
      { opacity: 0.8, duration: 0.4, ease: "power2.out" },
      "-=0.3",
    )
    .to(
      ".photo-box",
      { opacity: 1, duration: 0.3, stagger: 0.1, ease: "power2.out" },
      "-=0.2",
    )
    .to(
      "#about-info-card",
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      "-=0.2",
    )
    .call(() => {
      gsap.to(".box-1", {
        y: -8,
        rotation: 3,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".box-2", {
        y: -10,
        rotation: -4,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.4,
      });
      gsap.to(".box-3", {
        y: -6,
        rotation: 14,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.8,
      });
      gsap.to(".box-4", {
        y: -9,
        rotation: -2,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.2,
      });
      gsap.to("#about-info-card", {
        y: -9,
        rotation: 2,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.2,
      });
      gsap.to("#about-header", {
        y: -9,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.2,
      });
      gsap.to("#about-content", {
        y: -9,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to("#about-divider", {
        y: 100,
        duration: 3.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

  return tl;
}

export function transitionToAbout() {
  if (currentSection === "about" || isTransitioning) return;
  isTransitioning = true;
  currentSection = "about";

  hideAbout();

  hideHero().then(() => {
    document.querySelector("#hero").style.visibility = "hidden";
    document.querySelector("#hero").style.pointerEvents = "none";
    document.querySelector("#about").style.visibility = "visible";
    document.querySelector("#about").style.opacity = "1";
    showAbout().then(() => {
      isTransitioning = false;
    });
  });
}

export function transitionToHero() {
  if (currentSection === "hero" || isTransitioning) return;
  menuNoise.play();
  isTransitioning = true;
  currentSection = "hero";

  gsap.to("#character", { y: 5000, duration: 1, ease: "sine.in" });

  gsap.to("#about", {
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      document.querySelector("#about").style.visibility = "hidden";
      document.querySelector("#hero").style.visibility = "visible";
      document.querySelector("#hero").style.pointerEvents = "auto";
      gsap.set(heroElements, { clearProps: "all" });
      gsap.set("#menu ul li", { clearProps: "all" });
      gsap.set("#name, #handle, #tagline", { clearProps: "all" });
      gsap.set("#character", { clearProps: "all" });
      gsap.set("#character", {
        left: "50%",
        x: 0,
        y: 0,
        opacity: 0.15,
        rotation: 0,
      });
      gsap.set("#wave", { y: 0, opacity: 1 });
      gsap.set("#wave2", { y: 0, opacity: 0.5 });
      gsap.set("#wave-path", {
        attr: {
          d: "M600,0 C800,150 1000,50 1200,120 C1320,160 1400,80 1440,130 L1440,0 Z",
        },
      });
      gsap.set("#wave-path2", {
        attr: {
          d: "M500,0 C700,200 900,80 1100,160 C1280,220 1380,100 1440,150 L1440,0 Z",
        },
      });
      setAnimationsReady(false);
      updateMenu();

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.killTweensOf("#character");
          gsap.killTweensOf("#wave");
          gsap.killTweensOf("#wave2");
          gsap.set("#character", {
            x: 0,
            y: 0,
            left: "50%",
            opacity: 0.15,
            rotation: 0,
          });
          gsap.set("#wave", { y: 0, opacity: 1 });
          gsap.set("#wave2", { y: 0, opacity: 0.5 });
          setAnimationsReady(true);
          startFloating();
          startWaveMorph();
          isTransitioning = false;
          updateMenu();
        },
      });

      tl.from("#name", {
        x: 100,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(".geo-1", { y: -300, duration: 0.8, ease: "Sine.out" }, "<")
        .from(".geo-2", { y: 600, duration: 0.8, ease: "Sine.out" }, "<")
        .from("#handle", { opacity: 0, x: 50, duration: 0.4 }, "-=0.3")
        .from("#tagline", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2")
        .from(
          "#menu ul li",
          {
            x: -60,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .from("#controls", { opacity: 0, duration: 0.4 }, "-=0.1")
        .from(
          "#character",
          { y: -800, duration: 1, ease: "power3.out" },
          "-=0.4",
        )
        .from("#wave", { y: -800, duration: 0.8, ease: "power2.out" }, "<")
        .from("#wave2", { y: -800, duration: 1, ease: "power2.out" }, "<");
    },
  });
}
