# 铭诚网络应用服务统一文档

铭诚网络工作室的应用服务统一文档站，基于 **Next.js 16 + Fumadocs** 构建。

在线地址：<https://docs.b4qaq.cn>

目前收录以下服务的文档：

- **Eternal 永昼天气** —— 全能型天气快应用
- **WearPost 腕上信驿** —— Vela 智能穿戴邮件客户端
- **SimpleFetch** —— AstroBox 网络桥接插件
- **铭诚 API** —— 第三方快应用 API 服务

## 技术栈

- [Next.js](https://nextjs.org/) 16（App Router，静态导出 `output: 'export'`）
- [Fumadocs](https://fumadocs.vercel.app/) 16.6（文档框架、侧边栏、搜索 UI）
- [@claralight-design/abweb-navbar](https://www.npmjs.com/package/@claralight-design/abweb-navbar) 导航栏
- [Orama](https://oramasearch.com/) + `@orama/tokenizers/mandarin` 本地中文搜索
- Tailwind CSS v4、Phosphor Icons、Google Sans Flex / Sarasa Mono 字体

> 站点为纯静态导出，搜索索引在构建时生成，客户端本地检索，无需服务端。

## 快速开始

依赖 Node ≥ 20 与 [pnpm](https://pnpm.io/)。

```bash
# 安装依赖
pnpm install

# 启动开发服务器（http://localhost:3000）
pnpm dev

# 构建静态站点，产物输出到 out/
pnpm build

# 本地预览构建产物
pnpm start
```

## 目录结构

```
├── content/docs/             文档正文（MDX），按服务分目录
│   ├── eternal/              Eternal 永昼天气
│   ├── wearpost/             WearPost 腕上信驿
│   ├── simplefetch/          SimpleFetch 网络桥接
│   └── mingcheng-api/        铭诚 API
├── public/assets/
│   ├── brand/                Logo、工作室标识
│   ├── fonts/                字体文件
│   └── images/docs/          文档配图（按服务分目录）
├── src/
│   ├── app/                  Next.js App Router 入口
│   │   ├── page.tsx          首页
│   │   ├── docs/             文档页布局
│   │   └── api/search/       搜索索引路由（构建时静态导出）
│   ├── components/           导航栏、侧边栏、页脚、hero 等组件
│   └── lib/                  site-config、source、section 主题色配置
├── next.config.mjs
├── source.config.ts          Fumadocs MDX 配置
└── package.json
```

每个 `content/docs/<服务>/` 都是 Fumadocs 的一个 root folder，侧边栏顶部可切换，并拥有独立的主题色（见 `src/lib/section.ts` 与 `src/app/global.css`）。

## 编辑文档

1. 在对应的 `content/docs/<服务>/` 下新增或修改 `.mdx` 文件，并在该目录的 `meta.json` 中登记页面顺序。
2. 文档页面可在 frontmatter 中设置 `title`、`description`、`icon`（图标名见 `src/lib/source.ts` 的 `docIcons` 映射）。
3. 配图放到 `public/assets/images/docs/<服务>/`，在 MDX 中以 `/assets/images/docs/<服务>/xxx.png` 引用。
4. 正文可直接使用 `<Callout>`、`<Cards>`/`<Card>`、`<ImageZoom>` 等组件，以及从 `@phosphor-icons/react/dist/ssr` 引入的内联图标。
5. 改完跑 `pnpm dev` 预览，确认无误后提交。

## 部署

推送到 `master` 分支后，将 `out/` 目录部署到任意静态托管（当前域名为 `docs.b4qaq.cn`）。

## License

文档内容遵循 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans) 协议共享。
