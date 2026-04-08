import midrash from "$lib/data/midrash.json";

export function load() {
  return { rows: Object.values(midrash)};
}