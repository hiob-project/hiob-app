import { projectConfig } from '$lib/project-config.js';

export async function load({ fetch }) {
  const imprint_url = `${projectConfig.imprintUrl}/${projectConfig.redmineId}?locale=en`;
  const res = await fetch(imprint_url);
  const imprint_body = await res.text();
  return { imprint_body };
}