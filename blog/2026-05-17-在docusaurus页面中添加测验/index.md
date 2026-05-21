---
slug: add_the_exam_in_docusaurus 
title: 在 Docusaurus 页面中添加测验
authors: 半个水果
tags: [docusaurus, 教程]
description: 在 Docusaurus 页面中添加测验
hide_table_of_contents: false
date: 2026-05-17T22:49
last_update:
  date: 2026-05-22T02:36
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
  <Workitem tiankong>
    <Wenben>试试 KaTeX 数学公式代码！ `$F(x)=\int_{a}^{x} f(t)\,dt$`</Wenben>
    <Ansinput katex />
    <Jiexi>$F(x)=\int_{a}^{x} f(t)\,dt$</Jiexi>
  </Workitem>
</Workpaper>

## 你知道吗？

在编写这个插件时遇到了一个问题：

在页面上手动勾选后，展开/收起解析按钮会变为可用，这是正常的。

但到页面刷新后，Chromium 和 Firefox 的表现有所不同。

假设你已经设置好不直接显示答案或解析，在未勾选之前展开/收起解析按钮是不可用状态。

但你勾选并刷新页面后，勾选状态会回到设置好的不勾选状态，但在 Firefox 上展开/收起解析按钮依然是可用状态，而 Chromium 是正常的不可用状态。

相关的 BUG 在[这里](https://bugzilla.mozilla.org/show_bug.cgi?id=654072)可以找到。

简单描述一下：

1. 用户在页面 A 勾选了"直接显示答案" → 按钮变为 `enabled`
2. 刷新页面 → Firefox 从 session restore 恢复按钮为 `enabled`
3. React hydrate 时，虽然 props 传递了 disabled=true，但 Firefox 的 session restore 覆盖了 DOM 属性（即 button 中没有 `disabled` 属性）
4. 结果：复选框显示未勾选（React 控制），但按钮仍保持 `enabled`（Firefox 恢复）

因此，为解决该问题，在 React 渲染完成后，强制同步 DOM 属性，覆盖 Firefox 的 session restore 操作。