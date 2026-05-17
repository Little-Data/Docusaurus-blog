---
slug: add_the_exam_in_docusaurus 
title: 在 Docusaurus 页面中添加测验
authors: 半个水果
tags: [docusaurus, 教程]
description: 在 Docusaurus 页面中添加测验
hide_table_of_contents: false
date: 2026-05-17T22:49
unlisted: false
hide_comment: false
---

在 Docusaurus 页面中添加测验。兼容 markdown 语法。

{/* truncate */}

相关文件和说明可在[这里](https://github.com/Little-Data/docusaurus-quiz-plugin)获取。

## 单选
<Workpaper>
  <Workitem xuanze>
    <Wenben>下列哪项是 React 的核心概念？</Wenben>
    <Xuanxiang label="项">双向数据绑定</Xuanxiang>
    <Xuanxiang ans>组件化</Xuanxiang>
    <Xuanxiang>模板引擎</Xuanxiang>
    <Xuanxiang>依赖注入</Xuanxiang>
    <Jiexi>React 采用组件化的方式来构建用户界面。</Jiexi>
  </Workitem>
</Workpaper>

## 多选
<Workpaper>
  <Workitem xuanze>
    <Wenben>以下哪些属于 React Hooks？</Wenben>
    <Xuanxiang ans>useState</Xuanxiang>
    <Xuanxiang ans>useEffect</Xuanxiang>
    <Xuanxiang>useSelector</Xuanxiang>
    <Xuanxiang ans>useContext</Xuanxiang>
    <Jiexi>useState、useEffect、useContext 都是内置 Hooks，useSelector 来自 Redux。</Jiexi>
  </Workitem>
</Workpaper>

## 填空题
<Workpaper>
  <Workitem tiankong>
    <Wenben>~请简述 React 中状态提升的概念。~</Wenben>
    <Ansinput />
    <Jiexi>状态提升是指将多个组件共享的状态提升到它们最近的公共父组件中。</Jiexi>
  </Workitem>
</Workpaper>

## 混合
<Workpaper>
<Workpapersettings />
  <Workitem xuanze>
    <Wenben>React 使用哪种语法来描述界面？</Wenben>
    <Xuanxiang>HTML</Xuanxiang>
    <Xuanxiang ans>JSX</Xuanxiang>
    <Xuanxiang>XML</Xuanxiang>
    <Xuanxiang>YAML</Xuanxiang>
    <Jiexi>JSX 是 JavaScript 的语法扩展，用于描述 UI 结构。</Jiexi>
  </Workitem>
  <Workitem tiankong>
    <Wenben>React 中用于管理复杂状态逻辑的 Hook 是？</Wenben>
    <Ansinput />
    <Jiexi>useReducer 是 useState 的替代方案，适用于复杂状态逻辑。</Jiexi>
  </Workitem>
</Workpaper>