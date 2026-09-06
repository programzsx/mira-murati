# 一、当前主题样式还能改进的地方

本份文档用于梳理 `themes/ink` 主题在赛博朋克编辑型改造之后，仍然存在但需要后续补齐的样式弱点。本份文档不是问题清单的展览。本份文档是为了给下一轮改造提供"该补什么、按什么优先级补"的方向。

本份文档按"为什么弱、弱在哪、怎么改"展开。本份文档不复制 CSS 代码。本份文档只描述 CSS 之外需要新做的事。

## （一）可访问性细节不到位

当前样式在视觉冲击力上做到了位。本份文档要指出的是视觉冲击力之外、a11y 这一层还很薄。

### 1、键盘 focus 状态偏弱

链接的 focus 环只有一圈 2px 的电光蓝。`input`、`button` 的 focus 状态没有统一的视觉规范。这层弱在"屏幕阅读器用户能跳转但看不到清晰焦点"。

需要补的是给所有交互元素加 `--focus-ring` 变量。需要补的是把 focus 环和 hover 状态区分开。需要补的是 focus 环在暗背景上的对比度至少达到 3:1。

### 2、颜色对比度部分低于 WCAG AA

正文 `#e6e6f0` 在 `#0a0a0f` 背景上对比度足够。次要文字 `#8a8aa0` 在 `#0a0a0f` 上对比度约 5.7:1。这一项达标。

`#555568` 这一档的 `--fg-faint` 在背景上的对比度约 2.4:1。这一项低于 AA 标准。这一项弱在 TOC 编号、引用来源、极小元信息用了这档颜色。

需要补的是把 `--fg-faint` 提到至少 `#6b6b80` 这一档。需要补的是极小元信息也走次要文字一档。

### 3、aria 标签缺失

密码门是全屏覆盖层。这一层弱在缺少 `role="dialog"`、`aria-modal="true"`、`aria-labelledby`。这一层弱在屏幕阅读器读不到"输入密码"和"密码错误"的语义。

需要补的是密码门加 aria 属性。需要补的是装饰性的 emoji（`🔒`）加 `aria-hidden="true"`。

## （二）响应式断点过渡不够细腻

断点只有 1024、720、480 三个。断点之间的过渡没有用 `clamp()` 平滑。断点跳变会让中等屏幕（768到1024）出现突然的版式切换。

### 1、断点跳变

桌面端 `1fr` 单列、1200px 容器。平板端到了1024直接塌成单列、没有过渡区间。手机端到了720字号从 17px 跳到 16px、行高没过渡。

需要补的是把字号、行高、间距统一用 `clamp()` 写。需要补的是断点变成"建议值"而不是"硬切换"。

### 2、触摸目标过小

移动端导航链接 padding `8px 0`。这一项弱在 44px 最小触摸目标没达到。需要补的是 nav 链接加到 44px 高度。

分页按钮 mobile 端 `padding: 8px 16px`。这一项弱在高度不到 44px。需要补的是把分页按钮高度统一拉到 44px。

### 3、横屏适配缺失

手机横屏时（高度小于 500px）密码门全屏遮罩会显得过大。这一项弱在没有专门的横屏样式。需要补的是横屏时把 hero 上下 padding 缩小。

## （三）字体加载策略有改进空间

字体是当前样式最贵的部分。字体加载策略弱在"用 swap 之后会闪一下"。

### 1、没有 font preload

`<link rel="preload">` 没加。需要补的是把 Inter Regular 和 Noto Serif SC Bold 加进 preload。需要补的是减少首屏 FOIT 时间。

### 2、字体子集没做

Google Fonts 加载的是完整字集。中文 Noto Serif SC 完整字集接近 5MB。这一项弱在每次访问都下载全字集。需要补的是用 `&subset=chinese-simplified` 切到简中字集。需要补的是中文字体考虑改用国内 CDN（字体酷、字魂）。

### 3、font-display 没显式指定

Google Fonts 默认 `swap`。这一项默认 OK。但 hero 标题用 Noto Serif SC 时，标题加载完之前会先用 fallback。这一项弱在"渐变文字"在 fallback 期间会变形。

需要补的是在 `@font-face` 里显式写 `font-display: swap` 并配上合适的 fallback metric（`size-adjust`、`ascent-override`）。

## （四）可读性细节可再精雕

当前排版骨架搭起来了。但读长文时仍有些细节会让眼睛累。

### 1、长段落没有最大行宽

文章正文有 `max-width: 720px`。这一项达标。但 hero 副标题、卡片摘要、卡片 footer 没有 max-width，会随容器拉伸。

需要补的是 `entry-content` 卡片摘要加 `max-width: 70ch`。需要补的是 hero subtitle 加 `max-width`（已有 640px，可保留）。

### 2、链接在卡片中的样式

卡片 `entry-title` 的链接 hover 变青。这一项弱在用户看摘要时看不清"哪些文字是链接"。需要补的是把摘要里的内联链接加下划线。

### 3、行内代码的对比度

`code` 标签背景是 `#13131c`，文字是 `#00ff88`。这一项弱在中文文本里的英文代码段会显得突兀。需要补的是考虑给行内代码加 padding-y=1px 圆角 3px 让它更内敛。

### 4、引用块（blockquote）样式偏单调

引用块有渐变左边框。但引用块内部如果再嵌套一个 blockquote 就会样式丢失。这一项弱在没有嵌套规则。需要补的是加 `blockquote blockquote` 缩进和颜色变浅。

## （五）只支持暗色模式

当前 CSS 锁死暗色。这对一个"自用 1-5 人"博客没大问题。但**未来如果想给人看**、**如果在白天看**、**如果想打印**，这一项都是障碍。

### 1、没有 light mode 切换

没有 `prefers-color-scheme` 媒体查询。没有切换按钮。这一项弱在白天读长文眼睛会累。

需要补的是把硬编码颜色都改成 CSS 变量。需要补的是加 `@media (prefers-color-scheme: light)` 覆盖变量。需要补的是加右上角"日/月"切换按钮。

### 2、用户偏好记忆

即使加了切换，没有 `localStorage` 记忆用户选择。这一项弱在每次刷新都得切。需要补的是切完后写 localStorage。需要补的是读 localStorage 设初始主题。

## （六）交互反馈不够细腻

当前样式偏"静态展示"。这一项弱在"按下去没反馈、加载中没提示"。

### 1、按钮 active 状态

密码门"确认"按钮有 hover。但 active（按下时）没视觉变化。这一项弱在按下去感觉"没反应"。

需要补的是加 `:active { transform: scale(0.97); }`。

### 2、链接点击中状态

链接点击瞬间没有视觉反馈。需要补的是加 `:active { opacity: 0.6; }`。

### 3、加载状态

没有 skeleton 屏、没有 spinner、没有"加载中"占位。需要补的是 hexo 静态站其实没"加载"概念。但图片懒加载的占位可以加。

## （七）图像与媒体处理缺失

hexo 文章里如果有图（你的博客有"绘画-维基百科"等图集类文章），目前样式几乎没做。

### 1、没有图片懒加载

`hexo-renderer-marked` 渲染的图片没加 `loading="lazy"`。这一项弱在长文里首屏之外的图会拖慢首屏。

需要补的是在 marked 渲染后注入 `loading="lazy"`。需要补的是加 `decoding="async"`。

### 2、没有 lightbox

文章里的图点击没反应。需要补的是引入 medium-zoom 或 photoswipe。需要补的是用国产替代（lightbox2太老）。

### 3、没有响应式图片

`<img srcset>` 没生成。需要补的是 hexo 插件 `hexo-image-sizes` 或 `hexo-renderer-imgix`。

### 4、图片样式基础

`.post-body img` 没有边框、阴影、圆角。需要补的是加 `border-radius: var(--radius)` 和细微阴影。

## （八）性能与首屏体验

样式上"看起来贵"是 OK 的。但**真实加载**层面有可以省的。

### 1、字体 HTTP 请求

Google Fonts 一次性请求四个字体族（Inter、JetBrains Mono、Noto Serif SC、Noto Sans SC）。这一项弱在四个请求串行 + 中文包很大。

需要补的是合并到一个 CSS 链接（已经是这样）。需要补的是考虑自托管 woff2。

### 2、CSS 文件大小

当前 style.css 是 24KB / 1026行。这一项不算巨型但有压缩空间。需要补的是用 `lightningcss` 或 `cssnano` 压一遍。

### 3、JS 文件大小

main.js 是 6.6KB / 200+ 行。这一项达标。但 minify 后还能省一半。

### 4、没有 critical CSS

首屏 hero 在外部 CSS 加载完之前会显示 fallback。需要补的是把 hero 关键样式 inline 到 `<style>` 块里。

### 5、没有 `prefers-reduced-motion`

开启系统"减少动效"的用户仍然会看到 hero 渐变 shimmer 动画。需要补的是加 `@media (prefers-reduced-motion: reduce)` 关掉所有动画。

## （九）文章页细节可丰富

文章详情页（详情页是博客的核心）目前样式偏"骨架"。下面这些细节会让阅读体验大幅提升。

### 1、没有章节目录

TOC（`sidebar-toc`）只显示 h2、h3。h1 不显示（hexo 默认就跳 h1 直接进 h2）。需要补的是按需配置 max_depth。

### 2、没有锚点

点击 h2/h3 标题应该显示 `#` 让用户复制。需要补的是加 CSS：

```css
.post-body h2:hover .headerlink,
.post-body h3:hover .headerlink { opacity: 1; }
```

需要补的是 hexo 默认会渲染 `.headerlink` 锚点，但当前 CSS 完全没有处理。

### 3、没有复制代码按钮

代码块没法一键复制。需要补的是注入"复制"按钮到 `.code-header` 右侧。

### 4、没有"相关文章"

文章详情页底部没有"你可能也想读"。需要补的是 hexo 插件 `hexo-related-posts` 或自写一个按 tag 重叠度排序的小工具。

### 5、没有字数统计和预计阅读时间

卡片的 footer 有"X 分钟阅读"。但文章页头部没有重复显示。meta 信息可以补在标题下方。

### 6、没有"上一篇 / 下一篇"

文章底部没有导航。这其实 hexo 有 `post.next` 和 `post.prev` 变量可用，主题没用到。

## （十）SEO 与可发现性

搜索引擎层面有几个空缺。

### 1、Open Graph 图片

每篇文章应该有自己的 OG 图。需要补的是 hexo 插件 `hexo-auto-og` 或自写 front-matter `og_image` 字段。

### 2、JSON-LD 结构化数据

文章应该有 `Article` schema。需要补的是在 layout 里注入 `application/ld+json` 块。

### 3、canonical URL

当前没设 `link rel="canonical"`。需要补的是在 head 加 `<%- url %>` 派生 canonical。

### 4、面包屑

分类页、标签页应该有"首页 > 分类 > XXX"面包屑。需要补的是 partial。

### 5、RSS 订阅链接可见

`hexo-generator-feed` 还没装。head 里的 `feed_tag(theme.rss)` 占位是空的。需要补的是装插件、设 `theme.rss: /atom.xml`、UI 加个 RSS 按钮。

## （十一）特殊状态页面空白

下面这些页面目前是 hexo 默认丑样式。

### 1、404 页面

GitHub Pages 的 404 页面是 hexo 默认的（白底+几个字）。需要补的是新建 `source/404.html` 用主题样式+友好提示。

### 2、空状态

如果某分类下没文章、某标签下没文章、搜索没结果。目前是空白。需要补的是 partial 处理空集合。

### 3、加载失败

没有全局错误处理。这一项静态站比较难做（不会有 JS 报错），但样式层面的 `aria-live` 可以补。

### 4、打印样式

当前 print 媒体查询太简单（只隐藏 header/sidebar/footer）。需要补的是：

- 链接加 URL 后缀（`@page` 后的 `content`）
- 代码块去掉背景色
- 字号统一 12pt
- 强制黑字白底

## （十二）代码可维护性

这一项不是用户能直接感知的，但会影响后续改造速度。

### 1、CSS 没有命名空间

类名都是 `entry-title`、`post-card` 这种全局名。第三方插件如果用了同名 class 会冲突。

需要补的是 BEM 化（`.post-card__title`）或者加命名空间前缀（`.ink-entry-title`）。但代价是迁移工作量大。

### 2、变量没有层次

`:root` 里有 50+ 个变量。但 flat 结构。需要补的是分组：

```css
:root {
  --color-bg: ...;
  --color-fg: ...;
  --color-accent-cyan: ...;
  --font-serif: ...;
  --font-size-base: ...;
  --space-4: ...;
}
```

### 3、缺少 dark/light 双套变量

如果将来加 light mode，要全部重写变量赋值。提前把变量名字拆成"语义化"（`--color-surface`）而不是"颜色值"（`--bg-elevated`）会更省事。

### 4、没有 mixin / utility class

阴影、圆角、过渡曲线没抽出来。重复出现多次。需要补的是用 `@layer utilities` 抽几个：

```css
.u-rounded { border-radius: var(--radius); }
.u-shadow { box-shadow: var(--shadow-card); }
```

## 后续改造建议的优先级

按"用户感知强度 × 改动成本"排序。

第一优先级是高感知、低成本的项。第一优先级的项是：可访问性 focus 环、行内代码样式、断点 clamp 平滑。这一档可以在 1-2小时内完成。

第二优先级是高感知、中成本的项。第二优先级的项是：light mode 切换、章节目录锚点、复制代码按钮、图片懒加载。这一档可以分 2-3次完成。

第三优先级是低感知（但长期重要）的项。第三优先级的项是：SEO 结构化数据、相关文章、面包屑、print 样式。这一档可以穿插在其他改造里做。

不建议碰的是：CSS 命名空间重构、字体改自托管。这两项收益与代价不对等。这两项等真有冲突时再处理。
