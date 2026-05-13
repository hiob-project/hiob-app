import midrash from "$lib/data/midrash.json";
import type { Midrash } from "./columns.js";
import { preprocessMidrashRecord } from "$lib/preprocess";

export function load() {
  return { rows: Object.values(midrash).map(preprocessMidrashRecord) as Midrash[] };
}
