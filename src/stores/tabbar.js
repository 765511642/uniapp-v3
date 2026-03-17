import { defineStore } from 'pinia';

export const useTabbarStore = defineStore('tabbar', {
	state: () => ({
		currentPath: '/pages/index/index',
		tabs: [
			{ name: 'home', title: '首页', path: '/pages/index/index', icon: 'home' },
			{ name: 'mine', title: '我的', path: '/pages/api/index', icon: 'user' }
		]
	}),

	getters: {
		getCurrentPath: (state) => state.currentPath,
		getTabs: (state) => state.tabs,
		/** 当前选中的 tab 的 name，供 wd-tabbar v-model 使用 */
		activeName: (state) => {
			const cur = state.tabs.find((t) => t.path === state.currentPath);
			return cur ? cur.name : state.tabs[0].name;
		}
	},

	actions: {
		updateCurrentPath(path) {
			this.currentPath = path;
		},
		/** 按 name 切换并跳转 */
		switchByName(name) {
			const tab = this.tabs.find((t) => t.name === name);
			if (!tab || tab.path === this.currentPath) return;
			this.currentPath = tab.path;
			uni.switchTab({ url: tab.path });
		}
	}
});
