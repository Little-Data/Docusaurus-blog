---
slug: use_new_nodejs_version_in_linux_debian
title: linux 使用高版本 nodejs(debian)
authors: 半个水果
tags: [linux, Node.js, debian, 教程]
description: linux 使用高版本 nodejs(debian)，自带软件源版本过低
hide_table_of_contents: false
date: 2026-05-14T02:23
unlisted: false
hide_comment: false
---

linux 使用高版本 nodejs(debian)，[自带软件源](https://packages.debian.org/search?searchon=names&keywords=nodejs)版本过低。

{/* truncate */}

## 状况

Debian 的软件源仓库版本过低，只能维持基本运行：

| 系统版本  | node.js版本 |
| :---: | :---: |
| Debian 13 | 20.19.x |
| Debian 12 | 18.20.x |
| Debian 11 | 12.22.x |

想要安装新版本就要通过以下方法：

| 途径  | 获取/更新方式 | nodejs官方维护？|
| :---: | :---: | :---: | 
| NodeSource | apt，可检查更新 | 否 |
| Node版本管理器（NVM） | nvm install，需手动安装指定版本 | 是 |

方便为主，本文使用 NodeSource 来安装。

:::warning

node.js 容易受到供应链攻击，不管是否为官方软件包，一定要留意！时常关注相关新闻！

:::

## 安装

安装之前要先将旧版本彻底卸载：

```SHELL
sudo apt purge nodejs
```

之后视情况删除不需要的依赖：

```SHELL
sudo apt autoremove
```

访问[NodeSource](https://nodesource.com/products/distributions)，页面可以选择符合系统的软件源。

这里只提供 Debian 13 nodejs 24 版本的软件源，逐行执行：

:::warning

随时可能会发生变动，建议自行访问网址获取最新的命令！

:::

```SHELL
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

最后能够显示版本号即安装成功。

## 小小电脑

如果你是在安卓上使用[小小电脑](https://github.com/Cateners/tiny_computer)来安装并使用nodejs，要注意你的项目不要直接在安卓内部存储中运行，否则会出现`Permission denied`错误！

应将项目放在你个人账户文件夹下（即`/home/用户名`）或其它有权限的地方。这样做避免了安卓文件权限无法更改的问题。

## 参考

[How to Install Node.js on Debian (13, 12, 11)](https://linuxcapable.com/how-to-install-node-js-on-debian-linux)