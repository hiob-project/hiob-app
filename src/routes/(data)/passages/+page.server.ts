import passages from "$lib/data/passages.json";
import type { Passage } from "./columns.js";
import { preprocessPassageRecord } from "$lib/preprocess";

export function load() {
  return { rows: Object.values(passages).map(preprocessPassageRecord) as Passage[] };
}
