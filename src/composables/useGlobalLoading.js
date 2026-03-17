import { defineStore } from 'pinia';
import { CommonUtil } from 'wot-design-uni';

function getCurrentPath() {
	const pages = getCurrentPages();
	return pages.length ? pages[pages.length - 1].route || '' : '';
}

const defaultOptions = { show: false };

export const useGlobalLoading = defineStore('global-loading', {
	state: () => ({
		loadingOptions: { ...defaultOptions },
		currentPage: ''
	}),

	actions: {
		loading(option) {
			this.currentPage = getCurrentPath();
			const opts = typeof option === 'string' ? { msg: option } : option;
			this.loadingOptions = CommonUtil.deepMerge(
				{
					iconName: 'loading',
					duration: 0,
					cover: true,
					position: 'middle',
					show: true,
					zIndex: 999
				},
				opts
			);
		},
		close() {
			this.loadingOptions = { ...defaultOptions };
			this.currentPage = '';
		}
	}
});
