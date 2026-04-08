<script lang="ts">
  let { children } = $props();
</script>

<div class="container mx-auto px-8 md:px-10">
  {@render children()}
</div>
