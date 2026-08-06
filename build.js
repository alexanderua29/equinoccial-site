/**
 * build.js
 * Ensambla las páginas finales (dist/*.html) a partir de:
 *   - partials/layout.html  (plantilla base: <head>, <body>, script)
 *   - partials/header.html  (header + menú móvil, compartido)
 *   - partials/footer.html  (footer + botón WhatsApp, compartido)
 *   - pages/*.content.html  (contenido único de cada página)
 *
 * Uso:
 *   node build.js
 *
 * Vuelve a correr este comando cada vez que edites algo en partials/ o pages/.
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");

// Define aquí cada página del sitio: archivo de salida, título y descripción SEO
const PAGES = [
  {
    contentFile: "pages/index.content.html",
    outputFile: "index.html",
    title: "Equinoccial — Maniobras e Izajes",
    description:
      "Alquiler de grúas telescópicas, camiones grúa e izajes industriales en Ambato y a nivel nacional. Más de 25 años de experiencia.",
  },
  {
    contentFile: "pages/blog.content.html",
    outputFile: "blog.html",
    title: "Blog — Equinoccial Maniobras e Izajes",
    description: "Noticias, casos de proyectos y consejos técnicos de Equinoccial.",
  },
  {
    contentFile: "pages/privacidad.content.html",
    outputFile: "privacidad.html",
    title: "Política de Privacidad — Equinoccial",
    description: "Política de privacidad y tratamiento de datos personales de Equinoccial.",
  },
];

function readFile(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), "utf-8");
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function build() {
  const layout = readFile("partials/layout.html");
  const header = readFile("partials/header.html");
  const footer = readFile("partials/footer.html");

  // Limpiar y recrear dist/
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  for (const page of PAGES) {
    const content = readFile(page.contentFile);
    const isHome = page.outputFile === "index.html";
    const headerForPage = isHome ? header.replace(/href="index\.html#/g, 'href="#') : header;
    const footerForPage = isHome ? footer.replace(/href="index\.html#/g, 'href="#') : footer;
    const html = layout
      .replace("{{TITLE}}", page.title)
      .replace("{{DESCRIPTION}}", page.description)
      .replace("{{HEADER}}", headerForPage)
      .replace("{{CONTENT}}", content)
      .replace("{{FOOTER}}", footerForPage);

    fs.writeFileSync(path.join(DIST, page.outputFile), html, "utf-8");
    console.log("✓ Generado dist/" + page.outputFile);
  }

  // Copiar assets (css, js, imágenes) a dist/
  copyDir(path.join(ROOT, "assets"), path.join(DIST, "assets"));
  console.log("✓ Assets copiados a dist/assets");

  console.log("\nListo. Abre dist/index.html en tu navegador, o usa un servidor local (ver README.md).");
}

build();
