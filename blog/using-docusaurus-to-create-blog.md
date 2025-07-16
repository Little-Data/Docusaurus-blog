---
slug: using-docusaurus-to-create-blog
title: 用 Docusaurus 创建属于自己的博客
authors: 半个水果
tags: [Docusaurus, blog, Node.js]
description: 用 Docusaurus 创建属于自己的博客
date: 2025-07-16T13:34
---

Docusaurus 提供了简洁直观的用户界面、强大的代码块展示功能、活跃的社区支持以及丰富的插件生态，加上由 Meta（原 Facebook）维护的背景，支持 markdown 文档，所以我选用了它。

<!-- truncate -->

## Docusaurus 简介

Docusaurus 是一个基于 React 和 MDX 的静态网站生成工具，现在由 Meta 维护，是一个开源项目。它的设计初衷是让用户能够快速、轻松地创建文档类网站。

以下是它的一些主要特点：

- 文档与博客功能：强大的文档支持，同时能轻松创建多种类型的网站。
- 基于 MDX：结合 Markdown 语法与 React 组件，支持扩展性的内容创作。
- 多语言支持 (i18n)：轻松实现多语言网站。
- SEO 友好：自动生成站点地图（sitemap）和元标签（meta tags）等。
- 代码块：支持强大的 Syntax highlighting 功能。
- 易于部署：支持在 Vercel、GitHub Pagesl、Netlify 等平台上轻松部署。
   
:::tip

这里仅简要说明相关功能，更多说明请看[官方文档](https://docusaurus.io/docs)

主要以 Markdown 语法编写内容。

:::

## 安装

在安装 [Node.js](https://nodejs.org/zh-cn/download) 后，可以通过以下命令创建一个新的 Docusaurus 项目：

```bash showLineNumbers
npx create-docusaurus@latest my-website classic
```

:::note

Docusaurus 有很多命令，建议到官方文档看看，这里所列举的命令也许在未来不可用。

:::

创建之后，可以在本地预览：

```bash showLineNumbers
cd my-website # 进入创建的目录
npm run start # 启动本地开发服务器
```

正常情况下，访问 `http://localhost:3000` 后应该能看到默认的 Docusaurus 页面。

## 配置
### Blog-only 模式

Docusaurus 主要用来给项目写说明文档的，不过这里要讲的是搭建博客，因此要禁用它的`docs`模式：

```js title='docusaurus.config.js' showLineNumbers
//...
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
      // highlight-next-line
        docs: false,
        blog: {
          showReadingTime: true,
      //...
      // highlight-next-line
          routeBasePath: '/', // 设置博客页面在网站根域名下
//...
```

:::warning

不要忘记删除现有的主页 `./src/pages/index.js` 否则将有两个文件映射到同一路由！ 

如果禁用了 docs 插件，请不要忘记删除配置文件中对 docs 插件的引用。值得注意的是，请务必移除与 docs 相关的导航栏项目。

:::

之后在你网站的文件夹`blog`中开始编写你的故事

### 静态网站托管

这里我选择的是 Netlify 国内访问速度还可以。

下面是大致思路：

- 在 Github 上创建一个新仓库
- 将仓库拉取至本地的新目录
- 将网站目录下的所有文件移动至拉取的目录
- 将目录内容推送至 GitHub
- 在 Netlify 选择这个 GitHub 仓库
- 等待部署成功
- 可以选择将网址更换为自己的域名

详细请到[官方文档](https://docusaurus.io/zh-CN/docs/deployment#deploying-to-netlify)查看
