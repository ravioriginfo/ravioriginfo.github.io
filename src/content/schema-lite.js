// Tiny helpers shared with the client bundle (keeps zod out of the browser).
export const slugFromPath = (path) => path.split(/[\\/]/).pop().replace(/\.md$/, '')
