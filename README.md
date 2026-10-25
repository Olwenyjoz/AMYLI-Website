# AMYLI Website

Responsive and multilingual website for the **Academic Mentorship & Youth Leadership Initiative (AMYLI)**. 

*Empower. Adapt. Lead. Succeed.*

## 📂 Project Files

- `index.html` — Website content and semantic page structure.
- `styles.css` — Brand palette, responsive layouts, animations, dark mode, and gradient overlays.
- `script.js` — Navigation, language translation engine, dark mode toggle, team carousel logic, program modals, and contact form handling.
- `assets/images/` — Directory for local images (e.g., `amyli-logo.png`, team photos).

## 🎨 Brand Styling

The site strictly adheres to the AMYLI brand palette: **navy blue, bright blue, white, and light blue shades**. 
- The primary typeface is **Inter** (via Google Fonts), with clean, modern typography.
- The hero section features a custom right-to-left linear gradient overlay that blends seamlessly with the background image.
- The UI includes a fully functional **Dark Mode**.

## ✨ Features

- **Fully Responsive:** Optimized layouts for desktop, tablet, and mobile screens, with reduced typography scaling on smaller devices.
- **Multilingual Support:** Dynamic translation engine supporting **English, Russian, French, and Spanish**. All text, including team profiles, updates instantly when the language is changed.
- **Hero Section:** A modern background image with a custom gradient overlay and a distinctively styled twisted-border circular image overlay.
- **Interactive Programmes:** Compact programme cards with summarized descriptions. Clicking "Read More" opens a sleek popup modal with full details.
- **Team Carousel:** A horizontally scrolling team section with manual navigation arrows for mouse users. Clicking a card opens a rectangular profile modal containing the member's full bio and social links.
- **Development Journey:** Floating card design with drop shadows and hover lift effects.
- **SDG Alignment:** A redesigned, compact grid highlighting AMYLI's alignment with SDGs 3, 4, 8, 10, 16, and 17.
- **Contact Form:** A compact, structured form that prepares an email draft via the visitor's default email application (`mailto:`). Includes direct phone contact details.
- **Accessibility:** Built with semantic HTML, skip-links, keyboard navigation for modals, and ARIA attributes.

## 💻 Run Locally

1. Clone or download this repository to your local machine.
2. Open the project folder in your code editor (e.g., Visual Studio Code).
3. Run `index.html` using a local server (like the **Live Server** extension for VS Code) or simply double-click the file to open it in a modern browser.
4. Ensure `index.html`, `styles.css`, `script.js`, and the `assets/` folder remain in the same root directory.

## 🌍 Deploying to GitHub Pages

Since this is a static website, you can host it for free on GitHub Pages:
1. Push your code to a GitHub repository.
2. Go to **Settings** > **Pages**.
3. Under "Build and deployment", select **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder, then click **Save**.
5. Your site will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`.

## ⚠️ Replace Placeholders Before Launch

To ensure the site is fully professional and ready for production, please complete the following:

- **Images:** Replace the Unsplash/Pexels sample photos (hero background, team photos) with approved AMYLI photos. Place them in the `assets/images/` folder and update the URLs in the code.
- **Team Profiles:** Replace the sample team names, biographies, and generic social links with verified profiles inside `script.js`.
- **Partner Logos:** Replace the scrolling partner-logo text placeholders with official partner logos (if applicable).
- **Contact Details:** Verify the official email address (`info.amyli26@gmail.com`) and phone number (`+7 977 590-99-60`) in the HTML.
- **Form Backend:** The current contact form uses a `mailto:` link. If you require direct submission, data storage, or spam protection, connect the form to a secure backend or a service like Formspree or Netlify Forms.

---
*The images and profiles currently in the code are placeholders. SDG labels represent alignment described in AMYLI's introductory material, not independently verified impact results or official UN endorsement.*