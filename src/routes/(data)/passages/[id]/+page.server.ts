import passages from "$lib/data/passages.json";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { preprocessPassageRecord } from "$lib/data/preprocess";

export const entries = () => {
  // Need this to have a list of paths to prerender for dynamic routes.
  return Object.values(passages).map((passage) => ({ id: passage.hiob_id }));
};

export const load: PageServerLoad = ({ params }) => {
  const passage = Object.values(passages).find((p) => p.hiob_id === params.id);

  if (!passage) {
    throw error(404, "Passage not found");
  }

  return { passage: preprocessPassageRecord(passage) };
};
