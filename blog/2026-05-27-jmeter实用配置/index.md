---
slug: JMeter_Practical_Configuration
title: JMeter 实用配置
authors: 半个水果
tags: [JMeter, apache]
description: JMeter 实用配置，确保下次打开时配置依然保留。
hide_table_of_contents: false
date: 2026-05-27T13:30
last_update:
  date: 2026-05-27T13:30
unlisted: false
hide_comment: false
---

JMeter 实用配置，确保下次打开时配置依然保留。

{/* truncate */}

为了让软件用得更顺手一些，修改了下面的一些配置。如要修改请在 `jmeter.properties` 文件中查找相应内容后修改。

<Highlight color="red">注意：修改配置时一定要把前面的 \# 删除！</Highlight>

## 语言

设置为简体中文

```INI
language=zh_CN
```

## 将界面主题换成白色

```INI
jmeter.laf=System
```

## 修改工具栏图标大小

图标尺寸可选：22x22，32x32，48x48

```INI
jmeter.toolbar.icons.size=32x32
```
## 禁止执行时出现弹窗

避免每次运行时会出现 `文件已经存在，您想要做什么？` 的弹窗提示

```INI
resultcollector.action_if_file_exists=APPEND
```