<script setup>
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useMessage } from 'wot-design-uni'
import { useGlobalMessage } from '@/composables/feedback/useGlobalMessage'

function getCurrentPath() {
    const pages = getCurrentPages()
    return pages.length ? (pages.at(-1).route || '') : ''
}

const { messageOptions, currentPage } = storeToRefs(useGlobalMessage())
const messageBox = useMessage('global-message')

watch(
    () => messageOptions.value,
    (newVal) => {
        if (newVal) {
            if (currentPage.value === getCurrentPath()) {
                const option = { ...newVal }
                messageBox.show(option)
                    .then((res) => {
                        if (typeof option.success === 'function')
                            option.success(res)
                    })
                    .catch((err) => {
                        if (typeof option.fail === 'function')
                            option.fail(err)
                    })
                    .catch(() => {})
            }
        }
        else {
            messageBox.close()
        }
    },
    { deep: true },
)
</script>

<template>
    <wd-message-box selector="global-message" />
</template>
