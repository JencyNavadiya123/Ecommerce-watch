// "Philipp Plein" -> "philipp-plein", "Guess Pavé" -> "guess-pave"
export const slugify = (text) => text
  .toLowerCase()
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');
