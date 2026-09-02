/**
 * Renders every page of the source PDF into public/slides as WebP,
 * at two widths so the browser can pick per-DPR via srcset,
 * and writes src/slides.json (the manifest the app renders from).
 *
 * Usage: node scripts/render-pdf.mjs "path/to/deck.pdf"
 */
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import { mkdir, rm, writeFile } from "node:fs/promises";

const SRC = process.argv[2];
const OUT = "public/slides";
const RENDER_SCALE = 2.5; // oversample, then downscale to the target widths
const WIDTHS = [1600, 2400, 3200]; // full-bleed: covers ~1600/1920-2400/retina

if (!SRC) {
  console.error('usage: node scripts/render-pdf.mjs "path/to/deck.pdf"');
  process.exit(1);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const doc = await pdf(SRC, { scale: RENDER_SCALE });
const slides = [];
let i = 0;

for await (const page of doc) {
  i += 1;
  const name = String(i).padStart(2, "0");
  const { width, height } = await sharp(page).metadata();
  const ratio = height / width;

  for (const w of WIDTHS) {
    await sharp(page)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(`${OUT}/slide-${name}-${w}.webp`);
  }

  slides.push({
    page: i,
    src: `slides/slide-${name}-${WIDTHS[0]}.webp`,
    srcSet: WIDTHS.map((w) => `slides/slide-${name}-${w}.webp ${w}w`).join(", "),
    width: WIDTHS[0],
    height: Math.round(WIDTHS[0] * ratio),
  });
  console.log(`page ${i}: source ${width}x${height}`);
}

await writeFile("src/slides.json", JSON.stringify(slides, null, 2) + "\n");
console.log(`done: ${slides.length} slides`);
