import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderSnippet } from "$lib/components/ui/data-table/index.js";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import DataTableSortButton from "$lib/components/ui/data-table/data-table-sort-button.svelte";

export type Verse = {
  id: number;
  verse: string;
  // quote: string;
  mentions: { id: number; value: string }[];
};

export const columns: ColumnDef<Verse>[] = [
  { accessorKey: "verse", header: ({ column }) => renderComponent(DataTableSortButton, { label: "Verse", onclick: column.getToggleSortingHandler() }) },
  {
    id: "mentions",
    header: ({ column }) =>
      renderComponent(DataTableSortButton, {
        label: "Mentions",
        onclick: column.getToggleSortingHandler(),
      }),
    accessorFn: (row) => row.mentions.map((m) => m.value),
    cell: ({ getValue }) => {
      const values = getValue() as string[];
      const snippet = createRawSnippet<[{ values: string[] }]>((getProps) => ({
        render: () =>
          `<ul class="list-disc list-inside text-sm">
          ${getProps()
            .values.map((v) => `<li>${v}</li>`)
            .join("")}
        </ul>`,
      }));
      return renderSnippet(snippet, { values });
    },
  },
];
