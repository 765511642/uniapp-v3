import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: null,
        token: uni.getStorageSync('token') || '',
    }),

    getters: {
        isLogin: state => !!state.token,
        getUserInfo: state => state.userInfo || {},
    },

    actions: {
        setUserInfo(info) {
            this.userInfo = info
        },

        setToken(newToken) {
            this.token = newToken
            uni.setStorageSync('token', newToken)
        },

        logout() {
            this.token = ''
            this.userInfo = null
            uni.removeStorageSync('token')
        },
    },
})
