import { defineStore } from 'pinia'

export const useTabbarStore = defineStore('tabbar', {
  state: () => ({
    currentPath: '/pages/index/index',
    tabs: [
      {
        text: '首页',
        path: '/pages/index/index',
        iconPath: '/static/tabbarIcon/home.png',
        selectedIconPath: '/static/tabbarIcon/home-active.png'
      },
      {
        text: '我的',
        path: '/pages/api/index',
        iconPath: '/static/tabbarIcon/personal.png',
        selectedIconPath: '/static/tabbarIcon/personal-active.png'
      }
    ]
  }),

  getters: {
    getCurrentPath: (state) => state.currentPath,
    getTabs: (state) => state.tabs
  },

  actions: {
    updateCurrentPath(path) {
      if (this.currentPath === path) {
        return
      };
      this.currentPath = path
    }
  }
})