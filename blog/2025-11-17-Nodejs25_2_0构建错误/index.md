---
slug: Docusaurus-error-nodejs2520
title: 使用Node.js 25.2.0 时构建Docusaurus出现错误
authors: 
  - 半个水果
tags: [docusaurus, Node.js]
description: 使用Node.js 25.2.0 时构建Docusaurus出现错误，官方已在新版本中修复
date: 2025-11-17T23:15
---

使用 Node.js 25.2.0 时构建Docusaurus出现错误，官方已在新版本中修复

<!-- truncate -->

最近使用 Node.js 25.2.0 时出现像下面的错误：

```
[ERROR] Error: Unable to build website for locale en.
    at tryToBuildLocale (****/node_modules/@docusaurus/core/lib/commands/build/build.js:83:15)
    at async ****/node_modules/@docusaurus/core/lib/commands/build/build.js:35:9
    at async mapAsyncSequential (****/node_modules/@docusaurus/utils/lib/jsUtils.js:21:24)
    at async Command.build (****/node_modules/@docusaurus/core/lib/commands/build/build.js:34:5)
    at async Promise.all (index 0)
    at async runCLI (****/node_modules/@docusaurus/core/lib/commands/cli.js:56:5)
    at async file://****/node_modules/@docusaurus/core/bin/docusaurus.mjs:44:3 {
  [cause]: DOMException [SecurityError]: Cannot initialize local storage without a `--localstorage-file` path
      at Object.get [as localStorage] (node:internal/webstorage:28:17)
      at get localStorage (node:internal/util:660:20)
      at merge (****/node_modules/eval/eval.js:11:13)
      at module.exports (****/node_modules/eval/eval.js:42:5)
      at ****/node_modules/@docusaurus/core/lib/ssg/ssgRenderer.js:37:108
      at Object.async (****/node_modules/@docusaurus/logger/lib/perfLogger.js:42:47)
      at loadAppRenderer (****/node_modules/@docusaurus/core/lib/ssg/ssgRenderer.js:37:51)
      at async Promise.all (index 0)
      at async loadSSGRenderer (****/node_modules/@docusaurus/core/lib/ssg/ssgRenderer.js:53:54)
      at async executeSSGInlineTask (****/node_modules/@docusaurus/core/lib/ssg/ssgWorkerInline.js:13:25)
}
[INFO] Docusaurus version: 3.9.2
Node version: v25.2.0
```

应该还会有 `--localstorage-file` 命令提示。

检查半天，最后下回 v24.11.1 (LTS) 就好了。

**相关issue：**

docusaurus build broken with NodeJS 25 #11545

https://github.com/facebook/docusaurus/issues/11545

 lib: throw from localStorage getter on missing storage path #60351 

https://github.com/nodejs/node/pull/60351