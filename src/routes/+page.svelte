<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import landingImg from "$lib/assets/Job_Confessing_His_Presumption_to_God_Who_Answers_from_the_Whirlwind,_object_1_Butlin_461.jpg";
  import horizontalImg1 from "$lib/assets/When_the_Morning_Stars_Sang_Together_Butts_set.jpg";
  import horizontalImg2 from "$lib/assets/Behemoth_and_Leviathan_Butts_set.jpg";
  import verticalImg1 from "$lib/assets/Job's_Evil_Dreams-butts.jpg";
  import verticalImg2 from "$lib/assets/William_Blake_-_The_Messengers_Tell_Job_of_His_Misfortunes.jpg";
  import { resolve } from "$app/paths";

  const slides = [
    {
      titleSlide: true,
      src: landingImg,
      alt: "Job Confessing His Presumption to God Who Answers from the Whirlwind",
      caption: "William Blake, Job Confessing His Presumption to God Who Answers from the Whirlwind, object 1 (Butlin 461)",
    },
    {
      src: verticalImg1,
      alt: "Job's Evil Dreams",
      caption: "William Blake, Job's Evil Dreams (Butts set)",
      label: "Passages",
      description: "Explore the wider textual passages from midrashic and other Jewish literature that reference or engage with the story of Job.",
      href: resolve("/passages"),
    },
    {
      src: horizontalImg1,
      alt: "When the Morning Stars Sang Together",
      caption: "William Blake, When the Morning Stars Sang Together (Butts set)",
      label: "About the Project",
      description: "Learn about the research behind this database, the methodology for identifying Job references, and the team that built it.",
      href: resolve("/about"),
    },
    {
      src: verticalImg2,
      alt: "The Messengers Tell Job of His Misfortunes",
      caption: "William Blake, The Messengers Tell Job of His Misfortunes",
      label: "Midrash Texts",
      description: "Read the full midrashic texts in which Job appears, with contextual information about each source and its literary tradition.",
      href: resolve("/midrash"),
    },
    {
      src: horizontalImg2,
      alt: "Behemoth and Leviathan",
      caption: "William Blake, Behemoth and Leviathan (Butts set)",
      label: "Verses",
      description: "Browse individual verses from the Book of Job and see how they were received and interpreted across early medieval Jewish sources.",
      href: resolve("/verses"),
    },
  ];
</script>

<svelte:head>
  <title>The Book of Job in Early Medieval Jewish Literature</title>
</svelte:head>

<div class="w-full">
  <div class="mx-auto max-w-5xl px-6 pt-16 pb-8">
    <Carousel.Root opts={{ align: "center", loop: true }}>
      <Carousel.Content>
        {#each slides as slide}
          <Carousel.Item class="basis-full md:basis-[90%]">
            {#if slide.titleSlide}
              <div
                class="flex flex-col md:flex-row items-center gap-6 md:gap-8 px-6 py-6 md:px-10 md:py-8 rounded-xl min-h-[200px] md:min-h-[480px] lg:min-h-[500px]"
                style="background-color: #4A627A;"
              >
                <div class="flex-1 text-center md:text-left flex flex-col justify-center">
                  <h1 class="text-2xl md:text-5xl font-semibold tracking-tight text-balance text-white leading-tight">The Book of Job in Early Medieval Jewish Literature</h1>
                  <p class="mt-4 text-white/60 text-sm">Use the arrows to explore the sections →</p>
                </div>
                <!-- Right: landing image -->
                <div class="flex flex-1 justify-center items-center">
                  <figure class="flex flex-col items-center">
                    <img src={slide.src} alt={slide.alt} class="rounded-lg shadow-md max-h-[220px] w-auto md:max-h-none md:h-[340px] lg:h-[380px] md:max-w-none" />
                    <figcaption class="text-xs text-white/50 italic mt-2 text-center px-2">{slide.caption}</figcaption>
                  </figure>
                </div>
              </div>
            {:else}
              <a
                href={slide.href}
                class="flex flex-col md:flex-row items-center gap-6 md:gap-8 px-6 py-6 md:px-10 md:py-8 rounded-xl min-h-[200px] md:min-h-[480px] lg:min-h-[500px] group"
                style="background-color: #4A627A;"
              >
                <!-- Left: text -->
                <div class="flex-1 text-center md:text-left flex flex-col justify-center">
                  <p class="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">Explore</p>
                  <p class="text-2xl md:text-3xl font-semibold text-white mb-3 group-hover:underline underline-offset-4">{slide.label}</p>
                  <p class="text-sm text-white/70 leading-relaxed">{slide.description}</p>
                </div>
                <!-- Right: image -->
                <div class="flex flex-1 justify-center items-center">
                  <figure class="flex flex-col items-center">
                    <img src={slide.src} alt={slide.alt} class="rounded-lg shadow-md max-h-[220px] w-auto md:max-h-none md:h-[340px] lg:h-[380px] md:max-w-none" />
                    <figcaption class="text-xs text-white/50 italic mt-2 text-center px-2">{slide.caption}</figcaption>
                  </figure>
                </div>
              </a>
            {/if}
          </Carousel.Item>
        {/each}
      </Carousel.Content>
      <Carousel.Previous class="-left-6" />
      <Carousel.Next class="-right-6" />
    </Carousel.Root>
  </div>
</div>
