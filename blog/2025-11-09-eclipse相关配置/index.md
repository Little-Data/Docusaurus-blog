---
slug: eclipse_settings
title: eclipse相关配置
authors: 半个水果
tags: [eclipse, Java]
description: eclipse相关配置，优化使用体验
hide_table_of_contents: false
date: 2025-11-09T15:43
unlisted: false
---

eclipse是用来编写Java相关的开源IDE，很受广大群众欢迎。本文根据我的使用体验编写

<!-- truncate -->

## 自动补全

点击`Window`-`Preferrences`

在弹出的窗口中选中`Java`-`Editor`-`Content Assist`

在右侧找到`Auto Activation`区域，`Auto activation triggers for Java`

确保`Enable auto activation`已选中

在`.`后面输入：

```
abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
```

为了确保按空格不会自动补全，在当前页面的`Insertion`部分中选中`Disable insertion triggers except'Enter'`

## 禁止启动后的捐赠页面

打开软件安装目录，找到`eclipse.ini`文件打开，在`-vmargs`部分添加一行:

```ini title='eclipse.ini'
...（省略了其它内容）
-vmargs
// highlight-next-line
-Dorg.eclipse.oomph.setup.donate=false
...（省略了其它内容）
```

## 高分辨率界面缩放

使用高分辨率（如4K屏）时会遇到界面或图标变小，可通过在`eclipse.ini`文件中`-vmargs`部分添加几行解决：

```ini title='eclipse.ini'
...（省略了其它内容）
-vmargs
// highlight-start
-Dswt.enable.autoScale=true
-Dswt.autoScale=150
-Dswt.autoScale.method=nearest
// highlight-end
...（省略了其它内容）
```

其中的`-Dswt.autoScale=`为缩放大小，可视情况自己修改数值。

## 出现的一些问题

下面出现的问题不一定每个人都会碰到，也有可能随着版本更新后被解决。

### Tomcat多次启动后不再弹出浏览器

没有什么好的解决方法，只能启动后自己在浏览器输入访问地址。

### web.xml文件没有生成

软件内右键你的项目名称文件夹，找到`Java EE Tools`，选择`Generate Deployment Descriptor Stub`即可生成。

### 项目列表没有自动刷新

没有自动刷新是软件这样设计的，这会导致你的项目中如果多了一些文件则不会立马显示，而这些没有立即显示的文件可能就是项目无法启动的原因。

要手动刷新除了重新启动软件，还可以右键你的项目名称文件夹，选择`Refresh`来刷新。

## 参考资料

eclipse自动补全及其空格键优化（去除空格自动补全）——阿里云

https://developer.aliyun.com/article/1598921


Ecplise更便捷的自动补全功能设置及改良——知乎——星锤兔55

https://zhuanlan.zhihu.com/p/111870721

How to remove Donate tab?(How to remove Donate tab in Eclipse 2020-06?)——Eclipse Community Forums

https://www.eclipse.org/forums/index.php/t/1104324

解决 Eclipse 在高分辨屏下图标太小问题——博客园——harrychinese

https://www.cnblogs.com/harrychinese/p/16404604.html