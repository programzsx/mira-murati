---
title: 使用Hexo搭建个人博客
date: 2026-05-29 14:00:00
categories:
  - 技术
  - 前端
tags:
  - Hexo
  - Markdown
  - 博客
toc: true
---

## 为什么选择Hexo

Hexo是一个快速、简洁且高效的静态博客框架。基于Node.js，它能够将Markdown文章渲染成静态页面，一键部署到GitHub Pages等平台。

## 安装与初始化

首先是安装Hexo命令行工具：

```bash
npm install -g hexo-cli
hexo init my-blog
cd my-blog
npm install
```

初始化完成后，目录结构如下：

- `source/_posts/` — 存放文章的目录
- `themes/` — 主题目录
- `_config.yml` — 站点配置
- `public/` — 生成的静态文件

## 创建文章

使用以下命令创建一篇新文章：

```bash
hexo new "我的第一篇博客"
```

这会创建一个Markdown文件，内容包含front-matter元数据：

```markdown
---
title: 我的第一篇博客
date: 2026-05-29 14:00:00
tags:
---
```

### Front-matter配置

front-matter支持以下常用字段：

- `title` — 文章标题
- `date` — 发布日期
- `categories` — 分类（支持多级）
- `tags` — 标签（支持多个）
- `permalink` — 自定义永久链接

## 部署到GitHub Pages

配置 `_config.yml` 中的部署信息：

```yaml
deploy:
  type: git
  repo: https://github.com/username/username.github.io.git
  branch: main
```

然后一条命令完成生成和部署：

```bash
hexo generate --deploy
```

## 总结

Hexo的核心理念是**简单**。写Markdown，生成静态页面，推送部署——三步走，不需要数据库，不需要后端服务器。对于技术博客来说，这是个完美的方案。

> 好的工具让你专注于内容本身，而不是折腾工具本身。
