// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require('dotenv').config()

const math = require('remark-math')
const katex = require('rehype-katex')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VacResearch',
  url: 'https://vac.dev/',
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
          id: 'Docs',
          breadcrumbs: false,
          routeBasePath: '/',
          sidebarPath: 'docs/sidebars.js',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        og: {},
        localSearch: {
          singleIndex: false,
          blogDir: 'rlog',
          blogRouteBasePath: '/rlog',
        },
        generated: {
          jobList: {
            jobBoard: 'vac',
          },
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      /** @type {import('@docusaurus/plugin-content-blog').PluginOptions} */
      ({
        id: 'blog',
        routeBasePath: '/rlog',
        path: 'rlog',
        blogTitle: 'Research Blog',
        blogSidebarCount: 0,
        authorsMapPath: 'authors.yml',
        remarkPlugins: [math],
        rehypePlugins: [katex],
      }),
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [{ from: '/research', to: '/rlog' }],
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
      colorMode: {
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        items: [
          {
            type: 'search',
          },
          {
            label: 'About Vac',
            to: '/',
            activeBaseRegex: '^/$',
          },
          {
            label: 'Community',
            to: '/community',
            activeBasePath: 'community',
          },
          {
            label: 'Research Blog',
            to: '/rlog',
            activeBasePath: 'rlog',
          },
          {
            label: 'Join Us',
            to: '/join-us',
            activeBasePath: 'join-us',
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
                label: 'Work With Us',
                href: 'https://jobs.status.im/',
              },
              {
                label: 'Terms & Conditions',
                to: '/terms',
              },
              {
                href: '/privacy-policy',
                label: 'Privacy Policy',
              },
              {
                href: '/security',
                label: 'Security',
              },
            ],
          },
        ],
      },
    }),

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-vZTG03m+z5ZkWZJgN+5RqqznB0TjvHahcGq1+EK7Y5xnepK84VHe5F4I9xgDnUHg',
      crossorigin: 'anonymous',
    },
  ],
}

module.exports = config
