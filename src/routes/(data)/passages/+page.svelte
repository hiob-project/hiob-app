<script lang="ts">
  import DataTable from "./data-table.svelte"; 
  import { columns } from "./columns.js";
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
  import { projectConfig } from "$lib/project-config.js";
  let { data } = $props();
</script>

<svelte:head>
  <title>{projectConfig.projectName} - Passages</title>
</svelte:head>
<Breadcrumbs breadcrumbs={[{ label: "Passages" }]} /><h1 class="text-center text-2xl font-bold mb-4">Passages</h1>
<DataTable data={data.rows} {columns} />