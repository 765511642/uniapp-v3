<template>
    <view class="tabbar-fixed">
        <wd-tabbar
            :model-value="tabbarStore.activeName"
            fixed
            placeholder
            safe-area-inset-bottom
            bordered
            :active-color="tabbarStore.activeColor"
            :inactive-color="tabbarStore.inactiveColor"
            @change="handleTabbarChange"
        >
        <wd-tabbar-item
            v-for="item in tabbarStore.getTabs"
            :key="item.name"
            :name="item.name"
            :title="item.title"
        >
            <template #icon="{ active }">
                <wd-badge
                    :model-value="tabbarStore.getTabbarItemValue(item.name)"
                    :is-dot="tabbarStore.getTabbarItemIsDot(item.name)"
                    :hidden="isBadgeHidden(item.name)"
                    :max="99"
                >
                    <image
                        v-if="tabbarStore.useIconPath(item)"
                        :src="active && item.selectedIconPath ? item.selectedIconPath : item.iconPath"
                        class="tabbar-icon-img"
                    />
                    <wd-icon
                        v-else
                        :name="item.icon"
                        size="22px"
                        :style="{ color: active ? tabbarStore.activeColor : tabbarStore.inactiveColor }"
                    />
                </wd-badge>
            </template>
        </wd-tabbar-item>
        </wd-tabbar>
    </view>
</template>

<script setup>
import { useTabbarStore } from '@/stores/tabbar'

const tabbarStore = useTabbarStore()

function handleTabbarChange({ value }) {
    tabbarStore.switchByName(value)
}

/** 无徽标值时且非点状时不显示 wd-badge */
function isBadgeHidden(name) {
    const value = tabbarStore.getTabbarItemValue(name)
    const isDot = tabbarStore.getTabbarItemIsDot(name)
    return value == null && !isDot
}
</script>

<style scoped>
.tabbar-fixed {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
}
.tabbar-icon-img {
    width: 44rpx;
    height: 44rpx;
    display: block;
}
</style>
