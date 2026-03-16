import passages from "$lib/data/passages.json";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = ({ params }) => {
  const passage = Object.values(passages).find(p => p.hiob_id === params.id);
  
  if (!passage) {
    throw error(404, "Passage not found");
  }
  
  return { passage };
};
