<template>
    <MainLayout>
        <view class="content">
            <image class="logo" src="/static/logo.png"></image>
            <view class="text-area">
                <text class="title">{{ test }}</text>
            </view>
            <uni-badge text="1"></uni-badge>
            <uni-card>
                <text>api</text>
            </uni-card>
        </view>
        <wd-button @click="goToHome">主要按钮</wd-button>
    </MainLayout>
</template>

<script setup>
import { ref } from 'vue';
import { onShow, onLoad, onHide } from "@dcloudio/uni-app";
import MainLayout from '@/layouts/MainLayout.vue';
import { useRouter } from 'uni-mini-router'
const router = useRouter()
const test = ref('Hello Uni-app');
onLoad(() => {
})
onHide(() => {
})
onShow(() => {
});
const goToHome = () => {
    router.pushTab({
        name: 'homeIndex',
    })
}
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