import midrash from "$lib/data/midrash.json";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { preprocessMidrashRecord } from "$lib/preprocess";

export const entries = () => {
  // Need this to have a list of paths to prerender for dynamic routes.
  return Object.values(midrash).map((item) => ({ id: item.hiob_id }));
};

export const load: PageServerLoad = ({ params }) => {
  const midrashItem = Object.values(midrash).find((m) => m.hiob_id === params.id);

  if (!midrashItem) {
    throw error(404, "Midrash not found");
  }

  return { midrash: preprocessMidrashRecord(midrashItem) };
};
