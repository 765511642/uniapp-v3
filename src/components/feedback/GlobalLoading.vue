<template>
  <wd-toast selector="global-loading" />
</template>

<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from 'wot-design-uni'
import { useGlobalLoading } from '@/composables/useGlobalLoading'

function getCurrentPath() {
  const pages = getCurrentPages()
  return pages.length ? (pages[pages.length - 1].route || '') : ''
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
    } else {
      close()
    }
  },
  { deep: true }
)
</script>
