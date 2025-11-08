---
slug: Win11_reverts_to_the_classic_right-click_menu
title: Win11恢复经典右键菜单
authors: 半个水果
tags: [Windows, 注册表]
description: Win11恢复经典右键菜单
hide_table_of_contents: false
date: 2025-11-09T01:43
unlisted: false
---

**此操作会重启资源管理器，注意保存工作！**

<!-- truncate -->

按Win+r打开运行，输入：

```batch
reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve

taskkill /f /im explorer.exe & start explorer.exe
```

恢复新右键菜单：

```batch
reg delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f

taskkill /f /im explorer.exe & start explorer.exe
```