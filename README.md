# Arie DeKraker — Portfolio Website

A modern, responsive portfolio site built with React showcasing my professional experience, technical skills, and data science & software engineering projects.

**Live:** [https://www.arieswebsite.com](https://www.arieswebsite.com)

## Features

- **Interactive Home Page** — Hero section with typing animation, stat highlights, and call-to-action buttons
- **Skills & Technologies** — Categorized skill grid covering Programming, AI/ML, Cloud, Databases, and Data Visualization
- **Work Experience** — Timeline of roles at Ford Motor Company with key contributions and tech stacks
- **Projects** — Portfolio of data science and engineering projects with live links and status badges
- **Education** — Degree details with relevant coursework
- **Specialty Pages** — Dedicated pages for [Data Science & Analysis](/data-science) and [Backend Software Engineering](/software-engineering), each with filtered experience, skills, and projects
- **Contact Form** — Firebase-powered contact form with reCAPTCHA
- **Dark Mode** — Toggle between light and dark themes
- **Mobile Responsive** — Fully responsive across all screen sizes

## Tech Stack

- **Framework:** React 18 with React Router 6
- **UI:** Material UI (MUI) 7, SCSS
- **Backend Services:** Firebase (Firestore for contact form, Analytics)
- **Hosting:** Google Cloud App Engine
- **Animations:** ityped for typing effects

## Getting Started

### Prerequisites

- Node.js 18+
- A `.env` file with Firebase configuration (see [GCP_DEPLOY.md](GCP_DEPLOY.md))

### Install & Run Locally

```bash
npm install
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## Auto-Sync Resume From Portfolio

The resume source `resume/Arie_Resume_general.md` can be auto-updated from `src/data.js` so the `PROJECTS` section always highlights the most technical projects aligned with your current role.

### One-time setup

```bash
npm run setup:hooks
```

This enables the tracked git hook in `.githooks/pre-commit`.

### Manual sync

```bash
npm run sync:resume
```

What it does:
- scores and selects top technical projects from `personalProjects` in `src/data.js`
- rewrites the `## PROJECTS` section in `resume/Arie_Resume_general.md`
- regenerates `public/Arie_Resume_general.pdf` (if `pandoc` is available)

After setup, the sync runs automatically before each commit.

## Deployment

See [GCP_DEPLOY.md](GCP_DEPLOY.md) for full deployment instructions to Google Cloud App Engine.

## Project Structure

```
src/
├── App.jsx                  # Routes and layout
├── data.js                  # Centralized content data
├── context.js               # Theme context (dark mode)
├── components/
│   ├── intro/               # Hero section
│   ├── aboutme/             # About Me section
│   ├── skills/              # Skills grid
│   ├── experience/          # Work experience timeline
│   ├── education/           # Education cards
│   ├── projects/            # Project portfolio grid
│   ├── specialty/           # Data Science & Engineering pages
│   ├── contact/             # Contact form (Firebase)
│   ├── topbar/              # Navigation bar
│   ├── menu/                # Slide-out menu
│   ├── footer/              # Site footer
│   └── mastersprojects/     # Master's program projects
```
