<template>
    <MainLayout>
        11
        <button @click="open">打开弹窗</button>
        <wd-popup v-model="show" position="bottom" @close="handleClose">
            <text class="custom-txt">弹弹弹</text>
        </wd-popup>
        <wd-toast />

    </MainLayout>
</template>

<script setup>
import { ref } from 'vue';
import { onShow, onLoad, onHide } from "@dcloudio/uni-app";
import MainLayout from '@src/layouts/MainLayout.vue';
import { useToast } from '@uni_modules/wot-design-uni'
const toast = useToast()

const test = ref('Hello Uni-app');
let show = ref(false);
onLoad(() => {
})
onHide(() => {
})
onShow(() => {
});
const open = () => {
    // show.value = true;
    toast.show('提示信息')
}
</script>
<style lang="scss" scoped>
.custom-txt {
    color: black;
    width: 400rpx;
    height: 400rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20rpx;
    border-radius: 32rpx;
}
</style>