# Ankit Raj — Personal Portfolio

**Live →** [ankitraj-portfolio1-67.vercel.app](https://ankitraj-portfolio1-67.vercel.app/)

My personal portfolio built from scratch. No templates, no themes — just me figuring out what looked good and what didn't across a hundred iterations. It's fast, smooth, and works on every device I've thrown it at.

---

## What's inside

The site is structured as a single-page app with a dedicated `/certificates` route. Every section is its own component — Hero, About, Experience, Projects, Certificates, Contact — all wired together in `Home.jsx`.

The animation layer runs on GSAP + ScrollTrigger. Smooth scrolling is handled by Lenis. The hero background is a custom WebGL hyperspeed effect. Hover interactions on the cert cards are done with raw GSAP transforms — no CSS transitions fighting each other.

Light and dark mode both work properly. The theme is stored in context and toggled via a class on `<html>`.

---

## Tech stack

| Thing | Why |
|---|---|
| React 19 + Vite | Fast dev server, fast builds |
| Tailwind CSS | Utility classes for layout, custom CSS for the rest |
| GSAP + ScrollTrigger | Scroll animations that actually feel good |
| Lenis | Smooth scroll without the jank |
| React Router v7 | Client-side routing |
| EmailJS | Contact form without a backend |
| Lucide React | Icons |

---


## Project structure

```
src/
├── components/       # All sections (Hero, About, Projects, etc.)
├── contexts/         # ThemeContext for light/dark mode
├── data/             # Certificate data
├── hooks/            # useAppLogic — all scroll/animation setup lives here
├── pages/            # Home and AllCertificates page
└── index.css         # Global styles and CSS variables
```
---


> Built and designed by **Ankitraj Jha**
