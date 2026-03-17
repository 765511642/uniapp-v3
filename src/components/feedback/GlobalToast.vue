<script setup>
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useToast } from 'wot-design-uni'
import { useGlobalToast } from '@/composables/feedback/useGlobalToast'

function getCurrentPath() {
    const pages = getCurrentPages()
    return pages.length ? (pages.at(-1).route || '') : ''
}

const { toastOptions, currentPage } = storeToRefs(useGlobalToast())
const toast = useToast('global-toast')

watch(
    () => toastOptions.value,
    (newVal) => {
        if (newVal && newVal.show) {
            if (currentPage.value === getCurrentPath()) {
                toast.show(toastOptions.value)
            }
        }
        else {
            toast.close()
        }
    },
    { deep: true },
)
</script>

<template>
    <wd-toast selector="global-toast" />
</template>
