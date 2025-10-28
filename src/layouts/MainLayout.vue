<template>
    <view class="layout">
        <view class="layout-content">
            <slot />
        </view>
        <!-- <CustomTabBar /> -->
    </view>
</template>

<script setup>
// 自定义tabbar
/**
 * 使用命名custom-tab-bar，命中微信小程序官方自定义tabbar，popup弹出层无法覆盖
 * 如果覆盖，则不能使用custom-tab-bar命名，但是问题tabbar会闪烁
 * 如果使用自定义tabbar，popup底部弹出，又不能覆盖tabbar，位置还会塌陷，所以暂定不使用自定义tabbar
*/
import CustomTabBar from '@/custom-tab-bar/index.vue'
</script>

<style scoped>
.layout {
    position: relative;
    /* min-height: 100vh; */
    display: flex;
    flex-direction: column;
}
/* .layout-content {
    flex: 1;
    box-sizing: border-box;
    padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
    overflow: visible;
} */
</style>