<script lang="ts">
  import { onMount } from "svelte";
  import { resolve } from "$app/paths";

  const indexName = "hiob";

  // Replace with your search-only key.
  const searchApiKey = "MWyoGSjAaA1DEt8ZjVw5TzGZhgtJpCG5";

  const defaultQueryBy = "verse,mention,name,quote,commentary,passages,points_of_note,classic_parallels,mentions";
  let initError = $state("");
  let isReady = $state(false);

  onMount(() => {
    let searchInstance: any;
    let removePanelHeaderClicks: (() => void) | null = null;

    const setup = async () => {
      try {
        const [{ default: instantsearch }, { default: TypesenseInstantSearchAdapter }, widgets] = await Promise.all([
          import("instantsearch.js"),
          import("typesense-instantsearch-adapter"),
          import("instantsearch.js/es/widgets"),
        ]);

        const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
          server: {
            apiKey: searchApiKey,
            nodes: [
              {
                host: "typesense.acdh-dev.oeaw.ac.at",
                port: 443,
                protocol: "https",
              },
            ],
            cacheSearchResultsForSeconds: 2 * 60,
          },
          additionalSearchParameters: {
            query_by: defaultQueryBy,
            validate_field_names: false,
          },
        });

        const resultUrl = (hit: Record<string, any>) => {
          const hiobId = hit.hiob_id;
          if (!hiobId) return "#";
          if (hit.type === "verse") return resolve("/(data)/verses/[id]", { id: hiobId });
          if (hit.type === "passage") return resolve("/(data)/passages/[id]", { id: hiobId });
          if (hit.type === "midrash") return resolve("/(data)/midrash/[id]", { id: hiobId });
          return "#";
        };

        const resultTitle = (hit: Record<string, any>) => {
          if (hit.type === "verse") return `Verse ${hit.verse ?? hit.hiob_id}`;
          if (hit.type === "passage") return hit.mention ?? hit.hiob_id;
          if (hit.type === "midrash") return hit.name ?? hit.hiob_id;
          return hit.hiob_id ?? "Result";
        };

        const renderHitCard = (hit: Record<string, any>, html: any, components: any) => {
          switch (hit.type) {
            case "verse":
              return html`
                <article class="rounded-md border p-4">
                  <div class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Verse</div>
                  <h3 class="mb-2 text-lg font-semibold">
                    <a href="${resultUrl(hit)}" class="underline-offset-2 hover:underline">${resultTitle(hit)}</a>
                  </h3>
                  <div class="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    ${hit.mentions?.length ? hit.mentions.map((mention: string) => html`<span class="rounded-full border px-2 py-0.5">${mention}</span>`) : html``}
                  </div>
                </article>
              `;

            case "passage":
              return html`
                <article class="rounded-md border p-4">
                  <div class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Passage</div>
                  <h3 class="mb-2 text-lg font-semibold">
                    <a href="${resultUrl(hit)}" class="underline-offset-2 hover:underline">${resultTitle(hit)}</a>
                  </h3>
                  <p class="mb-2 text-sm text-muted-foreground">${hit.midrash?.length ? hit.midrash.join(" · ") : ""} ${hit.verses?.length ? html`<span> • ${hit.verses.join(", ")}</span>` : ""}</p>
                  <p class="mb-2">${hit.quote ? components.Snippet({ hit, attribute: "quote" }) : ""}</p>
                  <p class="mb-2">${hit.commentary ? components.Highlight({ hit, attribute: "commentary" }) : ""}</p>
                  <div class="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    ${hit.decontextualized_reception?.length ? hit.decontextualized_reception.map((value: string) => html`<span class="rounded-full border px-2 py-0.5">${value}</span>`) : html``}
                    ${hit.narrative_reception?.length ? hit.narrative_reception.map((value: string) => html`<span class="rounded-full border px-2 py-0.5">${value}</span>`) : html``}
                  </div>
                </article>
              `;

            case "midrash":
              return html`
                <article class="rounded-md border p-4">
                  <div class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Midrash</div>
                  <h3 class="mb-2 text-lg font-semibold">
                    <a href="${resultUrl(hit)}" class="underline-offset-2 hover:underline">${resultTitle(hit)}</a>
                  </h3>
                  <p class="mb-2 text-sm text-muted-foreground">${hit.name ? components.Highlight({ hit, attribute: "name" }) : ""}</p>
                  <div class="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    ${hit.mentions?.length ? hit.mentions.map((mention: string) => html`<span class="rounded-full border px-2 py-0.5">${mention}</span>`) : html``}
                  </div>
                </article>
              `;

            default:
              return html`
                <article class="rounded-md border p-4">
                  <div class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Result</div>
                  <h3 class="mb-2 text-lg font-semibold">
                    <a href="${resultUrl(hit)}" class="underline-offset-2 hover:underline">${resultTitle(hit)}</a>
                  </h3>
                </article>
              `;
          }
        };

        searchInstance = instantsearch({
          indexName,
          searchClient: typesenseInstantsearchAdapter.searchClient,
          routing: {
            stateMapping: {
              stateToRoute(uiState: any) {
                return {
                  query: uiState[indexName]?.query,
                };
              },
              routeToState(routeState: any) {
                return {
                  [indexName]: {
                    query: routeState.query,
                  },
                };
              },
            },
          },
        });

        searchInstance.addWidgets([
          widgets.searchBox({
            container: "#searchbox",
            autofocus: true,
            showSubmit: true,
            showReset: true,
            placeholder: "Search passages, verses, and midrash...",
          }),
          widgets.stats({
            container: "#stats-container",
          }),
          widgets.panel({
            templates: { header: "Type" },
            collapsed: () => true,
          })(widgets.refinementList)({
            container: "#refinement-list-type",
            attribute: "type",
          }),
          widgets.panel({ templates: { header: "Mentions" }, collapsed: () => true })(widgets.refinementList)({
            container: "#refinement-list-mentions",
            attribute: "mentions",
            searchable: true,
            searchablePlaceholder: "Search mentions",
          }),
          widgets.panel({ templates: { header: "Midrash" }, collapsed: () => true })(widgets.refinementList)({
            container: "#refinement-list-midrash",
            attribute: "midrash",
            searchable: true,
            searchablePlaceholder: "Search midrash",
          }),
          widgets.panel({ templates: { header: "Verses" }, collapsed: () => true })(widgets.refinementList)({
            container: "#refinement-list-verses",
            attribute: "verses",
            searchable: true,
            searchablePlaceholder: "Search verses",
          }),
          widgets.panel({ templates: { header: "Decontextualized Reception" }, collapsed: () => true })(widgets.refinementList)({
            container: "#refinement-list-dr",
            attribute: "decontextualized_reception",
            searchable: true,
            searchablePlaceholder: "Search tags",
          }),
          widgets.panel({ templates: { header: "Narrative Reception" }, collapsed: () => true })(widgets.refinementList)({
            container: "#refinement-list-nr",
            attribute: "narrative_reception",
            searchable: true,
            searchablePlaceholder: "Search tags",
          }),
          widgets.panel({ templates: { header: "Quotation & Speakers" }, collapsed: () => true })(widgets.refinementList)({
            container: "#refinement-list-qs",
            attribute: "quotation_and_speakers",
            searchable: true,
            searchablePlaceholder: "Search speakers",
          }),
          widgets.clearRefinements({
            container: "#clear-refinements",
            templates: {
              resetLabel: "Reset filters",
            },
          }),
          widgets.currentRefinements({
            container: "#current-refinements",
          }),
          widgets.hits({
            container: "#hits",
            templates: {
              empty: "No results for <q>{{ query }}</q>",
              item(hit: Record<string, any>, { html, components }: any) {
                return renderHitCard(hit, html, components);
              },
            },
          }),
          widgets.pagination({
            container: "#pagination",
            padding: 2,
          }),
          widgets.configure({
            hitsPerPage: 12,
          }),
        ]);

        searchInstance.start();

        // Make panel headers clickable by forwarding clicks to the built-in collapse button.
        window.setTimeout(() => {
          const panelHeaders = document.querySelectorAll<HTMLElement>(".ais-Panel-header");
          const headerListeners: Array<{ header: HTMLElement; listener: (event: Event) => void }> = [];

          panelHeaders.forEach((header) => {
            header.style.cursor = "pointer";
            const listener = (event: Event) => {
              const target = event.target as HTMLElement | null;
              const collapseButton = header.querySelector<HTMLElement>(".ais-Panel-collapseButton");
              if (collapseButton && !target?.closest(".ais-Panel-collapseButton")) {
                collapseButton.click();
              }
            };

            header.addEventListener("click", listener);
            headerListeners.push({ header, listener });
          });

          const previousCleanup = removePanelHeaderClicks;
          removePanelHeaderClicks = () => {
            headerListeners.forEach(({ header, listener }) => {
              header.removeEventListener("click", listener);
            });
            previousCleanup?.();
          };
        }, 100);

        isReady = true;
      } catch (error) {
        initError = error instanceof Error ? error.message : "Failed to initialize search";
      }
    };

    setup();

    return () => {
      removePanelHeaderClicks?.();
      searchInstance?.dispose?.();
    };
  });
</script>

<svelte:head>
  <title>Search | HIOB</title>
</svelte:head>

<section class="mx-auto w-full max-w-7xl p-6">
  <h1 class="mb-4 text-2xl font-semibold">Search</h1>

  <div class="mb-4 rounded-lg border p-4">
    <div id="searchbox"></div>
  </div>

  {#if initError}
    <p class="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">{initError}</p>
  {/if}

  <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
    <div id="stats-container"></div>
    <div id="clear-refinements"></div>
  </div>

  <div id="current-refinements" class="mb-4"></div>

  <div class="grid gap-6 lg:grid-cols-[300px_1fr]">
    <aside class="space-y-4">
      <div id="refinement-list-type"></div>
      <div id="refinement-list-mentions"></div>
      <div id="refinement-list-midrash"></div>
      <div id="refinement-list-verses"></div>
      <div id="refinement-list-dr"></div>
      <div id="refinement-list-nr"></div>
      <div id="refinement-list-qs"></div>
    </aside>
    <div>
      <div id="hits" class="space-y-3"></div>
      <div id="pagination" class="mt-6"></div>
    </div>
  </div>

  {#if !isReady && !initError}
    <p class="mt-4 text-sm text-muted-foreground">Initializing search...</p>
  {/if}
</section>

<style>
  :global(.ais-SearchBox) {
    width: 100%;
  }

  :global(.ais-SearchBox-form) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }

  :global(.ais-SearchBox-input),
  :global(.ais-SearchBox-submit),
  :global(.ais-SearchBox-reset),
  :global(.ais-RefinementList-searchBox input) {
    border-radius: 0.375rem;
    border: 1px solid var(--border);
    background: var(--background);
    color: var(--foreground);
  }

  :global(.ais-SearchBox-input) {
    flex: 1;
    padding: 0.5rem 0.75rem;
    min-width: 0;
  }

  :global(.ais-SearchBox-submit),
  :global(.ais-SearchBox-reset) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    cursor: pointer;
  }

  :global(.ais-SearchBox-submitIcon),
  :global(.ais-SearchBox-resetIcon) {
    width: 1rem;
    height: 1rem;
  }

  :global(.ais-Panel) {
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    padding: 0.75rem;
    background: var(--card);
    margin-bottom: 0.75rem;
  }

  :global(.ais-Panel-header) {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    line-height: 1.2;
    font-size: 0.875rem;
    font-weight: 600;
  }

  :global(.ais-Panel--collapsible .ais-Panel-collapseButton) {
    position: static;
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    color: var(--foreground);
  }

  :global(.ais-Panel-body) {
    margin-top: 0.5rem;
  }

  :global(.ais-Panel--collapsed .ais-Panel-body),
  :global(.ais-Panel--collapsed .ais-Panel-footer) {
    display: none;
  }

  :global(.ais-Panel--collapsed .ais-Panel-header) {
    margin-bottom: 0;
  }

  :global(.ais-RefinementList-list),
  :global(.ais-CurrentRefinements-list),
  :global(.ais-Hits-list),
  :global(.ais-Pagination-list) {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  :global(.ais-RefinementList-list) {
    display: grid;
    gap: 0.375rem;
  }

  :global(.ais-RefinementList-item) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  :global(.ais-RefinementList-label) {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  :global(.ais-RefinementList-checkbox) {
    width: 1rem;
    height: 1rem;
  }

  :global(.ais-RefinementList-count) {
    margin-left: 0.25rem;
    color: var(--muted-foreground);
    font-size: 0.75rem;
  }

  :global(.ais-Hits-list) {
    display: grid;
    gap: 0.75rem;
  }

  :global(.ais-Hits-item) {
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
  }

  :global(.ais-CurrentRefinements-list) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  :global(.ais-CurrentRefinements-item) {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    border: 1px solid var(--border);
    border-radius: 9999px;
    padding: 0.25rem 0.5rem;
    background: var(--card);
    font-size: 0.75rem;
  }

  :global(.ais-CurrentRefinements-delete) {
    border: 0;
    background: transparent;
    cursor: pointer;
    color: var(--foreground);
  }

  :global(.ais-ClearRefinements-button) {
    border: 1px solid var(--border);
    border-radius: 0.375rem;
    padding: 0.375rem 0.625rem;
    background: var(--background);
    cursor: pointer;
  }

  :global(.ais-ClearRefinements-button:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :global(.ais-Pagination-list) {
    display: flex;
    gap: 0.375rem;
    align-items: center;
  }

  :global(.ais-Pagination-link) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    border: 1px solid var(--border);
    border-radius: 0.375rem;
    text-decoration: none;
    color: inherit;
    padding: 0 0.5rem;
  }

  :global(.ais-Pagination-item--selected .ais-Pagination-link) {
    font-weight: 700;
    background: var(--secondary);
  }
</style>
