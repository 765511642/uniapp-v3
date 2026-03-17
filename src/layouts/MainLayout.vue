<script setup>
import LayoutTabbar from '@/layouts/tabbar.vue'
</script>

<template>
    <view class="layout">
        <view class="layout-content">
            <slot />
        </view>
        <LayoutTabbar />
    </view>
</template>

<style scoped>
.layout {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
/* 内容区底部占位：tabbar 高度(100rpx) + 底部安全区，避免被遮挡且适配 iPhone X 等机型 */
.layout-content {
    flex: 1;
    box-sizing: border-box;
    overflow: visible;
    padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
}
</style>
