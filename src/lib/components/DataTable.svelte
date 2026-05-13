<script lang="ts" generics="TData, TValue">
  import { goto } from "$app/navigation";
  import { type ColumnDef, type PaginationState, type SortingState, type VisibilityState, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/table-core";
  import { createSvelteTable, FlexRender } from "$lib/components/ui/data-table/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  import { Button } from "$lib/components/ui/button/index.js";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
  import ChevronsLeftIcon from "@lucide/svelte/icons/chevrons-left";
  import ChevronsRightIcon from "@lucide/svelte/icons/chevrons-right";
  import { Input } from "$lib/components/ui/input/index.js";
  type DataTableProps = {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    getRowHref: (row: TData) => string;
    initialColumnVisibility?: VisibilityState;
  };

  let { data, columns, getRowHref, initialColumnVisibility = {} }: DataTableProps = $props();
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
  let sorting = $state<SortingState>([]);
  let globalFilter = $state("");
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
    getColumnCanGlobalFilter: (column) => column.getIsVisible(),

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
    onGlobalFilterChange: (updater) => {
      if (typeof updater === "function") {
        globalFilter = updater(globalFilter);
      } else {
        globalFilter = updater;
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
      get globalFilter() {
        return globalFilter;
      },
      get columnVisibility() {
        return columnVisibility;
      },
    },
  });
</script>

<div>
  <div class="rounded-md border">
    <div class="relative flex flex-wrap items-center justify-between border-b bg-primary rounded-t-md">
      <div class="order-2 flex items-center gap-2 md:order-0">
        <Input
          placeholder="Filter rows..."
          value={globalFilter}
          oninput={(e) => {
            table.setGlobalFilter(e.currentTarget.value);
          }}
          class="m-2 h-8 w-50 lg:w-62.5 bg-background"
        />
      </div>
      <div
        class="order-1 basis-full pt-2 text-center text-sm text-white md:pointer-events-none md:absolute md:left-1/2 md:top-1/2 md:order-0 md:basis-auto md:-translate-x-1/2 md:-translate-y-1/2 md:pt-0"
      >
        Showing {table.getFilteredRowModel().rows.length} of
        {table.getCoreRowModel().rows.length} row{table.getCoreRowModel().rows.length !== 1 ? "s" : ""}.
      </div>
      <div class="order-2 md:order-0">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="outline" class="m-2">Columns</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end" class="w-fit">
            <DropdownMenu.Group>
              <DropdownMenu.Label>Toggle columns</DropdownMenu.Label>
              <DropdownMenu.Separator />
              {#each table.getAllColumns().filter((col) => col.getCanHide()) as column (column.id)}
                <DropdownMenu.CheckboxItem bind:checked={() => column.getIsVisible(), (v) => column.toggleVisibility(!!v)}>
                  {(column.columnDef.meta as { label?: string } | undefined)?.label ?? (typeof column.columnDef.header === "string" ? column.columnDef.header : column.id)}
                </DropdownMenu.CheckboxItem>
              {/each}
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
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
              <Table.Cell class="border-r last:border-r-0 align-top">
                <div class="max-h-30 overflow-y-auto">
                  <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
                </div>
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

  <div class="grid grid-cols-1 items-center gap-3 px-2 py-4 md:grid-cols-[1fr_auto_1fr]">
    <div class="hidden md:block" aria-hidden="true"></div>

    <div class="order-1 flex items-center gap-3 md:order-2">
      <div class="flex items-center space-x-2">
        <Button variant="outline" class="hidden size-8 p-0 lg:flex" onclick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          <span class="sr-only">Go to first page</span>
          <ChevronsLeftIcon />
        </Button>
        <Button variant="outline" class="size-8 p-0" onclick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <span class="sr-only">Go to previous page</span>
          <ChevronLeftIcon />
        </Button>
      </div>

      <div class="min-w-25 text-center text-sm font-medium">
        Page {table.getState().pagination.pageIndex + 1} of
        {table.getPageCount()}
      </div>

      <div class="flex items-center space-x-2">
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

    <div class="order-2 flex items-center justify-center space-x-4 md:order-3 md:justify-self-end">
      <p class="text-sm font-medium">Rows per page</p>
      <Select.Root
        allowDeselect={false}
        type="single"
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <Select.Trigger class="h-8 w-17.5">
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
  </div>
</div>
