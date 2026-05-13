<script lang="ts">
  import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
  import { resolve } from "$app/paths";
</script>

<header class="sticky top-0 z-50 w-full bg-background">
  <div class="container-wrapper px-6 3xl:fixed:px-0 bg-primary text-primary-foreground">
    <NavigationMenu.Root viewport={false}>
      <NavigationMenu.List class="flex-wrap">
        <NavigationMenu.Item>
          <NavigationMenu.Link href={resolve("/")} class="hover:bg-transparent hover:text-accent hover:ring-1 hover:ring-accent focus:bg-transparent focus:text-accent focus:ring-1 focus:ring-accent">
            <span class="font-semibold text-lg tracking-wide">HIOB</span>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item class="hidden md:block">
          <NavigationMenu.Trigger>Info</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul class="grid w-50 gap-4 p-2">
              <li>
                <NavigationMenu.Link href={resolve("/about")}>About</NavigationMenu.Link>
                <NavigationMenu.Link href={resolve("/imprint")}>Imprint</NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item class="hidden md:block">
          <NavigationMenu.Trigger>Data</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul class="grid w-50 gap-4 p-2">
              <li>
                <NavigationMenu.Link href={resolve("/passages")}>Commented passages</NavigationMenu.Link>
                <NavigationMenu.Link href={resolve("/verses")}>Verses</NavigationMenu.Link>
                <NavigationMenu.Link href={resolve("/midrash")}>Midrash</NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  </div>
</header>
