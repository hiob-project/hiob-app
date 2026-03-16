<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./columns.js";
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>Enduring Job - Midrash</title>
</svelte:head>
<Breadcrumbs breadcrumbs={[{ label: "Midrash" }]} />
<h1 class="text-center text-2xl font-bold mb-4">Midrash</h1>
<DataTable data={data.rows} {columns} />