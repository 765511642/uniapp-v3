<script setup>
/**
 * 不可在此文件编写全局生命周期（onLaunch/onShow/onHide）及 JS 脚本，
 * 全局生命周期与脚本只能在 App.vue 中编写。
 */
import GlobalLoading from '@/components/feedback/GlobalLoading.vue'
import GlobalMessage from '@/components/feedback/GlobalMessage.vue'
import GlobalToast from '@/components/feedback/GlobalToast.vue'
</script>

<template>
    <KuRootView />
    <GlobalLoading />
    <GlobalToast />
    <GlobalMessage />
</template>
