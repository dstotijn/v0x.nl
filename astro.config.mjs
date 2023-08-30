import { defineConfig, sharpImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://v0x.nl",
  integrations: [
    mdx({
      drafts: true,
    }),
    sitemap(),
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "github-dark",
    },
  },
  image: {
    service: sharpImageService(),
  },
});
