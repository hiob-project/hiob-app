<script>
  import acdhLogo from "$lib/assets/acdh_logo_with_text_color.svg";
  import fwfLogo from "$lib/assets/FWF_Logo_Zusatz_Blau_RGB_DE.svg";
  import uniLogo from "$lib/assets/UniWien_CMYK_A4.svg";
  import { Github } from "@lucide/svelte";
</script>

<footer class="w-full bg-secondary border-t">
  <div class="container mx-auto px-6 md:px-8 pt-4 pb-8 md:pt-6 md:pb-12">
    <div class="md:px-8 px-6 md:pb-6 pb-6 w-full relative flex gap-4 items-center border-b border-border-surface">
      <h2>CONTACT</h2>
      <div class="flex items-center gap-4 ml-auto">
        <a href="https://github.com/hiob-project/hiob-app" target="_blank" aria-label="Github" class="group relative">
          <Github class="group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-10">
      <div class="flex justify-start md:justify-center">
        <div class="space-y-3">
          <a href="https://www.univie.ac.at/" target="_blank" class="inline-block">
            <img src={uniLogo} alt="University of Vienna Logo" class="h-12" />
          </a>
          <div class="space-y-1">
            <h3 class="font-semibold text-base">Department of Jewish Studies</h3>
            <p class="text-sm">University of Vienna</p>
            <p class="text-sm">Spitalgasse 2, Hof 7, 1090 Wien</p>
            <p class="text-sm">
              <a href="mailto:judaistik@univie.ac.at" class="hover:underline">judaistik@univie.ac.at</a>
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-start md:justify-center">
        <div class="space-y-3">
          <a href="https://www.oeaw.ac.at/acdh/" target="_blank" class="inline-block">
            <img src={acdhLogo} alt="ACDH Logo" class="h-12" />
          </a>
          <div class="space-y-1">
            <h3 class="font-semibold text-base">Austrian Centre for Digital Humanities</h3>
            <p class="text-sm">Austrian Academy of Sciences</p>
            <p class="text-sm">Bäckerstraße 13, 1010 Vienna</p>
            <p class="text-sm">
              <a href="mailto:acdh-helpdesk@oeaw.ac.at" class="hover:underline">acdh-helpdesk@oeaw.ac.at</a>
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-start md:justify-center">
        <div class="space-y-3">
          <a href="https://www.fwf.ac.at/en/research-radar/10.55776/PAT5867124" target="_blank" class="inline-block">
            <img src={fwfLogo} alt="FWF Logo" class="h-14" />
          </a>
          <div class="space-y-1">
            <p class="text-sm">Funded by the Austrian Science Fund</p>
            <p class="text-sm font-semibold">FWF PAT5867124</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
