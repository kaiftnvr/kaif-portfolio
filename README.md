# Kaif Tanveer, portfolio

Personal portfolio of Kaif Tanveer, a motion, graphic and brand designer based in Kanpur, India. It is a static site with no build step.

## Structure

```
index.html            Page markup for every view
assets/
  css/styles.css      Design tokens, layout and components
  js/main.js          Router (URL hash) and project data
  js/cv.js            CV page: particle formation animation
  img/                Portrait
  Kaif_Tanveer_CV.pdf CV download
favicon.svg
404.html
robots.txt
vercel.json           Clean URLs, security headers, caching
```

## Run locally

```
npm run dev
```

or `python3 -m http.server 3000` and open http://localhost:3000.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel choose **Add New, Project**, import the repository and press **Deploy**. No framework or build command is needed.
3. Every later push to the main branch deploys automatically.

## Editing content

- Projects and their pages: the `P`, `C` and `CFG` objects at the top of `assets/js/main.js`.
- CV page text: the `DATA` array at the top of `assets/js/cv.js`.
- CV download: replace `assets/Kaif_Tanveer_CV.pdf`.
- Behance link: set `CFG.behance` in `assets/js/main.js` to the direct profile URL.
