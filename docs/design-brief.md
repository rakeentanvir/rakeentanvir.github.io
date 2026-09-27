# Design brief — rakeentanvir.com (Quarto)

The site is an academic home page: who I am, what I work on, where the papers and CV are.
Everything below serves one goal, which is that a reader finds the research and the CV in
under ten seconds, on any screen, in light or dark.

## Principles

- **One column.** The headshot sits at the top of the column. There is no sidebar, which is the part of the current theme that dates it.
- **Type does the work.** There are no cards, no grids, no animation, no hero image and no icons.
- **Plain text wins.** Page text is copied verbatim from `_pages/*.md` on `master`. New wording is the owner's to write; the owner approved two exceptions on 2026-09-25, the Home focus list and the submitted working-paper title, and on 2026-09-26 asked for the published paper's description and one-sentence finding to be summarized from its published abstract. Open questions stay as `<!-- TODO -->` comments.
- **Nothing third-party.** No web fonts, no analytics, no search index, no CDN scripts. The pages load only files from this site.
- **Relative links everywhere.** The domain appears once, as `site-url` in `_quarto.yml`, so the planned domain switch is a one-line change.

## Structure

The nav has three items, Home · Research · CV. They sit on the right of a plain bar, followed by the light/dark toggle, and never collapse into a hamburger menu.

| Page | Content |
|---|---|
| Home (`index.qmd`) | Headshot, then the name, then the two-sentence intro. **Research** has three bolded focus terms in a short list, the research paragraphs, and the two papers as highlights (title + authors/venue, then a one-sentence finding where `papers.yml` has one; the working paper has none yet). **Background** follows, then **CV & links** (CV, Google Scholar, ORCID, SSRN, ResearcherID, GitHub, LinkedIn). |
| Research (`research.qmd`) | **Publications** and **Working Papers**, both listed from `papers.yml`. Each paper shows its title (linked when there is a link), then authors and venue, then a one-paragraph description, then optional extra links. |
| CV (`cv.qmd`) | The CV sections, and a "Download PDF" link. The same file renders to `files/CV_RakeenTanvir.pdf` via Typst, so the old PDF link keeps working. The PDF must fit on two pages. |

The focus terms were drafted on 2026-09-25 at the owner's request. They are the owner's framing of strategy (how firms' choices shape their outcomes) plus three of the Google Scholar profile keywords: Science&Innovation, Startups/Entrepreneurs and Labor Automation. The other two keywords, Strategic Management and Economic History, are covered by the lead-in and by the verbatim "More broadly…" sentence below the list. If the Scholar keywords change, update the list to match.

Old URLs resolve through Quarto `aliases`:
- `/about/` and `/about.html` go to Home.
- `/research/` and `/publications/` go to Research.
- `/cv/`, `/resume.html`, `/talks/` and `/teaching/` go to CV.

Quarto's redirect pages need JavaScript, so `_scripts/alias-redirects.ts` adds a fallback for visitors without it: an instant meta refresh and a plain link.

## Tokens

Colors live in `styles.scss` (light) and `styles-dark.scss` (dark).
Typography and spacing tokens (fonts, sizes, `$site-measure`, spacing, link underline) live in a design-variant file, chosen by the one line `design-variant:` in `_quarto.yml`. `styles-a.scss` (the default) is the reading of this brief described below. `styles-b.scss` is a second reading, kept for comparison until the owner picks one: the heading serif carried into the body at 19 px, a 660 px column, a flatter heading scale, and more space between paragraphs, sections and papers. `styles.scss` holds the rules that use the tokens, so a variant changes values only.

| Token | Light | Dark | Notes |
|---|---|---|---|
| Background | `#ffffff` | `#121212` | Pure white. Dark is a soft black, not `#000`. |
| Text | `#1a1a1a` (17.4:1) | `#e6e6e6` (15.0:1) | Near-black on white. |
| Link accent | `#1a4f8b` (8.3:1) | `#8ab4f8` (8.9:1) | The only color on the site. |
| Muted | `#595959` (7.0:1) | `#a6a6a6` (7.7:1) | Authors, venues, secondary links. |
| Rules | `#e3e3e3` | `#2e2e2e` | The navbar hairline only. |

Ratios are WCAG contrast against the page background. Every text pair passes AAA. The rule color is a decorative hairline, so it has no contrast requirement.
The link accent is under 3:1 against body text, so **links stay underlined**. The underline is a 1px hairline at 40% of the accent, offset 0.18em, and it turns solid on hover and focus. There are no transitions.

**Measure.** The text column is 720 px wide on desktop and centered.
- It comes from `$site-measure` in the design-variant file (see Tokens), which `styles.scss` turns into Quarto's `$grid-body-width` together with the 16 px page gutters.
- Tablets (768–991 px) get a 670 px column.
- Phones get the full width minus a 16 px gutter on each side, with no horizontal scroll.

The navbar contents align to the text column at every width. Below 576 px the navbar takes two rows: the name and the light/dark toggle on the first, and the three links on the second. That keeps the name whole down to 320 px screens, with no hamburger menu.

**Type.**
- Base size is 18 px (`$font-size-root`), with a 1.65 line-height.
- Headings use a serif at weight 600 and line-height 1.25: h1 up to 2rem, h2 up to 1.4rem, h3 1.15rem. Bootstrap's responsive sizing scales h1 and h2 slightly below 1200 px.
- Headings get no rules or boxes. Section headings (h2) have 2.4rem of space above them, except the first one directly under a page title, which sits closer.
- Keyboard focus on the nav links is a solid 2 px outline. The navbar stays fixed at the top, with no hide-on-scroll animation.
- The type pair is an old-style serif for headings and a humanist sans for the body, both from system fonts, so nothing is downloaded:
  - Headings: Iowan Old Style (Apple), Palatino Linotype (Windows), P052 or URW Palladio (Linux), falling back to `serif`.
  - Body: Seravek (Apple), Segoe UI (Windows), Ubuntu or DejaVu Sans (Linux), falling back to `sans-serif`.

**Headshot.** 100 px wide, 4 px corner radius, left-aligned at the top of the home column.

**Light and dark.** These use Quarto's theme pair (`theme: light/dark`). With `respect-user-color-scheme: true`, the first visit follows the OS setting. The navbar toggle overrides it and is remembered in the browser.

## CV PDF (Typst)

- US Letter, with margins of 0.9 in left/right and 0.75 in top/bottom.
- Libertinus Serif at 11 pt. The font is built into Typst, so the PDF is identical locally and in CI.
- The header is centered: name, affiliation, then the Duke email and the site URL on one line. The email is set once, as `cv-email` in `cv.qmd`, and the URL comes from `site-url`.
- No home location or personal contact details, in the PDF or anywhere on the site (owner, 2026-09-25). The old hand-made PDF's location line is deliberately left out. The one contact detail is the Duke work email, on the CV page and in the PDF (owner, 2026-09-26).
- Section headings are bold small caps over a hairline rule. Links use the site accent `#1a4f8b`.
- Dated entries are Pandoc definition lists (the year, then the entry). A Typst `terms` rule in `cv.qmd` sets them as a year column in the PDF, with lining figures so the years align; `cv.css` does the same on the web page, where phones put the year above the entry.
- There are no page numbers and no title block. The PDF metadata carries the title "Rakeen Tanvir – Curriculum Vitae" and the author "Rakeen Tanvir", so viewers show that instead of the file name (set in `cv.qmd`).
- **Two pages, maximum.** After each CV edit, run a full `quarto render` and check `pdfinfo _site/files/CV_RakeenTanvir.pdf`. (The `files/CV_RakeenTanvir.pdf` in the repo is the old hand-made PDF; see item 6 below.)

## Borrowed from the model sites

| Site | Taken | Left behind |
|---|---|---|
| [sharique.org](https://sharique.org) | 18 px body, one quiet column, hairline link underlines, and a home page that says "my research focuses on…" followed by a short list of bolded focus terms | Its 620 px measure, which is a little narrow for paper titles, and its cream background |
| [dpgross.com](https://dpgross.com) | The paper anatomy (title / coauthors / italic venue / links), a small headshot with a 4 px radius, and a single dark-blue accent | The 7-item nav, the 900 px measure, and the separate pages per paper type |
| [calnewport.com](https://calnewport.com) | A sectioned home: short headed sections that each end in a clear exit link (Research → papers, CV & links → CV) | The grids, cards, hero image, multiple accents and marketing chrome |
| [pascalmichaillat.org](https://pascalmichaillat.org) | Typography: an 18 px / 1.6 rhythm, a measure near 700 px, system fonts with no web-font downloads, and links marked by underline rather than color alone | The cards, pills and rounded 16 px headshot, and the Google Analytics |

None of the four has a dark mode. Ours keeps the same restraint in dark: one accent, no extra colors.

## Hard "no" list

- No cards, grids, carousels, animation or scroll effects.
- No sidebar.
- No icon fonts or social-icon rows; links are words.
- No analytics, trackers, web fonts, CDN scripts or site search.
- No dependencies beyond Quarto (Typst ships with Quarto).

## Open items for the owner

These decisions are still open for the owner. Where one touches page text, it stays as a `<!-- TODO -->` rather than being filled in, per the rule against inventing academic content. Items 1, 3, 4 and 5 are settled and kept for the record.

1. **One-sentence findings and the Research descriptions.** Settled 2026-09-26: the published paper's description and Home finding summarize its published abstract. The working paper has no finding yet ("too early"); whether to soften its description, which already states findings, is a TODO in `papers.yml`.
2. **A higher-resolution headshot**, to be taken or found later. `images/profile.png` is 100×128 px, and it is actually a JPEG, so the site uses a renamed copy, `images/profile.jpg`. A 400 px-wide original would look sharp on high-density screens.
   - **Strip all metadata before committing a new photo.** Phone and camera files carry EXIF data, often including GPS coordinates. The repo is public, and git history keeps every committed version, so never commit the original, even briefly.
   - Check that the exported file has no EXIF, XMP or GPS block. The current file has none.
3. **Working-paper title.** The site uses the submitted title, as listed on the co-author's research page: "…Resilience in the Minibus Taxi Industry in South Africa".
   - The AOM 2026 symposium and `_pages/research.md` use the other name, "…South African Taxi Industry".
   - The title may change again. It lives in two places: `papers.yml` and `cv.qmd`.
4. **AOM 2026 symposium.** Google Scholar lists "Strategy, Technology, and Governance for Social Good in Emerging Markets" (*Academy of Management Proceedings*, 2026), a symposium that includes the working paper. Decided 2026-09-26 by CV convention, since the owner (who did not present) was unsure whether it counts: the co-author presented, so the CV lists it under Presentations marked "presented by co-author", under the title the AOM program used. The Proceedings item is the symposium abstract, credited to all eight participants, so it is not listed as a publication.
5. **Extra profile links.** Settled 2026-09-26: Home links the SSRN author page and the ResearcherID, both taken from the old site's `_config.yml` (the ResearcherID is also on the ORCID record).
6. **Clean-up after cutover:** remove the Jekyll theme files (`_sass/`, `_layouts/`, `_includes/`, `markdown_generator/`, `talkmap*`, unused `_pages/*`, `_config.yml`) and the hand-made `files/CV_RakeenTanvir.pdf`, which the build now regenerates. That old PDF still has the location line. The site no longer serves it (the build publishes the regenerated PDF at the same path), but it stays in the repository until deleted. Deleting it does not remove it from the public git history (commit faa17eb); removing it entirely needs a history rewrite, which is the owner's call.
7. **Optional:** self-host one web font (e.g. Source Serif 4 for headings) for identical rendering across operating systems. It's a small cost; decide after seeing the system fonts.
