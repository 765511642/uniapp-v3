import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: uni.getStorageSync('token') || ''
  }),

  getters: {
    isLogin: (state) => !!state.token,
    getUserInfo: (state) => state.userInfo || {}
  },

  actions: {
    setUserInfo(info) {
      this.userInfo = info
    },

    setToken(newToken) {
      this.token = newToken
      uni.setStorageSync('token', newToken)
    },

    async login(data) {
      try {
        // 这里添加登录接口
        // const res = await api.login(data)
        // this.setToken(res.token)
        // return res
      } catch (error) {
        throw error
      }
    },

    async getUserInfoAction() {
      try {
        // 这里添加获取用户信息接口
        // const res = await api.getUserInfo()
        // this.setUserInfo(res.data)
        // return res
      } catch (error) {
        throw error
      }
    },

    logout() {
      this.token = ''
      this.userInfo = null
      uni.removeStorageSync('token')
    }
  }
})