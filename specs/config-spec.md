# Config Spec — Hexo博客配置与目录管理规范

> 项目：blog-jessica-alba
> 框架：Hexo 8.1.1
> 编写日期：2026-05-29

---

## 一、Categories与Tags机制

### 1-1 核心原理

Categories和Tags完全由front-matter驱动，无需在别处注册。你在文章头部声明，Hexo在`hexo generate`时自动扫描所有文章的front-matter，聚合生成分类页和标签页。

与之对应的两个生成器：

- `hexo-generator-category` — 负责生成分类索引页和每个分类的文章列表
- `hexo-generator-tag` — 负责生成标签索引页和每个标签的文章列表

这两个包已在`package.json`中声明，开箱即用。

### 1-2 Categories写法

Categories支持层级（父子分类），用YAML数组表示：

```yaml
---
title: 文章标题
categories:
  - 技术
  - 前端
---
```

效果：文章归属"前端"，同时"前端"是"技术"的子分类。如果只写一个，那就是顶级分类：

```yaml
categories: 技术
```

**约定：**

- 一个分类对应一个目录页面，路径为`/categories/<分类名>/`
- 未声明category的文章自动归入`default_category`（当前配置为`uncategorized`）
- 分类名中的空格和特殊字符在URL中会被转义

### 1-3 Tags写法

Tags是扁平的，不支持层级。用YAML数组表示：

```yaml
---
title: 文章标题
tags:
  - Hexo
  - 博客
  - 教程
---
```

也可以写成行内数组：

```yaml
tags: [Hexo, 博客, 教程]
```

**约定：**

- 一个标签对应一个目录页面，路径为`/tags/<标签名>/`
- Tags数量不限，但建议每篇文章3-5个
- Tags是跨分类的——同一标签可以出现在不同分类的文章中

### 1-4 分类与标签的区别

- Category是"栏目"——一篇文章只属于一个分类体系（可以有层级但逻辑上是一个归属）
- Tag是"特征"——一篇文章可以有多个标签，从不同维度描述内容
- Category适合粗粒度组织（如：技术、随笔、阅读）
- Tag适合细粒度索引（如：Hexo、Git、Docker、写作）

### 1-5 别名映射

如果想让URL中的英文分类对应中文显示名，用`category_map`和`tag_map`：

```yaml
category_map:
  技术: tech
  随笔: essay
  阅读: reading

tag_map:
  命令行: cli
```

这样`/categories/tech/`页面显示"技术"，URL保持英文。

---

## 二、目录结构

### 2-1 完整目录树

```
blog-jessica-alba/
│
├── _config.yml                ← 全站配置（站点信息、URL、目录映射、分页、部署）
├── _config.landscape.yml      ← 主题级配置覆盖（覆盖themes/landscape/_config.yml）
├── package.json               ← 依赖声明（生成器、渲染器、部署器、主题）
│
├── scaffolds/                 ← 脚手架模板
│   ├── post.md                ← hexo new "标题" 时使用的模板
│   ├── page.md                ← hexo new page "标题" 时使用的模板
│   └── draft.md               ← hexo new draft "标题" 时使用的模板
│
├── source/                    ← 源文件目录（所有内容放这里）
│   ├── _posts/                ← 博客文章（.md文件，核心内容区）
│   │   ├── hexo-guide.md
│   │   ├── why-cli.md
│   │   └── ...
│   ├── _drafts/               ← 草稿（不在gitignore中则不提交，不参与生成）
│   ├── images/                ← 静态资源（按需创建，图片放这里）
│   ├── about/                 ← 自定义页面（按需创建）
│   │   └── index.md           ← 访问路径：/about/
│   └── favicon.png            ← 站点图标（放在source根目录即可）
│
├── themes/                    ← 主题目录
│   └── landscape/             ← 当前激活主题
│       ├── _config.yml        ← 主题默认配置
│       ├── layout/            ← 模板文件（.ejs）
│       ├── source/            ← 主题静态资源（CSS、JS、图片）
│       └── languages/         ← 语言文件
│
├── public/                    ← 生成产物（gitignore，不提交）
│
├── .deploy_git/               ← 部署用临时Git仓库（gitignore，不提交）
│
├── node_modules/              ← 依赖包（gitignore，不提交）
│
├── specs/                     ← 本文档所在目录（规范文档）
│   ├── function-module-feature-spec.md
│   └── config-spec.md
│
└── .gitignore                 ← Git忽略规则
```

### 2-2 各目录职责

- `source/_posts/` — 唯一定期增改的目录。所有博客文章以`.md`格式存放在此。文件名即URL的一部分。
- `source/_drafts/` — 草稿区。`render_drafts: false`时不参与生成。适合存放未完成的文章。
- `scaffolds/` — 几乎不改。它定义了`hexo new`时生成的文件模板。
- `themes/` — 换主题或改样式时动这里。日常写作不需要碰。
- `_config.yml` — 全局配置。站点信息、URL、分页、部署都在这里。修改后需重新`hexo generate`生效。

### 2-3 自定义页面

除了文章，还可以创建独立页面（如"关于我"、"友情链接"）：

```bash
hexo new page about
```

这会在`source/about/index.md`生成一个页面，访问路径为`/about/`。页面和文章的front-matter格式相同，但通常不需要categories和tags。

### 2-4 静态资源管理

图片、PDF等静态文件放在`source/`目录下即可。生成时会被原样复制到`public/`。

```
source/
├── images/
│   └── avatar.jpg          ← 访问：/images/avatar.jpg
├── downloads/
│   └── resume.pdf          ← 访问：/downloads/resume.pdf
└── favicon.png             ← 访问：/favicon.png
```

如果只想存放但不想被渲染或复制，需要在`_config.yml`中配置`skip_render`：

```yaml
skip_render:
  - "source/_drafts/*"
```

### 2-5 _posts子目录管理

`source/_posts/`内可以创建任意层级的子目录来组织Markdown文件。Hexo会递归扫描所有子目录，找到的`.md`文件都视为文章，统一处理。

**关键规则：子目录不影响URL**

文章的URL由`permalink`决定，和它在`_posts/`下的目录结构无关。当前`permalink: :year/:month/:day/:title/`，URL只有日期和标题，不包含子目录路径。

举例：

```
source/_posts/
├── 技术/
│   ├── hexo-guide.md          → URL: /2026/05/20/hexo-guide/
│   └── docker-intro.md        → URL: /2026/05/27/docker-intro/
├── 随笔/
│   ├── why-cli.md             → URL: /2026/05/21/why-cli/
│   └── remote-work.md         → URL: /2026/05/24/remote-work/
└── 阅读/
    └── clean-code.md          → URL: /2026/05/25/clean-code/
```

虽然文件分散在三个子目录中，但生成的URL扁平统一，只有日期+标题。

**在子目录中创建文章：**

```bash
# 在 技术/ 子目录下创建
hexo new "技术/docker-intro"

# 在 随笔/ 子目录下创建
hexo new "随笔/why-cli"
```

**三种常见的组织策略：**

- 按分类组织 — `_posts/技术/`、`_posts/随笔/`、`_posts/阅读/`。和front-matter中的categories呼应，翻文件时一目了然
- 按年份组织 — `_posts/2026/`、`_posts/2025/`。文章量大时避免一个目录几百个文件
- 按状态组织 — `_posts/published/`、`_posts/draft/`。不过Hexo已有`_drafts/`机制，不推荐

**建议：** 采用按分类组织。和front-matter的categories保持一致，文件系统和分类体系互相印证。当前11篇文章都在`_posts/`根目录平铺，可以归入对应子目录。

**如果想在URL中体现子目录：**

改`permalink`，加入路径变量。Hexo没有内置的子目录变量，但可以用`:category/`间接实现。例如：

```yaml
permalink: :category/:title/
```

这样`_posts/技术/hexo-guide.md`（需在front-matter中声明`categories: 技术`）的URL就是`/技术/hexo-guide/`。

---

## 三、文章编写规范

### 3-1 文件命名

`_config.yml`中配置了`new_post_name: :title.md`，`hexo new "我的文章"`生成的文件名就是`我的文章.md`。

**建议：** 用英文+连字符命名，避免URL中出现中文编码：

```bash
# 不推荐（URL中会出现 %E6%88%91%E7%9A%84）
hexo new "我的文章"

# 推荐（在front-matter中用title写中文标题）
hexo new my-article
# 然后打开文件，把title改成"我的文章"

# 也可以带子目录（详见 2-5 节）
hexo new "技术/my-article"  → 生成 source/_posts/技术/my-article.md
```

### 3-2 Front-matter标准模板

```yaml
---
title: 文章标题（必填，支持中文）
date: 2026-05-29 10:00:00        # 自动生成，可手动修改来控制排序
categories:                       # 必填，分类
  - 技术
tags:                             # 可选，标签
  - Hexo
  - 教程
---
```

### 3-3 文章正文

Markdown标准语法，Hexo通过hexo-renderer-marked渲染。额外支持的特性：

- 代码块自动语法高亮（highlight.js或Prism.js）
- `<!-- more -->` 标签控制首页摘要截断
- 外部链接自动`target="_blank"`
- 支持在正文中引用本站其他文章的相对路径

### 3-4 文章与URL的关系

文章的最终URL由`permalink`配置决定。当前配置为：

```yaml
permalink: :year/:month/:day/:title/
```

即文章`source/_posts/my-article.md`的URL为`/2026/05/29/my-article/`。修改`permalink`会影响所有文章的URL结构，一般初始化时确定后就不改了。

---

## 四、配置体系

### 4-1 两级配置

Hexo有两层配置：

- `_config.yml` — 全局配置，影响整个站点
- `_config.<theme>.yml` — 主题级配置，自动与主题自带的`_config.yml`合并，覆盖同名项

**合并优先级：** `_config.landscape.yml` > `themes/landscape/_config.yml`

### 4-2 关键配置项速查

- `title` / `author` / `language` — 站点身份
- `url` — 站点根域名，影响所有链接
- `permalink` — 文章URL模板
- `new_post_name` — 新文章文件名格式
- `default_category` — 未声明分类时的默认值
- `per_page` — 首页和分类页每页显示文章数
- `theme` — 当前激活的主题
- `deploy` — 部署目标（目前配置为GitHub Pages）
- `syntax_highlighter` — 代码高亮引擎（highlight.js / prismjs）
- `post_asset_folder` — 是否每篇文章创建同名资源文件夹

### 4-3 修改配置后的生效方式

- 站点信息（title等）— 重新`hexo generate`
- 主题配置 — 重新`hexo generate`
- 部署配置 — 直接执行`hexo deploy`
- 分类/标签别名映射 — 重新`hexo generate`
- 分页设置 — 重新`hexo generate`

一句话：改了`_config.yml`就跑一遍`hexo generate`。

---

## 五、日常操作速查

### 5-1 新建文章

```bash
# 创建文章（使用post脚手架）
hexo new "文章标题"

# 创建草稿（使用draft脚手架）
hexo new draft "草稿标题"

# 创建独立页面（使用page脚手架）
hexo new page "页面名称"
```

### 5-2 本地预览

```bash
hexo server
# 默认 http://localhost:4000
```

### 5-3 发布到GitHub Pages

```bash
hexo generate   # 生成静态文件到public/
hexo deploy     # 推送public/到GitHub仓库
```

或者一步完成：

```bash
hexo generate --deploy
```

### 5-4 清理缓存

当修改了配置但页面没变化时：

```bash
hexo clean      # 清空public/和db.json
hexo generate   # 重新生成
```
