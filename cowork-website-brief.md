# Cowork Project Brief — Academic Website

> **How to use this file:** Paste its contents into Cowork's **folder instructions**
> when you connect your repo folder (Settings → Cowork, or when you select the
> folder), so Claude sees this context every session. You can also keep it in the
> repo as a reference.
> ⚠️ If your site is **Jekyll** and you save this file inside the repo, add its
> filename to the `exclude:` list in `_config.yml` so it isn't published as a page.

---

## What this is

This folder is the source for **Rakeen Tanvir**'s academic personal website — a
static site hosted on **GitHub Pages** at **[https://rakeentanvir.com]** via a
custom domain. The goal of this project is to improve the site's design, content
presentation, and usability **without breaking its hosting or fabricating any
academic information**.

---

## Ground rules (read before editing anything)

**Protect the deployment**
- **Never delete, rename, or modify the `CNAME` file.** It holds the custom
  domain; removing it breaks the site's URL.
- Don't touch the `.git/` directory or `.gitignore` unless I explicitly ask.
- Edit **source files only**, never build output. For Jekyll that means leave
  `_site/` alone (it's regenerated on every build).

**Don't publish on your own**
- Make and stage edits, but **do not commit or push to GitHub.** I review changes
  in GitHub Desktop and push them myself, because pushing redeploys the live,
  public site.
- When you think a change is ready, tell me — don't deploy it yourself.

**Preserve what works**
- This site likely uses a template (e.g. academicpages, Minimal Mistakes, al-folio,
  or Wowchemy/Hugo). **Match the existing design language and structure** — don't
  redesign from scratch or swap frameworks unless I ask.
- Don't add new external dependencies, fonts, CDNs, analytics, or trackers without
  asking first.

**Never fabricate academic content**
- Do not invent, embellish, or alter publications, talks, awards, affiliations,
  titles, dates, co-authors, or any factual claim about me or my work. If a section
  looks incomplete, leave a clearly marked `<!-- TODO: ask me -->` instead of
  filling it in with plausible-sounding text.

---

## Local preview

First, identify the stack:
- A `_config.yml` → **Jekyll**
- A top-level `index.html` with no build config → **plain HTML**
- A `config.toml` / `config.yaml` with a `themes/` folder → **Hugo**

Then preview:
- **Plain HTML:** open `index.html` directly, or run `python3 -m http.server` from
  the folder and visit `http://localhost:8000`.
- **Jekyll:** run `bundle install` once, then `bundle exec jekyll serve` and visit
  `http://localhost:4000`. If Ruby/Bundler isn't set up, set it up and tell me what
  you did.
- **Hugo:** run `hugo server -D` and visit `http://localhost:1313`.

Always show me the local preview (or a screenshot) before I push.

---

## Publishing flow

1. You edit source files locally.
2. I preview locally and review the diff in GitHub Desktop.
3. I commit and push. GitHub Pages rebuilds and the live site updates in ~1–2 min.

---

## What I'd like to improve

<!-- Keep the ones you care about, delete the rest, add your own -->
- Visual design: typography, spacing, color, overall polish
- Mobile responsiveness
- Publications page: clean formatting, links to PDF / DOI / arXiv
- Navigation and information architecture
- Accessibility: semantic HTML, alt text, color contrast
- SEO & social previews: page titles, meta description, Open Graph tags
- Performance: compress oversized images, lazy-load
- New sections: News/updates, Teaching, Talks, CV, Students
- Optional dark mode

---

## Starter tasks (copy one into the chat to begin)

**1. Survey first — recommended starting point**

> Don't change anything yet. Take inventory of this repository: identify whether
> it's Jekyll, Hugo, or plain HTML; list the pages and what each contains; note the
> template/theme in use; and confirm the `CNAME` file and custom domain. Then set up
> local preview so I can see the current site, and give me a short prioritized list
> of concrete improvements grouped by effort. Wait for my go-ahead before editing.

**2. A focused improvement — after the survey**

> Improve the typography and spacing on the homepage so it feels cleaner and more
> modern, staying within the existing theme's style. Show me a local preview of the
> before and after. Don't commit or push — I'll review and deploy.

**3. Publications cleanup**

> Reformat the publications page into a clean, scannable list grouped by year, with
> links to the PDF / DOI / arXiv where those already exist in the source. Do not add,
> remove, or alter any publication or its metadata — only restyle what's already there.
