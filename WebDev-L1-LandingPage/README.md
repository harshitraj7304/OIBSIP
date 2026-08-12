# NovaFlow — AI-Powered Productivity Platform (Landing Page)

![Project Banner](https://img.shields.io/badge/OIBSIP-Level%201%20Task%201-6366f1?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3-06b6d4?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed%20%E2%9C%93-10b981?style=for-the-badge)

---

## 📌 Internship Information

- **Internship Program:** Oasis Infobyte Student Internship Program (OIBSIP)
- **Domain / Track:** Web Development & Designing
- **Level:** Level 1
- **Task:** Task 1 — Landing Page
- **Author / Intern:** Harshit Raj

---

## 📖 Project Overview

**NovaFlow** is a modern, high-conversion landing page designed for a fictional next-generation AI-powered workspace and workflow automation platform. 

This project was built from scratch without any third-party CSS frameworks (like Bootstrap or Tailwind) or JavaScript libraries, demonstrating strong mastery of semantic HTML5 architecture, modern CSS3 layout paradigms (Flexbox & CSS Grid), CSS variables, responsive typography, and micro-interactions.

---

## 🎯 Objectives

- Create an engaging, modern, and visually stunning landing page for a technology product.
- Implement a sticky/fixed glassmorphic header with interactive navigation links.
- Design a high-impact Hero Section with strong headlines, subheadlines, interactive CTA buttons, and product visual previews.
- Build multiple distinct content sections (Features, Workflow Steps, Comparison/Solutions, Metrics/Stats, Testimonials, Pricing, and Final CTA).
- Guarantee 100% responsiveness across Desktop, Tablet, and Mobile screen sizes using clean CSS media queries.
- Deliver production-ready code with clean folder structure, zero broken links, and high accessibility standards.

---

## 🛠️ Technologies Used

- **HTML5:** Semantic markup (`header`, `nav`, `main`, `section`, `article`, `footer`, `figure`).
- **CSS3:** Custom properties (CSS variables), CSS Grid, Flexbox, responsive typography (`clamp()`), gradients, animations, glassmorphism (`backdrop-filter`), and media queries.
- **Google Fonts:** Plus Jakarta Sans & Space Grotesk.
- **Icons & Graphics:** Crisp, resolution-independent inline SVGs.
- **Frameworks / Libraries:** **None** (100% pure vanilla HTML5 & CSS3).

---

## ✨ Key Features & Sections

1. **Sticky Glassmorphic Navbar:**
   - Modern brand logo with vibrant gradient icon.
   - Smooth navigation links (`Features`, `How It Works`, `Solutions`, `Testimonials`, `Pricing`).
   - Call-to-action buttons (`Sign In`, `Get Started Free`).
   - Pure CSS responsive mobile hamburger navigation menu (zero JavaScript dependency).

2. **Impactful Hero Section:**
   - Announcement badge pill (`⚡ NovaFlow 3.0 is Live`).
   - Strong value-focused headline and persuasive subheadline.
   - Dual Call-to-Action buttons with glowing hover effects.
   - Social proof rating badge (4.9/5 stars from 25,000+ teams).
   - Interactive SaaS product dashboard mockup visual with live metrics and workflow visualizer.

3. **Social Proof / Partner Strip:**
   - High-growth company badges demonstrating industry trust.

4. **Impact Metrics / Stats Grid:**
   - 4 key performance indicators (10x Faster Sprint Cycles, 85% Less Repetitive Work, 25k+ Active Teams, 99.99% Uptime).

5. **Feature Cards (6 Core Capabilities):**
   - Autonomous Workflow Engine
   - Neural Knowledge Graph
   - Collaborative AI Canvas
   - Predictive Sprint Intelligence
   - Enterprise-Grade Security
   - 200+ Integrations & REST API
   - Hover lift animations, gradient borders, and color-coded icon badges.

6. **How It Works (Step-by-Step Flow):**
   - 3-step structured walkthrough for seamless user onboarding.

7. **Solutions / Comparison Module:**
   - Side-by-side comparison of legacy disjointed workflows vs. NovaFlow unified intelligence.
   - Glassmorphic real-time velocity metrics display.

8. **Testimonials Section:**
   - Customer review cards with 5-star ratings, author avatars, and company designations.
   - Featured highlight badge for premier social proof.

9. **Pricing Tier Preview:**
   - Starter, Pro Team (Featured with "Most Popular" glow badge), and Enterprise plans with comprehensive feature checklists.

10. **High-Converting Final CTA Section:**
    - High-contrast radiant gradient banner with risk-reversal guarantee points.

11. **Comprehensive 4-Column Footer:**
    - Brand mission statement, quick navigation links (Product, Resources, Company), social media buttons (GitHub, Twitter, LinkedIn, Discord), copyright notice, and Oasis Infobyte attribution badge.

---

## 📂 Folder Structure

```text
OIBSIP/
└── WebDev-L1-LandingPage/
    ├── index.html       # Primary semantic HTML5 webpage
    ├── style.css        # Pure CSS3 stylesheet & design tokens
    └── README.md        # Detailed project documentation & submission info
```

---

## 📱 Responsive Design Information

The landing page implements a mobile-first and fluid responsive approach using CSS Grid, Flexbox, and tailored media queries:

| Device Type | Viewport Width | Layout Behavior |
| :--- | :--- | :--- |
| **Desktop / Wide Screens** | `≥ 1200px` | Full multi-column grid layouts (3-4 columns), interactive 3D hero card perspective. |
| **Laptops / Small Desktops** | `993px – 1199px` | Proportionate scaling, preserved multi-column layout with flexible container padding. |
| **Tablets** | `769px – 992px` | 2-column grid reflow, hero content stacked above mockup, centered alignment. |
| **Mobile Phones** | `≤ 768px` | Single-column stack, full-width touch-friendly CTA buttons, collapsible hamburger menu drawer. |
| **Small Mobile** | `≤ 480px` | Optimized fluid typography via `clamp()`, reduced padding for edge-to-edge readability. |

---

## 🚀 How to Run the Project Locally

### Option 1: Direct Browser Launch (Simplest)
1. Navigate to the project folder:
   ```text
   OIBSIP/WebDev-L1-LandingPage/
   ```
2. Double-click `index.html` to open it in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Brave).

### Option 2: Using VS Code Live Server
1. Open the `WebDev-L1-LandingPage` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"**.
4. The website will launch automatically at `http://127.0.0.1:5500/index.html`.

### Option 3: Using Python HTTP Server (Command Line)
1. Open your terminal / command prompt inside the project folder:
   ```bash
   cd OIBSIP/WebDev-L1-LandingPage
   ```
2. Start a local server:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your web browser.

---

## 📋 Requirement Verification Checklist

- [x] **Sticky Navigation Bar:** Implemented with 5 navigation links and 2 action buttons.
- [x] **Hero Section:** Strong headline, subheadline, dual CTAs, trust badge, and SaaS mockup.
- [x] **Multiple Content Sections:** Features (6 cards), How It Works (3 steps), Solutions comparison, Metrics, Testimonials (3 cards), Pricing (3 tiers), and Final CTA.
- [x] **Footer:** Multi-column layout with social icons, site links, and author credits.
- [x] **Consistent Colour Palette:** Premium dark slate theme with electric indigo, violet, and cyan accents.
- [x] **Full Responsiveness:** Verified on Desktop, Tablet, and Mobile viewports.
- [x] **CSS Flexbox & Grid:** Used throughout the entire layout.
- [x] **No Element Overlap:** Strict box model (`box-sizing: border-box`), intentional margins and padding.
- [x] **Typography Hierarchy:** Multiple font sizes structured with Google Fonts (`Plus Jakarta Sans` & `Space Grotesk`).
- [x] **Zero Frameworks / Pure Vanilla:** Built strictly with HTML5 and CSS3 (no JS, no frameworks).

---

## 👨‍💻 Author

**Harshit Raj**  
*Oasis Infobyte Intern — Web Development & Designing Track*  
*Submission: Level 1 — Task 1 (Landing Page)*  
- **GitHub:** [harshitraj7304](https://github.com/harshitraj7304)  
- **LinkedIn:** [Harshit Raj](https://www.linkedin.com/in/harshit-raj-35a657229)
