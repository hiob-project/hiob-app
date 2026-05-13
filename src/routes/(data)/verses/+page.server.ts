import verses from "$lib/data/verses.json";
import type { Verse } from "./columns.js";
import { preprocessVerseRecord } from "$lib/preprocess";

export function load() {
  return { rows: Object.values(verses).map(preprocessVerseRecord) as Verse[] };
}
