# Subhrajeet Harichandan — Official Author Website

A beautiful, production-ready Next.js author website with antigravity UI/UX and cool animations.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (no external CSS frameworks)
- **Fonts**: Cormorant Garamond + Syne + DM Mono (Google Fonts)
- **Deployment**: Vercel / Render

---

## 📁 Project Structure

```
subhrajeet-site/
├── app/
│   ├── layout.tsx       # Root layout with metadata & SEO
│   ├── page.tsx         # Main page (all sections)
│   ├── globals.css      # Global styles + fonts
│   └── page.module.css  # All component styles + animations
├── public/              # Static assets (add author photo here)
├── package.json
├── next.config.js
├── tsconfig.json
├── vercel.json          # Vercel config
└── render.yaml          # Render config
```

---

## 🌐 Deploy to Vercel (Recommended — Free)

### Option 1: Vercel CLI
```bash
npm i -g vercel
cd subhrajeet-site
vercel
```
Follow the prompts. Your site will be live in ~2 minutes!

### Option 2: Vercel Dashboard
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy** — done!

---

## 🎨 Deploy to Render (Free)

1. Push this folder to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Environment**: Node
5. Click **Deploy**

---

## 💻 Run Locally

```bash
cd subhrajeet-site
npm install
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

---

## 📸 Adding Author Photo

1. Add your photo to `/public/author.jpg`
2. In `app/page.tsx`, replace the `<div className={styles.photoPlaceholder}>` block with:
```tsx
import Image from 'next/image'
// ...
<Image
  src="/author.jpg"
  alt="Subhrajeet Harichandan"
  fill
  style={{ objectFit: 'cover' }}
/>
```

---

## 📚 Books & Links

| Book | Amazon | Flipkart | Notion Press |
|------|--------|----------|--------------|
| Love Will Find You | ✅ | ✅ | ✅ |
| Can You Comfort My Aches | ✅ | ✅ | ✅ |
| I Had You | ✅ | ✅ | ✅ |

---

## ✨ Features

- Custom animated gold cursor with trailing ring
- Animated starfield + floating particles
- Parallax hero section
- Scroll-triggered reveal animations
- Auto-rotating quote slider
- Book covers with hover shine effect
- Spinning hexagon badge
- Marquee ticker
- Fully responsive (mobile, tablet, desktop)
- SEO optimized (Open Graph, metadata)
- Noise texture overlay

---

Built with ❤️ for Subhrajeet Harichandan
