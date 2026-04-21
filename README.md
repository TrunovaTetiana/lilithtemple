# LilithTemple

Interactive web project built as a structured multi-room environment using pure frontend technologies.

## Overview

LilithTemple is a modular, room-based web application that demonstrates:

- structured frontend architecture
- clean navigation logic without frameworks
- media-driven UI (video backgrounds, audio control)
- reusable room templates
- consistent UI/UX patterns across multiple scenes

The project is designed as a controlled environment with navigation through predefined entry points rather than traditional page routing.

## Tech Stack

- HTML5
- CSS3 (responsive layout, media queries)
- Vanilla JavaScript
- Video/audio integration (MP4, UI-controlled playback)
- Static hosting ready (Netlify / GitHub Pages)

## Key Features

- Modular room-based architecture (`room1`, `room2`, etc.)
- Centralized entry point via root `index.html`
- Controlled navigation using UI elements (no open routing logic)
- Video backgrounds with manual sound control
- Consistent UI components:
  - bottom-left sound toggle
  - bottom-right navigation control (sigil button)
- Responsive design across desktop and mobile devices

## Project Structure

lilithtemple/
│
├── index.html              # Entry point → redirects to room1
│
├── room1/
├── room2/
├── room3/
├── room10/
├── room20/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── assets/
│       ├── video/
│       ├── img/
│       └── audio/
│
└── README.md

## Security Considerations

This is a static frontend project. As such:

- No backend or database is used
- No authentication or session handling is implemented
- No sensitive data is stored in the client

Tested considerations:

- direct URL access to rooms (expected behavior for static hosting)
- no exposure of credentials or tokens
- no external API dependencies

## Local Setup

Run locally using a simple HTTP server:

cd lilithtemple
python3 -m http.server 8000

Open in browser:

http://localhost:8000

## Deployment

Recommended deployment:

- GitHub → Netlify

Steps:

1. Push repository to GitHub
2. Connect repository to Netlify
3. Deploy as static site
4. Attach custom domain

## Live Version

https://lilithtemple.com

## Author

Tetiana Trunova
