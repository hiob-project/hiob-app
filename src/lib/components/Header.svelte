<script lang="ts">
  import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
  import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";
  import { Navigation } from "@lucide/svelte";
  import { resolve } from '$app/paths';
</script>

<header class="sticky top-0 z-50 w-full bg-background">
  <div class="container-wrapper px-6 3xl:fixed:px-0 bg-secondary">
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link href={resolve('/')}>
            <span class="font-semibold text-lg tracking-wide">HIOB</span>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link>
            {#snippet child()}
              <a href={resolve('/about')} class={navigationMenuTriggerStyle()}>About</a>
            {/snippet}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item class="hidden md:block">
          <NavigationMenu.Trigger>Data</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul class="grid w-[200px] gap-4 p-2">
              <li>
                <NavigationMenu.Link href={resolve('/verses')}>Verses</NavigationMenu.Link>
                <NavigationMenu.Link href={resolve('/passages')}>Passages</NavigationMenu.Link>
                <NavigationMenu.Link href={resolve('/midrash')}>Midrash</NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  </div>
</header>
