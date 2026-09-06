# 全站密码门（Site-wide Password Gate）

给 `ink` 主题加了一个**全站密码门**——访问者必须输入密码才能看到博客内容。

## 怎么用

打开 `themes/ink/_config.yml`，把这一行：

```yaml
site_password: ""
```

改成你想设的密码，例如：

```yaml
site_password: "happy-2026"
```

然后正常部署：

```bash
hexo clean
hexo g -d
```

部署完访问 `https://programzsx.github.io/`，就会先看到全屏密码框，输对了才能进。

## 关掉密码门

把 `site_password` 改回空字符串 `""`，重新部署即可。

```yaml
site_password: ""
```

## 忘记密码 / 自己被锁外面

每个浏览器的 `sessionStorage` 里有个 `site_auth=1` 标记就是"已通过"。**关掉浏览器标签就失效**（sessionStorage 不是 localStorage，关闭浏览器就清空），重新输密码即可。

如果你自己忘了密码：
- 在自己机器上打开 DevTools → Application → Session Storage → 删 `site_auth`
- 或者直接改 `_config.yml` 里的 `site_password` 重新部署

## ⚠️ 安全边界

这是**纯静态前端实现**，不是真正的账号系统：

- 密码明文写进 `<meta name="site-password">`，浏览器开发者工具里能看到
- 懂技术的人**能绕过**——直接读 `public/index.html` 里的 `id="post-body-protected"`，手动改 `style.display` 就能看
- 用 `crypto.subtle` 算 SHA-256 只是**象征性**的混淆，挡不住暴力破解

**适用场景：** 拦住路人/搜索引擎，让博客不公开被收录。**不适用：** 保护真正的秘密内容。

如果需要更硬的安全（比如挡住会看源码的人），得换 Cloudflare Workers + 自定义域名那套方案。

## 实现细节

- `layout/layout.ejs`：在 `<body>` 里把 `.site` 包成 `#post-body-protected`，并条件渲染全屏遮罩
- `source/js/main.js`：增加 `site-password` meta 检测，密码 SHA-256 后比对，通过则写入 `sessionStorage.site_auth`
- `source/css/style.css`：加 `.password-gate--site` 的全屏 `position: fixed` 样式
- 不影响原有的 `post.password` 单文章密码门（同时启用时站点级优先）
