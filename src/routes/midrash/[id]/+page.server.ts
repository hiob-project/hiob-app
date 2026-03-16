import midrash from "$lib/data/midrash.json";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = ({ params }) => {
  const midrashItem = Object.values(midrash).find(m => m.hiob_id === params.id);
  
  if (!midrashItem) {
    throw error(404, "Midrash not found");
  }
  
  return { midrash: midrashItem };
};
