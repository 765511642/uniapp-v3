<template>
    <view class="tabbar">
        <block v-for="(item, index) in tabs" :key="index">
            <view class="tabbar-item" :class="{ active: currentPath === item.path }" @click="switchTab(item.path)">
                <view class="tabbar-item-icon">
                    <image :src="currentPath === item.path ? item.selectedIconPath : item.iconPath" class="tabbar-icon" />
                </view>
                <text class="tabbar-item-text" :class="{ active: currentPath === item.path }">{{ item.text }}</text>
            </view>
        </block>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { useTabbarStore } from '@/stores/tabbar'
import { onShow } from '@dcloudio/uni-app'

const tabbarStore = useTabbarStore()

const tabs = computed(() => tabbarStore.getTabs)
const currentPath = computed(() => tabbarStore.getCurrentPath)

onShow(() => {
    // 获取当前页面路径
    const pages = getCurrentPages()
    const currentPage = '/' + pages[pages.length - 1].route
    tabbarStore.updateCurrentPath(currentPage);
})

function switchTab (path) {
    if (path !== currentPath.value) {
        uni.switchTab({
            url: path
        });
        tabbarStore.updateCurrentPath(path)
    }
    console.log(currentPath.value)
}
</script>

<style scoped>
.tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    display: flex;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
}
.tabbar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12rpx 0;
}
.tabbar-item-icon {
    margin-bottom: 2rpx;
}
.tabbar-item-text {
    font-size: 20rpx;
}
.tabbar-icon {
    width: 48rpx;
    height: 48rpx;
    transition: all 0.3s ease;
}
.active {
    color: #c73d2a;
}
</style>