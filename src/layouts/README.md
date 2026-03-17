# 布局与 Tabbar

## MainLayout

主布局组件，主包页面统一使用。内含底部 Tabbar 和内容区底部安全区占位。

### 使用方式

```vue
<template>
  <MainLayout>
    <view>页面内容</view>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
</script>
```

### 布局结构

```
┌──────────────────────┐
│                      │
│    页面内容 (slot)    │
│                      │
│                      │
├──────────────────────┤ ← padding-bottom 占位
│      Tabbar          │
│   (safe-area-bottom) │
└──────────────────────┘
```

- 内容区自动添加底部占位 `padding-bottom: calc(100rpx + env(safe-area-inset-bottom))`，防止被 Tabbar 遮挡
- 非主包或不需要 Tabbar 的页面，不使用 MainLayout，需自行处理底部安全距离

## Tabbar

底部导航栏，基于 Wot UI 的 `wd-tabbar` 实现，配置与状态在 `stores/tabbar.js`。

### Tab 配置

在 `stores/tabbar.js` 的 `tabs` 数组中配置：

```js
{
  name: 'home',                              // 唯一标识
  title: '首页',                              // 显示文字
  path: '/pages/index/index',                // 页面路径
  icon: 'home',                              // 字体图标名（无图片时使用）
  iconPath: '/static/tabbarIcon/home.png',           // 未选中图片
  selectedIconPath: '/static/tabbarIcon/home-active.png', // 选中图片
  value: null,                               // 徽标值，null 不显示
  isDot: false                               // 是否为红点模式
}
```

- 同时有 `iconPath` 和 `icon` 时，优先使用图片图标
- 主题色通过 `activeColor` / `inactiveColor` 配置

### 徽标操作

```js
import { useTabbarStore } from '@/stores/tabbar'

const tabbar = useTabbarStore()

// 设置数字徽标
tabbar.setTabbarItem('home', 5)       // 显示数字 5
tabbar.setTabbarItem('home', 120)     // 显示 99+（max 为 99）

// 设置红点
tabbar.setTabbarItem('mine', null, true)

// 清除徽标
tabbar.setTabbarItem('home', null)
```

### 页面中同步 Tabbar 状态

每个 Tab 页需要在 `onShow` 中同步当前路径，确保 Tabbar 高亮正确：

```js
import { onShow } from '@dcloudio/uni-app'
import { useTabbarStore } from '@/stores/tabbar'

const tabbarStore = useTabbarStore()

onShow(() => {
  const pages = getCurrentPages()
  const route = pages[pages.length - 1]?.route
  if (route) tabbarStore.updateCurrentPath('/' + route)
})
```

### 新增 Tab 页

1. 在 `pages.json` 中添加页面配置和 `tabBar.list` 项
2. 在 `stores/tabbar.js` 的 `tabs` 数组中添加对应配置
3. 在 `/static/tabbarIcon/` 下放置图标文件（选中 + 未选中）
4. 新页面中使用 `<MainLayout>` 包裹并在 `onShow` 中同步路径
