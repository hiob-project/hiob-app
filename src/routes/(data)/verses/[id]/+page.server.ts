import verses from "$lib/data/verses.json";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const entries = () => {
  // Need this to have a list of paths to prerender for dynamic routes.
  return Object.values(verses).map(verse => ({ id: verse.hiob_id }));
};

export const load: PageServerLoad = ({ params }) => {
  const verse = Object.values(verses).find(v => v.hiob_id === params.id);
  
  if (!verse) {
    throw error(404, "Verse not found");
  }
  
  return { verse };
};