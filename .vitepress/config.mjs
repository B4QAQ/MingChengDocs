import { defineConfig } from 'vitepress'
import { GitChangelog } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { nav } from './configs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "铭诚网络开发文档",
  description: "API&快应用开发文档",
  lang: 'zh-CN',
  outDir: './dist',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],
  markdown: {
    lineNumbers: true,
    config: (md) => {
      // 代码组中添加图片
      md.use((md) => {
        const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules) ?? ((...args) => args[0][args[1]].content);

        // 重写 fence 渲染规则
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
          const token = tokens[idx];
          const info = token.info.trim();

          // 判断是否为 md:img 类型的代码块
          if (info.includes('md:img')) {
            // 只渲染图片，不再渲染为代码块
            return `<div class="rendered-md">${md.render(token.content)}</div>`;
          }

          // 其他代码块按默认规则渲染（如 java, js 等）
          return defaultFence(tokens, idx, options, env, self);
        };
      })
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    siteTitle: '铭诚网络开发文档',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    outlineTitle: '本页目录',
    darkModeSwitchLabel: '外观',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    nav,

    sidebar: [
      {
        text: '前言',
        items: [
          { text: '介绍', link: '/Welcome' }
        ]
      },
      {
        text: 'MingChengAPI',
        items: [
          { text: '系统初始化', link: '/MingChengAPI/Init' },
          { text: '授权API', link: '/MingChengAPI/Verify' },
          { text: '开发者API', link: '/MingChengAPI/Dev' },
          { text: '应用管理API', link: '/MingChengAPI/AppManage' }
        ]
      },
      {
        text: 'Eternal',
        items: [
          { text: '介绍', link: '/Eternal/Index' },
          { text: '初始化相关', link: '/Eternal/Initialization' },
          { text: '基础文件操作', link: '/Eternal/BasicFileOperations' },
          { text: '城市管理', link: '/Eternal/CityManagement' },
          { text: '设置管理', link: '/Eternal/SettingsManagement' },
          { text: '天气数据管理', link: '/Eternal/WeatherDataManagement' },
          { text: '开发者使用', link: '/Eternal/DevUse' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/B4QAQ' }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            searchBoxPlaceholder: '搜索文档',
            resetButtonTitle: '清除查询条件',
            closeButtonAriaLabel: '关闭搜索',
            noResultsText: '无法找到相关结果',
            footer: {
              selectText: '选择',
              selectTextAriaLabel: '选择',
              navigateText: '导航',
              navigateTextAriaLabel: '导航到结果',
              closeText: '关闭',
              closeTextAriaLabel: '关闭搜索对话框'
            }
          }
        },
      }
    }
  },
  vite: {
    plugins: [
      GitChangelog({
        repoURL: () => 'https://github.com/B4QAQ/MingChengDocs',
      }),
    ],
  },
})
