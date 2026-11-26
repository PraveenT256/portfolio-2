# Praveen Kumar — 3D Portfolio

**Live:** https://praveent256.github.io/praveenportfolio/

React 18 + Vite + Three.js (@react-three/fiber, drei) + Framer Motion + Lenis.

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
```

## Edit content
All text (experience, projects, skills, education, links) lives in `src/data.js`.
Photo: `public/photo.png` · Résumé: `public/Tangudu_Praveen_Kumar_Resume.pdf`.

## Deploy to GitHub Pages
The site is served from the `gh-pages` branch. To publish a new version:
```
npm run build
```
then push the contents of `dist/` to the `gh-pages` branch.
`vite.config.js` uses `base: './'`, so the build works under `/praveenportfolio/`.
