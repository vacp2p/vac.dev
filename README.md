# Waku Blog

The template repository for blogs using [logos-docusaurus-plugins](https://github.com/acid-info/logos-docusaurus-plugins)


## How to Run Locally

1. Clone this repository
```bash
$ git clone https://github.com/acid-info/logos-blog-template.git
```

2. Install the dependencies:
```bash
$ yarn install
```

3. Start the website:
```bash
$ yarn start
```

4. Visit `http://localhost:3000/` in your browser


## Configuration
Edit the `docusaurus.config.js` file in the repository's root directory, and update the value of the `businessUnit` field in presets section; below is a list of valid values:
- Logos
- Codex
- Waku
- Nimbus
- Nomos
- VacResearch
- Acid.info

Example:
```js
presets: [
  [
    '@acid-info/logos-docusaurus-preset',
    {
      businessUnit: 'Codex',
    },
  ],
],
```

This is typically sufficient for most cases, as the Logos plugins will automatically populate other configurations related to the specified business unit. If you encounter any errors in the information provided by Logos Plugins, please visit the [Logos Docusaurus Plugins](https://github.com/acid-info/logos-docusaurus-plugins) repository and open an issue.


## Blog Setup

The blog utilizes the Docusaurus blog plugin configured in `docusaurus.config.js`.

```js
[
  '@docusaurus/plugin-content-blog',
  /** @type {import('@docusaurus/plugin-content-blog').PluginOptions} */
  ({
    id: 'blog',
    routeBasePath: '/',
    path: 'posts',
    blogTitle: 'Research Log',
    blogSidebarCount: 0,
    authorsMapPath: 'authors.yml',
    remarkPlugins: [math],
    rehypePlugins: [katex],
  }),
]
```

A list of authors can be defined in `/posts/authors.yml`.

For additional customization options, please refer to the [Docusaurus Blog Plugin documentation](https://docusaurus.io/docs/blog).


## Adding posts

To publish in the blog, create a `.md` or `mdx` file within the `posts` directory. You can use [Frontmatter](https://docusaurus.io/docs/markdown-features#front-matter) to add metadata to your markdown file.


## Customization

You can find instructions for adding additional documentation sections, implementing localization, and managing versioning on the [Docusaurus](https://docusaurus.io/docs) website.

> Please note that theme customization is somewhat restricted; for more detailed instructions on customizing your theme, visit the [Logos Docusaurus Theme](https://github.com/acid-info/logos-docusaurus-plugins/tree/main/packages/logos-docusaurus-theme/) repository.


## CI/CD

- The `master` branch is automatically deployed to the production server (e.g., logos.co) through [CI](https://ci.infra.status.im)
- The `develop` branch is automatically deployed to the staging server (e.g., dev.logos.co) through [CI](https://ci.infra.status.im)


## Change Process

1. Create a new working branch from `develop`: `git checkout develop; git checkout -b my-changes`.
2. Make your changes, push them to the `origin`, and open a Pull Request against the `develop` branch.
3. After approval, merge the pull request, and verify the changes on the staging server (e.g., https://dev.vac.dev).
4. When ready to promote changes to the live website, rebase the `master` branch on the staging changes: `git checkout master; git pull origin master; git rebase origin/develop; git push`.
