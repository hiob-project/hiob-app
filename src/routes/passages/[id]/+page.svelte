<script lang="ts">
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  
  let { data } = $props();
</script>

<svelte:head>
  <title>Enduring Job - Passage {data.passage.id}</title>
</svelte:head>

<Breadcrumbs breadcrumbs={[
  { label: "Passages", href: "/passages" },
  { label: `Passage ${data.passage.id}` }
]} />

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Passage {data.passage.id}</h1>
  
  <div class="space-y-6">
    {#if data.passage.midrash && data.passage.midrash.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Midrash</h2>
        <p>{data.passage.midrash.map(m => m.value).join(", ")}</p>
      </div>
    {/if}
    
    {#if data.passage.passages}
      <div>
        <h2 class="text-xl font-semibold mb-2">Passages</h2>
        <p>{data.passage.passages}</p>
      </div>
    {/if}
    
    {#if data.passage.verses && data.passage.verses.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Verses</h2>
        <p>{data.passage.verses.map(v => v.value).join(", ")}</p>
      </div>
    {/if}
    
    {#if data.passage.quote}
      <div>
        <h2 class="text-xl font-semibold mb-2">Quote</h2>
        <p class="text-lg italic text-right" dir="rtl">{data.passage.quote}</p>
      </div>
    {/if}
    
    {#if data.passage.abstract}
      <div>
        <h2 class="text-xl font-semibold mb-2">Abstract</h2>
        <p class="whitespace-pre-wrap">{data.passage.abstract}</p>
      </div>
    {/if}
    
    {#if data.passage.decontextualized_reception && data.passage.decontextualized_reception.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Decontextualized Reception</h2>
        <ul class="list-disc list-inside space-y-1">
          {#each data.passage.decontextualized_reception as item}
            <li>{item.value}</li>
          {/each}
        </ul>
      </div>
    {/if}
    
    {#if data.passage.narrative_reception && data.passage.narrative_reception.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Narrative Reception</h2>
        <ul class="list-disc list-inside space-y-1">
          {#each data.passage.narrative_reception as item}
            <li>{item.value}</li>
          {/each}
        </ul>
      </div>
    {/if}
    
    {#if data.passage.points_of_note}
      <div>
        <h2 class="text-xl font-semibold mb-2">Points of Note</h2>
        <p class="whitespace-pre-wrap">{data.passage.points_of_note}</p>
      </div>
    {/if}
    
    {#if data.passage.quotation_and_speakers && data.passage.quotation_and_speakers.length > 0}
      <div>
        <h2 class="text-xl font-semibold mb-2">Quotation and Speakers</h2>
        <ul class="list-disc list-inside space-y-1">
          {#each data.passage.quotation_and_speakers as item}
            <li>{item.value}</li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>
