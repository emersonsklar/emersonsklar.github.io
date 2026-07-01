# sklar.ai

Personal professional site for **Emerson Sklar**, Chief Evangelist, Amazon Alexa.
Hosted on GitHub Pages at [emersonsklar.github.io](https://emersonsklar.github.io),
served at the custom domain **[sklar.ai](https://sklar.ai)**.

## How it's built

Hand-written static HTML + CSS. **No build step, no dependencies, no framework.**
What's in the repo is exactly what ships. Edit an `.html` file, commit, push — it's live in a minute or two.

```
├── index.html        Home (shows next 3 upcoming events)
├── about.html        About / bio
├── events.html       Events — upcoming + past (auto-sorted by date)
├── writing.html      Essays & field notes
├── media.html        Videos & podcasts
├── contact.html      Contact & booking
├── assets/css/style.css        All styling (edit the palette here)
├── assets/js/events.js         ← YOUR EVENTS: the only file you edit for events
├── assets/js/render-events.js  Auto-sorts events into upcoming/past (don't edit)
├── CNAME             Custom domain (sklar.ai) — do not delete
└── .nojekyll         Serve files as-is (skip Jekyll processing)
```

## Events (self-updating)

You maintain **one file** — `assets/js/events.js` — a list of events with a
`date`, title, location, etc. On every page load the site compares each event's
date to today and files it under **Upcoming** or **Past** automatically. The Home
page shows your next three upcoming events; the Events page shows the full lists.
You never move anything by hand — just add an entry and push.

## Editing tips

- **Change the accent color / whole look:** edit the `:root` variables at the top of
  `assets/css/style.css`. Changing `--accent` re-skins the entire site.
- **Add a talk:** copy a `<li>` block in the timeline on `speaking.html`.
- **Add a post:** copy a `.card` block on `writing.html`.
- **Embed a video/podcast:** see the comment block near the top of `media.html`.
- The nav and footer are duplicated in each page (static site). If you change one,
  change it in all six files — or ask Claude to do it in one pass.

## Cache-busting (important when you edit CSS/JS)

Every local stylesheet and script is linked with a version tag, e.g.
`style.css?v=2` and `render-events.js?v=2`. Browsers aggressively cache CSS/JS,
so **whenever you change a `.css` or `.js` file, bump the `?v=` number** on that
file's `<link>`/`<script>` tags across all pages (search the repo for `?v=`).
Changing the number forces every visitor's browser to fetch the fresh file
instead of a stale cached copy. If you edit content in the `.html` files only,
you don't need to bump anything — pages themselves aren't cached the same way.

## Deploying

GitHub Pages auto-deploys the `main` branch. Just `git push`.
```
git add -A && git commit -m "Update content" && git push
```
