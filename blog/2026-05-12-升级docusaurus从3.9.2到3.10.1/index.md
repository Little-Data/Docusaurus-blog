---
slug: update_docusaurus_3.9.2_to_3.10.1
title: 升级docusaurus从3.9.2到3.10.1
authors: 半个水果
tags: [docusaurus, Node.js]
description: 升级docusaurus顺便解决一些问题
hide_table_of_contents: false
date: 2026-05-12T00:06
unlisted: false
hide_comment: false
---

升级docusaurus顺便解决一些问题

{/* truncate */}

升级过程其实很简单<span class="heimu" title="你知道的太多了">于我而言</span>，借助[npm-check-updates](/npm_packages_update_management)即可升级。更新日志可在这里找到[Docusaurus 3.10](https://docusaurus.io/zh-CN/blog/releases/3.10)

升级后先别急着运行测试，先安装一个必须组件：

```shell
npm install @docusaurus/faster
```

运行测试时大概率会遇到下面情况：

```text showLineNumbers
  × Module build failed (from ./node_modules/@docusaurus/plugin-content-blog/lib/markdownLoader.js):
  ╰─▶   × Error: MDX compilation failed for file "PSP-gim.md"
        │ Cause: Unexpected character `!` (U+0021) before name, expected a character that can start a name, such as a letter, `$`, or `_` (note: to create a comment in MDX, use `{/* text */}`)
        │ Details:
        │ {
        │   "column": 2,
        │   "file": "",
        │   "message": "Unexpected character `!` (U+0021) before name, expected a character that can start a name, such as a letter, `$`, or `_` (note: to create a comment in MDX, use `{/* text */}`)",
        │   "line": 14,
        │   "name": "14:2",
        │   "place": {
        │     "_bufferIndex": 1,
        │     "_index": 24,
        │     "line": 14,
        │     "column": 2,
        │     "offset": 233
        │   },
        │   "reason": "Unexpected character `!` (U+0021) before name, expected a character that can start a name, such as a letter, `$`, or `_` (note: to create a comment in MDX, use `{/* text */}`)",
        │   "ruleId": "unexpected-character",
        │   "source": "micromark-extension-mdx-jsx",
        │   "url": "https://github.com/micromark/micromark-extension-mdx-jsx#unexpected-character-at-expected-expect"
        │ }
```

在3.9版本时如果要控制一个文章的摘要是可以这么写的：

``` md showLineNumbers
摘要内容

<!-- truncate -->

正文
```

升级之后问题也出现在这里，对于MDX内容，检查也严格了，MDX不支持`<!-- truncate -->`这类HTML注释，而这个注释恰好是控制摘要内容的显示。错误中也提示了解决方法，换成下面即可：

``` md showLineNumbers
摘要内容

{/* truncate */}

正文
```