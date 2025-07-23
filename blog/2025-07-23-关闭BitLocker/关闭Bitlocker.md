---
slug: turn-off-Bitlocker
title: 关闭Bitlocker
authors: 半个水果
tags: [Windows, Bitlocker, 设备加密, 教程]
description: 关闭Bitlocker，以免在系统异常或未知的硬件问题导致加密的数据无法解密
hide_table_of_contents: false
date: 2025-07-23T18:43
unlisted: false
---

关闭Bitlocker，以免在系统异常或未知的硬件问题导致加密的数据无法解密。Bitlocker对于普通人来说没有多大作用，甚至会带来负优化，建议关闭。

<!-- truncate -->

## 在 Windows 11 上禁用 BitLocker 设备加密

### 方法 1：关闭「设备加密」功能（全局解密）

:::tip

适用于包括「家庭版」在内的所有 Windows 11 版本。

:::

使用 `Windows + I`快捷键打开「设置」>「隐私和安全性」。

在「安全性」区域，选择「设备加密」页面。

关闭「设备加密」开关，以禁用 BitLocker 设备加密。

完成以上步骤后，系统将开始解密设备上的所有分区或卷。

### 方法 2：通过「控制面板」关闭 BitLocker 驱动器加密

:::tip

适用于 Windows 11 专业版及更高版本。

:::

使用 `Windows + R` 快捷键打开「运行」对话框，输入 `control` 按确定，打开「控制面板」。

选择「系统和安全」>「BitLocker 驱动器加密」。

在打开的界面中，选择「关闭 BitLocker」，并在弹出的确认框中再次确认。

![01](./01.jpeg)

解密过程会立即开始，你可以点击任务栏中的图标查看进度。

:::tip

根据硬盘的使用情况和性能，解密过程可能会花费较长时间。

:::

### 方法 3：通过「命令提示符」关闭 BitLocker 驱动器加密

:::tip

适用于 Windows 11 专业版及更高版本。

:::

你也可以通过 Windows 的「命令提示符」来关闭 BitLocker 加密。操作步骤如下：

使用 `Windows + R` 快捷键打开「运行」对话框，输入`cmd`，然后按 `Ctrl + Shift + Enter` 以管理员权限打开「命令提示符」。

执行以下命令，通过「保护状态」查看各磁盘和卷的 BitLocker 加密状态：

```bash showLineNumbers
manage-bde -status
```

![02](./02.jpeg)

然后执行以下命令解密 C 盘（要解密其他驱动器，请更改成相应的盘符）：

```bash showLineNumbers
manage-bde -off C:
```

### 方法 4：通过 PowerShell 关闭 BitLocker 驱动器加密

最后，你还可以通过 Windows PowerShell 来关闭磁盘和分区的 BitLocker 状态：

使用 `Windows + R` 快捷键打开「运行」对话框，输入 `powershell`，然后按 `Ctrl + Shift + Enter` 以管理员权限打开 PowerShell。

执行以下命令，通过「VolumeStatus」检查磁盘和分区的 BitLocker 加密状态：

```powershell showLineNumbers
Get-BitLockerVolume
```

![03](./03.jpeg)

然后执行以下命令解密 C 盘（要解密其他驱动器，请更改成相应的盘符）：

```powershell showLineNumbers
Disable-BitLocker -MountPoint "C:"
```

## 什么是Bitlocker

BitLocker是微软在Windows Vista中引入的一种驱动器加密技术，旨在保护存储在计算机上的数据，尤其是在设备<Underline color="red">丢失或被盗</Underline>的情况下。它使用高级加密标准（AES）对整个磁盘分区进行加密，确保只有经过授权的用户才能访问数据。

### BitLocker的主要功能

- 全盘加密：BitLocker能够加密整个磁盘分区，包括操作系统分区和数据分区，确保数据安全。
- TPM集成：BitLocker与受信任的平台模块（TPM）集成，TPM用于存储加密密钥，提供硬件级别的安全性。
- 多重认证方式：用户可以选择使用密码、PIN码等多种方式解锁加密驱动器，增强数据保护的灵活性。
- BitLocker To Go：此功能允许用户加密可移动存储设备，如USB闪存驱动器，确保便携设备上的数据同样受到保护。

### BitLocker 恢复密钥

当 BitLocker 无法在 Windows 中自动解锁加密驱动器时，需要 BitLocker 恢复密钥。 此密钥是一个 48 位数字，用于重新获得对驱动器的访问权限。

恢复密钥可能保存的位置：

- Microsoft 帐户，[访问密钥页面](https://aka.ms/myrecoverykey)
- 先前有提示让你保存的密钥（如记到了一张纸上，保存到一个txt文件里）

如果找不到 BitLocker 恢复密钥，则无法访问你所有受BitLocker加密过的数据，任何人都没有办法解密。你只能做的就是重置设备，这会<Underline color="red">删除所有文件</Underline>，无法恢复。

## 对普通人的影响

BitLocker确实能最大程度保护你的数据安全，不过安全和便捷是做不到两全其美的。上面也提到，BitLocker能预防在设备丢失的情况下防止其他人读取你的数据。现实生活中这种情况比较少见（毕竟电脑这么贵重的东西肯定要好好保管），比较尴尬的是，出现下面的情况时使用BitLocker可就头大了：

### 微软默认开启BitLocker

这是我写这篇文章的出发点，很多人不知道微软悄悄给你打开了BitLocker，可能是在你更新系统时，重装新版本系统时发生的。

这会导致系统出现问题时，提示输入BitLocker密钥才发现，这时候东找西找也找不到密钥，自己的数据再也无法访问了。

### BitLocker密钥容易丢失

BitLocker密钥是解密数据的<Underline color="red">唯一方法</Underline>。从上面可知可以从两种途径获取，不过都有问题。

1. Microsoft 帐户

	想从Microsoft 帐户获取BitLocker密钥就必须<Highlight color="red">在启用BitLocker前登录Microsoft 帐户</Highlight>。如果是<Highlight color="red">本地账户</Highlight>就不可能显示BitLocker密钥，在启用之后再登录很可能也没有密钥。

	相信仍有大量系统（尤其是一些重装大师等流氓软件重装的）是本地账户，且不知道什么时候启用了BitLocker

2. 先前有提示让你保存的密钥

	既然是你自己保存的，你记得在哪里吗？万一没有保存完整的48位密钥呢？还是你根本没有保存？

### 无法挂载到其他地方读取数据

如果你的硬盘坏了，去找数据恢复的商家恢复数据，则他们会告诉你加密了读取不了数据，需要提供BitLocker密钥

如果换新硬盘，旧硬盘换到其它设备（如nas），那么旧硬盘的数据是无法读取的。

### 会带来轻微的硬盘性能损失

影响硬盘读写性能，也许在游戏时会有明显影响。

### BitLocker不防病毒软件

BitLocker是加密数据的，不具备杀毒/防毒功能，在你登录Windows后数据就解密了。病毒软件肯定是在你登录电脑后才会执行，这时候数据已经解密了，病毒软件想干嘛就干嘛。

### 系统抽筋

BitLocker是软件加密，需要Windows系统来操作。但是Windows系统并不稳定，某些情况会出现错误蓝屏/黑屏，然后就提示让你输入恢复密钥了。

<Block>
说了这么多，对我们普通人来说关掉要好的多，你的数据又不是什么机密，又不应该马虎大意随便乱丢电脑。登录微软账号，设置开机密码，保管好电脑就基本没什么大问题。
</Block>

## 参考来源

1. 查找 BitLocker 恢复密钥

	https://support.microsoft.com/zh-cn/windows/查找-bitlocker-恢复密钥-6b71ad27-0b89-ea08-f143-056f5ab347d6

2. 4 种简单方法：如何在 Windows 11 中关闭 BitLocker 加密

	https://www.sysgeek.cn/disable-bitlocker-windows

3. Tested: Windows 11 Pro's On-By-Default Encryption Slows SSDs Up to 45%

	https://www.tomshardware.com/news/windows-software-bitlocker-slows-performance