<script lang="ts">
  import DataTable from "../../../lib/components/DataTable.svelte";
  import { columns } from "./columns.js";
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
  import { projectConfig } from "$lib/project-config.js";
  import { resolve } from "$app/paths";
  let { data } = $props();
</script>

<svelte:head>
  <title>{projectConfig.projectName} - Commented passages</title>
</svelte:head>
<Breadcrumbs breadcrumbs={[{ label: "Commented passages" }]} />
<h1 class="text-center text-2xl font-bold mb-4">Commented passages</h1>
<DataTable
  data={data.rows}
  {columns}
  getRowHref={(row) => resolve("/(data)/passages/[id]", { id: row.hiob_id })}
  initialColumnVisibility={{
    quote: false,
    midrash: false,
    decontextualized_reception: false,
    narrative_reception: false,
    classic_parallels: false,
    points_of_note: false,
  }}
/>
