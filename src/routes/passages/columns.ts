import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderSnippet } from "$lib/components/ui/data-table/index.js";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import DataTableSortButton from "$lib/components/ui/data-table/data-table-sort-button.svelte";
function textCell(maxWidth = "max-w-sm") {
  return ({ getValue }: { getValue: () => unknown }) => {
    const snippet = createRawSnippet<[{ text: string }]>((getProps) => ({
      render: () => `<div class="${maxWidth} whitespace-normal">${getProps().text}</div>`,
    }));
    return renderSnippet(snippet, { text: getValue() as string });
  };
}
export type Passage = {
  id: number;
  mention: { id: number; value: string }[];
  midrash: { id: number; value: string }[];
  passages: string;
  verses: { id: number; value: string }[];
  quote: string;
  abstract: string;
  decontextualized_reception: { id: number; value: string }[];
  narrative_reception: { id: number; value: string }[];
  points_of_note: string;
  classic_parallels: string;
  quotation_and_speakers: { id: number; value: string }[];
};

export const columns: ColumnDef<Passage>[] = [
  { accessorKey: "mention", header: "Mention", accessorFn: (row) => row.mention[0]?.value ?? "" },
  // { accessorKey: "midrash", header: "Midrash", accessorFn: (row) => row.midrash[0]?.value ?? "" },
  // { accessorKey: "passages", header: "Passages" },
  { accessorKey: "verses", header: "Verses", accessorFn: (row) => row.verses.map((v) => v.value).join(", ") },
  { accessorKey: "quotation_and_speakers", header: "Quotation and Speakers", accessorFn: (row) => row.quotation_and_speakers.map((qs) => qs.value).join(", ") },
  {
    accessorKey: "quote",
    header: "Quote",
    cell: ({ getValue }) => {
      const snippet = createRawSnippet<[{ text: string }]>((getProps) => ({
        render: () => `<div class="max-w-sm whitespace-normal text-right" dir="rtl">${getProps().text}</div>`,
      }));
      return renderSnippet(snippet, { text: getValue() as string });
    },
  },
  { accessorKey: "abstract", header: "Abstract", cell: textCell() },
  // { accessorKey: "decontextualized_reception", header: "Decontextualized Reception", accessorFn: (row) => row.decontextualized_reception.map((dr) => dr.value).join(", ") },
  // { accessorKey: "narrative_reception", header: "Narrative Reception", accessorFn: (row) => row.narrative_reception.map((nr) => nr.value).join(", ") },
  // { accessorKey: "classic_parallels", header: "Classic Parallels" },
//   { accessorKey: "points_of_note", header: "Points of Note" },
];
