// Shared fuzzy-ish search used by the command palette and the Projects page.
// Every word in the query must appear somewhere (in any order), and results
// are ranked so title matches beat type/tech matches, which beat body text.

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9+#.]+/g, ' ').trim()

export const tokenize = (q) => normalize(q).split(' ').filter(Boolean)

/**
 * @param {{ title: string, keywords?: string[], text?: string[] }} fields
 * @param {string[]} tokens
 * @returns {number} 0 = no match, higher = more relevant
 */
export function score({ title, keywords = [], text = [] }, tokens) {
  if (!tokens.length) return 1
  const t = normalize(title)
  const k = normalize(keywords.join(' '))
  const b = normalize(text.join(' '))
  let total = 0
  for (const tok of tokens) {
    let s = 0
    if (t.split(' ').some((w) => w.startsWith(tok))) s = 10
    else if (t.includes(tok)) s = 7
    else if (k.split(' ').some((w) => w.startsWith(tok))) s = 4
    else if (k.includes(tok)) s = 3
    else if (b.includes(tok)) s = 1
    if (!s) return 0 // every word must match somewhere
    total += s
  }
  if (t.startsWith(tokens.join(' '))) total += 5 // whole query is a title prefix
  return total
}

export const projectFields = (p) => ({
  title: p.title,
  keywords: [p.slug.replace(/-/g, ' '), p.type, ...p.tags],
  text: [p.summary, ...p.features, ...(p.highlights ?? [])],
})
