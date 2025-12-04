---
slug: DBeaver_settings
title: DBeaver相关配置
authors: 半个水果
tags: [DBeaver, 数据库]
description: DBeaver相关配置
hide_table_of_contents: false
date: 2025-12-04T17:24
unlisted: false
hide_comment: false
---

DBeaver是一个开源免费的数据库管理软件，支持很多种数据库类型。

<!-- truncate -->

下面是我遇到的一些问题及解决方法。

:::tip

我的数据库类型：`MySQL 9.5.0`

DBeaver版本：`25.2.4`

驱动库：`com.mysql:mysql-connector-j:RELEASE[9.5.0]`
:::

## 设置中文

如果不是在微软商店下载的版本，可能默认不是中文。

点击Windows——Preferences

左侧选User Interface，右侧找到Language

## 连接数据库时出现“Public Key Retrieval is not allowed”

在“连接到数据库”窗口中找到“驱动属性”

找到`allowPublicKeyRetrieval`将值设为`TRUE`

## 转储数据库时提示“还没有设置连接地址”

点“本地客户端...”

在下拉选项中选择“浏览...”

在新窗口中选“添加数据库地址”

这里要添加的其实是MySQL的安装目录，选择目录看到`bin`，`docs`等这些文件夹后点“选择文件夹”按钮.

## 转储数据库成功后再导入失败了

在转储数据库时到导出配置这一步，在“额外的命令参数”中增加下面的命令

```
--set-gtid-purged=OFF
```

这样以后再转储就没问题了。

如果在命令添加之前已经转储了，补救措施如下：

使用文本编辑器（如记事本）打开转储的sql文件。

整个文件中找到下面几句整行删除：

```sql
SET @MYSQLDUMP_TEMP_LOG_BIN
SET @@SESSION.SQL_LOG_BIN
SET @@GLOBAL.GTID_PURGED
```
## 不想在下次启动时自动打开数据库

选择不想自动打开数据库

点“文件”——“属性”

选“编辑器”，在该页面中取消勾选“重启后重新打开数据库编辑器”