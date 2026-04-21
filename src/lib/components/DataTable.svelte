<script lang="ts" generics="TData, TValue">
  import { goto } from "$app/navigation";
  import {
    type ColumnDef,
    type PaginationState,
    type SortingState,
    type ColumnFiltersState,
    type VisibilityState,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
  } from "@tanstack/table-core";
  import { createSvelteTable, FlexRender } from "$lib/components/ui/data-table/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  import { Button } from "$lib/components/ui/button/index.js";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
  import ChevronsLeftIcon from "@lucide/svelte/icons/chevrons-left";
  import ChevronsRightIcon from "@lucide/svelte/icons/chevrons-right";
  import DropdownMenuGroup from "./ui/dropdown-menu/dropdown-menu-group.svelte";
  type DataTableProps = {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    getRowHref: (row: TData) => string;
    initialColumnVisibility?: VisibilityState;
  };

  let { data, columns, getRowHref, initialColumnVisibility = {} }: DataTableProps = $props();
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
  let sorting = $state<SortingState>([]);
  let columnFilters = $state<ColumnFiltersState>([]);
  let columnVisibility = $state<VisibilityState>({ ...initialColumnVisibility });

  const table = createSvelteTable({
    get data() {
      return data;
    },
    get columns() {
      return columns;
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        sorting = updater(sorting);
      } else {
        sorting = updater;
      }
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        pagination = updater(pagination);
      } else {
        pagination = updater;
      }
    },
    onColumnFiltersChange: (updater) => {
      if (typeof updater === "function") {
        columnFilters = updater(columnFilters);
      } else {
        columnFilters = updater;
      }
    },
    onColumnVisibilityChange: (updater) => {
      if (typeof updater === "function") {
        columnVisibility = updater(columnVisibility);
      } else {
        columnVisibility = updater;
      }
    },
    state: {
      get pagination() {
        return pagination;
      },
      get sorting() {
        return sorting;
      },
      get columnFilters() {
        return columnFilters;
      },
      get columnVisibility() {
        return columnVisibility;
      },
    },
  });
</script>

<div>
  <div class="rounded-md border">
    <div class="flex justify-end">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline" class="m-2">Columns</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" class="w-fit">
          <DropdownMenu.Group>
            <DropdownMenu.Label>Toggle columns</DropdownMenu.Label>
            <DropdownMenu.Separator />
            {#each table.getAllColumns().filter((col) => col.getCanHide()) as column (column.id)}
              <DropdownMenu.CheckboxItem class="capitalize" bind:checked={() => column.getIsVisible(), (v) => column.toggleVisibility(!!v)}>
                {column.id}
              </DropdownMenu.CheckboxItem>
            {/each}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
    <Table.Root>
      <Table.Header>
        {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
          <Table.Row>
            {#each headerGroup.headers as header (header.id)}
              <Table.Head colspan={header.colSpan} class="text-center border-r last:border-r-0 bg-primary text-primary-foreground hover:bg-primary/80">
                {#if !header.isPlaceholder}
                  <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
                {/if}
              </Table.Head>
            {/each}
          </Table.Row>
        {/each}
      </Table.Header>
      <Table.Body>
        {#each table.getRowModel().rows as row (row.id)}
          <Table.Row data-state={row.getIsSelected() && "selected"} class="cursor-pointer even:bg-secondary/50" onclick={() => goto(getRowHref(row.original))}>
            {#each row.getVisibleCells() as cell (cell.id)}
              <Table.Cell class="border-r last:border-r-0">
                <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
              </Table.Cell>
            {/each}
          </Table.Row>
        {:else}
          <Table.Row>
            <Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>

  <div class="flex items-center justify-between px-2 py-4">
    <div class="text-muted-foreground flex-1 text-sm">
      Showing {table.getFilteredRowModel().rows.length} of
      {table.getCoreRowModel().rows.length} row(s)
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <p class="text-sm font-medium">Rows per page</p>
      <Select.Root
        allowDeselect={false}
        type="single"
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <Select.Trigger class="h-8 w-[70px]">
          {String(table.getState().pagination.pageSize)}
        </Select.Trigger>
        <Select.Content side="top">
          {#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
            <Select.Item value={`${pageSize}`}>
              {pageSize}
            </Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>
    <div class="flex w-[100px] items-center justify-center text-sm font-medium">
      Page {table.getState().pagination.pageIndex + 1} of
      {table.getPageCount()}
    </div>
    <div class="flex items-center space-x-2">
      <Button variant="outline" class="hidden size-8 p-0 lg:flex" onclick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
        <span class="sr-only">Go to first page</span>
        <ChevronsLeftIcon />
      </Button>
      <Button variant="outline" class="size-8 p-0" onclick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        <span class="sr-only">Go to previous page</span>
        <ChevronLeftIcon />
      </Button>
      <Button variant="outline" class="size-8 p-0" onclick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        <span class="sr-only">Go to next page</span>
        <ChevronRightIcon />
      </Button>
      <Button variant="outline" class="hidden size-8 p-0 lg:flex" onclick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
        <span class="sr-only">Go to last page</span>
        <ChevronsRightIcon />
      </Button>
    </div>
  </div>
</div>
