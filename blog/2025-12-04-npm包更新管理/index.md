---
slug: npm_packages_update_management
title: npm包更新管理
authors: 半个水果
tags: [Node.js, npm]
description: npm包更新管理，简单命令
hide_table_of_contents: false
date: 2025-12-04T18:16
unlisted: false
hide_comment: false
---

使用npm-check-updates来轻松升级npm包。

<!-- truncate -->

[官方仓库/文档](https://github.com/raineorshine/npm-check-updates)

## 安装

```
npm install -g npm-check-updates
```

## 用法

检查更新

```
ncu
```

检查全局包更新

```
ncu -g
```

确认更新

```
ncu -u
```

交互模式

```
ncu -i
```

<kbd>↑</kbd><kbd>↓</kbd> 选择

<kbd>Space</kbd> 切换选择状态

<kbd>a</kbd> 全选

<kbd>Enter</kbd> 升级

更多命令请看官方文档。