import midrash from "$lib/data/reception.json";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { preprocessThemeRecord } from "$lib/preprocess";

export const entries = () => {
  // Need this to have a list of paths to prerender for dynamic routes.
  return Object.values(midrash).map((item) => ({ id: item.hiob_id }));
};

export const load: PageServerLoad = ({ params }) => {
  const themeItem = Object.values(midrash).find((m) => m.hiob_id === params.id);

  if (!themeItem) {
    throw error(404, "Theme not found");
  }

  return { theme: preprocessThemeRecord(themeItem) };
};
