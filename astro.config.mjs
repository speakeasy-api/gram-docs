// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.VITE_SITE,
  vite: {
    server: {
      allowedHosts: ["localhost", "127.0.0.1", "devbox"],
    },
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: "Gram",
      tagline: "Ship powerful integrations for agents and LLMs ",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/speakeasy-api/gram-docs",
        },
      ],
      components: {
        Header: "./src/components/header.astro",
        Hero: "./src/components/hero.astro",
        Pagination: "./src/components/pagination.astro",
      },
      editLink: {
        baseUrl: "https://github.com/speakeasy-api/gram/edit/main/docs/",
      },
      customCss: ["./src/fonts/font-face.css", "./src/styles/global.css"],
      sidebar: [
        {
          label: "Guides",
          items: [{ label: "Example Guide", slug: "guides/example" }],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
