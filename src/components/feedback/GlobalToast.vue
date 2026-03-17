<template>
  <wd-toast selector="global-toast" />
</template>

<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from 'wot-design-uni'
import { useGlobalToast } from '@/composables/useGlobalToast'

function getCurrentPath() {
  const pages = getCurrentPages()
  return pages.length ? (pages[pages.length - 1].route || '') : ''
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
    } else {
      toast.close()
    }
  },
  { deep: true }
)
</script>
