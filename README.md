# Sitio web de Equinoccial

Este proyecto reemplaza los archivos sueltos (`index.html`, `blog.html`, `privacidad.html`) por una
estructura organizada donde el **header, menú y footer viven en un solo lugar** y se reutilizan en
todas las páginas automáticamente.

---

## 1. Instalar lo necesario (una sola vez)

1. **Visual Studio Code** — https://code.visualstudio.com/ (descarga e instala, todo por defecto).
2. **Node.js** (versión LTS) — https://nodejs.org/ (descarga e instala, todo por defecto).
   Para confirmar que quedó instalado, abre una terminal y escribe:
   ```
   node --version
   ```
   Debe mostrarte un número de versión (ej. `v22.x.x`).
3. **Claude Code** — con Node.js ya instalado, en la terminal escribe:
   ```
   npm install -g @anthropic-ai/claude-code
   ```

## 2. Abrir el proyecto

1. Descomprime la carpeta `equinoccial-site` en tu computadora (por ejemplo, en Documentos).
2. Abre **VS Code**.
3. Ve a `Archivo → Abrir carpeta...` y selecciona la carpeta `equinoccial-site`.
4. Abre la terminal integrada: menú `Terminal → Nueva Terminal` (o `Ctrl + ñ` / `` Ctrl + ` ``).
5. Escribe:
   ```
   claude
   ```
   Esto inicia una sesión de Claude Code **dentro de tu proyecto**. A partir de ahí puedes pedirme
   cambios igual que en el chat de claude.ai, pero yo trabajaré directamente sobre estos archivos.

## 3. Ver el sitio en el navegador

Cada vez que cambies algo en `partials/` o `pages/`, hay que "compilar" el sitio (unir las piezas
en archivos finales dentro de `dist/`):

```
npm run build
```

Luego, para verlo en el navegador con un servidor local:

```
npm run serve
```

Esto abrirá algo como `http://localhost:3000` — ábrelo en tu navegador y ya puedes navegar el sitio
completo (Inicio, Blog, Política de Privacidad) con todos los enlaces funcionando de verdad.

> 💡 Alternativa: instala la extensión **Live Server** en VS Code y haz clic derecho sobre
> `dist/index.html` → "Open with Live Server". Se actualiza solo cada vez que guardas.

## 4. Estructura del proyecto

```
equinoccial-site/
├── partials/
│   ├── layout.html      ← plantilla base (head, body, script)
│   ├── header.html       ← header + menú (desktop y móvil) — EDITA AQUÍ y se actualiza en TODAS las páginas
│   └── footer.html       ← footer + botón de WhatsApp — igual, un solo lugar
├── pages/
│   ├── index.content.html       ← solo el contenido de la página de inicio
│   ├── blog.content.html        ← solo el contenido del blog
│   └── privacidad.content.html  ← solo el contenido de la política de privacidad
├── assets/
│   ├── css/styles.css    ← todos los estilos del sitio
│   ├── js/script.js      ← el menú móvil (hamburguesa) y su lógica
│   └── img/               ← todas las fotos reales de la flota
├── build.js               ← script que arma las páginas finales
├── package.json
└── dist/                   ← 🚫 no se edita a mano — se genera con `npm run build`
    ├── index.html
    ├── blog.html
    ├── privacidad.html
    └── assets/
```

**Regla de oro:** nunca edites nada dentro de `dist/` directamente — esos archivos se
regeneran cada vez que corres `npm run build` y tus cambios se perderían. Edita siempre en
`partials/`, `pages/` o `assets/`.

## 5. Ejemplos de tareas comunes

- **Cambiar el teléfono en todo el sitio** → edítalo en `partials/header.html` y
  `partials/footer.html` (solo esos dos archivos, ya no 3+), luego `npm run build`.
- **Agregar una página nueva** (ej. "Nosotros") → crea `pages/nosotros.content.html`, agrégala a
  la lista `PAGES` en `build.js`, luego `npm run build`.
- **Agregar un artículo al blog** → edita `pages/blog.content.html`.
- **Cambiar colores o estilos** → edita `assets/css/styles.css` (busca `:root` para los colores
  de marca).

## 6. Publicar el sitio en internet

Cuando quieras que el sitio sea visible en una dirección web real (ej. `equinoccial.com`), lo más
sencillo es subir la carpeta `dist/` a un servicio de hosting gratuito como **Netlify** o
**Vercel** (arrastrar y soltar la carpeta `dist/` en su web basta para publicarlo). Puedo
ayudarte con este paso cuando llegue el momento.

## 7. Control de versiones con git (opcional pero recomendado)

Dentro de la carpeta del proyecto, en la terminal:

```
git init
git add .
git commit -m "Primera versión del sitio"
```

Esto guarda un historial de cambios. Puedo ayudarte a conectar esto con GitHub más adelante si
quieres tener respaldo en la nube.

---

¿Dudas o algo no funciona? Pídemelo aquí en el chat, o directamente dentro de Claude Code una vez
que abras el proyecto — en ambos lados puedo ayudarte.
