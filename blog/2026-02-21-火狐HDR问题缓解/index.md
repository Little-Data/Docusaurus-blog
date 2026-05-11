---
slug: Firefox_HDR_issue_mitigation
title: 火狐HDR问题缓解
authors: 半个水果
tags: [火狐, 浏览器, HDR]
description: 火狐HDR问题缓解
hide_table_of_contents: false
date: 2026-02-21T00:28
unlisted: false
hide_comment: false
---

{/* truncate */}

在`about:config`里面，设置这几项应该会好一些

`layout.css.video-dynamic-range.allows-high`设为`true`

`media.wmf.force.allow-p010-format`设为`true`