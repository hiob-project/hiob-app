import verses from "$lib/data/verses.json";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = ({ params }) => {
  const verse = Object.values(verses).find(v => v.hiob_id === params.id);
  
  if (!verse) {
    throw error(404, "Verse not found");
  }
  
  return { verse };
};