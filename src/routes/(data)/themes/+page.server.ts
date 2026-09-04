import type { PageServerLoad } from "./$types";
import midrash from "$lib/data/reception.json";
import type { Theme } from "./columns.js";
import { preprocessThemeRecord } from "$lib/preprocess";

export function load() {
  return { rows: Object.values(midrash).map(preprocessThemeRecord) as Theme[] };
}
