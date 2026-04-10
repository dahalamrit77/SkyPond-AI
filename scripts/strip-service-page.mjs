/**
 * Strips local C, Navbar, Footer, and global <style> from service page sources.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

/** Removes `const C = { ... };` with brace matching (safe if comments mention `};`). */
function stripConstC(text) {
  const needle = 'const C = '
  const start = text.indexOf(needle)
  if (start === -1) throw new Error('Missing const C block')
  const braceOpen = text.indexOf('{', start)
  if (braceOpen === -1) throw new Error('const C has no opening brace')
  let depth = 0
  for (let i = braceOpen; i < text.length; i++) {
    const ch = text[i]
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) {
        let end = i + 1
        while (end < text.length && /\s/.test(text[end])) end++
        if (text[end] === ';') end++
        while (end < text.length && (text[end] === '\n' || text[end] === '\r')) end++
        return text.slice(0, start) + text.slice(end)
      }
    }
  }
  throw new Error('Unterminated const C object')
}

function stripNavbarAndFooter(lines) {
  const iFoot = lines.findIndex((l) => l.startsWith('function Footer('))
  const iExp = lines.findIndex((l) => l.startsWith('export default'))
  if (iFoot === -1 || iExp === -1 || iExp <= iFoot) {
    throw new Error('Could not find Footer/export boundaries')
  }
  let out = lines.slice(0, iFoot).concat(lines.slice(iExp))
  const iNav = out.findIndex((l) => l.startsWith('function Navbar('))
  const iHero = out.findIndex((l) => l.startsWith('function Hero('))
  if (iNav === -1 || iHero === -1 || iHero <= iNav) {
    throw new Error('Could not find Navbar/Hero boundaries')
  }
  out = out.slice(0, iNav).concat(out.slice(iHero))
  return out
}

function stripStyleBlock(text) {
  const a = text.indexOf('<style>{`')
  if (a === -1) return text
  const b = text.indexOf('`}</style>', a)
  if (b === -1) throw new Error('Unclosed <style> block')
  return text.slice(0, a) + text.slice(b + '`}</style>'.length).replace(/^\s*\n/, '')
}

function processFile(relSrc, relDest, exportFnName) {
  let text = fs.readFileSync(path.join(root, relSrc), 'utf8')
  text = stripConstC(text)
  let lines = text.split(/\r?\n/)
  lines = stripNavbarAndFooter(lines)
  text = lines.join('\n')
  text = stripStyleBlock(text)

  const header = `import C from '../../tokens.js'
import { useState, useEffect, useRef } from "react";
import { Navbar } from '../../components/Navbar.jsx'
import { Footer } from '../../components/Footer.jsx'

`
  text = text.replace(/^import \{ useState, useEffect, useRef \} from "react";\s*\n/, header)
  if (!text.startsWith("import C from '../../tokens.js'")) {
    throw new Error('Header replace failed for ' + relDest)
  }

  text = text.replace(/export default function \w+\(\)/, `export default function ${exportFnName}()`)
  fs.writeFileSync(path.join(root, relDest), text, 'utf8')
  console.log('Wrote', relDest)
}

const jobs = [
  ['_source_files/service_custom_development.jsx', 'src/pages/services/CustomDevelopment.jsx', 'CustomDevelopment'],
  ['_source_files/service_data_analytics.jsx', 'src/pages/services/DataAnalytics.jsx', 'DataAnalytics'],
  ['_source_files/service_ltc_pharmacy_it.jsx', 'src/pages/services/LTCPharmacyIT.jsx', 'LTCPharmacyIT'],
  ['_source_files/service_microsoft_cloud.jsx', 'src/pages/services/MicrosoftCloud.jsx', 'MicrosoftCloud'],
  ['_source_files/service_pointclickcare.jsx', 'src/pages/services/PointClickCare.jsx', 'PointClickCareIntegration'],
]

for (const [a, b, c] of jobs) {
  processFile(a, b, c)
}
