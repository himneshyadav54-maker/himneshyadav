# Himnesh Yadav — Premium 3D Personal Portfolio

A world-class, award-winning 3D personal portfolio website built for **Himnesh Yadav**:
- **Digital Marketing Specialist**
- **Social Media Manager**
- **Video Editor & Motion Designer**
- **Influencer Marketing & Brand Partnerships Manager**

Designed with a futuristic aesthetic (#080808 obsidian black and #FF6B2C electric orange accents), dynamic Three.js 3D kinetic sculpture, responsive perspective tilt cards, custom glowing cursor, and specialized pathways for Brands and Influencers with a transparent 20% commission calculator.

---

## 🛠 Features

1. **Futuristic 3D Experiences**:
   - Floating kinetic chrome sculpture with glowing orbital rings and ambient particle field (Three.js with RoomEnvironment PBR reflections and software-WebGL acceleration).
   - Interactive 3D glowing energy sphere in the contact section.
   - 3D perspective tilt cards with cursor spotlight tracking and orange glowing borders.
2. **Editorial Branding & Identity**:
   - Distinctive typography using Space Grotesk and Plus Jakarta Sans.
   - Smooth animated text rotation of services.
   - Dynamic 3D portrait frame with instant local photo upload or file config.
3. **6 Specialized Interactive Services**:
   - Social Media Management
   - Video Editing & Creative Design
   - Digital Marketing & Meta Ads
   - Influencer Marketing
   - Brand Collaborations
   - Creator Management
   - Detailed modal for each service with deliverables and WhatsApp deep-links.
4. **Dedicated Section For Brands**:
   - 5-step influencer campaign process (Understand, Discover, Plan, Coordinate, Track).
   - "LET'S PLAN YOUR CAMPAIGN" direct WhatsApp button.
5. **Dedicated Section For Influencers & Creators**:
   - 6 creator benefits (deal sourcing, rate negotiation, contract protection).
   - **Interactive 20% Commission Model Calculator** with live deal slider (e.g., ₹10,000 deal -> Creator: ₹8,000 | Management: ₹2,000).
6. **Featured Portfolio & Media Manager**:
   - Category filtering across all 6 disciplines.
   - Video (MP4) and high-res image preview modal.
   - In-browser **Manage / Replace Media** manager to add custom projects or export JSON.
7. **Contact Pathways**:
   - For Businesses: Prefilled WhatsApp message for digital marketing.
   - For Influencers: Prefilled WhatsApp message for brand deals.
   - For Brands: Prefilled WhatsApp message for influencer campaigns.
   - Direct Email & Instagram links.
   - Interactive contact form.

---

## ⚙️ How to Customize Personal Details & Media

All personal details, links, numbers, and default portfolio projects are organized in one centralized configuration file:

📁 **`/src/config/portfolioData.ts`**

### 1. Contact Information & Socials
The verified contact channels are configured as:
- **WhatsApp**: `+91 7722983376`
- **Email**: `himneshyadav54@gmail.com`
- **Instagram**: `@himneshyadav` (`https://instagram.com/himneshyadav`)

### 2. Secret Admin Panel Access
To keep the public portfolio clean and free of visitor editing buttons:
- **Secret Trigger**: Click the **second letter "A" in the word "YADAV"** (e.g. in the top navigation bar or the footer).
- **Security PIN**: Enter `152011`.
- **Admin Capabilities**:
  - Add new projects with custom titles, descriptions, categories, and roles.
  - Upload or paste MP4 videos and images.
  - Delete or modify existing projects.
  - Update WhatsApp number, email, and Instagram profile.
  - Log out at any time.

### 2. Replace Portfolio Images & MP4 Videos
You can customize projects in two ways:
1. **Via Code**: Edit `PORTFOLIO_CONFIG.initialProjects` in `/src/config/portfolioData.ts`.
2. **Via Browser UI**: Click the **"Manage / Replace Media"** button in the portfolio section to add new projects, upload images/MP4 videos directly, or copy the JSON code!

---

## 🚀 Free Deployment Guide

This website is a 100% static React + Vite application requiring **no paid API keys or server backends**. You can host it completely free on Vercel, Netlify, or GitHub Pages.

### Option A: Deploy to Vercel (Recommended — Free & Instant)
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** and select your GitHub repository.
4. Framework Preset: **Vite** (detected automatically).
5. Click **"Deploy"**. Your site is live on your free `.vercel.app` domain with free SSL!

### Option B: Deploy to Netlify (Free)
1. Go to [netlify.com](https://netlify.com) and log in.
2. Select **"Import from Git"**.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **"Deploy"**.

### Option C: Deploy to GitHub Pages (Free)
1. In `vite.config.ts`, add `base: './'`.
2. Run `npm run build`.
3. Push the contents of the `dist` folder to your `gh-pages` branch.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run unit tests
npx tsx --test src/utils/helpers.test.ts

# Production build test
npm run build
```
