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
| 包体优化 | @uni-ku/bundle-optimizer | - |

## 项目结构

```
src/
├── App.vue                   # 应用入口（小程序中不渲染模板）
├── App.ku.vue                # 虚拟根组件（@uni-ku/root），全局组件挂载于此
├── main.js                   # 应用初始化
├── pages/                    # 主包页面
├── subPages-test/            # 分包页面
├── layouts/
│   ├── MainLayout.vue        # 主布局（含 Tabbar + 内容区底部安全区占位）
│   └── tabbar.vue            # 底部导航栏
├── components/
│   └── feedback/             # 全局反馈组件
│       ├── GlobalLoading.vue
│       ├── GlobalToast.vue
│       └── GlobalMessage.vue
├── composables/              # 组合式函数 / Pinia Store
│   ├── useGlobalLoading.js
│   ├── useGlobalToast.js
│   └── useGlobalMessage.js
├── stores/
│   ├── tabbar.js             # Tabbar 配置与状态
│   └── user.js               # 用户信息与登录状态
├── css/
│   └── global.css            # 全局样式
├── router/                   # 路由配置
└── static/                   # 静态资源
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

主包页面统一使用 `<MainLayout>`，内含 Tabbar 和底部安全区占位。Tabbar 基于 Wot UI 实现，支持图片图标/字体图标、徽标数字/红点。

详细配置和使用方式见 [layouts/README.md](src/layouts/README.md)。

## 页面跳转

统一使用 uni-mini-router：

```js
import { useRouter } from 'uni-mini-router'

const router = useRouter()

router.push({ path: '/subPages-test/test1' })
router.replace({ path: '/pages/index/index' })
router.pushTab({ path: '/pages/api/index' })  // Tab 页跳转
```

## 开发命令

```bash
# 安装依赖
pnpm install

# 微信小程序开发模式
npm run dev

# 构建发布
npm run build
```

构建产物在 `dist/dev/mp-weixin`（开发）或 `dist/build/mp-weixin`（发布），用微信开发者工具导入运行。
