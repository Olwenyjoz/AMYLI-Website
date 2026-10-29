# AMYLI Website

> **Empower. Adapt. Lead. Succeed.**

A responsive, multilingual, and modern website for the **Academic Mentorship & Youth Leadership Initiative (AMYLI)**. This platform serves as the digital hub for students, young professionals, and researchers to discover mentorship programmes, explore educational resources, and connect with a community dedicated to building socially responsible young leaders.

## 🚀 Live Demo

You can view the live version of the website here: 
**[https://YOUR-USERNAME.github.io/amyli-website/](https://YOUR-USERNAME.github.io/amyli-website/)**
*(Note: Replace this link with your actual GitHub Pages URL once deployed).*


## 📂 Folder Structure
```text
amyli-website/
│
├── assets/
│   └── images/                      # Local images and visual assets
│       ├── amyli-logo.png           # Main brand logo
│       ├── logo-removebg.png        # Favicon / transparent logo
│       ├── who-we-are.jpg           # About section / Hero image
│       └── Global Learning Horizons Banner.png # Hero background
│
├── index.html                       # Homepage (Hero, About, Team, Contact, etc.)
├── programs.html                    # Dedicated page for detailed programmes
├── explore.html                     # Dedicated page for resources & SDGs
├── styles.css                       # All styles, variables, media queries
├── script.js                        # Nav, i18n, modals, carousel, form logic
└── README.md                        # Project documentation

## ✨ Key Features

- **Fully Responsive:** Optimized layouts for desktop, tablet, and mobile screens.
- **Multilingual Support (i18n):** Dynamic translation engine supporting **English, Russian, French, Spanish, and Arabic**. Includes full Right-to-Left (RTL) layout support for Arabic.
- **Dark Mode:** A fully functional dark theme that respects user preference and saves to local storage.
- **Dedicated Pages:** Multi-page architecture including Home, Programmes, and Explore pages for better content organization.
- **Interactive UI Components:**
  - **Programmes Page:** Detailed content blocks with alternating images.
  - **Team Carousel:** A horizontally scrolling team section with manual navigation arrows and popup profile modals.
  - **Partners Marquee:** A continuous, left-to-right scrolling section for partner and sponsor logos.
  - **Get Involved:** Interactive CTA cards that auto-select the relevant subject in the contact form.
- **Contact Form:** A compact, structured form that prepares an email draft via the visitor's default email application (`mailto:`).
- **Accessibility:** Built with semantic HTML, skip-links, keyboard navigation for modals, and ARIA attributes.

## 🛠 Tech Stack & Tooling

This project is built using standard web technologies. No complex build tools, frameworks, or package managers are required.

- **HTML5:** Semantic structure.
- **CSS3:** Custom properties (variables), Flexbox, CSS Grid, media queries, and keyframe animations (for the marquee).
- **Vanilla JavaScript (ES6+):** DOM manipulation, translation engine, modal logic, carousel controls, and form handling.
- **Google Fonts:** [Inter](https://fonts.google.com/specimen/Inter) typeface.
- **Images:** Unsplash & Placehold.co (for placeholders).

## 📋 Prerequisites

To run or edit this project, you only need:
- A modern web browser (Chrome, Firefox, Safari, Edge).
- A code editor (like [Visual Studio Code](https://code.visualstudio.com/)).
- *Optional:* [Git](https://git-scm.com/) installed on your machine for version control.

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/amyli-website.git