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
      routeMiddleware: ["./src/route-data.ts"],

      title: "Gram",
      tagline: "Ship powerful integrations for agents and LLMs ",
      favicon: "/favicon.png",
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.ico",
            type: "image/x-icon",
            sizes: "256x256",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon-dark.ico",
            media: "(prefers-color-scheme: dark)",
            type: "image/x-icon",
            sizes: "256x256",
          },
        },
      ],

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
          label: "Overview",
          autogenerate: { directory: "overview" },
        },
        {
          label: "Concepts",
          autogenerate: { directory: "concepts" },
        },
      ],
    }),
  ],
});
