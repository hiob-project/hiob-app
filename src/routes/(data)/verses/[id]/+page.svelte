<script lang="ts">
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import { projectConfig } from "$lib/project-config.js";
  import { resolve } from "$app/paths";
  let { data } = $props();
</script>

<svelte:head>
  <title>{projectConfig.projectName} - Verse {data.verse.verse}</title>
</svelte:head>

<Breadcrumbs breadcrumbs={[{ label: "Verses", href: "/verses" }, { label: `Verse ${data.verse.verse}` }]} />

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-4">Verse {data.verse.verse}</h1>

  <div class="space-y-4">
    {#if data.verse.quote}
      <div>
        <h2 class="text-xl font-semibold mb-2">Quote</h2>
        <p class="text-lg italic">{data.verse.quote}</p>
      </div>
    {/if}

    {#if data.verse.mentions && data.verse.mentions.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Mentions</h2>
        <ul class="list-disc list-inside space-y-1">
          {#each data.verse.mentions as mention}
            <li><a href={resolve(`/passages/hiob_mention_${mention.id}`)} class="text-primary underline underline-offset-2 hover:opacity-80">{mention.value}</a></li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>
