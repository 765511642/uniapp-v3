<template>
	<MainLayout>
		<view class="content">
			<image class="logo" src="/static/logo.png"></image>
			<view class="text-area">
				<text class="title">{{ test }}</text>
			</view>
		</view>
		<wd-button @click="goToHome">主要按钮</wd-button>
	</MainLayout>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import MainLayout from '@/layouts/MainLayout.vue';
import { useRouter } from 'uni-mini-router';
import { useTabbarStore } from '@/stores/tabbar';

const router = useRouter();
const tabbarStore = useTabbarStore();
const test = ref('Hello Uni-app');

onShow(() => {
	const pages = getCurrentPages();
	const route = pages[pages.length - 1]?.route;
	if (route) tabbarStore.updateCurrentPath('/' + route);
});
const goToHome = () => {
	router.push({
		path: '/subPages-test/test1'
	});
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
