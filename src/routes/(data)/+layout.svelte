<script lang="ts">
  import type { LayoutProps } from "./$types";

  let { data, children }: LayoutProps = $props();
</script>

<div class="container mx-auto px-8 md:px-10">
  {@render children()}
</div>
