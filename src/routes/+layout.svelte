<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import Footer from "$lib/components/Footer.svelte";
  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex flex-col min-h-screen">
  <Header />
  <main class="flex-1">
    <div class="container mx-auto px-6 md:px-8">
      {@render children()}
    </div>
  </main>
  <Footer />
</div>
