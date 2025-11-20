---
slug: prohibiting_the_execution_of_yarn_scripts
title: 解决yarn被系统禁止运行
authors: 半个水果
tags: [Windows, npm, yarn, 教程]
description: 解决使用PowerShell时yarn被系统禁止运行的问题
hide_table_of_contents: false
date: 2025-11-09T15:06
unlisted: false
---

在 Windows 系统中运行 Yarn 时，可能会遇到以下错误提示：无法加载文件 yarn.ps1，因为在此系统上禁止运行脚本。这是由于 PowerShell 的执行策略限制导致的。

<!-- truncate -->

## 以管理员身份运行PowerShell

右键开始菜单按钮，点击“终端管理员”，打开后输入`PowerShell`

:::note
不同版本的系统右键开始菜单按钮后显示的可能不一样，不管用什么方法最终目的是管理员运行PowerShell
:::

## 查看当前执行策略

在PowerShell中输入以下命令，然后按Enter键：

```PowerShell
Get-ExecutionPolicy
```

如果显示为`Restricted`则要进一步操作

## 更改执行策略

在PowerShell中输入以下命令，然后按Enter键：

```PowerShell
Set-ExecutionPolicy RemoteSigned
```

可能会要求你确认更改执行策略。如果是这样，输入“Y”然后按Enter键。