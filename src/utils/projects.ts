export const generateSlug = (title: String) => {
  return title
    .toLowerCase()
    .normalize("NFD") // Decompose accented letters into their base characters and diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritic marks
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)/g, ""); // Remove leading or trailing hyphens
};
