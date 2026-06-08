// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

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
    './plugins/quiz-plugin',
    './plugins/image-viewer',
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
            xslt: false,
            limit: 15,
          },
          onInlineTags: 'ignore',
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
          blogSidebarCount: 0,
          showLastUpdateTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  scripts: [
    {
      src: '/katex/katex.min.js',
      defer: true,  // 确保在 DOM 加载后执行，不阻塞页面渲染
    },
  ],

  stylesheets: [
    {
      href: '/katex/katex.min.css',
      type: 'text/css',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/ico.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      imageViewer: {
        scale: 1.8,
        enableWheelZoom: true,
        containerSelector: 'article',
        excludeSelector: '.avatar',
        minScale: 0.5,
        maxScale: Infinity,
        wheelStep: 0.25,
      },
      announcementBar: {
        id: 'follow_me',
        content: '⭐️ 如果这个网站能帮助到你，欢迎关注！  <a target="_blank" rel="noopener noreferrer" href="https://github.com/little-Data">GitHub</a>  |  <a target="_blank" rel="noopener noreferrer" href="https://space.bilibili.com/357695126">Bilibili</a>',
        //backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },
      algolia: {
        appId: 'WGY6YEG3SC',
        apiKey: 'f469731471bf9b84c80f49f5536312ba',
        indexName: '搜索爬虫',
        contextualSearch: true,
        externalUrlRegex: 'external\\.com|domain\\.com',
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },
        searchPagePath: 'search',
        maxResultsPerGroup: 7,
        recentSearchesLimit: 7,
        recentSearchesWithFavoritesLimit: 5,
        keyboardShortcuts: { 'Ctrl/Cmd+K': false, '/': false },
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
            href:'https://exam.little-data.top',
            label: '测验库',
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
            title: '其它链接',
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
          {
            title: '实用工具',
            items: [
              {
                label: 'PDF 工具箱',
                href: 'https://dwaz.top/pd',
              },
              {
                label: 'Office 在线编辑',
                href: 'https://dwaz.top/of',
              },
              {
                label: '在线绘图',
                href: 'https://dwaz.top/huitu',
              },
              {
                label: 'LaTeX 公式可视化编辑',
                href: 'https://dwaz.top/gs',
              },
              {
                label: '在线音频编辑',
                href: 'https://dwaz.top/au',
              },
              {
                label: 'BrowseryTools',
                href: 'https://dwaz.top/tool',
              },
              {
                label: '邮件',
                href: 'https://dwaz.top/mail',
              },
              {
                label: '云盘',
                href: 'https://dwaz.top/pan',
              },
              {
                label: '在线键盘',
                href: 'https://dwaz.top/kb',
              },
            ],
          },
        ],
        copyright: `<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA</a> Built with Docusaurus This site is powered by <a href="https://www.netlify.com">Netlify</a>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['Java','bash','PowerShell','ini'],
      },
    }),
    themes: ['@docusaurus/theme-live-codeblock'],
};

export default config;
