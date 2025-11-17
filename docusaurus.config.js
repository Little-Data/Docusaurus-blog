// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '半个水果博客',
  tagline: '半个水果博客',
  favicon: 'img/ico.jpg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://little-data.eu.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  plugins: [
    'docusaurus-plugin-zooming'
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          routeBasePath: '/',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'ignore',
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
          blogSidebarCount: 0,
          showLastUpdateTime:true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/ico.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'follow_me',
        content: '⭐️ 如果这个网站能帮助到你，欢迎关注！  <a target="_blank" rel="noopener noreferrer" href="https://github.com/little-Data">GitHub</a>  |  <a target="_blank" rel="noopener noreferrer" href="https://space.bilibili.com/357695126">Bilibili</a>',
        //backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },
      navbar: {
        hideOnScroll: true,
        title: '半个水果博客',
        logo: {
          alt: 'My Site Logo',
          src: 'img/ico.jpg',
        },
        items: [
          {
            href:'/',
            label: '主页',
            position: 'left',
          },
          {
            href: 'https://github.com/little-Data',
            label: 'GitHub',
            position: 'right',
          },
          {
            to:'/archive',
            label: '往期文章',
            position: 'left',
          },
          {
            href:'https://little-data.eu.org/rss.xml',
            label: 'Rss订阅',
            position: 'left',
          },
        ],
      },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 6,
    },
      footer: {
        logo:{
          alt:'访问计数',
          src:'https://count.getloli.com/@little?name=little&theme=original-new&padding=7&offset=0&align=top&scale=1&pixelated=1&darkmode=auto',
          },
        style: 'light',
        links: [
          {
            title: ' ',
            items: [
              {
                label: '哔哩哔哩',
                href: 'https://space.bilibili.com/357695126',
              },
              {
                label: 'Gametoolkit',
                href: 'https://little-data.github.io/Gametoolkit',
              },
              {
                label: '关于本站',
                to: '/about',
              },
            ],
            },
            {
          title: '友情链接',
          items: [
            {
              label: 'UID:210298091',
              href: 'https://space.bilibili.com/210298091',
            },
          ],
          },
        ],
        copyright: `<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA</a> Built with Docusaurus This site is powered by <a href="https://www.netlify.com">Netlify</a>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['Java','bash','PowerShell'],
      },
    }),
    themes: ['@docusaurus/theme-live-codeblock'],
};

export default config;
