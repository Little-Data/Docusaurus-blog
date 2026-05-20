---
slug: Add_back_to_top_for_Docusaurus_blog
title: 在 Docusaurus 的 Blog 页面中添加回到顶部按钮
authors: 半个水果
tags: [docusaurus, 教程, npm]
description: 在 Docusaurus 的 Blog 页面中添加回到顶部按钮，官方不愿添加的功能
hide_table_of_contents: false
date: 2026-05-19T01:39
last_update:
  date: 2026-05-19T22:30
unlisted: false
hide_comment: false
---

在 Docusaurus 中你会发现，docs 页面有回到顶部按钮，blog 没有此按钮。

官方的回答是[有意为之](https://github.com/facebook/docusaurus/discussions/7516)。既然官方不愿添加，那就自己动手添加该功能。

{/* truncate */}

## 准备

在项目目录中执行下面的命令

```SHELL
npm run swizzle @docusaurus/theme-classic Layout
```

出现下面提示时选择`JavaScript`：

```TEXT
? Which language do you want to use? » - Use arrow-keys. Return to submit.
>   JavaScript
    TypeScript
    [Exit]
```

出现下面提示时选择`Wrap (Unsafe)`：

```TEXT
? Which swizzle action do you want to do? » - Use arrow-keys. Return to submit.
>   Wrap (Unsafe)
    Eject (Unsafe)
    [Exit]
```

出现下面提示时选择`YES: I know what I am doing!`：

```TEXT
? Do you really want to swizzle this unsafe internal component? » - Use arrow-keys. Return to submit.
    NO: cancel and stay safe
>   YES: I know what I am doing!
    [Exit]
```

成功之后可以在`src\theme\Layout`目录下找到导出的文件。

## 新建所需文件

在`src\components`中新建`BackToTopButton`文件夹，之后在里面新建下面的文件：

```js title='index.js' showLineNumbers
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

const HIDE_DELAY = 2000;       // 静止指定毫秒后自动隐藏
const SCROLL_THRESHOLD = 300;  // 滚动超过该距离才开始处理
const DIRECTION_DELTA = 5;     // 判定为方向变化的滚动距离
const BOTTOM_OFFSET = 2;       // 到达底部的容差（像素）

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  // 只在文档页面显示（路径以 /blog 开头，可根据实际路径调整）
  const isDocsPage = location.pathname.startsWith('/blog');

  const lastScrollTop = useRef(0);
  const hideTimer = useRef(null);

  const clearHideTimer = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const scheduleHide = useCallback(() => {
    clearHideTimer();
    hideTimer.current = setTimeout(() => {
      setVisible(false);
    }, HIDE_DELAY);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isDocsPage) {
      setVisible(false);
      return;
    }

    const handleScroll = () => {
      const currentScroll = document.documentElement.scrollTop;
      const delta = currentScroll - lastScrollTop.current;
      lastScrollTop.current = currentScroll;

      // 页面滚动距离不足阈值，始终隐藏
      if (currentScroll <= SCROLL_THRESHOLD) {
        setVisible(false);
        clearHideTimer();
        return;
      }

      // 检查是否到达页面底部（无法继续向下滚动）
      const atBottom =
        currentScroll + window.innerHeight >=
        document.documentElement.scrollHeight - BOTTOM_OFFSET;

      // 到达底部：直接显示按钮（无论方向），并重置隐藏计时器
      if (atBottom) {
        setVisible(true);
        scheduleHide();
        return;
      }

      // 未到达底部，根据滚动方向决定显隐
      if (delta < -DIRECTION_DELTA) {
        // 明显向上滚动：显示按钮
        setVisible(true);
        scheduleHide();
      } else if (delta > DIRECTION_DELTA) {
        // 明显向下滚动：隐藏按钮
        setVisible(false);
        clearHideTimer();
      } else {
        // 微小滚动（滚动停顿、抖动）：保持当前可见状态，但重置静止计时器
        scheduleHide();
      }
    };

    // 初始化状态（页面加载时滚动距离可能大于300，但先隐藏，等用户滚动时再触发）
    lastScrollTop.current = document.documentElement.scrollTop;
    setVisible(false);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearHideTimer();
    };
  }, [isDocsPage, scheduleHide]);

  if (!isDocsPage) return null;

  return (
    <button
      className={`${styles.backToTopButton} ${visible ? styles.backToTopButtonVisible : ''}`}
      onClick={scrollToTop}
      aria-label="回到顶部"
      title="回到顶部"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
};

export default BackToTopButton;
```

```css title='styles.module.css' showLineNumbers
.backToTopButton {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: var(--ifm-z-index-fixed);
  background-color: var(--ifm-color-primary);
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--ifm-global-shadow-md);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  cursor: pointer;
}

.backToTopButton:hover {
  background-color: var(--ifm-color-primary-dark);
  transform: translateY(-2px);
}

.backToTopButtonVisible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
```

## 引入页面

进入`src\theme\Layout`文件夹，修改文件：

```js title='index.js' showLineNumbers
import React from 'react';
import Layout from '@theme-original/Layout';
// highlight-next-line
import BackToTopButton from '@site/src/components/BackToTopButton';

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      // highlight-next-line
      <BackToTopButton />
    </>
  );
}
```