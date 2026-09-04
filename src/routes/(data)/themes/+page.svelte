<script lang="ts">
  import DataTable from "../../../lib/components/DataTable.svelte";
  import { columns } from "./columns.js";
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import { projectConfig } from "$lib/project-config.js";
  import { resolve } from "$app/paths";
  let { data } = $props();
</script>

<svelte:head>
  <title>{projectConfig.projectName} - Themes</title>
</svelte:head>
<Breadcrumbs breadcrumbs={[{ label: "Themes" }]} />
<h1 class="text-center text-2xl font-bold mb-4">Themes</h1>
<DataTable data={data.rows} {columns} getRowHref={(row) => resolve("/(data)/themes/[id]", { id: row.hiob_id })} />
