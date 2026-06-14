# Function-Module-Feature Spec

> 项目：blog-jessica-alba（Hexo静态博客）
> 框架：Hexo 8.1.1 — 基于Node.js的Markdown静态站点生成器
> 解析日期：2026-05-29

---

## 分析依据

- `package.json` — 依赖声明：核心引擎、生成器、渲染器、部署器、主题
- `_config.yml` — 全站配置：站点身份、URL、目录、写作、分页、高亮、部署
- `_config.landscape.yml` — 主题landscape的独立配置（当前为空，使用默认值）
- `scaffolds/` — 内容脚手架：post / page / draft 三种内容类型的YAML头模板
- `source/_posts/hello-world.md` — 示例文章：YAML front-matter + Markdown正文
- `.gitignore` — 排除node_modules/、public/、db.json等生成物

---

## 功能规格

### FUNCTION 1 — 内容创作（Content Authoring）

> Markdown写作、元数据管理、内容脚手架。

#### 1-1 Markdown渲染

- **F[1-1-1] Front-matter解析** — 解析文章头部的YAML元数据块，字段包括title、date、tags、categories
- **F[1-1-2] Markdown→HTML转换** — 通过hexo-renderer-marked将Markdown正文编译为静态HTML
- **F[1-1-3] 代码语法高亮** — 支持highlight.js（默认）和Prism.js两种代码高亮引擎，可配置行号、自动检测、tab替换
- **F[1-1-4] 外部链接处理** — 外部链接自动添加target="_blank"，作用范围可设为site全局或post单篇

#### 1-2 内容脚手架

- **F[1-2-1] Post脚手架** — `hexo new "标题"`时依据`scaffolds/post.md`生成文章，预填YAML头（title / date / tags）
- **F[1-2-2] Page脚手架** — `hexo new page "标题"`时依据`scaffolds/page.md`生成独立页面，预填YAML头（title / date）
- **F[1-2-3] Draft脚手架** — `hexo new draft "标题"`时依据`scaffolds/draft.md`生成草稿，预填YAML头（title / tags）

#### 1-3 内容发布控制

- **F[1-3-1] 草稿渲染开关** — `render_drafts: false`控制生成时是否纳入草稿
- **F[1-3-2] 未来文章** — `future: true`允许日期在未来的文章参与生成
- **F[1-3-3] 资源文件夹** — `post_asset_folder`为每篇文章创建同名资源目录

---

### FUNCTION 2 — 站点生成（Site Generation）

> 将Markdown源文件编译为静态HTML网站。

#### 2-1 核心编译命令

- **F[2-1-1] hexo generate** — 全量编译`source/`→`public/`，生成完整静态站点
- **F[2-1-2] hexo clean** — 清空`public/`目录及缓存文件`db.json`
- **F[2-1-3] hexo server** — 启动本地开发服务器，实时预览站点

#### 2-2 页面生成器

- **F[2-2-1] 首页生成器** — hexo-generator-index生成博客首页文章列表，可配置path、per_page、order_by
- **F[2-2-2] 归档生成器** — hexo-generator-archive按时间线生成归档页面
- **F[2-2-3] 分类生成器** — hexo-generator-category按Category聚合文章，生成分类索引页
- **F[2-2-4] 标签生成器** — hexo-generator-tag按Tag聚合文章，生成标签索引页

#### 2-3 永久链接

- **F[2-3-1] 自定义Permalink** — `:year/:month/:day/:title/`模板变量构建文章URL
- **F[2-3-2] 美化URL** — `pretty_urls`控制是否保留末尾index.html和.html后缀

---

### FUNCTION 3 — 站点配置（Site Configuration）

> `_config.yml`驱动的全站参数管理。

#### 3-1 站点身份

- **F[3-1-1] 站点元信息** — title、subtitle、description、keywords，对应页面`<title>`和`<meta>`标签
- **F[3-1-2] 作者与时区** — author、language、timezone，内容归属与本地化
- **F[3-1-3] 站点URL** — url，站点根域名，影响链接生成和RSS

#### 3-2 目录映射

- **F[3-2-1] 源目录** — `source_dir`、`public_dir`，Markdown源与输出目录映射
- **F[3-2-2] 路由目录** — `tag_dir`、`archive_dir`、`category_dir`，分类/标签/归档的URL路径
- **F[3-2-3] 国际化目录** — `i18n_dir`，多语言内容路由前缀
- **F[3-2-4] 忽略渲染** — `skip_render`，指定不经过渲染器原样输出的文件或目录

#### 3-3 分页

- **F[3-3-1] 每页条数** — `per_page`，全局分页量，设为0则禁用分页
- **F[3-3-2] 分页路径** — `pagination_dir`，分页页面的URL路径前缀，默认page

---

### FUNCTION 4 — 主题系统（Theme System）

> 模板渲染与视觉层。

#### 4-1 模板引擎

- **F[4-1-1] EJS渲染** — hexo-renderer-ejs将`.ejs`模板文件编译为最终HTML
- **F[4-1-2] Stylus预处理** — hexo-renderer-stylus将`.styl`样式文件编译为CSS

#### 4-2 主题管理

- **F[4-2-1] 主题切换** — `theme: landscape`，在`themes/`目录下选定激活的主题
- **F[4-2-2] 主题级配置** — `_config.landscape.yml`，覆盖主题默认配置，与`_config.yml`自动合并

---

### FUNCTION 5 — 部署（Deployment）

> 将生成的静态网站发布到远端。

#### 5-1 Git部署

- **F[5-1-1] hexo deploy** — 一键部署命令，`deploy.type`指定部署方式
- **F[5-1-2] Git部署器** — hexo-deployer-git自动将`public/`推送到远程Git仓库（如GitHub Pages）

---

### FUNCTION 6 — 元数据与分类体系（Metadata & Content Organization）

> 文章归属与内容索引。

#### 6-1 分类

- **F[6-1-1] 默认分类** — `default_category: uncategorized`，未指定category的文章自动归入
- **F[6-1-2] 分类别名映射** — `category_map`，Category名称到显示名的映射

#### 6-2 标签

- **F[6-2-1] 标签别名映射** — `tag_map`，Tag名称到显示名的映射

#### 6-3 日期与时间

- **F[6-3-1] 日期格式** — `date_format: YYYY-MM-DD`，通过Moment.js格式化日期输出
- **F[6-3-2] 时间格式** — `time_format: HH:mm:ss`，时间显示格式
- **F[6-3-3] 更新时间策略** — `updated_option`，可选mtime（文件修改时间）、date（front-matter日期）、empty（不显示）

---

## 依赖清单

**核心引擎**

- hexo（^8.0.0）

**渲染器**

- hexo-renderer-marked（^7.0.0）— Markdown→HTML，归属FUNCTION 1
- hexo-renderer-ejs（^2.0.0）— EJS模板，归属FUNCTION 4
- hexo-renderer-stylus（^3.0.1）— Stylus样式，归属FUNCTION 4

**生成器**

- hexo-generator-index（^4.0.0）— 首页，归属FUNCTION 2
- hexo-generator-archive（^2.0.0）— 归档，归属FUNCTION 2
- hexo-generator-category（^2.0.0）— 分类，归属FUNCTION 2
- hexo-generator-tag（^2.0.0）— 标签，归属FUNCTION 2

**服务器**

- hexo-server（^3.0.0）— 本地开发，归属FUNCTION 2

**部署器**

- hexo-deployer-git（^4.0.0）— Git发布，归属FUNCTION 5

**主题**

- hexo-theme-landscape（^1.0.0）— 默认主题，归属FUNCTION 4

---

## 数据流

```
用户编写Markdown（source/_posts/*.md）
         │
         ▼
   hexo generate
         │
    ┌────┴────┐
    │          │
 渲染器      生成器
 (marked)   (index/archive
 (ejs)       /category/tag)
 (stylus)
    │          │
    └────┬────┘
         ▼
   public/ 静态文件
         │
         ▼
   hexo deploy ──▶ Git仓库（GitHub Pages等）
```

---

## 文件结构

```
blog-jessica-alba/
├── _config.yml               ← 全站配置
├── _config.landscape.yml     ← 主题级配置覆盖
├── package.json              ← 依赖声明
├── scaffolds/                ← 内容脚手架模板
│   ├── post.md
│   ├── page.md
│   └── draft.md
├── source/                   ← Markdown源文件
│   └── _posts/               ← 博客文章
│       └── hello-world.md
├── themes/                   ← 主题目录
│   └── landscape/            ← 当前激活主题
├── public/                   ← 编译产物（.gitignore）
├── node_modules/             ← 依赖包（.gitignore）
└── specs/                    ← 本规格文档
    └── function-module-feature-spec.md
```
