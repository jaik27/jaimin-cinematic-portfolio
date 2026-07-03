# Jaimin Shah Cinematic Portfolio

A fully responsive cinematic portfolio landing page built with Next.js App Router, React, Three.js, GSAP and CSS Modules.

The uploaded talking-head video is used as the real hero asset. The audio remains inside the video file. The hero autoplays muted for mobile-browser compatibility, then the visitor can tap the sound badge or the sound button to hear the original audio.

## Corrected hero positioning

The portfolio role line is set to:

Full Stack Dev • Data Analyst • Operations Management for SMEs • Digital Sales & Marketer • Verified Journalist

The design avoids directly stating a market label. Instead, the local business context is implied through procurement, stock movement, CRM, reporting, documentation, SME workflows and operator-facing language.

## Built sections

1. Cinematic video hero
   - Real uploaded talking-head video
   - Blurred duplicate video as ambient background
   - Dark gradient overlays
   - Play, pause, mute and unmute controls
   - Tap for sound badge
   - Centered mobile and WhatsApp visual hierarchy

2. Three.js cinematic layer
   - Warm orange, white and soft blue bokeh particles
   - Additive blending
   - Mouse parallax
   - requestAnimationFrame loop
   - Resource cleanup on unmount

3. Scroll chapters
   - Full Stack Systems with 3D card stack motion
   - Data Analyst with data tunnel motion
   - Operations Management for SMEs with command-board motion
   - Digital Sales & Marketer with orbiting media assets
   - Verified Journalist with blueprint-style evidence framing

4. WhatsApp-ready sharing
   - Static Open Graph preview image
   - Centered name and role copy
   - Metadata set in app/layout.tsx

## Local setup

### Accounts to create

You can keep this completely free at the start.

1. GitHub account
   - Use this for storing the project code.
   - Free is enough for a personal portfolio.

2. Vercel account
   - Recommended for this project because it is built for Next.js and gives you a free vercel.app link.
   - Sign up with GitHub so deployment is one-click after the repo is uploaded.

3. Optional Netlify account
   - Use only as a backup hosting option.
   - Vercel is the cleaner choice for this build because this is a Next.js App Router project.

4. Optional domain account
   - Skip this until you have money for a custom domain.
   - The free Vercel subdomain is enough for WhatsApp sharing.

### Software to install on your computer

1. Node.js LTS
2. Git
3. VS Code

### Run locally

```bash
cd jaimin-cinematic-portfolio
npm install
npm run dev
```

Then open:

```txt
http://localhost:3000
```

### Build test

```bash
npm run build
```

## Deploy free on Vercel

1. Create a GitHub repository called `jaimin-cinematic-portfolio`.
2. Upload all files from this folder into the repository.
3. Go to Vercel and choose **Add New Project**.
4. Import the GitHub repo.
5. Keep the default settings:
   - Framework: Next.js
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: leave blank
6. Deploy.
7. Vercel gives you a free URL like:

```txt
https://jaimin-cinematic-portfolio.vercel.app
```

8. In Vercel, open Project Settings, then Environment Variables.
9. Add:

```txt
NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
```

10. Redeploy once so metadata uses the final URL.

## WhatsApp link testing

1. Send the Vercel URL to yourself on WhatsApp.
2. Wait a few seconds for the preview card to load.
3. The preview should show the centered Open Graph image.
4. If WhatsApp caches an old preview, send the URL with a harmless query parameter:

```txt
https://your-vercel-url.vercel.app?v=2
```

## Updating the video

Replace this file only:

```txt
public/media/hero-video.mp4
```

Then replace or regenerate the poster image:

```txt
public/media/hero-poster.jpg
```

Keep the filename the same and the code will continue working.

## Updating portfolio text

Edit:

```txt
data/portfolioContent.ts
```

That file controls the hero copy, role labels, proof points and scroll chapter content.

## Updating images

Put new assets into:

```txt
public/media/
```

Then update the image paths inside:

```txt
data/portfolioContent.ts
```

## Notes on keeping it free

- Do not enable paid Vercel Pro trial unless you intentionally want a temporary trial.
- Do not add paid analytics or paid storage.
- The video is currently small enough to sit inside the public folder.
- Use the free `vercel.app` URL until a custom domain becomes worth paying for.
- Keep the GitHub repo private while polishing. Make it public only if you want recruiters to inspect the code.
