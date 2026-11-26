# Praveen Kumar — 3D Portfolio

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
`vite.config.js` uses `base: './'`, so `dist/` works from any sub-path.
Push the contents of `dist/` to the `gh-pages` branch of your repo (or use the
`peaceiris/actions-gh-pages` action), then enable Pages for that branch.
