<template>
    <wd-tabbar
        :model-value="tabbarStore.activeName"
        fixed
        placeholder
        safe-area-inset-bottom
        bordered
        active-color="#B81721"
        inactive-color="#7A7676"
        @change="handleTabbarChange"
    >
        <wd-tabbar-item
            v-for="item in tabbarStore.getTabs"
            :key="item.name"
            :name="item.name"
            :title="item.title"
            :icon="item.icon"
        />
    </wd-tabbar>
</template>

<script setup>
import { useTabbarStore } from '@/stores/tabbar'

const tabbarStore = useTabbarStore()

function handleTabbarChange({ value }) {
    tabbarStore.switchByName(value)
}
</script>
