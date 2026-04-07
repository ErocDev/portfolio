import gsap from "gsap";
import { updateMenu, setAnimationsReady } from "./navigation.js";

let currentSection = "hero";

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
    .to(".geo-2", { y: 500, duration: 0.8, ease: "Sine.out" }, "<")
    .to("#wave", { y: -800, duration: 0.8, ease: "power2.out" }, "<")
    .to("#wave2", { y: -800, duration: 1, ease: "power2.out" }, "<")
    .to(".geo-3", { x: -810, duration: 0.8, ease: "Sine.in" }, "<");

  // tl.to("#menu", { x: -400, duration: 0.4, ease: "sine.inOut" })
  //   .to("#hero-text", { x: +500, duration: 0.4, ease: "sine.inOut" }, "<")
  //   .to("#wave", { y: -200, duration: 0.4, ease: "sine.inOut" })
  //   .to("#wave2", { y: -200, duration: 0.4, ease: "sine.inOut" }, "<")
  //   .to(".geo-1", { y: -100, duration: 0.5, ease: "sine.inOut" })
  //   .to(".geo-2", { y: +300, duration: 0.5, ease: "sine.inOut" }, "<");
  return tl;
}

function showAbout() {
  const tl = gsap.timeline();

  tl.to("#character", {
    left: "45%",
    opacity: 0.3,
    duration: 0.8,
    ease: "power2.inOut",
  })
    .to(
      "#about-header-bar",
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
      "-=0.3",
    )
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
    );

  return tl;
}

export function transitionToAbout() {
  if (currentSection === "about") return;
  currentSection = "about";

  hideAbout();

  hideHero().then(() => {
    document.querySelector("#hero").style.visibility = "hidden";
    document.querySelector("#about").style.visibility = "visible";
    document.querySelector("#about").style.opacity = "1";
    showAbout();
  });
}

export function transitionToHero() {
  if (currentSection === "hero") return;
  currentSection = "hero";

  gsap.to("#about", {
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      document.querySelector("#about").style.visibility = "hidden";
      document.querySelector("#hero").style.visibility = "visible";
      gsap.set(heroElements, { clearProps: "all" });
      gsap.set("#menu ul li", { clearProps: "all" });
      gsap.set("#name, #handle, #tagline", { clearProps: "all" });
      setAnimationsReady(false);
      updateMenu();

      const tl = gsap.timeline({ onComplete: setAnimationsReady(true) });

      tl.from("#name", {
        x: 100,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      })
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
        .from("#wave", { y: -800, duration: 0.8, ease: "power2.out" }, "<")
        .from("#wave2", { y: -800, duration: 1, ease: "power2.out" }, "<")
        .from(".geo-3", {
          x: -810,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3,
        });
    },
  });
}

export function getCurrentSection() {
  return currentSection;
}
