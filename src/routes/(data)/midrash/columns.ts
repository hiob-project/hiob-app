import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderComponent, renderSnippet, columnHeader } from "$lib/components/ui/data-table/index.js";
import { sortStringsNatural } from "$lib/utils";

export type Midrash = {
  id: number;
  hiob_id: string;
  name: string;
  mentions: { id: number; value: string }[];
};

export const columns: ColumnDef<Midrash>[] = [
  { accessorKey: "name", ...columnHeader("Name") },
  {
    id: "mentions",
    header: "Mentions",
    accessorFn: (row) => row.mentions.map((m) => m.value),
    cell: ({ getValue }) => {
      const values = sortStringsNatural(getValue() as string[]);
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
    ...columnHeader("# Mentions"),
    accessorFn: (row) => row.mentions.length,
  },
];
