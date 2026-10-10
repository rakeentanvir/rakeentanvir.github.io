# Rakeen Tanvir — academic website

The source of Rakeen Tanvir's academic website, built with [Quarto](https://quarto.org).

- **Pages:** `index.qmd` (Home), `research.qmd` (papers, listed from `papers.yml`) and `cv.qmd`, which renders both the web CV and, via Typst, the PDF at `files/CV_RakeenTanvir.pdf`.
- **Design:** `styles.scss`, the design variant chosen in `_quarto.yml` (`styles-a.scss` or `styles-b.scss`), and `styles-dark.scss`. The design brief is `docs/design-brief.md`.
- **Open questions** are `<!-- TODO -->` comments in the pages and in `papers.yml`.
- **Preview:** `quarto preview`. A full build, including the CV PDF, is `quarto render`.
- **Publishing:** `.github/workflows/publish.yml` renders the site on every push to `master` and deploys it to the `gh-pages` branch. Changes go into `quarto` first, then `quarto` into `master`.
