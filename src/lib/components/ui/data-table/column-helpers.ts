import type { HeaderContext } from "@tanstack/table-core";
import { renderComponent } from "./render-helpers.js";
import DataTableSortButton from "./data-table-sort-button.svelte";

export function columnHeader<TData, TValue>(label: string) {
  return {
    meta: { label },
    header: ({ column }: HeaderContext<TData, TValue>) => {
      const canSort = column.getCanSort();
      return renderComponent(DataTableSortButton, {
        label,
        canSort,
        sortDirection: column.getIsSorted(),
        onclick: canSort ? column.getToggleSortingHandler() : undefined,
      });
    },
  };
}
