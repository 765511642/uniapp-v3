import { defineStore } from 'pinia'

export const useTabbarStore = defineStore('tabbar', {
    state: () => ({
        currentPath: '/pages/index/index',
        /** 选中 / 未选中时的主题色（用于 icon 模式下的图标颜色） */
        activeColor: '#B81721',
        inactiveColor: '#7A7676',
        tabs: [
            {
                name: 'home',
                title: '首页',
                path: '/pages/index/index',
                icon: 'home',
                iconPath: '/static/tabbarIcon/home.png',
                selectedIconPath: '/static/tabbarIcon/home-active.png',
                value: null,
                isDot: false,
            },
            {
                name: 'mine',
                title: '我的',
                path: '/pages/api/index',
                icon: 'user',
                iconPath: '/static/tabbarIcon/personal.png',
                selectedIconPath: '/static/tabbarIcon/personal-active.png',
                value: null,
                isDot: false,
            },
        ],
    }),

    getters: {
        getCurrentPath: state => state.currentPath,
        getTabs: state => state.tabs,
        /** 当前选中的 tab 的 name，供 wd-tabbar v-model 使用 */
        activeName: (state) => {
            const cur = state.tabs.find(t => t.path === state.currentPath)
            return cur ? cur.name : state.tabs[0].name
        },
        /** 获取指定 tab 的徽标值，供 wd-tabbar-item :value 使用 */
        getTabbarItemValue: state => (name) => {
            const item = state.tabs.find(t => t.name === name)
            return item && item.value != null ? item.value : null
        },
        /** 获取指定 tab 是否为点状徽标，供 wd-tabbar-item :is-dot 使用 */
        getTabbarItemIsDot: state => (name) => {
            const item = state.tabs.find(t => t.name === name)
            return item ? !!item.isDot : false
        },
        /** 是否使用图片图标（有 iconPath 时用图片，否则用 icon） */
        useIconPath: () => item => !!(item.iconPath && item.iconPath.trim()),
    },

    actions: {
        updateCurrentPath(path) {
            this.currentPath = path
        },
        /** 按 name 切换并跳转 */
        switchByName(name) {
            const tab = this.tabs.find(t => t.name === name)
            if (!tab || tab.path === this.currentPath)
                return
            this.currentPath = tab.path
            uni.switchTab({ url: tab.path })
        },
        /** 设置指定 tab 的徽标，value 为 null 表示不显示；isDot 默认为 false（数字徽标） */
        setTabbarItem(name, value, isDot = false) {
            const item = this.tabs.find(t => t.name === name)
            if (item) {
                item.value = value
                item.isDot = isDot
            }
        },
    },
})
