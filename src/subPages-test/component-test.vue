<script setup>
import { ref } from 'vue'
import { useGlobalLoading } from '@/composables/feedback/useGlobalLoading'
import { useGlobalMessage } from '@/composables/feedback/useGlobalMessage'
import { useGlobalToast } from '@/composables/feedback/useGlobalToast'

const loading = useGlobalLoading()
const toast = useGlobalToast()
const message = useGlobalMessage()

const showPopup = ref(false)

function openPopup() {
    showPopup.value = true
}
function onPopupClose() {
    showPopup.value = false
}

function testLoading() {
    loading.loading('加载中...')
    setTimeout(() => loading.close(), 2000)
}
function closeLoading() {
    loading.close()
}

function testToastShow() {
    toast.show('这是一条普通提示')
}
function testToastSuccess() {
    toast.success('操作成功')
}
function testToastError() {
    toast.error('操作失败')
}

function testAlert() {
    message.alert({
        title: '标题',
        msg: '提示文案',
        success() {
            toast.success('关闭了？')
        },
        fail() {
            toast.info('已取消')
        },
    })
}
function testConfirm() {
    message.confirm({
        title: '确认操作',
        msg: '确定要执行该操作吗？',
        success(res) {
            if (res.action === 'confirm')
                toast.success('已确认')
        },
        fail() {
            toast.info('已取消')
        },
    })
}
function testPrompt() {
    message.prompt({
        title: '请输入',
        msg: '请输入昵称',
        inputPlaceholder: '昵称',
        success(res) {
            if (res.action === 'confirm')
                toast.success(`输入：${res.value}`)
        },
        fail() {
            toast.info('已取消')
        },
    })
}
</script>

<template>
    <view class="page">
        <view class="section">
            <text class="section-title">Popup 测试</text>
            <wd-button type="primary" @click="openPopup">
                打开 Popup
            </wd-button>
        </view>
        <view class="section">
            <text class="section-title">全局 Loading</text>
            <wd-button @click="testLoading">
                显示 Loading
            </wd-button>
            <wd-button @click="closeLoading">
                关闭 Loading
            </wd-button>
        </view>
        <view class="section">
            <text class="section-title">全局 Toast</text>
            <wd-button @click="testToastShow">
                Toast 普通
            </wd-button>
            <wd-button @click="testToastSuccess">
                Toast 成功
            </wd-button>
            <wd-button @click="testToastError">
                Toast 错误
            </wd-button>
        </view>
        <view class="section">
            <text class="section-title">全局 Message</text>
            <wd-button @click="testAlert">
                Alert 提醒
            </wd-button>
            <wd-button @click="testConfirm">
                Confirm 确认
            </wd-button>
            <wd-button @click="testPrompt">
                Prompt 输入
            </wd-button>
        </view>
    </view>
    <wd-popup v-model="showPopup" position="bottom" root-portal :z-index="999" @close="onPopupClose">
        <view class="popup-content">
            <text class="popup-txt">测试 Popup 内容</text>
        </view>
    </wd-popup>
</template>

<style lang="scss" scoped>
.page {
    padding: 24rpx;
}
.section {
    margin-bottom: 32rpx;
}
.section-title {
    display: block;
    font-size: 28rpx;
    color: #333;
    margin-bottom: 16rpx;
}
.section .wd-button {
    margin-right: 16rpx;
    margin-bottom: 16rpx;
}
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
