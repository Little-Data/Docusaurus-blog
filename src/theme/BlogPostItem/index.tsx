import React, {type ReactNode} from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import { useColorMode, ColorMode } from '@docusaurus/theme-common';
import Giscus, { Theme } from '@giscus/react';

const DocusaurusColorModeToGiscusTheme: Record<ColorMode, Theme> = {
  light: 'light',
  dark: 'dark_dimmed'
};

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): ReactNode {
  const { frontMatter } = useBlogPost();
  const { hide_comment: hideComment } = frontMatter;
  const { colorMode } = useColorMode();
  const giscusTheme = DocusaurusColorModeToGiscusTheme[colorMode];
  const { isBlogPostPage } = useBlogPost();
  const GiscusContainer = (
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
  );
  return (
    <>
      <BlogPostItem {...props} />
      {isBlogPostPage && !hideComment && GiscusContainer}
    </>
  );
}
