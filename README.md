# AOWEISI
AOWEISI Navigation Page

## Requirements

- Node.js 20+
- Git

## Installation

Clone the repository:

```bash
git clone (https://github.com/b1ugem/AOWEISI/)

## Slide deck site

Desktop React (Vite) page that stacks every slide of the source deck, edge to edge.

```bash
npm install
npm run dev      # http://localhost:5183
npm run build    # -> dist/
```

Slide images live in `public/slides` and are generated from the PDF:

```bash
npm run render:pdf -- "path/to/deck.pdf"
```

That writes each page as WebP at 1600w, 2400w and 3200w and regenerates
`src/slides.json`, which the app renders from.
