# UWF Neuroscience Research Cluster — Website Draft

**University of West Florida | Hal Marcus College of Science & Engineering**

> **DRAFT — For internal review, team feedback, and webmaster guidance only. Not for public distribution.**

---

## Overview

This repository contains the design prototype for the UWF Neuroscience Research Cluster public-facing website. It is intended as a **vision document** to:

1. Show the research team what the site could look like
2. Communicate design intent to the UWF webmaster / HMCSE web team
3. Serve as a live shareable link (via GitHub Pages) while institutional infrastructure is arranged

---

## Features Demonstrated

- **Animated neural network hero** — live canvas-rendered particle graph on page load
- **Stat counters** — animated funding and faculty numbers that count up on scroll
- **Research area cards** — four domain areas with icons and keyword tags
- **Team profiles** — founding investigator cards with role, department, bio, and research tags
- **Publications feed** — scrollable list of recent peer-reviewed work, updatable
- **Grants & Funding** — active NIH awards and pending applications with status badges
- **NeuroNauts callout** — dedicated highlight for the NIH R25 program
- **News & Presentations** — rolling news items (program launches, awards, cluster milestones)
- **Contact / Join Us** — form placeholder with dropdown for visitor type

---

## Team (Draft Version — 4 of 8 Faculty)

| Name | Department | College | Focus |
|------|-----------|---------|-------|
| Rodney Guttmann, Ph.D. | Biology | HMCSE | Alzheimer's, Biomarkers, Phage Display |
| Shusen Pu, Ph.D. | Mathematics & Statistics | HMCSE | Computational Neuroscience, Neural Decoding |
| Peter Cavnar, Ph.D. | Biology | HMCSE | Cellular Neuroscience, Neuroplasticity |
| Daudet Ilunga Tshiswaka, Ph.D. | Public Health | Halsa | Stroke, Health Disparities, Community Neuroscience |

*Additional faculty (Rainey, Blalock, Lee, Arruda) to be added as they confirm participation.*

---

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings > Pages**
3. Set source to `main` branch, `/` (root) folder
4. Site will be live at `https://[username].github.io/[repo-name]/`

---

## Notes for UWF Webmaster

### What We're Going For
This prototype demonstrates the level of visual ambition we want for the production site. Key design signals:
- Dark, science-forward color palette (navy, deep blue, near-black)
- Animated hero section with a live neural network graphic
- Clean typography pairing a serif display font with a sans body font
- Card-based layouts for research areas, team, publications, and grants
- Ongoing publication/news feed model (not a static page)

### What UWF Templates Can Replicate
Even within CMS constraints, the following elements translate well:
- Section organization (Mission, Research, Team, Publications, Funding, News, Contact)
- Card grid layouts for research areas and team profiles
- Publication list with year/type/tag metadata
- Grant status badges (Active / In Development)
- Photo grid for team members (replace initials with headshots)

### What May Need Custom Code
- The animated neural network canvas (JavaScript — may need IT approval)
- Scroll-triggered counter animations
- Staggered card reveal animations

If the CMS restricts JavaScript, the page still reads beautifully as a static design — all the structure and content stands independently.

---

## Content Updates

To update publications, grants, news, or team members, edit `index.html` directly in the relevant section. All content is in plain HTML — no build step required.

---

*Questions: contact Rodney Guttmann, rguttmann@uwf.edu*
