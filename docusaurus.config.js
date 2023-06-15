// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require('dotenv').config()

const math = require('remark-math')
const katex = require('rehype-katex')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Logos',
  url: 'https://logos.co/',
  baseUrl: '/',

  markdown: {
    mermaid: true,
  },

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@acid-info/logos-docusaurus-preset',
      /** @type {import('@acid-info/logos-docusaurus-preset').PluginOptions} */
      ({
        businessUnit: 'VacResearch',
        theme: {
          name: 'default',
          options: {
            customCss: [require.resolve('./src/css/custom.scss')],
          },
        },
        docs: {
          routeBasePath: '/',
          sidebarPath: 'docs/sidebars.js',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
      }),
    ],
  ],
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      /** @type {import('@docusaurus/plugin-content-blog').PluginOptions} */
      ({
        id: 'blog',
        routeBasePath: '/rlog',
        path: 'rlog',
        blogTitle: 'Rlog - Vac Research Log',
        blogSidebarCount: 0,
        authorsMapPath: 'authors.yml',
        remarkPlugins: [math],
        rehypePlugins: [katex],
      }),
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          return existingPath.startsWith('/rlog') && existingPath !== '/rlog'
            ? [existingPath.replace('/rlog', '')]
            : undefined
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@acid-info/logos-docusaurus-preset').ThemeConfig} */
    ({
      navbar: {
        items: [
          {
            type: 'search',
          },
          {
            label: 'About',
            to: '/',
          },
          {
            label: 'Research Log',
            to: '/rlog',
          },
        ],
      },
      footer: {
        links: [
          {
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/vacp2p',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/PQFdubGt6d',
              },
              {
                label: 'Github',
                href: 'https://github.com/vacp2p',
              },
            ],
          },
          {
            items: [
              {
                label: 'Contact Us',
                to: '/',
              },
              {
                label: 'Work With Us',
                href: 'https://jobs.status.im/',
              },
              {
                label: 'Terms & Conditions',
                to: '/about/terms',
              },
            ],
          },
        ],
      },
    }),

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
}

module.exports = config
