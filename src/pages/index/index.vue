<template>
	<MainLayout>
		11
		<wd-button type="primary" @click="openPopup">打开弹窗</wd-button>
		<wd-popup v-model="showPopup" root-portal z-index="999" @close="onPopupClose">
			<view class="popup-content">
				<text class="popup-txt">测试 Popup 内容</text>
			</view>
		</wd-popup>
		<wd-toast />
	</MainLayout>
</template>

<script setup>
import { ref } from 'vue';
import { onShow, onLoad, onHide } from '@dcloudio/uni-app';
import MainLayout from '@/layouts/MainLayout.vue';
import { useToast } from '@uni_modules/wot-design-uni';
import { useTabbarStore } from '@/stores/tabbar';

const toast = useToast();
const tabbarStore = useTabbarStore();

const test = ref('Hello Uni-app');
const showPopup = ref(false);

onLoad(() => {});
onHide(() => {});
onShow(() => {
	const pages = getCurrentPages();
	const route = pages[pages.length - 1]?.route;
	if (route) tabbarStore.updateCurrentPath('/' + route);
});

function openPopup() {
	showPopup.value = true;
}
function onPopupClose() {
	showPopup.value = false;
}
</script>
<style lang="scss" scoped>
.popup-content {
	padding: 48rpx 32rpx;
	padding-bottom: calc(48rpx + env(safe-area-inset-bottom));
	min-height: 200rpx;
}
.popup-txt {
	font-size: 28rpx;
	color: #333;
}
</style>
