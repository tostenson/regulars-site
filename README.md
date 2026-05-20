# Regulars — Website assets

This folder lives under `/Website/` and contains everything the static site needs.
No build step, no framework. Open `Website/index.html` in a browser to view.

## Folder layout

```
Website/
├── index.html              # Landing page
├── press.html              # Press kit (presskit() structure)
├── favicon.png             # 64×64 site icon
├── apple-touch-icon.png    # 180×180 iOS home-screen icon
├── README.md               # this file
├── css/
│   └── style.css           # all site styles (self-contained tokens)
├── js/
│   └── main.js             # vanilla JS — nav, lightbox, clipboard
├── fonts/
│   ├── Kaph-Regular.otf    # UI font (self-hosted)
│   ├── Kaph-Italic.otf
│   └── Antonio-VariableFont_wght.ttf  # display font (self-hosted)
└── assets/
    ├── img/                # web-optimized images used on the pages
    ├── press/              # full-res originals + the downloadable press-kit zip
    └── video/              # raw B-roll clips (drop your .mp4s here)
```

## How to add or replace assets

### Screenshots
1. Drop a full-res 1920×1080 PNG into `assets/press/` using the filename pattern
   `screenshot-NN-name-1920x1080.png`.
2. Add a web-sized copy into `assets/img/` as `screenshot-NN-name.png` (≤ 1600px wide) and
   a thumbnail as `screenshot-NN-name-thumb.png` (~640–800px wide).
3. Add a new `<a class="gallery__item" …>` block in `press.html` (and a `.shot` block on
   `index.html` if you want it in the landing media row). Copy/paste an existing block and
   change the file paths + `data-caption`.

### Logos & icons
- `assets/press/regulars-logo-transparent.png` — main wordmark, transparent PNG
- `assets/press/regulars-logo-dark.png` — wordmark on the dark trailer-card background
- `assets/press/regulars-icon-transparent.png` — square icon
- Replace these files with your real artwork; the press kit page picks them up automatically.

### Trailer
The trailer is currently a placeholder card that links to Steam. To embed YouTube:

1. Open `index.html` (and `press.html`), find the `<!-- Replace the placeholder … -->` comment.
2. Replace the `<a class="placeholder" …>` block with:
   ```html
   <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
           title="Regulars — Official Trailer"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           allowfullscreen loading="lazy"></iframe>
   ```

### B-roll clips
Drop `.mp4` files into `assets/video/` using the filenames already listed in the press kit
(`broll-shift-open.mp4`, `broll-kitchen-rush.mp4`, etc.) — those rows will start working
as soon as the files exist. Adjust the list in `press.html` (`#video` section) to match.

### Press-kit zip
`assets/press/regulars-press-kit.zip` is the single download for the full kit.
Re-create it whenever you update the contents:

```bash
cd Website/assets
zip -r press/regulars-press-kit.zip press/ -x "press/regulars-press-kit.zip"
```

A placeholder zip is shipped so the download link works on first load — replace it.

## Editing copy

All visible text lives directly inside `index.html` and `press.html` — no JSON, no CMS.
The most likely things to change:

- **Developer name / location / release date / price** — `press.html`, `#facts` fact-sheet.
- **Press email** — search-and-replace `press@regularsgame.com` across both files.
- **Steam URL** — already wired to `https://store.steampowered.com/app/4582980/`. If it
  changes, search-and-replace.
- **Social links** — placeholder `#` href values in the footer + `#contact` block.
  Replace with real URLs.

## Deploying to GitHub Pages (from a subfolder)

This site uses only **relative** asset paths, so it works either at the domain root or
under `/<repo-name>/`. Two common setups:

### Option A — Pages serves the whole repo
1. Push the repo.
2. Repo Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Pages will serve `https://<user>.github.io/<repo>/Website/index.html`.
   Share that link.

### Option B — Pages serves only the `/Website` folder
If you'd rather have a clean URL:
1. Move everything inside `Website/` to the repo root **or** push only `Website/` to a
   `gh-pages` branch.
2. With a `gh-pages` branch you get `https://<user>.github.io/<repo>/`.

### Custom domain
Add a `CNAME` file containing your apex/subdomain (e.g. `regularsgame.com`) at the same
level as `index.html`, then configure DNS per
[GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Tech & quality notes

- **No runtime dependencies.** Fonts are self-hosted. JS is vanilla, ~5KB.
- **Open Graph / Twitter cards** are set on both pages — pasting a link into Slack,
  Discord, email or Twitter renders the share card from `assets/img/og-share.png`.
- **Accessibility**: semantic HTML, alt text, skip link, focus rings, ESC/arrow keys in
  the lightbox, keyboard-toggleable mobile nav.
- **Responsive** at 320px → 1600px+. Test the gallery and lightbox on a phone.
- **No tracking, no cookies, no analytics** — add Plausible or similar later if needed.

## Updating page metadata

Each page has its own `<title>`, `<meta name="description">`, `<link rel="canonical">`,
and Open Graph block at the top of the `<head>`. Update these whenever you change copy
that's worth surfacing in unfurls.
