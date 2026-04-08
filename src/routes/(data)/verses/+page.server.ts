import verses from "$lib/data/verses.json";

export function load() {
  return { rows: Object.values(verses) };
}