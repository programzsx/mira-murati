# 一、当前主题样式在行业最佳实践标准下的薄弱之处

本份文档用于以"行业最佳实践"为基准，重新评估 `themes/ink` 主题在赛博朋克编辑型改造之后仍然存在的弱点。本份文档不是上一份细节清单的复述。本份文档是从"行业做法"反向对比后的判断。

本份文档按"行业标准在讲什么、当前实现差在哪、要补到什么程度"展开。本份文档不复制代码。本份文档只描述改造方向。

## （一）字体加载与中文排版精细化

字体层面是这次改造里最"看起来贵"的部分。字体层面也是这次改造里离行业最佳实践距离最远的部分。

### 1、字体加载仍未自托管

Google Fonts 当前是远程加载。这一项在行业标准里属于"隐私债务"。这一项弱在用户访问时浏览器要连接 Google 服务器。这一项弱在欧盟 GDPR 把这种行为划入"数据出境"。

需要补的是把 Inter、JetBrains Mono、Noto Serif SC、Noto Sans SC 四个字体族下载到 `source/fonts/` 自托管。需要补的是用 Fontsource 或手动下载 woff2。

### 2、字体子集没有真做

Google Fonts 链接里没加 `subset=chinese-simplified`。这一项弱在中文字体体积接近 5MB。这一项弱在每次访问下载全字集。

需要补的是把 woff2 子集化到只保留实际用到的字符。需要补的是构建期扫 source/_posts 提取用到的汉字。需要补的是输出 subset 字体文件。

### 3、缺 size-adjust fallback metric

字体 fallback 期间的 FOIT 仍然存在。这一项弱在 Noto Serif SC 加载完之前 Hero 渐变标题会有"塌陷 → 弹回"的跳动。

需要补的是为每个 webfont 写一份 fallback metric override。需要补的是用 `size-adjust`、`ascent-override`、`descent-override` 让 fallback 字体度量尽量接近 webfont。

### 4、中文排版细节缺失

中文排版行业标准包含几项 hexo 默认渲染未做的事。这一项弱在"中文博客像未排版的草稿"。

第一项缺失是首行缩进。中文段落传统是首行缩进 2em。当前所有段落都是顶格写。

第二项缺失是中文标点挤压。中文引号、书名号、破折号都应该用全角。当前 hexo 渲染的引号是英文直引号 `"`，不是中文弯引号 `""`。

第三项缺失是汉字与西文之间的间距。当前中文与英文之间是无空格。这项在中英文混排时反而显得拥挤。

需要补的是写一个 marked 渲染后处理脚本，处理这三类中文排版细节。需要补的是不依赖 typographic.js 这种老库。

### 5、等宽数字未启用

代码块之外的数字（如日期、阅读时间）当前用比例字体。这一项弱在"234 阅读时间"会跳动。这一项弱在数字不在固定宽度上对齐。

需要补的是给数字使用 `font-variant-numeric: tabular-nums`。需要补的是 hero stats 等位置用这个特性。

## （二）配色系统的工程化程度

当前配色用 hex 值。这一项离行业标准差一截。行业标准已经全面转向 oklch 色彩空间。

### 1、色彩空间仍用 sRGB hex

`#00d4ff`、`#ff0080`、`#00ff88` 三个强调色当前用 hex。这一项弱在色彩调整不直观。这一项弱在做"暗色降饱和 20%"这种调整时要重算。

需要补的是把三色改用 `oklch()` 函数表达。需要补的是用 `color-mix(in oklch, ...)` 做派生色。

### 2、暗色单一、缺中间档

行业标准的色彩系统提供"surface 1 / surface 2 / surface 3 / surface 4"四到五档。当前只有 bg / bg-elevated / bg-card 三档。

需要补的是增加 surface 3、surface 4 两档。需要补的是 modal、popover、tooltip 等悬浮层用 surface 3，tag 标签用 surface 4。

### 3、缺色彩对比度自动化测试

当前对照度是手工算的。这一项弱在未来加新色时容易回归到 AA 边缘。

需要补的是加一个 CI 步骤跑 Pa11y 或 axe-core 检测每组前景/背景对比度。需要补的是 CI 失败时阻塞 merge。

### 4、缺色盲模拟

三色渐变（蓝/粉/绿）对色盲用户可能不友好。这一项弱在红绿色盲看不出蓝粉区分。

需要补的是关键信息（链接、错误状态、成功状态）不仅靠颜色区分。需要补的是用图标 + 文字辅助（已经部分做了，但还能加强）。

## （三）排版节奏与流体布局

当前排版有节奏感。这一项离行业最佳实践还差一档。

### 1、缺流体字号系统

当前字号虽然用了 `clamp()`，但各档之间的"视觉步进"没有经过计算。这一项弱在标题与正文之间"跳"得不自然。

需要补的是用 modular scale（1.2 或 1.25 的比率）反推各档字号。需要补的是用 `clamp()` 让每档字号随视口平滑变化。

### 2、阅读行宽仍偏窄

`--reading-max: 880px` 在 17px 字号下每行约 50 中文字。行业最佳实践是 45-75 字符。当前刚好踩下限。

需要补的是把阅读宽度调到 920-960px。需要补的是 hero 标题、article h1 不受 reading-max 限制，可以更宽。

### 3、缺中英文不同行高

正文行高 `1.85` 对中文友好，对英文偏松。这一项弱在英文段落视觉上"散"。

需要补的是用 `:lang(zh)` 和 `:lang(en)` 分别给行高。需要补的是中英文段落视觉节奏更紧凑。

## （四）微交互的精度

当前交互有 hover、active。这一项离 Linear、Raycast 这种"每个动作都有反馈"的产品还有差距。

### 1、缺按钮 hover preview

当前按钮 hover 只是变色。这一项弱在没有"先预览后点击"的反馈。

需要补的是 tooltip 显示按钮功能说明（部分加了 aria-label 但缺视觉提示）。需要补的是 destructive 按钮 hover 时显示警告色。

### 2、缺加载状态

当前没有 skeleton、spinner、progress 指示。这一项弱在 hexo 静态站其实也有"页面切换"的瞬时空白（虽然快）。

需要补的是给图片加 `aspect-ratio` 固定容器，加载前灰色块。需要补的是给字体加载过程加 loading indicator。

### 3、缺状态机管理

按钮有 normal、hover、active、focus、disabled 五个状态。当前只用了三个。

需要补的是补全 disabled 状态样式。需要补的是补全 loading 状态（按钮变成 spinner + 禁用点击）。

### 4、缺 prefers-reduced-data

行业标准增加 `prefers-reduced-data: reduce` 媒体查询。这一项弱在慢网络下仍下载全字体全图。

需要补的是检测到 reduced data 时切换到纯文字版（无图片无 webfont）。需要补的是为文本优先模式做专门样式。

## （五）键盘与屏幕阅读器可访问性

a11y 第一轮补了 focus、aria。这一项还有几档没做。

### 1、缺 skip to content 链接

行业标准在 body 第一个元素放一个 visually-hidden 但 focusable 的"跳到正文"链接。这一项弱在键盘用户要 Tab 多次才能跳过 header。

需要补的是在 `<body>` 第一个位置放 `.skip-link`。需要补的是默认 `position: absolute; left: -9999px;`，focus 时 `left: 1rem; top: 1rem;`。

### 2、缺 focus trap

密码门、lightbox 是模态组件。行业标准要求模态打开时 focus 不能跑出去。

需要补的是打开模态时记录当前 focus 元素。需要补的是把 focus 移到模态内第一个可交互元素。需要补的是 Esc 关闭模态 + focus 回到触发元素。

### 3、缺 ARIA live 区域

页面动态更新（密码错误、文章加载更多）当前没有宣告给屏幕阅读器。

需要补的是密码错误已经有 `role="alert"`。需要补的是搜索结果、分页变化、theme 切换都加 `aria-live` 区域。

### 4、颜色对比度仍有边缘案例

`--color-fg-faint` 当前是 `#6b6b80`。在 `#0a0a0f` 背景上对比度约 4.7:1。刚好踩 AA 边缘。

需要补的是把它提到 `#7e7e94`（约 5.5:1）。需要补的是 hero stat 中的次要文字也用同档。

## （六）图像与媒体处理的深度

lightbox 加了。这一项还差几个深度项。

### 1、缺 blurhash 或低质量预览图

当前图片加载是直接出图。这一项弱在慢网络下图片加载慢导致 CLS（布局偏移）。

需要补的是给每张图生成 blurhash 字符串嵌入 `data:image/svg+xml,...` 占位。需要补的是用 `aspect-ratio` 固定容器防 CLS。

### 2、缺响应式 art direction

当前图片只有 `<img>`。这一项弱在手机上看宽图被压扁。

需要补的是用 `<picture>` + `<source media="..." srcset="...">`。需要补的是小屏用裁剪版、大屏用全版。

### 3、缺图片懒加载的预连接

`loading="lazy"` 加了。这一项弱在第一屏图片的 LCP 仍可能慢。

需要补的是给 hero 第一张图加 `loading="eager"` + `fetchpriority="high"`。需要补的是预加载 LCP 图片。

### 4、缺视频和 iframe 处理

文章里如果嵌入 YouTube、Bilibili、video 元素。当前没有特殊处理。

需要补的是 iframe 加 `loading="lazy"`。需要补的是 video 加 `preload="none"` + 显式播放按钮。

## （七）内容运营能力

站点目前是"展示型"。这一项还差"互动型"的几档。

### 1、缺站内搜索

站内搜索是 hexo 主题标配。`hexo-generator-search` 没装。

需要补的是装 `hexo-generator-search` 或自写 fuse.js 索引。需要补的是 header 加搜索图标 + 弹出搜索面板 + `/` 快捷键。

### 2、缺邮件订阅

hexo 主题常见做法是 Mailchimp/Buttondown 嵌入。

需要补的是选一个邮件服务（推荐 Buttondown，简洁）。需要补的是 footer 加订阅输入框。

### 3、缺分享按钮

文章底部没有分享。这一项弱在 Twitter、微博、复制链接。

需要补的是自写一个分享组件（避免第三方 SDK 引入追踪）。需要补的是复制链接 + Twitter + 微博 + 豆瓣。

### 4、缺评论系统

如果用户希望有读者互动。

需要补的是 Giscus（基于 GitHub Discussions，零追踪）。需要补的是 Artalk（自托管）。需要补的是 Twikoo（云函数）。

### 5、缺点赞/收藏

如果用户希望轻互动。

需要补的是 Twikoo 的 like 功能。需要补的是自写一个本地 localStorage 计数（无需后端）。

## （八）响应式断点的精细度

三个断点（1100/720/480）太粗。行业标准是 container queries 加 4-6 档断点。

### 1、断点跳变

小屏塌成单列是突变。这一项弱在 1100px → 1099px 突然从两列变单列。

需要补的是用 CSS 容器查询。需要补的是 sidebar 宽度用 `clamp(220px, 18vw, 300px)` 让 sidebar 视口宽度平滑变化。

### 2、缺横屏手机专项样式

横屏手机（高度 < 500px）的 hero 适配加了一行。这一项弱在横屏时的密码门没专项处理。

需要补的是横屏时密码门遮罩改为左右分栏——左侧放 icon + 标题，右侧放输入框。需要补的是横屏时 hero 上下 padding 减半。

### 3、缺可打印样式

print 样式补了基本项。这一项弱在边距、字体没按打印标准。

需要补的是 `@page` 设 A4 边距 2cm。需要补的是打印字号统一 11pt。需要补的是链接加 URL 后缀。

## （九）动效系统化与页面切换

当前动画是"零散"地加的。这一项还差"系统化"。

### 1、缺 page transition

hexo 主题的现代做法是加上 PJAX 或 instant.page。这一项弱在页面切换瞬时白屏。

需要补的是用 `view-transition-name` API（Chromium 111+）。需要补的是 polyfill 老浏览器（用 setTimeout fade-out）。

### 2、缺 stagger 列表入场

文章卡片当前用 `.reveal.in` 单独淡入。这一项弱在列表项同时出现，没有"逐个出现"的节奏。

需要补的是用 IntersectionObserver 给每张卡片加 `transition-delay: calc(var(--i) * 60ms)`。需要补的是 stagger 上限 5 项（再多就看不出节奏）。

### 3、缺 scroll-driven 动画

滚动进度除了顶部 2px 进度条，没别的。这一项弱在文章里元素不跟随滚动做入场。

需要补的是用 `animation-timeline: view()` 让元素进入视口时滑入。需要补的是 hero 标题随滚动微微 scale down。

### 4、缺 FLIP 动画

链接 hover、卡片 hover 没有流畅过渡。这一项弱在 hover 状态切换是"瞬时"的。

需要补的是用 FLIP 思路记录位置、从旧位置 transform 到新位置。需要补的是 at-rule `@starting-style` 实现 entry animation。

## （十）前端架构的可维护性

CSS 1300+ 行单文件。JS 240+ 行 IIFE。这一项离"现代前端架构"很远。

### 1、缺设计 token 文档

变量都在 `:root` 里但没有文档说明。这一项弱在新人接手不知道变量命名约定。

需要补的是写一个 `docs/design-tokens.md`，列每个 token 的"用途 / 默认值 / 用在哪"。需要补的是用 Style Dictionary 工具生成。

### 2、缺组件化

当前没有"卡片"作为组件。这项弱在 `<article class="post-card">` 在多处复制样式。

需要补的是抽出 `.post-card` 到独立 partial。需要补的是 JS 组件化（如果引入 Web Components）。

### 3、缺类型系统

JS 是 plain JS。这一项弱在 main.js 改个函数不知道哪里会爆。

需要补的是迁移到 TypeScript 或至少加 JSDoc 注释。需要补的是 hexo 生态支持 .ts 文件需要构建步骤。

### 4、缺构建工具

CSS / JS 直接发布到 public。这一项弱在不能 minify、不能 tree-shake。

需要补的是加 esbuild 或 lightningcss 做构建步骤。需要补的是 hexo 配合 `@11ty/eleventy-img` 风格的多步构建。

## （十一）性能与首屏体验

Lighthouse 分数估计 70-80。这一项离 90+ 行业标准还有距离。

### 1、缺 CLS 控制

图片、字体都没预留空间。这一项弱在加载时内容跳动。

需要补的是图片用 `aspect-ratio`。需要补的是 hero 高度用 `min-height: 80vh` 留位。

### 2、缺 prefetch

hexo 默认没有下一页预取。这一项弱在用户点下一篇时延迟明显。

需要补的是用 `<link rel="prefetch">` 预取首页前 5 篇文章。需要补的是用 quicklink.js 在 viewport 视图中动态 prefetch。

### 3、缺 Service Worker

博客是文档型，特别适合 PWA。这一项弱在没有离线访问。

需要补的是加 `manifest.json` + Service Worker。需要补的是离线时显示缓存版本而不是 network error。

### 4、缺图片 CDN

GitHub Pages 直接提供图片，没有 CDN 加速。这一项弱在中国访问慢。

需要补的是用 jsDelivr 或 CF Workers 做图片镜像。需要补的是给图片加 `loading="lazy"` + `decoding="async"`（已加）。

## （十二）内容扩展能力

hexo 静态站可以扩展出很多内容形式。这一项基本没做。

### 1、缺 KaTeX 数学公式

如果用户以后写数学笔记。

需要补的是装 `hexo-renderer-katex` 或 `hexo-math`。需要补的是 CSS 里给 `.katex` 加字体兼容。

### 2、缺 Mermaid 图表

如果用户以后做流程图、时序图。

需要补的是装 `hexo-filter-mermaid-diagrams`。需要补的是 light/dark mode 下 mermaid 主题切换。

### 3、缺代码高亮主题适配

highlight.js 当前用 github-dark 单一主题。这一项弱在 light mode 下代码块还是暗的。

需要补的是 light mode 下切到 github-light。需要补的是用 prismjs 或 shiki（更现代）。

### 4、缺引用块学术化

引用块当前有渐变左边框。这一项弱在学术性不够（没标作者/出处/页码）。

需要补的是支持 markdown 自定义语法 `> @cite{author, year}` 渲染成学术引用格式。需要补的是 footnote（hexo 已有 hexo-reference）。

### 5、缺时间线/年代轴

如果用户做历史、人物类内容（用户博客有大量文学笔记）。

需要补的是自写一个时间线 shortcode。需要补的是用 `<time>` + CSS Grid 实现。

## 优先级重排

按"行业标准偏离度 × 修复成本"重排。

第一优先级是字体加载与中文排版精细化。这一档偏离度大但成本中等（一天工作量）。

第二优先级是流体布局与可访问性深化。这一档偏离度中但成本低（半天）。

第三优先级是内容扩展与微交互。这一档偏离度低但能提升专业感（长期）。

不建议碰的是前端架构组件化与构建工具引入。这一项收益与代价不对等。hexo 6.x-7.x 时代没必要引入。

不建议碰的是 PWA 与 Service Worker。这一项静态博客场景收益有限。这一项等真有"需要离线访问"再说。
