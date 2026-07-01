---
slug: install_VirtualBox_Guest_Additions_in_linux
title: linux 安装 VirtualBox Guest Additions
authors: 半个水果
tags: [linux, VirtualBox, debian, CentOS,虚拟机, 教程]
description: linux 使用自带的 ISO 文件来安装 VirtualBox Guest Additions
hide_table_of_contents: false
date: 2026-05-15T00:06
last_update:
  date: 2026-07-01T23:55
unlisted: false
hide_comment: false
---

linux 使用自带的 ISO 文件来安装 VirtualBox Guest Additions

{/* truncate */}

## 准备

### 检查更新并安装

Debian 系列：

```SHELL
sudo apt update && apt upgrade
```

CentOS 9：

```shell
sudo yum update -y
```

### 安装必要库

Debian 系列：

```SHELL
sudo apt install build-essential module-assistant dkms
```

CentOS 9：

先安装 `epel` 库：

```shell
sudo yum install -y epel-release
```

再安装其它软件包：

```shell
sudo yum install -y gcc make perl kernel-devel kernel-headers dkms bzip2
```

:::note[　]

dkms 可在客户机内核更新后自动重建 Guest Additions 模块，避免因内核变化导致功能失效。

:::

## 安装

:::warning

下面步骤基于图形界面，若使用命令请到[参考](#参考)资料中查看命令。

:::

在 VirtualBox 中点击设备，安装增强功能。

这时安装所需文件应该挂载到虚拟机系统中了。

打开该文件夹，进入目录后打开终端输入：

```SHELL
sudo sh ./VBoxLinuxAdditions.run
```

安装完成后重启系统。

## 验证安装

打开终端输入：

```SHELL
lsmod | grep vbox
```

应输出 vboxguest、vboxsf、vboxvideo 等模块。

检查 Guest Additions 服务是否运行：

```SHELL
systemctl status vboxadd-service  # 或 vboxservice（取决于版本）
```

## 参考

[How to Install VirtualBox Guest Additions on Debian](https://linuxcapable.com/how-to-install-node-js-on-debian-linux)

[VirtualBox Linux 增强功能（Guest Additions）完全指南：安装、配置与最佳实践](https://geek-blogs.com/blog/vbox-linux-additions)

[如何在 Debian 上逐步安装 Virtualbox Guest Additions](https://cn.linux-terminal.com/?p=3818)

[如何在CentOS VirtualBox中安装Guest Additions](https://www.yisu.com/ask/32510148.html)