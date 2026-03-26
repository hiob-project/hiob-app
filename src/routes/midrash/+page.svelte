<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./columns.js";
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import { projectConfig } from "$lib/project-config.js";

  let { data } = $props();
</script>

<svelte:head>
  <title>{projectConfig.projectName} - Midrash</title>
</svelte:head>
<Breadcrumbs breadcrumbs={[{ label: "Midrash" }]} />
<h1 class="text-center text-2xl font-bold mb-4">Midrash</h1>
<DataTable data={data.rows} {columns} />