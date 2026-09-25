// Post-render step (runs on the Deno that ships with Quarto; no extra dependency).
//
// Quarto's alias pages (the old URLs listed under `aliases:` in index.qmd, research.qmd and
// cv.qmd) redirect with JavaScript only, so a visitor without JavaScript gets a blank page.
// Give each one a fallback: a meta refresh and a plain link, both inside <noscript>, so
// Quarto's script still does the redirect whenever JavaScript runs (it also carries over a
// #fragment or ?query; the fallback lands at the top of the new page). Also writes the
// targets with forward slashes (renders on Windows emit backslashes). Pages already updated
// by an earlier run are left as they are. If a Quarto upgrade changes the alias pages, this
// warns and skips them rather than failing the build.
const outDir = Deno.env.get("QUARTO_PROJECT_OUTPUT_DIR") ?? "_site";
const redirectsLine = /var redirects = (\{.*\});/;

function* htmlFiles(dir: string): Generator<string> {
  for (const entry of Deno.readDirSync(dir)) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory && entry.name !== "site_libs") yield* htmlFiles(path);
    else if (entry.isFile && entry.name.endsWith(".html")) yield path;
  }
}

const escapeAttr = (s: string) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

let found = 0;
let updated = 0;
for (const file of htmlFiles(outDir)) {
  const html = Deno.readTextFileSync(file);
  const match = html.includes("<title>Redirect</title>") ? html.match(redirectsLine) : null;
  if (!match) continue;
  found++;

  let redirects: Record<string, string>;
  try {
    redirects = JSON.parse(match[1]);
  } catch {
    console.warn(`alias-redirects: could not read the redirect map in ${file}; left unchanged.`);
    continue;
  }
  for (const key in redirects) redirects[key] = redirects[key].replaceAll("\\", "/");
  // Functions as replacements, so a "$" in a target is inserted literally.
  let out = html.replace(redirectsLine, () => `var redirects = ${JSON.stringify(redirects)};`);

  const target = redirects[""];
  if (target && !out.includes('http-equiv="refresh"')) {
    const href = escapeAttr(target);
    out = out
      .replace("</head>", () =>
        `  <noscript><meta http-equiv="refresh" content="0; url=${href}"></noscript>\n</head>`)
      .replace("<body>", () =>
        `<body>\n<noscript><p>This page has moved: <a href="${href}">continue to the new page</a>.</p></noscript>`);
  }

  if (out !== html) {
    Deno.writeTextFileSync(file, out);
    updated++;
  }
}
console.log(`alias-redirects: ${found} alias pages, ${updated} updated`);
if (found === 0) {
  console.warn("alias-redirects: no alias pages found; has Quarto's alias page format changed?");
}
