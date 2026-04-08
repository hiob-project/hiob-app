import passages from "$lib/data/passages.json";

export function load() {
  return { rows: Object.values(passages) };
}