<script setup>
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

const logStyle = 'color: green'

onLaunch(() => {
    console.log('%c[App.vue] onLaunch', logStyle)
})

onShow(() => {
    console.log('%c[App.vue] onShow', logStyle)
})

onHide(() => {
    console.log('%c[App.vue] onHide', logStyle)
})
</script>
