import path from 'node:path'
import uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import Optimization from '@uni-ku/bundle-optimizer'
import UniKuRoot from '@uni-ku/root'
import TransformPages from 'uni-read-pages-vite'
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        Components({
            resolvers: [WotResolver()], // 自动引入wot-design-uni组件
        }),
        UniKuRoot(),
        uni(),
        Optimization({
            enable: true,
            logger: false,
        }),
    ],
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@uni_modules': path.resolve(__dirname, 'node_modules'),
        },
    },
    define: {
        ROUTES: new TransformPages().routes, // 注入路由表
    },
})
