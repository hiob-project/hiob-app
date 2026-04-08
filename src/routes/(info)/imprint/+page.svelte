<script lang="ts">
  import type { PageProps } from "./$types";
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Imprint</title>
</svelte:head>
<Breadcrumbs breadcrumbs={[{ label: "Imprint" }]} />
<div class="py-12 px-6 max-w-4xl mx-auto">
  <h1 class="text-4xl md:text-5xl font-bold mb-8 text-center">Imprint</h1>
  <div class="prose prose-lg max-w-none">
    <div class="leading-relaxed text-justify">
      {@html data.imprint_body}
    </div>
  </div>
</div>
