// Post-render step (runs on the Deno that ships with Quarto; no extra dependency).
//
// cv.qmd renders its Typst PDF to <output-dir>/CV_RakeenTanvir.pdf, because Quarto does not
// allow a directory in `output-file`. Copy it to <output-dir>/files/CV_RakeenTanvir.pdf, the
// long-standing public URL. Locally, copy rather than move: `quarto preview` expects the
// original. In CI the site is published straight after the render, so move it there and the
// PDF is published at that one URL only.
const outDir = Deno.env.get("QUARTO_PROJECT_OUTPUT_DIR") ?? "_site";
const src = `${outDir}/CV_RakeenTanvir.pdf`;
const dest = `${outDir}/files/CV_RakeenTanvir.pdf`;

try {
  Deno.statSync(src);
} catch {
  // In CI (GitHub Actions sets CI=true) the full render before publishing must produce the PDF;
  // otherwise the site would be published without it (the repo keeps no copy).
  // Local HTML-only renders (plain `quarto preview`, `quarto render --to html`) may skip it.
  if (Deno.env.get("QUARTO_PROJECT_RENDER_ALL") && Deno.env.get("CI")) {
    console.error(`copy-cv-pdf: ${src} was not rendered; refusing to publish without the CV PDF.`);
    Deno.exit(1);
  }
  console.warn(`copy-cv-pdf: CV PDF not rendered in this run; ${dest} is left from the last ` +
    "full render, if any. Run `quarto render` (or `quarto preview --render all`) to rebuild it.");
  Deno.exit(0);
}

Deno.mkdirSync(`${outDir}/files`, { recursive: true });
if (Deno.env.get("CI")) {
  Deno.renameSync(src, dest);
  console.log(`copy-cv-pdf: moved CV PDF to ${dest}`);
} else {
  Deno.copyFileSync(src, dest);
  console.log(`copy-cv-pdf: copied CV PDF to ${dest}`);
}
