<div align="center">

[![Gram](banner.png)](https://getgram.ai)

  <div>
    <a href="https://docs.getgram.ai/" target="_blank"><b>Docs</b></a>&nbsp;&nbsp;//&nbsp;&nbsp;<a href="https://go.speakeasy.com/slack" target="_blank"><b>Join us on Slack</b></a>
  </div>
  <br />
</div>

<hr />

# Gram Docs

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

This repository contains the documentation for the [Gram](https://app.getgram.ai) app.

To run

```
cp .env-example .env
npm i
npm run dev
```

Now you can visit the project locally at <http://localhost:4321>.

## 🚀 Project Structure

Inside this Astro + Starlight project, you'll see the following folders and files:

```
.
├── public/                # Static assets that will _not_ be processed by Astro
├── src/
│   ├── assets/            # Images that will be optimized by Astro
│   ├── components/        # Shared components that override Starlight's default components
│   ├── content/           # All the content for the site
│   ├── fonts/             # Fonts used throughout the site
│   ├── pages/             # Additional pages or special paths to be added to the site
│   ├── styles/global.css  # Tailwind theme configuration and startlight style overrides
│   ├── content.config.ts  # Configuration for content collections
│   └── route-data.ts      # Middleware for injecting metadata into site routes
├── astro.config.mjs       # Astro configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript configuration
```

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Built with Starlight

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).
