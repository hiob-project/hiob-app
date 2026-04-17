import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderSnippet } from "$lib/components/ui/data-table/index.js";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import DataTableSortButton from "$lib/components/ui/data-table/data-table-sort-button.svelte";

export type Midrash = {
  id: number;
  hiob_id: string;
  name: string;
  mentions: { id: number; value: string }[];
};

export const columns: ColumnDef<Midrash>[] = [
  { accessorKey: "name", header: ({ column }) => renderComponent(DataTableSortButton, { label: "Name", onclick: column.getToggleSortingHandler() }) },
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
  {
    id: "num_mentions",
    header: ({ column }) =>
      renderComponent(DataTableSortButton, {
        label: "# Mentions",
        onclick: column.getToggleSortingHandler(),
      }),
    accessorFn: (row) => row.mentions.length,
  },
];
