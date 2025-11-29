import React, { type ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type { WrapperProps } from '@docusaurus/types';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import { useColorMode, ColorMode } from '@docusaurus/theme-common';
import Giscus, { Theme } from '@giscus/react';

const DocusaurusColorModeToGiscusTheme: Record<ColorMode, Theme> = {
  light: 'light',
  dark: 'dark_dimmed'
};

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): ReactNode {
  const { frontMatter, isBlogPostPage } = useBlogPost();
  const { hide_comment: hideComment } = frontMatter;
  const { colorMode } = useColorMode();
  const giscusTheme = DocusaurusColorModeToGiscusTheme[colorMode];
  const [paginationParentEl, setPaginationParentEl] = useState<HTMLElement | null>(null);

  // 找到分页组件的父元素（紧跟分页按钮后插入）
  useEffect(() => {
    if (!isBlogPostPage || hideComment) return;
    
    // 分页组件的类名：Docusaurus 2.x 通常是 .pagination-nav 或 .post-pagination
    const paginationEl = document.querySelector('.pagination-nav') || document.querySelector('.post-pagination');
    if (paginationEl && paginationEl.parentElement) {
      setPaginationParentEl(paginationEl.parentElement);
    }

    // 组件卸载时清理
    return () => setPaginationParentEl(null);
  }, [isBlogPostPage, hideComment]);

  // Giscus 组件（仅在需要时渲染）
  const GiscusContainer = isBlogPostPage && !hideComment ? (
    <div key={`giscus-${colorMode}`} style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--ifm-color-emphasis-200)' }}>
      <Giscus
        repo="Little-Data/Docusaurus-blog"
        repoId="R_kgDOPND1Bw"
        category="General"
        categoryId="DIC_kwDOPND1B84Cx3hf"
        mapping="pathname"
        reactionsEnabled="1"
        inputPosition="top"
        theme={giscusTheme}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  ) : null;

  return (
    <>
      <BlogPostItem {...props} />
      {/* 通过 Portal 将 Giscus 插入到分页组件的父元素末尾 */}
      {paginationParentEl && createPortal(GiscusContainer, paginationParentEl)}
    </>
  );
}