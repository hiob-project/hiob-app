<script lang="ts">
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import { projectConfig } from "$lib/project-config.js";
  
  let { data } = $props();
  const passage = $derived(data.passage);
</script>

<svelte:head>
  <title>{projectConfig.projectName} - Passage {passage.id}</title>
</svelte:head>

<Breadcrumbs breadcrumbs={[
  { label: "Passages", href: "/passages" },
  { label: `Passage ${passage.id}` }
]} />

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Passage {passage.id}</h1>
  
  <div class="space-y-6">
    {#if passage.midrash && passage.midrash.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Midrash</h2>
        <p>{passage.midrash.map(m => m.value).join(", ")}</p>
      </div>
    {/if}
    
    {#if passage.passages}
      <div>
        <h2 class="text-xl font-semibold mb-2">Passages</h2>
        <p>{passage.passages}</p>
      </div>
    {/if}
    
    {#if passage.verses && passage.verses.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Verses</h2>
        <p>{passage.verses.map(v => v.value).join(", ")}</p>
      </div>
    {/if}
    
    {#if passage.quotation_and_speakers && passage.quotation_and_speakers.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Quotation and Speakers</h2>
        <ul class="list-disc list-inside space-y-1">
          {#each passage.quotation_and_speakers as item}
            <li>{item.value}</li>
          {/each}
        </ul>
      </div>
    {/if}
    
    {#if passage.quote}
      <div>
        <h2 class="text-xl font-semibold mb-2">Quote</h2>
        <p class="text-lg italic text-right" dir="rtl">{passage.quote}</p>
      </div>
    {/if}
    
    {#if passage.abstract}
      <div>
        <h2 class="text-xl font-semibold mb-2">Abstract</h2>
        <p class="whitespace-pre-wrap">{passage.abstract}</p>
      </div>
    {/if}
    
    {#if passage.decontextualized_reception && passage.decontextualized_reception.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Decontextualized Reception</h2>
        <ul class="list-disc list-inside space-y-1">
          {#each passage.decontextualized_reception as item}
            <li>{item.value}</li>
          {/each}
        </ul>
      </div>
    {/if}
    
    {#if passage.narrative_reception && passage.narrative_reception.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Narrative Reception</h2>
        <ul class="list-disc list-inside space-y-1">
          {#each passage.narrative_reception as item}
            <li>{item.value}</li>
          {/each}
        </ul>
      </div>
    {/if}
    
    {#if passage.classic_parallels && passage.classic_parallels.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Classic Parallels</h2>
        <p class="whitespace-pre-wrap">{passage.classic_parallels}</p>
      </div>
    {/if}
    
    {#if passage.points_of_note}
      <div>
        <h2 class="text-xl font-semibold mb-2">Points of Note</h2>
        <p class="whitespace-pre-wrap">{passage.points_of_note}</p>
      </div>
    {/if}
  </div>
</div>
