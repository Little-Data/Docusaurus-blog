---
slug: Display_Windows_logon_process_details
title: 显示Windows登录过程详细信息
authors: 半个水果
tags: [Windows, 注册表, 教程]
description: 显示Windows登录过程详细信息
hide_table_of_contents: false
date: 2025-11-09T01:32
unlisted: false
---

按<kbd>Win</kbd>+<kbd>r</kbd>打开运行，输入`regedit`

<!-- truncate -->

定位到以下路径：

```batch
HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\System
```

创建一个名为`VerboseStatus`的`32 位 DWORD 值`，并将其设为`1`。