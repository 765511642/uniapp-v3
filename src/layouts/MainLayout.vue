<template>
    <view class="layout">
        <view class="layout-content">
            <slot />
        </view>
        <LayoutTabbar />
    </view>
</template>

<script setup>
import LayoutTabbar from '@/layouts/tabbar.vue'
</script>

<style scoped>
.layout {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.layout-content {
    flex: 1;
    box-sizing: border-box;
    overflow: visible;
}
</style>