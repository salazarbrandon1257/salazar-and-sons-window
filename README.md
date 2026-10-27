# Salazar & Sons Window Co.

Website for **Salazar & Sons Window Co.**, a family-owned window installation, replacement, repair, and window addition company serving the Dallas–Fort Worth area.

**Live site:** [salazarandsonswindow.com](https://salazarandsonswindow.com)

---

## Pages

- **Home** (`index.html`): hero with estimate form, services, why choose us, process, reviews slider, FAQ, and call-to-action
- **Portfolio** (`portfolio.html`): featured before/after project and a gallery of past jobs
- **About** (`about.html`): owner story, proof points, and call-to-action
- **Window Guide** (`window-materials.html`): compares vinyl, fiberglass, aluminum, wood, and composite windows, plus the Buena Vista vinyl lines
- **404** (`404.html`): shown by GitHub Pages for missing URLs

Shared across pages: top bar with phone menu, free-estimate pop-up form, and footer.

---

## Tech Stack

| Layer         | Technology                                   |
|---------------|----------------------------------------------|
| Structure     | HTML5                                        |
| Styling       | One custom stylesheet (`styles.css`), no frameworks |
| Interactivity | Vanilla JavaScript (inline per page, plus `reviews-slider.js`) |
| Forms         | [FormSubmit](https://formsubmit.co) (emails estimate requests) |
| Analytics     | Google Analytics (gtag.js)                   |
| Fonts         | Google Fonts: Playfair Display + DM Sans     |
| Hosting       | GitHub Pages with a custom domain            |

No build tools or package managers are required.

---

## Project Structure

```
├── index.html          # Home page
├── portfolio.html      # Portfolio page (gallery data lives in its inline script)
├── about.html          # About page
├── window-materials.html  # Window materials guide
├── 404.html            # Not-found page (uses root-relative paths)
├── styles.css          # Stylesheet for all pages
├── reviews-slider.js   # Drifting, draggable reviews row on the home page
├── tests/              # Unit tests for the reviews slider (node --test)
├── images/             # Logos, hero photo, service photos, social share image
├── portfolio/          # Project photos, one folder per project
├── robots.txt, sitemap.xml
├── CNAME               # Custom domain for GitHub Pages
└── LICENSE
```

---

## Development

It's a static site, so serve the folder and open it in a browser:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

### Tests

The reviews slider's motion logic has unit tests using Node's built-in test runner (Node 18+, no install needed):

```bash
node --test
```

### Adding a portfolio project

1. Put the photos in a new folder under `portfolio/`.
2. In `portfolio.html`, add a card to the grid and an entry to the `galleryProjects` list in the inline script. The card's `openGalleryModal(n)` number must match the entry's position in that list.

---

## Deployment

GitHub Pages publishes the site from the **`feature/gold-black-hero`** branch. Every push to that branch goes live at salazarandsonswindow.com within a minute or two.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
