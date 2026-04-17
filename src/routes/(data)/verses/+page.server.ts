import verses from "$lib/data/verses.json";
import type { Verse } from "./columns.js";

export function load() {
  return { rows: Object.values(verses) as Verse[] };
}
