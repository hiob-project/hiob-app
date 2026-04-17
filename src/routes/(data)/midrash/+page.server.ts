import midrash from "$lib/data/midrash.json";
import type { Midrash } from "./columns.js";

export function load() {
  return { rows: Object.values(midrash) as Midrash[] };
}
