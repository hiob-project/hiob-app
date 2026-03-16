import adapter from "@sveltejs/adapter-static";

const base = process.env.NODE_ENV === "production" ? "/hiob-app" : "";

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
      entries: ["*"],
      handleHttpError: "warn",
    },
  },
  vitePlugin: {
    dynamicCompileOptions: ({ filename }) => (filename.includes("node_modules") ? undefined : { runes: true }),
  },
};

export default config;
