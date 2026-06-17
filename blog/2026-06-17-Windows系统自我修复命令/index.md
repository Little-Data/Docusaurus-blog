---
slug: Windows_System_Self_Repair_Command
title: Windows 系统自我修复命令
authors: 半个水果
tags: [微软, Windows]
description: Windows 系统自我修复命令，遇到系统问题时可以尝试一下，说不定免去重装之苦。
hide_table_of_contents: false
date: 2026-06-17T20:13
last_update:
  date: 2026-06-17T20:13
unlisted: false
hide_comment: false
---

Windows 系统自我修复命令，遇到系统问题时可以尝试一下，说不定免去重装之苦。

{/* truncate */}

下面的命令是使用了系统的 dsim 工具来进行系统文件的检测与修复，需要网络连接。

**需要管理员权限运行。**

## 快速检查 (CheckHealth)

```
DISM /Online /Cleanup-Image /CheckHealth
```

## 深入扫描 (ScanHealth)

```
DISM /Online /Cleanup-Image /ScanHealth
```

## 修复系统 (RestoreHealth)

```
DISM /Online /Cleanup-Image /RestoreHealth
```

`/RestoreHealth` 扫描 + 自动下载修复文件

`/Cleanup-Image` 清理、检查、修复系统映像组件库（WinSxS）

## 修复系统文件

DISM 修复底层镜像，再 SFC 修复系统文件。

```
sfc /scannow
```

## 来源

[如何使用 DISM 命令修复 Windows 10/11 系统映像](https://www.sysgeek.cn/repair-windows-using-dism-tool)

[使用系统文件检查器工具修复丢失或损坏的系统文件](https://support.microsoft.com/zh-cn/topic/%E4%BD%BF%E7%94%A8%E7%B3%BB%E7%BB%9F%E6%96%87%E4%BB%B6%E6%A3%80%E6%9F%A5%E5%99%A8%E5%B7%A5%E5%85%B7%E4%BF%AE%E5%A4%8D%E4%B8%A2%E5%A4%B1%E6%88%96%E6%8D%9F%E5%9D%8F%E7%9A%84%E7%B3%BB%E7%BB%9F%E6%96%87%E4%BB%B6-79aa86cb-ca52-166a-92a3-966e85d4094e)