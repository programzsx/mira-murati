---
title: Oh-My-OpenCode插件的sisyphus
date: 2026-06-02 13:53:42
categories:
  - 人工智能
  - ai-coding
  - opencode
  - sisyphus
---

![](https://zsx-typora.oss-cn-hangzhou.aliyuncs.com/blogimage-20260602135038785.png)

## 1 - Sisyphus（西西弗斯） - 核心调度官

**它是谁**：

这是`Oh My OpenCode`插件中的

**主智能体（Orchestrator / Lead Agent）**，

相当于`多Agent团队`里的

“项目经理”或“总指挥”。

----

**名字由来**

取自希腊神话中

永无止境推石头上山的“西西弗斯”，

暗喻

这个AI拥有极强的**纪律性和死磕精神**。

----

**它的职责**

当你输入一个复杂的开发任务时，

它不会盲目直接写代码，

而是负责`拆解任务`、

构建`依赖图`，

然后调用和分发任务

给更专业的子Agent

（比如

负责架构的`@oracle`、

负责查文档的`@librarian`、

负责修Bug的`@fixer` 等），

并独立验证它们提交的代码质量，

直到任务完全搞定才会停下。

## 2 - Ultraworker - 超级打工人/执行模式描述

**它是啥**

这是`Sisyphus`智能体

在启用

最高性能配置（`variant: "max"`）时的

==角色标签==或描述。

----

**它的作用**

官方为了让用户更容易理解，

用`Ultraworker`（超级打工人）

来==直观替代==生硬的神话词汇。

----

当你触发工具的**`ultrawork`**（或`ulw`）模式时，

它就会化身`Ultraworker`，

开启==极其激进的并行开发状态==：

在后台同时控制多个终端（甚至是==tmux窗格==），

一边自动翻看代码库，

一边跑`测试`、看`语法诊断（LSP）`，

以`极高的人类模仿度`

去跨文件重构代码。

----

**简单来说：**

在你的OpenCode输入框下面，

`Sisyphus - Ultraworker`

意味着

“当前负责帮你干活的是`西西弗斯指挥官`，

且它目前正处于

全力全开的`超级打工人`高并发执行模式”。