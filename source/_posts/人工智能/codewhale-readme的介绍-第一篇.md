---
title: CodeWhale
date: 2026-06-03 09:38:00
categories:
  - 人工智能
  - 智能体
  - ai coding
  - codewhale
---

## CodeWhale

面向`DeepSeek V4`的`终端原生编程智能体`：

- 100万token上下文、

- 思考模式流式推理、

- 前缀缓存感知。

----

以`codewhale调度器`和`codewhale-tui运行时`

这一组`自包含Rust二进制`发布

——开箱即带`MCP客户端`、`沙箱`和`持久化任务队列`。

> codewhale调度器
>
> codewhale-tui运行时

## 安装

`codewhale`以一组`自包含Rust发布二进制`安装：

`codewhale调度器命令，

以及它在交互会话中启动的`同级codewhale-tui运行时`。

----

`npm`和`Docker`会自动安装这两个二进制；

`Cargo`或手动下载时

必须把两者放在同一目录（通常是PATH上的某个目录）。

运行时不依赖`Node.js`或`Python`。

## 1、

npm——已装Node的最方便方式。

npm包只是一个下载器，

会从`GitHub Releases`拉取对应平台的`预编译二进制对`，

并不会让`codewhale`本身依赖`Node运行时`。

```shell
npm install -g codewhale
```

## 

Cargo —— 无需Node，两个`crate`都要安装。

```
# codewhale入口
cargo install codewhale-cli --locked

# codewhale-tui TUI二进制
cargo install codewhale-tui --locked   
```

----

`Homebrew` — 仅用于`旧安装兼容`。

`tap/formula`仍使用旧的`deepseek-tui`名称。

新安装请优先使用

----

`npm`、`Cargo`、`Docker`或直接下载，直到`formula`完成改名。

```
brew tap Hmbown/deepseek-tui

brew install deepseek-tui
```

----

直接下载 —— `GitHub Releases`的`平台压缩包`。

https://github.com/Hmbown/CodeWhale/releases

压缩包包含`codewhale`和`codewhale-tui`以及`安装脚本`；

也提供`单独二进制`给脚本使用，

`手动安装时`请把这一对放在一起。

> 1、codewhale
>
> 2、codewhale-tui
>
> 3、安装脚本

----

5 - Docker — 预构建发布镜像

```shell
docker volume create codewhale-home

docker run --rm -it \
  -e DEEPSEEK_API_KEY="$DEEPSEEK_API_KEY" \
  -v codewhale-home:/home/codewhale/.codewhale \
  -v "$PWD:/workspace" \
  -w /workspace \
  ghcr.io/hmbown/codewhale:latest
```