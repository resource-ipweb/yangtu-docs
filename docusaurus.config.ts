import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {
  loadDocsEnv,
  readApiPlaygroundBuildConfig,
} from './src/components/ApiPlayground/env.node';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

loadDocsEnv();
const apiPlaygroundBuildConfig = readApiPlaygroundBuildConfig();

const config: Config = {
  title: '洋途代理 API Docs',
  tagline: '洋途代理 API Docs',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  // url: "https://ipweb-docusaurus-site.example.com",
  url: 'https://docs.yangtuip.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // baseUrl: "/docs/",
  baseUrl: '/',

  // 新增这一行：开启结尾斜杠
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'resource-ipweb', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  customFields: {
    apiPlayground: {
      defaultBaseUrl: apiPlaygroundBuildConfig.defaultBaseUrl,
      devBaseUrl: apiPlaygroundBuildConfig.devBaseUrl,
      apiRootUrl: apiPlaygroundBuildConfig.apiRootUrl,
      devFetchBaseUrl: apiPlaygroundBuildConfig.devFetchBaseUrl,
    },
  },

  // 默认语言 en 部署在站点根路径，访问 / 为英文
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en',
        direction: 'ltr',
        baseUrl: '/',
      },
      zh: {
        label: '中文',
        htmlLang: 'zh-Hans',
        direction: 'ltr',
        baseUrl: '/zh/',
      },
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          //sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        sitemap: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    () => ({
      name: 'api-dev-proxy',
      configureWebpack(_config, isServer) {
        if (isServer) {
          return undefined;
        }
        return {
          devServer: {
            proxy: [
              {
                context: [apiPlaygroundBuildConfig.devProxyContext],
                target: apiPlaygroundBuildConfig.devProxyTarget,
                changeOrigin: true,
                pathRewrite: {
                  [`^${apiPlaygroundBuildConfig.devProxyContext}`]:
                    apiPlaygroundBuildConfig.devProxyPath || '/api',
                },
                secure: false,
              },
            ],
          },
        } as import('webpack').Configuration;
      },
    }),
  ],

  themeConfig: {
    metadata: [
      {
        name: 'robots',
        content: 'noindex, nofollow',
      },
    ],
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 6,
    },
    navbar: {
      title: '洋途代理 API Docs',
      logo: {
        alt: '洋途代理 API Docs Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      // links: [
      //   {
      //     title: "Docs",
      //     items: [
      //       {
      //         label: "006ip Docs",
      //         to: "/docs/intro",
      //       },
      //     ],
      //   },
      //   {
      //     title: "Community",
      //     items: [
      //       {
      //         label: "Stack Overflow",
      //         href: "https://stackoverflow.com/questions/tagged/docusaurus",
      //       },
      //       {
      //         label: "Discord",
      //         href: "https://discordapp.com/invite/docusaurus",
      //       },
      //       {
      //         label: "X",
      //         href: "https://x.com/docusaurus",
      //       },
      //     ],
      //   },
      //   {
      //     title: "More",
      //     items: [
      //       {
      //         label: "Blog",
      //         to: "/blog",
      //       },
      //       {
      //         label: "GitHub",
      //         href: "https://github.com/facebook/docusaurus",
      //       },
      //     ],
      //   },
      // ],
      copyright: `Copyright © ${new Date().getFullYear()}  006ip, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
