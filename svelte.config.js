import adapter from "@sveltejs/adapter-static";

const dev = process.env.NODE_ENV === "development";
const base = dev ? "" : process.env.BASE_PATH || "";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
    paths: {
      base: base,
    },
 	prerender: {
      entries: ['*'],
	  handleHttpError: 'warn',
    },
  },
  vitePlugin: {
    dynamicCompileOptions: ({ filename }) => (filename.includes("node_modules") ? undefined : { runes: true }),
  },
};

export default config;
