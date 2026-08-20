// Inlines the built JS bundle into index.html by hand, with explicit UTF-8
// handling throughout. (vite-plugin-singlefile was tried first but corrupts
// output under this project's Rolldown-based build — the inlined script
// came out 3.4x the raw chunk's byte size and failed to parse, a classic
// encoding-mangling signature.)
//
// Two things matter for a script that has to run via file://, not just
// http://:
// 1. No type="module" — Chrome/Edge block module scripts under file://
//    (module fetches require CORS, which the local filesystem can't
//    provide). Safe here since rollupOptions.output.format is "iife", so
//    the bundle has no import/export statements.
// 2. Placed at the end of <body>, after #root exists — module scripts are
//    auto-deferred per spec (run after parsing); moving the plain script
//    to the end reproduces that timing without relying on the "defer"
//    attribute, which has no effect on inline (src-less) scripts.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist-standalone')
const htmlPath = join(outDir, 'index.html')
const html = readFileSync(htmlPath, 'utf-8')

const scriptTagMatch = html.match(
  /<script type="module" crossorigin src="\.\/(assets\/[^"]+\.js)"><\/script>/,
)
if (!scriptTagMatch) {
  throw new Error(
    'fix-standalone-html: expected a <script type="module" src="./assets/*.js"> tag — build output may have changed.',
  )
}
const [scriptTag, scriptRelPath] = scriptTagMatch
const scriptPath = join(outDir, scriptRelPath)
const scriptContent = readFileSync(scriptPath, 'utf-8')

const inlineScript = `<script>${scriptContent}</script>`

// Deliberately not using String.prototype.replace() with a string
// replacement argument here: when the replacement text is large/arbitrary
// (as scriptContent is — 230KB of minified code full of "$$typeof" etc.),
// replace() reinterprets "$$", "$&", "$`", "$'" sequences within it as
// special patterns and silently corrupts the output. Plain slicing avoids
// that footgun entirely.
const withoutHeadScript = html.replace(scriptTag, '')
const bodyCloseIndex = withoutHeadScript.indexOf('</body>')
const fixed =
  withoutHeadScript.slice(0, bodyCloseIndex) +
  `  ${inlineScript}\n  ` +
  withoutHeadScript.slice(bodyCloseIndex)

writeFileSync(htmlPath, fixed)
rmSync(join(outDir, 'assets'), { recursive: true, force: true })

console.log(
  `fix-standalone-html: inlined ${scriptRelPath} (${scriptContent.length} chars) as a classic script at end of <body>`,
)
