import portfolioPreview from "./assets/preview-portfolio.png";
import taxiPreview from "./assets/preview-taxi.png";
import taxiDemo from "./assets/taxi-demo.mp4";
import shuttlePreview from "./assets/preview-shuttle.png";
import shuttleDemo from "./assets/shuttle-demo.mp4";

export const projects = [
  {
    name: "Study Planner",
    label: "GROUP",
    desc: "A full-stack study planning app with module and assignment management, and a dashboard built on CTE-based SQL queries. Built as part of a university group project.",
    stack: ["React", "TypeScript", "Node", "Express", "PostgreSQL"],
    github: null,
    live: null,
    media: [],
    wip: false,
  },
  {
    name: "Food Bank Kiosk System",
    label: "GROUP",
    desc: "A full-stack kiosk system for food bank resident registration and stock management, featuring QR-based check-in and role-based access control.",
    stack: ["React", "TypeScript", "Spring Boot", "PostgreSQL"],
    github: "https://github.com/ErocDev/food-bank-kiosk-system",
    live: null,
    media: [],
    wip: false,
  },
  {
    name: "Badminton Match Tracker",
    label: "PERSONAL",
    desc: "A Python package for tracking and analysing badminton match stats, built with Flask, dataclasses and JSON persistence.",
    stack: ["Python", "Flask", "JSON"],
    github: "https://github.com/ErocDev/shuttle-stats",
    live: null,
    media: [
      { type: "video", src: shuttleDemo },
      { type: "image", src: shuttlePreview }
    ],
    wip: false,
  },
  {
    name: "Portfolio Website",
    label: "FEATURED",
    desc: "A Persona 4 Golden inspired portfolio built with Vite, GSAP and Tailwind CSS. Features full keyboard navigation, animated transitions, and a custom audio system.",
    stack: ["Vite", "GSAP", "JS", "Tailwind"],
    github: "https://github.com/ErocDev/portfolio",
    live: "https://eroc.dev",
    media: [{ type: "image", src: portfolioPreview }],
    wip: false,
  },
  {
    name: "Taxi Booking Website",
    label: "WEB",
    desc: "A full-stack taxi booking web app built as part of a university synoptic project. Drivers can toggle availability, customers can request and complete rides in real time.",
    stack: ["JS", "Node", "Express", "PostgreSQL"],
    github: "https://github.com/ErocDev/taxi-booking-system",
    live: null,
    media: [
      { type: "video", src: taxiDemo },
      { type: "image", src: taxiPreview }
          ],
    wip: false,
  },                                                                                                                                                                                                                                                                                                                                                                                                                                         
];