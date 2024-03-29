module.exports = {
  main: [
    'index',
    'principles',
    'deepresearch',
    'rfcprocess',
    'vsus',
    'vips',
    'publications',
    'contribute',
    'media',
    {
      type: 'category',
      label: 'Resources',
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: 'link',
          label: 'Specs/RFCs',
          href: 'https://rfc.vac.dev/ ',
        },
        {
          type: 'link',
          label: 'Forum',
          href: 'https://forum.vac.dev/',
        },
      ],
    },
  ],
}
