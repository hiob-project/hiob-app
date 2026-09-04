<script lang="ts">
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import { projectConfig } from "$lib/project-config.js";
  import { resolve } from "$app/paths";
  let { data } = $props();
</script>

<svelte:head>
  <title>{projectConfig.projectName} - {data.midrash.name}</title>
</svelte:head>

<Breadcrumbs breadcrumbs={[{ label: "Midrash", href: "/midrash" }, { label: data.midrash.name }]} />

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">{data.midrash.name}</h1>

  <div class="space-y-6">
    {#if data.midrash.info_about_text}
      <div>
        <h2 class="text-xl font-semibold mb-2">Information</h2>
        <p class="whitespace-pre-wrap">{data.midrash.info_about_text}</p>
      </div>
    {/if}

    {#if data.midrash.mentions && data.midrash.mentions.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Passages</h2>
        <ul class="list-disc list-inside space-y-1">
          {#each data.midrash.mentions as mention}
            <li><a href={resolve(`/passages/hiob_mention_${mention.id}`)} class="text-primary underline underline-offset-2 hover:opacity-80">{mention.value}</a></li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>
