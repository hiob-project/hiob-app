import passages from "$lib/data/passages.json";
import type { Passage } from "./columns.js";

export function load() {
  return { rows: Object.values(passages) as Passage[] };
}
