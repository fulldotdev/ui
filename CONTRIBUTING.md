# Contributing

We're excited by your interest in contributing to fulldev-ui,
Here lay a few resources we wrote to help you do it!

## Repo Structure

```md
.
├── src/
│   ├── blocks/
│   │   └── ...
│   ├── components/
│   │   └── ...
│   ├── content/
│   │   ├── pages/
│   │   │   └── ...
│   │   ├── settings/
│   │   │   └── ...
│   │   └── ...
│   ├── css/
│   │   └── ...
│   ├── integration/
│   │   └── ...
│   ├── layouts/
│   │   └── ...
│   ├── pages/
│   │   └── ...
│   ├── schemas/
│   │   └── ...
│   └── utils/
│       └── ...
├── public/
│   └── ...
└──
```

### /src

The main source directory containing all the core files of the project.

- **blocks/**: Contains reusable block components that can be composed to build pages also exported to the package.
- **components/**: Houses individual UI components used throughout the project also exported to the package.
- **content/**: Stores content-related files:
  - **pages/**: Contains markdown or MDX files for individual pages.
  - **settings/**: Includes configuration files for various settings like the sidebar.
- **css/**: Contains global CSS files and styles.
- **integration/**: Holds astro integration-related code.
- **layouts/**: Stores layout components used to structure pages.
- **pages/**: Contains Astro page components that define the routes of the website.
- **schemas/**: Includes schema definitions for content validation.
- **utils/**: Houses utility functions and helper modules used across the project.

## Development

### Setup

1. Fork the [repository](https://github.com/fulldotdev/ui) by clicking the fork button on the top right of the repository page.

2. Clone the Github repository in your designated folder:

```bash
git clone https://github.com/your-user-name/ui
```
Ensure the cloned repo is named "ui" or replace "ui" with your fork's name.

2. Enter the folder using `cd ui`.

3. Create a new branch:

```bash
git checkout -b my-new-branch
```

4. Install the packages using pnpm:

```bash
pnpm install
```

Make sure to do this in root to make sure you're using the local version of the component package.

5. Run the development server:

```bash
pnpm dev
```

## Commit & Pull Requests

### Pull Requests

The simplest way to open a pull request with your changes is by using github web, after following the [setup guide](#setup) and commit your changes you have a contribute button at the top of your repo, after clicking that you should be able to make a pull request and go from there.

### Commit Conduct

For a faster and easier review we advise you to use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary).

## Showcase

Have you used fulldev-ui to build a website? Add it to the showcase!

1. Fork this repository.
2. Add a screenshot of your site to the `public/showcase/` directory.
3. Add your site to the `showcase` array at the top of `src/content/pages/showcase.mdx`.
4. Go to the forked repository on your Github and clicke the 'Contribute` button to make a Pull Request.

## Community / Contact

Looking to share your work using fulldev-ui, regular talks about it or support join our [discord server](https://discord.gg/tdmUyH2YE4).

## License

MIT License

Copyright (c) 2024 Sil Veltman

For the entire license [read this](https://github.com/fulldotdev/ui/blob/main/LICENCE).
