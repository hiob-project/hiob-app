<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import type { EmblaEventType } from "embla-carousel";
  import landingImg from "$lib/assets/Job_Confessing_His_Presumption_to_God_Who_Answers_from_the_Whirlwind,_object_1_Butlin_461.jpg";
  import horizontalImg1 from "$lib/assets/When_the_Morning_Stars_Sang_Together_Butts_set.jpg";
  import horizontalImg2 from "$lib/assets/Behemoth_and_Leviathan_Butts_set.jpg";
  import verticalImg1 from "$lib/assets/Job's_Evil_Dreams-butts.jpg";
  import verticalImg2 from "$lib/assets/William_Blake_-_The_Messengers_Tell_Job_of_His_Misfortunes.jpg";
  import { resolve } from "$app/paths";

  const TWEEN_FACTOR_BASE = 0.84;
  let tweenFactor = 0;

  function numberWithinRange(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
  }

  function setTweenFactor(emblaApi: CarouselAPI) {
    tweenFactor = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }

  function tweenOpacity(emblaApi: CarouselAPI, eventName?: EmblaEventType) {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor);
        const opacity = numberWithinRange(tweenValue, 0, 1);
        const node = emblaApi.slideNodes()[slideIndex];
        node.style.opacity = opacity.toString();
        node.style.filter = opacity < 1 ? `blur(${(1 - opacity) * 4}px)` : "none";
      });
    });
  }

  function onApiReady(carouselApi: CarouselAPI | undefined) {
    if (!carouselApi) return;

    setTweenFactor(carouselApi);
    tweenOpacity(carouselApi);

    carouselApi.on("reInit", setTweenFactor).on("reInit", tweenOpacity).on("scroll", tweenOpacity).on("slideFocus", tweenOpacity);
  }

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
      caption: "William Blake, Job's Evil Dreams",
      label: "About",
      description: "Find out more about the project.",
      href: resolve("/about"),
    },
    {
      src: horizontalImg1,
      alt: "When the Morning Stars Sang Together",
      caption: "William Blake, When the Morning Stars Sang Together",
      label: "Passages",
      description:
        "Excerpts, translations, and commentaries on passages of early medieval Hebrew and Aramaic literature on the book of Job. How both the references to the figure of Job and the Joban Verses manifest in both conservative and innovative ways.",
      href: resolve("/passages"),
    },
    {
      src: verticalImg2,
      alt: "The Messengers Tell Job of His Misfortunes",
      caption: "William Blake, The Messengers Tell Job of His Misfortunes",
      label: "Verses",
      description: "The Job verses used in early medieval sources. Which are popular, where, and why.",
      href: resolve("/verses"),
    },
    {
      src: horizontalImg2,
      alt: "Behemoth and Leviathan",
      caption: "William Blake, Behemoth and Leviathan",
      label: "Midrash",
      description: "The Early Medieval Rabbinic works quoting the Book of Job, with emphasis on their larger textual units and verse clusters.",
      href: resolve("/midrash"),
    },
  ];
</script>

<svelte:head>
  <title>The Book of Job in Early Medieval Jewish Literature</title>
</svelte:head>

<div class="w-full overflow-hidden">
  <div class="py-8">
    <Carousel.Root opts={{ align: "center", loop: true }} setApi={onApiReady}>
      <Carousel.Content>
        {#each slides as slide}
          <Carousel.Item class="basis-full md:basis-[85%] lg:basis-[75%] transition-[opacity,filter] duration-200">
            {#if slide.titleSlide}
              <div
                class="flex flex-col md:flex-row items-center gap-6 md:gap-8 px-6 py-6 md:px-10 md:py-8 rounded-xl min-h-[200px] md:min-h-[480px] lg:min-h-[500px]"
                style="background-color: #4A627A;"
              >
                <div class="flex-1 text-center md:text-left flex flex-col justify-center">
                  <h1 class="text-2xl md:text-5xl font-semibold tracking-tight text-balance text-white leading-tight">The Book of Job in Early Medieval Jewish Literature</h1>
                </div>
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
                class="flex flex-col md:flex-row items-center gap-6 md:gap-8 px-6 py-6 md:px-10 md:py-8 rounded-xl min-h-50 md:min-h-120 lg:min-h-125 group"
                style="background-color: #4A627A;"
              >
                <div class="flex-1 text-center md:text-left flex flex-col justify-center">
                  <p class="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">Explore</p>
                  <p class="text-2xl md:text-3xl font-semibold text-white mb-3 group-hover:underline underline-offset-4">{slide.label}</p>
                  <p class="text-sm text-white/70 leading-relaxed">{slide.description}</p>
                </div>
                <div class="flex flex-1 justify-center items-center">
                  <figure class="flex flex-col items-center">
                    <img src={slide.src} alt={slide.alt} class="rounded-lg shadow-md max-h-55 w-auto md:max-h-none md:h-85 lg:h-95 md:max-w-none" />
                    <figcaption class="text-xs text-white/50 italic mt-2 text-center px-2">{slide.caption}</figcaption>
                  </figure>
                </div>
              </a>
            {/if}
          </Carousel.Item>
        {/each}
      </Carousel.Content>
      <div class="relative flex justify-center mt-4">
        <Carousel.Previous class="static translate-y-0 translate-x-0 mr-5" />
        <Carousel.Next class="static translate-y-0 translate-x-0 ml-5" />
      </div>
    </Carousel.Root>
  </div>
</div>

<style>
  :global([data-slot="carousel-item"]) {
    transition:
      opacity 0.2s ease,
      filter 0.2s ease;
  }
</style>
