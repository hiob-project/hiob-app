<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { resolve } from '$app/paths';
   type BreadcrumbItem = {
    label: string;
    href?: string;
  };
    
  
  let { breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItem[] } = $props();
</script>
<div class="flex justify-start ml-4 mt-8">
  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href={resolve('/')}>Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      
      {#each breadcrumbs as crumb, index}
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          {#if index === breadcrumbs.length - 1}
            <!-- Last item is not a link -->
            <Breadcrumb.Page>{crumb.label}</Breadcrumb.Page>
          {:else if crumb.href}
            <!-- Middle items are links -->
            <Breadcrumb.Link href={resolve(`/${crumb.href}` as '/')}>{crumb.label}</Breadcrumb.Link>
          {:else}
            <Breadcrumb.Page>{crumb.label}</Breadcrumb.Page>
          {/if}
        </Breadcrumb.Item>
      {/each}
    </Breadcrumb.List>
  </Breadcrumb.Root>
</div>