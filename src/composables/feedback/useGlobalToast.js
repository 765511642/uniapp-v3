import { defineStore } from 'pinia'
import { CommonUtil } from 'wot-design-uni'

function getCurrentPath() {
    const pages = getCurrentPages()
    return pages.length ? pages.at(-1).route || '' : ''
}

const defaultOptions = { duration: 2000, show: false }

export const useGlobalToast = defineStore('global-toast', {
    state: () => ({
        toastOptions: { ...defaultOptions },
        currentPage: '',
    }),

    actions: {
        show(option) {
            this.currentPage = getCurrentPath()
            const opts = CommonUtil.deepMerge(defaultOptions, typeof option === 'string' ? { msg: option } : option)
            this.toastOptions = CommonUtil.deepMerge(opts, { show: true, zIndex: 999 })
        },
        success(option) {
            this.show(CommonUtil.deepMerge({ iconName: 'success', duration: 1500 }, typeof option === 'string' ? { msg: option } : option))
        },
        error(option) {
            this.show(CommonUtil.deepMerge({ iconName: 'error', direction: 'vertical' }, typeof option === 'string' ? { msg: option } : option))
        },
        info(option) {
            this.show(CommonUtil.deepMerge({ iconName: 'info' }, typeof option === 'string' ? { msg: option } : option))
        },
        warning(option) {
            this.show(CommonUtil.deepMerge({ iconName: 'warning' }, typeof option === 'string' ? { msg: option } : option))
        },
        close() {
            this.toastOptions = { ...defaultOptions }
            this.currentPage = ''
        },
    },
})
