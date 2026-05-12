<script lang="ts">
  import type { ComponentProps } from "svelte";
  import ArrowDownIcon from "@lucide/svelte/icons/arrow-down";
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
  import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";
  import { Button } from "$lib/components/ui/button/index.js";

  let {
    label,
    canSort = true,
    sortDirection = false,
    variant = "ghost",
    ...restProps
  }: ComponentProps<typeof Button> & {
    label: string;
    canSort?: boolean;
    sortDirection?: "asc" | "desc" | false;
  } = $props();
</script>

{#if !canSort}
  <div class="w-full text-center">{label}</div>
{:else}
  <div class="flex w-full items-center justify-center gap-1">
    <span>{label}</span>
    <Button {variant} size="icon" aria-label={`Sort by ${label}`} {...restProps}>
      {#if sortDirection === "asc"}
        <ArrowUpIcon class="h-4 w-4" />
      {:else if sortDirection === "desc"}
        <ArrowDownIcon class="h-4 w-4" />
      {:else}
        <ArrowUpDownIcon class="h-4 w-4 opacity-60" />
      {/if}
    </Button>
  </div>
{/if}
