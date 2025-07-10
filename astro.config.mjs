// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import starlightLlmsTxt from "starlight-llms-txt";

// https://astro.build/config
export default defineConfig({
  // We don't want trailing slashes in the generated page URLs so it's easy to
  // tack on '.md' and get the markdown version of a page.
  trailingSlash: "never",
  adapter: vercel(),
  site: import.meta.env.VITE_SITE,
  redirects: {
    "/concepts/tool-defintions": "/concepts/tool-definitions",
  },
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
        EditLink: "./src/components/edit-link.astro",
        Header: "./src/components/header.astro",
        Hero: "./src/components/hero.astro",
        Pagination: "./src/components/pagination.astro",
      },
      editLink: {
        baseUrl: "https://github.com/speakeasy-api/gram-docs/edit/main/",
      },
      customCss: ["./src/fonts/font-face.css", "./src/styles/global.css"],
      sidebar: [
        {
          label: "Overview",
          autogenerate: { directory: "overview" },
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Concepts",
          autogenerate: { directory: "concepts" },
        },
        {
          label: "Blog",
          autogenerate: { directory: "blog" },
        },
        {
          label: "Clients",
          autogenerate: { directory: "clients" },
        },
      ],
      plugins: [starlightLlmsTxt()],
    }),
  ],
});
