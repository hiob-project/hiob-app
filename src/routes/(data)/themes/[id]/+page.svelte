<script lang="ts">
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import { projectConfig } from "$lib/project-config.js";
  import { resolve } from "$app/paths";
  let { data } = $props();
</script>

<svelte:head>
  <title>{projectConfig.projectName} - {data.theme.name}</title>
</svelte:head>

<Breadcrumbs breadcrumbs={[{ label: "Themes", href: "/themes" }, { label: data.theme.name }]} />

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">{data.theme.name}</h1>

  <div class="space-y-6">
    {#if data.theme.passages && data.theme.passages.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Passages</h2>
        <ul class="list-disc list-inside space-y-1">
          {#each data.theme.passages as passage}
            <li><a href={resolve(`/passages/hiob_passage_${passage.id}`)} class="text-primary underline underline-offset-2 hover:opacity-80">{passage.value}</a></li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>
