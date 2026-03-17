<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import landingImg from "$lib/assets/Job_Confessing_His_Presumption_to_God_Who_Answers_from_the_Whirlwind,_object_1_Butlin_461.jpg";
  import { resolve } from '$app/paths';
</script>

<svelte:head>
  <title>Enduring Job: The Book of Job in Early Medieval Jewish Literature</title>
</svelte:head>
<div class="w-full">
  <div class="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:py-40">
    <div class="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16 p-12 rounded-xl" style="background-color: #4A627A;">
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-4xl font-semibold tracking-tight text-balance sm:text-6xl text-white">Enduring Job: The Book of Job in Early Medieval Jewish Literature</h1>
        <div class="flex justify-center md:justify-start mt-8">
          <ButtonGroup.Root>
            <Button size="lg" variant="outline" href={resolve('/about')}>About the project</Button>
            <Button size="lg" variant="outline" href={resolve('/verses')}>Explore the data</Button>
          </ButtonGroup.Root>
        </div>
      </div>
      <div class="flex-1 flex justify-center">
        <figure class="inline-block">
          <img src="{landingImg}" alt="Job Confessing His Presumption to God Who Answers from the Whirlwind" class="rounded-lg shadow-md max-h-[480px] object-contain" />
          <figcaption class="text-xs text-white italic mt-2">William Blake, Job Confessing His Presumption to God Who Answers from the Whirlwind, object 1 (Butlin 461)</figcaption>
        </figure>
      </div>
    </div>
  </div>
</div>

<style>
  figure {
    display: inline-block;
  }
  figcaption {
    contain: inline-size;
  }
  img {
    max-width: 100%;
  }
</style>
