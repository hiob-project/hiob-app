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
      src: horizontalImg1,
      alt: "When the Morning Stars Sang Together",
      caption: "William Blake, When the Morning Stars Sang Together (Butts set)",
      label: "About the Project",
      description: "Learn about the research behind this database, the methodology for identifying Job references, and the team that built it.",
      href: resolve("/about"),
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
      src: horizontalImg2,
      alt: "Behemoth and Leviathan",
      caption: "William Blake, Behemoth and Leviathan (Butts set)",
      label: "Verses",
      description: "Browse individual verses from the Book of Job and see how they were received and interpreted across early medieval Jewish sources.",
      href: resolve("/verses"),
    },
    {
      src: verticalImg2,
      alt: "The Messengers Tell Job of His Misfortunes",
      caption: "William Blake, The Messengers Tell Job of His Misfortunes",
      label: "Midrash Texts",
      description: "Read the full midrashic texts in which Job appears, with contextual information about each source and its literary tradition.",
      href: resolve("/midrash"),
    },
  ];
</script>

<svelte:head>
  <title>The Book of Job in Early Medieval Jewish Literature</title>
</svelte:head>

<div class="w-full">
  <div class="mx-auto max-w-3xl px-6 pt-16 pb-8">
    <h1 class="text-4xl font-semibold tracking-tight text-balance sm:text-6xl text-center mb-12">The Book of Job in Early Medieval Jewish Literature</h1>

    <Carousel.Root opts={{ loop: true }}>
      <Carousel.Content>
        {#each slides as slide}
          <Carousel.Item>
            <a href={slide.href} class="flex flex-col-reverse md:flex-row items-center gap-8 px-10 py-8 rounded-xl group" style="background-color: #4A627A;">
              <!-- Left: text -->
              <div class="flex-1 text-center md:text-left flex flex-col justify-center">
                <p class="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">Explore</p>
                <p class="text-2xl md:text-3xl font-semibold text-white mb-3 group-hover:underline underline-offset-4">{slide.label}</p>
                <p class="text-sm text-white/70 leading-relaxed">{slide.description}</p>
              </div>
              <!-- Right: image -->
              <div class="flex-1 flex justify-center items-center">
                <figure class="flex flex-col items-center">
                  <img src={slide.src} alt={slide.alt} class="rounded-lg shadow-md h-[340px] md:h-[380px] w-auto max-w-none" />
                  <figcaption class="text-xs text-white/50 italic mt-2 text-center px-2">{slide.caption}</figcaption>
                </figure>
              </div>
            </a>
          </Carousel.Item>
        {/each}
      </Carousel.Content>
      <Carousel.Previous class="-left-6" />
      <Carousel.Next class="-right-6" />
    </Carousel.Root>
  </div>
</div>
