import gsap from "gsap";

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
  return gsap.to(heroElements, {
    opacity: 0,
    x: -30,
    duration: 0.4,
    stagger: 0.05,
    ease: "power2.in",
  });
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
      gsap.to(heroElements, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
      });
      gsap.to("#character", {
        left: "50%",
        opacity: 0.15,
        duration: 0.8,
        ease: "power2.inOut",
      });
    },
  });
}

export function getCurrentSection() {
  return currentSection;
}
