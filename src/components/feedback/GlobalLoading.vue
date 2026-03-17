<script setup>
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useToast } from 'wot-design-uni'
import { useGlobalLoading } from '@/composables/feedback/useGlobalLoading'

function getCurrentPath() {
    const pages = getCurrentPages()
    return pages.length ? (pages.at(-1).route || '') : ''
}

const { loadingOptions, currentPage } = storeToRefs(useGlobalLoading())
const { loading, close } = useToast('global-loading')

watch(
    () => loadingOptions.value,
    (newVal) => {
        if (newVal && newVal.show) {
            if (currentPage.value === getCurrentPath()) {
                loading(loadingOptions.value)
            }
        }
        else {
            close()
        }
    },
    { deep: true },
)
</script>

<template>
    <wd-toast selector="global-loading" />
</template>
