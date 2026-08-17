import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
const main = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')

test('renders the editorial masthead and sequential section indices', () => {
  assert.match(app, /className="site-masthead"/)
  for (const index of ['01', '02', '03', '04', '05', '06']) {
    assert.match(app, new RegExp(`eyebrow="${index}"`))
  }
})

test('defines the paper theme and local grain treatment', () => {
  for (const token of ['--paper:', '--paper-green:', '--ink:', '--accent:', '--rule:']) {
    assert.match(styles, new RegExp(token))
  }
  assert.match(styles, /paper-grain\.png/)
  assert.match(styles, /pointer-events:\s*none/)
  assert.match(styles, /prefers-reduced-motion:\s*reduce/)
})

test('keeps green on the hero and uses warm paper for all other page regions', () => {
  assert.match(app, /id="results"[^>]*className="project-section section-white results-section"/)
  assert.match(styles, /body\s*\{[^}]*background:\s*var\(--paper-soft\)/s)
  assert.match(styles, /\.site-masthead\s*\{[^}]*background:\s*var\(--paper-soft\)/s)
  assert.match(styles, /\.paper-hero\s*\{[^}]*background:\s*var\(--paper-green\)/s)
  assert.match(styles, /\.section-white\s*\{[^}]*background:\s*var\(--paper-soft\)/s)
  assert.match(styles, /\.section-tint\s*\{[^}]*background:\s*var\(--paper-soft\)/s)
  assert.match(styles, /\.citation-section\s*\{[^}]*background:\s*var\(--paper-soft\)/s)
  assert.match(styles, /\.footer\s*\{[^}]*background:\s*var\(--paper-soft\)/s)
  assert.match(styles, /\.results-section \.project-heading \.MuiTypography-h2\s*\{[^}]*color:\s*var\(--accent\)/s)
  assert.match(styles, /\.benchmark-item \.benchmark-value\.MuiTypography-body1\s*\{[^}]*color:\s*var\(--accent\)/s)
  assert.match(styles, /\.bibtex\s*\{[^}]*background:\s*var\(--charcoal\)/s)
})

test('bundles a non-empty PNG grain asset', () => {
  const grain = readFileSync(new URL('../src/assets/paper-grain.png', import.meta.url))
  assert.ok(grain.length > 512)
  assert.deepEqual([...grain.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10])
})

test('links the official arXiv record and exposes a complete arXiv citation', () => {
  assert.match(app, /https:\/\/arxiv\.org\/abs\/2608\.06374/)
  assert.match(app, /https:\/\/arxiv\.org\/pdf\/2608\.06374/)
  assert.doesNotMatch(app, /asset\('DyPES-VLA\.pdf'\)/)
  assert.match(app, /eprint=\{2608\.06374\}/)
  assert.match(app, /archivePrefix=\{arXiv\}/)
  assert.match(app, /primaryClass=\{cs\.RO\}/)
  assert.match(main, /MuiButton:[\s\S]*?borderRadius:\s*4/)
  assert.match(styles, /\.paper-actions \.MuiButton-root\s*\{[^}]*border-radius:\s*4px/s)
  assert.match(styles, /\.footer \.MuiButton-root\s*\{[^}]*border-radius:\s*4px/s)
})

test('renders code coming soon as disabled controls without links', async () => {
  const root = fileURLToPath(new URL('../', import.meta.url))
  const vite = await createServer({
    root,
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true },
  })

  try {
    const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
    const markup = renderToStaticMarkup(createElement(App))
    const label = 'Code (coming soon)'
    const positions = []
    let offset = markup.indexOf(label)

    while (offset !== -1) {
      positions.push(offset)
      offset = markup.indexOf(label, offset + label.length)
    }

    assert.equal(positions.length, 2)
    for (const position of positions) {
      const buttonStart = markup.lastIndexOf('<button', position)
      const buttonEnd = markup.indexOf('>', buttonStart)
      const openingTag = markup.slice(buttonStart, buttonEnd + 1)

      assert.ok(buttonStart >= 0, 'code status must render inside a button')
      assert.match(openingTag, /\sdisabled(?:="")?/)
      assert.doesNotMatch(openingTag, /\shref=/)
    }
  } finally {
    await vite.close()
  }
})
