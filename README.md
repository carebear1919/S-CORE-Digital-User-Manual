# S-CORE System — Digital Users’ Manual

An elegant, highly responsive, and interactive digital user manual for the **S-CORE System** at De La Salle University - Dasmariñas (DLSU-D). This manual serves as a comprehensive step-by-step documentation guide on account registration, authentication, and tailored role operations (Requestors, Unit Staff, Admins, and Super Admins).

---

## 🚀 Quick Start Guide (Local Development)

To run this application locally on your machine, follow these simple steps:

### Prerequisite
Ensure you have **Node.js** (v18 or higher) installed on your system.

### 1. Clone or Download the Project
Download the ZIP archive of the project and extract it, or clone your GitHub repository:
```bash
git clone <your-github-repo-url>
cd s-core-manual
```

### 2. Install Dependencies
Run the following command in the project root to install all required npm packages:
```bash
npm install
```

### 3. Run the Development Server
Launch the local development environment:
```bash
npm run dev
```
Once started, open your browser and navigate to the local link shown in your terminal (typically **`http://localhost:5173`** or similar).

### 4. Build for Production
To compile and optimize the applet into static browser-ready assets (outputted to the `dist/` folder):
```bash
npm run build
```

---

## 🌐 Deploying to Free Hosting Platforms

Since this is a client-side Single Page Application (SPA), you can host it for free on several fast and secure platforms. Below are the best alternatives along with the default domain links they generate:

### 1. Netlify
* **Deployment:** Connect your GitHub repository to Netlify, choose the branch, set **Build Command** to `npm run build`, and **Publish Directory** to `dist`.
* **Link / Domain Structure:** 
  `https://<your-custom-name>.netlify.app`

### 2. Cloudflare Pages
* **Deployment:** Connect your GitHub to Cloudflare Pages, choose the **Vite** preset (which auto-configures the build settings), and click Deploy.
* **Link / Domain Structure:** 
  `https://<your-custom-name>.pages.dev`

### 3. GitHub Pages
* **Deployment:** Use a simple GitHub Action (like the static site workflow) or install the `gh-pages` package to deploy straight from your master/main branch.
* **Link / Domain Structure:** 
  `https://<your-github-username>.github.io/<your-repo-name>`

### 4. Vercel (Alternative)
* **Deployment:** Simply connect your repository to Vercel, select **Vite** as your framework preset, and click deploy.
* **Link / Domain Structure:** 
  `https://<your-custom-name>.vercel.app`

---

## 🎨 Tech Stack & Features

* **Framework:** React 18+ with Vite (lightning-fast bundling and execution).
* **Styling:** Styled with contemporary Tailwind CSS utility classes and modern layout guidelines.
* **Visual Polish:**
  * **Brand Identity:** Standardized around beautiful DLSU-D brand colors (Primary Green and Warm Gold gradients).
  * **Dynamic Table of Contents (TOC):** Highly responsive side rail navigation with an **Active Tracker** that updates as you scroll through different sections.
  * **Advanced Full-Text Search:** Integrated dictionary-based local fuzzy finder that indexes headers, paragraphs, and lists to guide members to exact sections instantly.
  * **Inter-page Shortcuts:** Programmatic cross-page smooth scroll and target highlight rings (e.g., landing directly in the exact Admin or Super Admin sub-guides from the homepage cards).
