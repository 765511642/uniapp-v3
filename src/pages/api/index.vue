<script setup>
import { useRouter } from 'uni-mini-router'
import { ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'

const router = useRouter()
const test = ref('Hello Uni-app')
function goToHome() {
    router.push({
        path: '/subPages-test/component-test',
    })
}
</script>

<template>
    <MainLayout>
        <view class="content">
            <image class="logo" src="/static/logo.png" />
            <view class="text-area">
                <text class="title">{{ test }}</text>
            </view>
        </view>
        <wd-button @click="goToHome">
            主要按钮
        </wd-button>
    </MainLayout>
</template>

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
