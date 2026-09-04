import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderComponent, renderSnippet, columnHeader } from "$lib/components/ui/data-table/index.js";
import { badgeVariants } from "$lib/components/ui/badge/badge.svelte";
import { getBadgeColor, sortStringsNatural } from "$lib/utils.js";

export type Passage = {
  id: number;
  hiob_id: string;
  mention: { id: number; value: string }[];
  midrash: { id: number; value: string }[];
  passages: string;
  verses: { id: number; value: string }[];
  quote: string;
  commentary: string;
  decontextualized_reception: { id: number; value: string }[];
  narrative_reception: { id: number; value: string }[];
  points_of_note: string;
  classic_parallels: string;
  quotation_and_speakers: { id: number; value: string }[];
};

export const columns: ColumnDef<Passage>[] = [
  { accessorKey: "mention", ...columnHeader("Mention"), accessorFn: (row) => row.mention[0]?.value ?? "" },
  { accessorKey: "verses", ...columnHeader("Verses"), accessorFn: (row) => row.verses.map((v) => v.value).join(", "), size: 100 },
  {
    id: "quotation_and_speakers",
    ...columnHeader("Quotation and Speakers"),
    accessorFn: (row) => row.quotation_and_speakers.map((qs) => qs.value),
    cell: ({ getValue }) => {
      const values = sortStringsNatural(getValue() as string[]);
      const snippet = createRawSnippet<[{ values: string[] }]>((getProps) => ({
        render: () =>
          `<div class="flex flex-wrap gap-1">${getProps()
            .values.map((v) => {
              const c = getBadgeColor(v);
              return `<span class="${badgeVariants({ variant: "secondary" })}" style="background-color:${c.bg};color:${c.text}">${v}</span>`;
            })
            .join("")}</div>`,
      }));
      return renderSnippet(snippet, { values });
    },
    size: 150,
  },
  {
    accessorKey: "quote",
    header: "Quote",
    size: 350,
    cell: ({ getValue }) => {
      const snippet = createRawSnippet<[{ text: string }]>((getProps) => ({
        render: () => `<div class="w-full whitespace-normal text-right" dir="rtl">${getProps().text}</div>`,
      }));
      return renderSnippet(snippet, { text: getValue() as string });
    },
  },
  { accessorKey: "commentary", header: "Commentary", size: 350 },
  { accessorKey: "decontextualized_reception", ...columnHeader("Decontextualized reception"), accessorFn: (row) => row.decontextualized_reception.map((dr) => dr.value).join(", ") },
  { accessorKey: "narrative_reception", ...columnHeader("Narrative Reception"), accessorFn: (row) => row.narrative_reception.map((nr) => nr.value).join(", ") },
  { accessorKey: "classic_parallels", header: "Classic Parallels" },
  { accessorKey: "points_of_note", header: "Points of Note", size: 350 },
];
