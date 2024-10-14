This repository contains the source for vac.dev.

# Vac Research Blog

## Adding posts

To publish in the blog, create a `.md` or `mdx` file within the `rlog` directory.
Please follow [sembr](https://sembr.org/) in the `.md` or `.mdx` file.
You can use [Frontmatter](https://docusaurus.io/docs/markdown-features#front-matter) to add metadata to your markdown file.

## CI/CD

- [CI builds](https://ci.infra.status.im/job/website/job/vac.dev/) `master` and pushes to `deploy-master` branch, which is hosted at <https://vac.dev//>.
- [CI builds](https://ci.infra.status.im/job/website/job/dev.vac.dev/) `develop` and pushes to `deploy-develop` branch, which is hosted at <https://dev.vac.dev//>.

The hosting is done using [Caddy server with Git plugin for handling GitHub webhooks](https://github.com/status-im/infra-misc/blob/master/ansible/roles/caddy-git).

Information about deployed build can be also found in `/build.json` available on the website.

### Change Process

1. Create a new working branch from `develop`: `git checkout develop; git checkout -b my-changes`.
2. Make your changes, push them to the `origin`, and open a Pull Request against the `develop` branch.
3. After approval, merge the pull request, and verify the changes on the staging server (e.g., https://dev.vac.dev).
4. When ready to promote changes to the live website, rebase the `master` branch on the staging changes: `git checkout master; git pull origin master; git rebase origin/develop; git push`.

### How to Run Locally

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

## Further Info and Configuration

> *Note*: The following contains options that go beyond what is needed to add new blog posts. To simply add a blog post, follow the steps listed above.

### Blog Setup

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


### Customization

You can find instructions for adding additional documentation sections, implementing localization, and managing versioning on the [Docusaurus](https://docusaurus.io/docs) website.

> Please note that theme customization is somewhat restricted; for more detailed instructions on customizing your theme,
  visit the [Logos Docusaurus Theme](https://github.com/acid-info/logos-docusaurus-plugins/tree/main/packages/logos-docusaurus-theme/) repository.

### Configuration

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

This is typically sufficient for most cases, as the Logos plugins will automatically populate other configurations related to the specified business unit.
If you encounter any errors in the information provided by Logos Plugins, please visit the [Logos Docusaurus Plugins](https://github.com/acid-info/logos-docusaurus-plugins) repository and open an issue.


