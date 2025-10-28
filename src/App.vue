<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
onLaunch(() => {
    // 小程序初始化完成时触发，全局只触发一次
    console.log('APP - onLaunch');

});
onShow(() => {
    // 小程序启动，或从后台进入前台显示，会触发 onShow
    console.log('APP - onShow');
})
onHide(() => {
    // 小程序从前台进入后台，会触发 onHide
    console.log('APP - onHide');
})
</script>

<style>
/*每个页面公共css */
</style>