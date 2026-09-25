import React, { type ReactNode, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type { WrapperProps } from '@docusaurus/types';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

/**
 * Twikoo 评论系统（CDN 引入）
 *
 */
const TWIKOO_ENV_ID = 'https://tallk.little-data.top';
const TWIKOO_CDN = 'https://registry.npmmirror.com/twikoo/2.0.9/files/dist/twikoo.min.js';
const TWIKOO_SCRIPT_ID = 'twikoo-cdn-script';

/**
 * KaTeX 相关配置。
 * Twikoo 的公式渲染依赖 `window.renderMathInElement`（KaTeX 的 auto-render 扩展），
 * 而不是 `window.katex` 本身。本项目的 KaTeX 引擎挂在 `/katex/katex.min.js`，
 * 但缺少 auto-render 扩展，所以这里优先加载本地扩展，失败再回退到 CDN。
 */
const KATEX_LOCAL_AUTO_RENDER = '/katex/contrib/auto-render.min.js';
const KATEX_DEFAULT_VERSION = '0.18.9';
const KATEX_DELIMITERS = [
  { left: '$$', right: '$$', display: true },
  { left: '$', right: '$', display: false },
  { left: '\\(', right: '\\)', display: false },
  { left: '\\[', right: '\\]', display: true },
];

type TwikooGlobal = {
  init: (options: Record<string, unknown>) => Promise<void>;
};

type KatexGlobal = {
  version?: string;
  renderToString: (tex: string, options?: Record<string, unknown>) => string;
};

type RenderMathInElement = (
  el: HTMLElement,
  options?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    twikoo?: TwikooGlobal;
    katex?: KatexGlobal;
    renderMathInElement?: RenderMathInElement;
  }
}

/**
 * 判断 Twikoo 是否已就绪。
 * 注意：容器 div 的 id 为 "twikoo"，浏览器会把同名元素暴露为 window.twikoo，
 * 因此不能用 `if (window.twikoo)` 判断，必须确认 init 是函数。
 */
function getReadyTwikoo(): TwikooGlobal | null {
  const twikoo = window.twikoo;
  return twikoo && typeof twikoo.init === 'function' ? twikoo : null;
}

/** 全局加载一次 Twikoo 脚本，返回可用的 twikoo 对象 */
let twikooPromise: Promise<TwikooGlobal> | null = null;

function loadTwikoo(): Promise<TwikooGlobal> {
  const ready = getReadyTwikoo();
  if (ready) {
    return Promise.resolve(ready);
  }
  if (!twikooPromise) {
    twikooPromise = new Promise<TwikooGlobal>((resolve, reject) => {
      const existing = document.getElementById(
        TWIKOO_SCRIPT_ID,
      ) as HTMLScriptElement | null;
      const script = existing ?? document.createElement('script');

      const handleLoad = (): void => {
        const loaded = getReadyTwikoo();
        if (loaded) {
          resolve(loaded);
        } else {
          twikooPromise = null;
          reject(new Error('Twikoo 脚本已加载，但未找到可用的 twikoo.init'));
        }
      };
      const handleError = (): void => {
        twikooPromise = null;
        reject(new Error(`Twikoo 脚本加载失败：${TWIKOO_CDN}`));
      };

      script.addEventListener('load', handleLoad);
      script.addEventListener('error', handleError);

      if (!existing) {
        script.id = TWIKOO_SCRIPT_ID;
        script.src = TWIKOO_CDN;
        script.async = true;
        document.head.appendChild(script);
      }
    });
  }
  return twikooPromise;
}

/** 等待 Docusaurus 通过 defer 加载的 KaTeX 引擎就绪；未配置 KaTeX 时立即返回 false */
function waitForKatex(timeoutMs = 2000): Promise<boolean> {
  if (window.katex) {
    return Promise.resolve(true);
  }
  // 页面里没有 KaTeX 脚本，说明项目未配置 KaTeX：不等待，避免拖慢评论区
  const katexScript = document.querySelector('script[src*="/katex/katex.min.js"]');
  if (!katexScript) {
    return Promise.resolve(false);
  }
  return new Promise((resolve) => {
    const start = Date.now();
    const timer = window.setInterval(() => {
      if (window.katex) {
        window.clearInterval(timer);
        resolve(true);
      } else if (Date.now() - start >= timeoutMs) {
        window.clearInterval(timer);
        resolve(false);
      }
    }, 100);
  });
}

/** 加载单个脚本，成功 resolve true，失败 resolve false（不抛错） */
function tryLoadScript(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.addEventListener('load', () => resolve(true), { once: true });
    script.addEventListener('error', () => resolve(false), { once: true });
    document.head.appendChild(script);
  });
}

/** 确保 KaTeX 的 auto-render 扩展可用；不可用时返回 false，评论仍正常显示 */
async function loadKatexAutoRender(): Promise<boolean> {
  if (typeof window.renderMathInElement === 'function') {
    return true;
  }

  const hasKatex = await waitForKatex();
  if (!hasKatex) {
    return false;
  }

  const version = window.katex?.version ?? KATEX_DEFAULT_VERSION;
  const sources = [
    KATEX_LOCAL_AUTO_RENDER,
    `https://registry.npmmirror.com/katex/${version}/files/dist/contrib/auto-render.min.js`,
    `https://cdn.jsdelivr.net/npm/katex@${version}/dist/contrib/auto-render.min.js`,
  ];

  for (const src of sources) {
    // eslint-disable-next-line no-await-in-loop
    const ok = await tryLoadScript(src);
    if (ok && typeof window.renderMathInElement === 'function') {
      return true;
    }
  }
  return false;
}

/** 全局只尝试准备一次数学渲染器 */
let mathRendererPromise: Promise<boolean> | null = null;

function ensureMathRenderer(): Promise<boolean> {
  if (!mathRendererPromise) {
    mathRendererPromise = loadKatexAutoRender().catch(() => false);
  }
  return mathRendererPromise;
}

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): ReactNode {
  const { frontMatter, isBlogPostPage } = useBlogPost();
  const { hide_comment: hideComment } = frontMatter;
  const [paginationParentEl, setPaginationParentEl] = useState<HTMLElement | null>(null);
  const commentContainerRef = useRef<HTMLDivElement | null>(null);
  const enabled = isBlogPostPage && !hideComment;

  // 找到分页组件的父元素（紧跟分页按钮后插入）
  useEffect(() => {
    if (!enabled) return;

    // 分页组件的类名：Docusaurus 2.x 通常是 .pagination-nav 或 .post-pagination
    const paginationEl = document.querySelector('.pagination-nav') || document.querySelector('.post-pagination');
    if (paginationEl && paginationEl.parentElement) {
      setPaginationParentEl(paginationEl.parentElement);
    }

    // 组件卸载时清理
    return () => setPaginationParentEl(null);
  }, [enabled]);

  // 初始化 Twikoo（脚本按需加载，CDN 引入）
  useEffect(() => {
    if (!enabled || !paginationParentEl) return;

    const container = commentContainerRef.current;
    if (!container) return;

    let cancelled = false;

    // 同时准备 Twikoo 与 KaTeX（KaTeX 缺失时 mathReady 为 false，不影响评论）
    Promise.all([loadTwikoo(), ensureMathRenderer()])
      .then(([twikoo, mathReady]) => {
        if (cancelled || !commentContainerRef.current) return;
        // 每次初始化前清空容器，避免 Docusaurus SPA 切换路由时残留旧评论
        container.innerHTML = '';
        return twikoo.init({
          envId: TWIKOO_ENV_ID,
          el: container,
          path: window.location.pathname,
          lang: 'zh-CN',
          // Twikoo 会把它作为 renderMathInElement 的参数；仅在 KaTeX 可用时启用
          ...(mathReady
            ? { katex: { delimiters: KATEX_DELIMITERS, throwOnError: false } }
            : {}),
        });
      })
      .catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
        if (!cancelled && commentContainerRef.current) {
          commentContainerRef.current.innerHTML =
            '<p style="text-align:center;color:var(--ifm-color-danger)">评论加载失败，请刷新页面重试。</p>';
        }
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, paginationParentEl]);

  // Twikoo 容器（仅在需要时渲染）
  const TwikooContainer = enabled ? (
    <div
      style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--ifm-color-emphasis-200)' }}
    >
      <div id="twikoo" ref={commentContainerRef} />
    </div>
  ) : null;

  return (
    <>
      <BlogPostItem {...props} />
      {/* 通过 Portal 将 Twikoo 插入到分页组件的父元素末尾 */}
      {paginationParentEl && createPortal(TwikooContainer, paginationParentEl)}
    </>
  );
}
