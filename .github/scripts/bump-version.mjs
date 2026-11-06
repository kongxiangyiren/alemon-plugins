import { readFileSync, writeFileSync } from 'node:fs'

const files = ['.claude-plugin/marketplace.json', '.codex-plugin/plugin.json']

const bump = version => {
  const match = /^(\d+)\.(\d+)\.(\d+)/.exec(version ?? '')
  if (!match) return '0.0.1'
  return `${match[1]}.${match[2]}.${Number(match[3]) + 1}`
}

for (const file of files) {
  const raw = readFileSync(file, 'utf8')
  const current = JSON.parse(raw).version
  const next = bump(current)
  const pattern = new RegExp(`("version"\\s*:\\s*)"${current.replace(/\./g, '\\.')}"`)
  if (!pattern.test(raw)) {
    throw new Error(`Cannot locate top-level version in ${file}`)
  }
  writeFileSync(file, raw.replace(pattern, `$1"${next}"`))
  console.log(`${file}: ${current} -> ${next}`)
}
