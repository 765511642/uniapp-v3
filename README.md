# 领队微信小程序

基于 uni-app (Vue3) + Wot UI + Pinia 的微信小程序项目。

## 技术栈

| 类别 | 方案 | 文档 |
|------|------|------|
| 框架 | uni-app (Vue3) | [uni-app](https://uniapp.dcloud.net.cn/) |
| UI 组件库 | Wot Design Uni | [wot-ui.cn](https://wot-ui.cn/) |
| 状态管理 | Pinia | [pinia.vuejs.org](https://pinia.vuejs.org/) |
| 路由 | uni-mini-router | [文档](https://moonofweisheng.github.io/uni-mini-router/) |
| 虚拟根组件 | @uni-ku/root | [uni-ku.js.org](https://uni-ku.js.org/projects/root) |
| 组件自动导入 | @uni-helper/vite-plugin-uni-components | - |
| 包体优化 | @uni-ku/bundle-optimizer | - |
| 代码检查 & 格式化 | ESLint + @uni-helper/eslint-config | - |

## 项目结构

```
├── .cursor/rules/              # Cursor AI 规则
│   ├── project-info.mdc        # 项目信息、命令、目录结构
│   ├── tech-stack.mdc          # 技术栈、状态管理、路由、代码规范
│   └── ui-guidelines.mdc       # UI 组件库、全局反馈、布局、样式约定
├── .vscode/settings.json       # VS Code 项目级设置（ESLint 格式化）
├── .editorconfig               # 跨编辑器代码风格配置
├── eslint.config.mjs           # ESLint 配置
├── .env.dev                    # 开发环境变量
├── .env.test                   # 测试环境变量
├── .env.production             # 生产环境变量
├── vite.config.js              # Vite 配置
└── src/
    ├── App.vue                 # 应用入口（小程序中不渲染模板）
    ├── App.ku.vue              # 虚拟根组件，全局组件挂载于此
    ├── main.js                 # 应用初始化
    ├── pages.json              # 页面路由与 tabBar 配置
    ├── pages/                  # 主包页面
    ├── subPages-test/          # 测试分包
    │   └── component-test.vue  # 组件测试页
    ├── layouts/
    │   ├── MainLayout.vue      # 主布局（含 Tabbar + 底部安全区占位）
    │   ├── tabbar.vue          # 底部导航栏（自动同步高亮状态）
    │   └── README.md           # 布局与 Tabbar 使用说明
    ├── components/
    │   └── feedback/           # 全局反馈组件
    │       ├── GlobalLoading.vue
    │       ├── GlobalToast.vue
    │       ├── GlobalMessage.vue
    │       └── README.md       # 全局反馈 API 与使用说明
    ├── composables/
    │   └── feedback/           # 全局反馈 Pinia Store
    │       ├── useGlobalLoading.js
    │       ├── useGlobalToast.js
    │       └── useGlobalMessage.js
    ├── stores/
    │   ├── tabbar.js           # Tabbar 配置与状态
    │   └── user.js             # 用户信息与登录状态
    ├── router/                 # 路由配置（uni-mini-router）
    ├── css/
    │   └── global.css          # 全局样式
    └── static/                 # 静态资源（图标等）
```

## 虚拟根组件（App.ku.vue）

通过 `@uni-ku/root` 实现，解决 uni-app 小程序中 App.vue 无法渲染模板的限制。

- `<KuRootView />` 标记页面渲染位置（类似 `<router-view />`），**全局只能有一个**
- 与 `<KuRootView />` 同级的组件会在**所有页面**中常驻

```vue
<!-- src/App.ku.vue -->
<template>
  <KuRootView />
  <GlobalLoading />
  <GlobalToast />
  <GlobalMessage />
</template>
```

## 全局反馈组件

基于 Pinia + Wot UI 封装的 Loading / Toast / Message，支持在任意位置调用（包括路由守卫、请求拦截器等非 setup 场景）。

详细 API 和使用示例见 [components/feedback/README.md](src/components/feedback/README.md)。

## 布局与 Tabbar

主包页面统一使用 `<MainLayout>`，内含 Tabbar 和底部安全区占位。Tabbar 基于 Wot UI 实现，自动同步高亮状态，支持图片图标/字体图标、徽标数字/红点。

详细配置和使用方式见 [layouts/README.md](src/layouts/README.md)。

## 页面跳转

统一使用 uni-mini-router：

```js
import { useRouter } from 'uni-mini-router'

const router = useRouter()

router.push({ path: '/subPages-test/component-test' })
router.replace({ path: '/pages/index/index' })
router.pushTab({ path: '/pages/api/index' })  // Tab 页跳转
```

## 代码规范

### ESLint

项目使用 `@uni-helper/eslint-config` 作为 ESLint 预设，ESLint 同时负责**代码检查**和**格式化**，不使用 Prettier。

```bash
pnpm lint          # 检查
pnpm lint:fix      # 自动修复
```

主要规则：
- 缩进：4 空格，禁止 Tab
- Vue 文件块顺序：`<script>` → `<template>` → `<style>`
- 保存时自动修复（通过 VS Code `codeActionsOnSave`）

### EditorConfig

`.editorconfig` 统一编辑器基础风格：

| 配置 | 值 |
|------|------|
| 缩进 | 4 空格 |
| 换行符 | LF |
| 编码 | UTF-8 |
| 末尾换行 | 是 |
| 尾部空格 | 自动删除 |

### Cursor AI 规则

`.cursor/rules/` 下配置了项目级 AI 辅助规则，确保 AI 生成的代码符合项目规范：

| 文件 | 作用 | 生效范围 |
|------|------|------|
| `project-info.mdc` | 项目信息、命令、目录结构、环境配置 | 始终生效 |
| `tech-stack.mdc` | 技术栈、状态管理、路由、代码规范 | stores/composables/router/pages |
| `ui-guidelines.mdc` | UI 组件库、全局反馈、布局、样式约定 | .vue/.scss/.css/components |

### 开发约定

- **UI 组件**：统一使用 Wot UI（`<wd-*>`），组件自动按需导入，无需手动 import
- **反馈组件**：禁止直接调用 `uni.showToast` / `useToast` 等，统一使用 `@/composables/feedback/` 下的封装
- **页面跳转**：统一使用 `uni-mini-router`，禁止直接写 `uni.navigateTo`
- **布局**：主包页面统一使用 `<MainLayout>`
- **Tabbar**：使用 Wot UI Tabbar，不使用微信原生 `custom-tab-bar`

## 开发命令

```bash
# 安装依赖
pnpm install

# 微信小程序 - 开发环境
pnpm dev

# 微信小程序 - 测试环境
pnpm dev:test

# 构建 - 生产环境
pnpm build

# 构建 - 测试环境
pnpm build:test

# 代码检查
pnpm lint

# 代码检查 + 自动修复
pnpm lint:fix
```

构建产物在 `dist/dev/mp-weixin`（开发）或 `dist/build/mp-weixin`（发布），用微信开发者工具导入运行。
