# Salazar & Sons Window Co.

A polished, single-page website for **Salazar & Sons Window Co.**, a family-owned window services company serving the Dallas–Fort Worth (DFW) metro area.

**Live site:** [salazarandsonswindow.com](https://salazarandsonswindow.com)

![Logo](images/logo.png)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)

---

## About

Salazar & Sons Window Co. provides window installation, replacement, and repair services across the DFW area. This website serves as the company's online presence, showcasing their services, process, and values — with clear calls to action for free estimates.

---

## Features

- **Responsive single-page layout** — fully responsive across mobile, tablet, and desktop
- **Sections:** Hero, Stats, Services, Why Choose Us, Process, Contact, and Footer
- **Interactive modal** for free estimate requests
- **Smooth scroll navigation** between sections
- **Google Analytics** integration (G-TEPP27488B)
- **Custom Google Fonts** — Playfair Display (headings) + DM Sans (body)
- **CSS-only window showcase animation** in the hero section
- **Color theme** — Navy, Gold, and Cream palette for a professional, high-trust look

---

## Tech Stack

| Layer          | Technology        |
|----------------|-------------------|
| Structure      | HTML5             |
| Styling        | CSS3 (custom, no frameworks) |
| Interactivity  | Vanilla JavaScript |
| Analytics      | Google Analytics (gtag.js) |
| Fonts          | Google Fonts      |
| Hosting        | Netlify           |

No build tools, package managers, or external CSS/JS frameworks are required.

---

## Project Structure

```
├── index.html          # Main (and only) HTML page — contains all sections
├── style.css           # Complete stylesheet (~24KB)
├── script.js           # Navigation toggle, modal, scroll behavior (~6KB)
├── CNAME               # Custom domain reference (salazarandsonswindow.com)
├── LICENSE             # MIT License
├── images/
│   ├── aboutMe.png     # About section photo
│   ├── favicon.ico     # Site favicon
│   ├── logo.png        # Logo (light variant)
│   └── logo_dark.png   # Logo (dark variant)
└── README.md           # This file
```

---

## Development

Since this is a static site with no build step, you can open it directly in any browser:

```bash
# On macOS
open index.html

# On Windows
start index.html

# Or serve locally with Python
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

---

## Deployment

The site is deployed on **Netlify** with a custom domain (`salazarandsonswindow.com`).

To deploy updates, simply commit and push to the connected branch — Netlify automatically
builds and publishes the latest version.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**© 2026 Salazar & Sons Window Co.**
