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
      title: "Gram Docs",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/speakeasy-api/gram",
        },
      ],
      logo: {
        light: "./src/assets/logo-light.png",
        dark: "./src/assets/logo-dark.png",
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
