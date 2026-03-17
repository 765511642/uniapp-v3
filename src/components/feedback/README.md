# 全局反馈组件

基于 Pinia + Wot UI 封装的全局反馈组件，支持在任意位置调用（包括路由守卫、请求拦截器等非 setup 场景）。

## 原理

- **Pinia Store**（`composables/useGlobalLoading.js` 等）负责存储反馈选项，页面中调用 store 的 action 即可触发
- **组件**（`GlobalLoading.vue` 等）内部调用 Wot UI 的 `useToast` / `useMessage`，通过 `watch` 监听 store 变化来驱动显示
- 组件挂载在虚拟根组件 `App.ku.vue` 中，所有页面共享，无需每个页面单独引入

## 文件说明

| 文件 | 说明 |
|------|------|
| `GlobalLoading.vue` | 全局加载组件，内部使用 `useToast('global-loading')` 驱动 `wd-toast` |
| `GlobalToast.vue` | 全局提示组件，内部使用 `useToast('global-toast')` 驱动 `wd-toast` |
| `GlobalMessage.vue` | 全局消息弹框组件，内部使用 `useMessage('global-message')` 驱动 `wd-message-box` |

## Loading

```js
import { useGlobalLoading } from '@/composables/feedback/useGlobalLoading'

const loading = useGlobalLoading()

// 显示（字符串 或 配置对象）
loading.loading('加载中...')
loading.loading({ msg: '请稍候', cover: true })

// 关闭
loading.close()
```

**默认配置：** 居中显示、有遮罩、不自动关闭（需手动 `close()`）。

## Toast

```js
import { useGlobalToast } from '@/composables/feedback/useGlobalToast'

const toast = useGlobalToast()

// 普通提示
toast.show('提示内容')
toast.show({ msg: '自定义', duration: 3000, position: 'top' })

// 快捷方法
toast.success('操作成功')     // 成功图标，1500ms
toast.error('操作失败')       // 错误图标，垂直布局
toast.info('提示信息')        // 信息图标
toast.warning('警告')         // 警告图标

// 关闭
toast.close()
```

### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| msg | string | - | 提示内容 |
| duration | number | 2000 | 持续时间(ms)，0 表示不自动关闭 |
| position | string | 'middle' | 显示位置：top / middle / bottom |
| iconName | string | - | 图标：success / error / warning / info / loading |
| direction | string | 'horizontal' | 布局方向：horizontal / vertical |
| cover | boolean | false | 是否显示遮罩 |

## Message

```js
import { useGlobalMessage } from '@/composables/feedback/useGlobalMessage'

const message = useGlobalMessage()

// Alert（只有确认按钮）
message.alert('提醒内容')
message.alert({
  title: '标题',
  msg: '详细内容',
  success(res) {
    console.log('用户确认了')
  }
})

// Confirm（确认 + 取消按钮）
message.confirm({
  title: '确认删除',
  msg: '删除后不可恢复，确定要删除吗？',
  success(res) {
    if (res.action === 'confirm') {
      // 用户点了确定
    }
  },
  fail(res) {
    // 用户点了取消
  }
})

// Prompt（输入框 + 确认取消按钮）
message.prompt({
  title: '输入信息',
  msg: '请输入新名称',
  inputPlaceholder: '请输入内容',
  success(res) {
    if (res.action === 'confirm') {
      console.log('输入值：', res.value)
    }
  },
  fail(res) {
    // 用户取消
  }
})

// 关闭
message.close()
```

### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | - | 弹框标题 |
| msg | string | - | 弹框内容 |
| success | function | - | 成功回调，参数 res 包含 action 和 value |
| fail | function | - | 失败/取消回调 |
| confirmButtonText | string | '确定' | 确认按钮文字 |
| cancelButtonText | string | '取消' | 取消按钮文字 |
| inputValue | string | - | 输入框默认值（prompt 模式） |
| inputPlaceholder | string | - | 输入框占位符（prompt 模式） |
| inputType | string | 'text' | 输入框类型（prompt 模式） |

### 回调参数 res

| 参数 | 类型 | 说明 |
|------|------|------|
| action | string | 用户操作：'confirm' / 'cancel' |
| value | string | 输入框的值（仅 prompt 模式） |

## 注意事项

1. 同一时刻只能显示一个 Toast / Loading，新的会覆盖旧的
2. Loading 使用 `duration: 0`，必须手动调用 `close()` 关闭
3. Message 使用 `success` / `fail` 回调处理用户操作，不写回调也不会报错
4. 组件通过页面路径检测确保在正确页面显示，切换页面时会自动匹配
