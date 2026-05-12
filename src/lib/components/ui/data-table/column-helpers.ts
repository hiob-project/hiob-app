import type { HeaderContext } from "@tanstack/table-core";
import { renderComponent } from "./render-helpers.js";
import DataTableSortButton from "./data-table-sort-button.svelte";

export function sortableHeader<TData, TValue>(label: string) {
  return {
    meta: { label },
    header: ({ column }: HeaderContext<TData, TValue>) =>
      renderComponent(DataTableSortButton, {
        label,
        sortDirection: column.getIsSorted(),
        onclick: column.getToggleSortingHandler(),
      }),
  };
}
