import { defineStore } from 'pinia'
import { CommonUtil } from 'wot-design-uni'

function getCurrentPath() {
    const pages = getCurrentPages()
    return pages.length ? (pages.at(-1).route || '') : ''
}

export const useGlobalMessage = defineStore('global-message', {
    state: () => ({
        messageOptions: null,
        currentPage: '',
    }),

    actions: {
        show(option) {
            this.currentPage = getCurrentPath()
            const opts = CommonUtil.isString(option) ? { title: option } : { ...option }
            const self = this
            this.messageOptions = {
                ...opts,
                show: true,
                zIndex: 999,
                success(res) {
                    opts.success && opts.success(res)
                    self.close()
                },
                fail(res) {
                    opts.fail && opts.fail(res)
                    self.close()
                },
            }
        },
        alert(option) {
            const opts = CommonUtil.deepMerge(
                { type: 'alert' },
                CommonUtil.isString(option) ? { title: option } : option,
            )
            opts.showCancelButton = false
            this.show(opts)
        },
        confirm(option) {
            const opts = CommonUtil.deepMerge(
                { type: 'confirm' },
                CommonUtil.isString(option) ? { title: option } : option,
            )
            opts.showCancelButton = true
            this.show(opts)
        },
        prompt(option) {
            const opts = CommonUtil.deepMerge(
                { type: 'prompt' },
                CommonUtil.isString(option) ? { title: option } : option,
            )
            opts.showCancelButton = true
            this.show(opts)
        },
        close() {
            this.messageOptions = null
            this.currentPage = ''
        },
    },
})
