import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'
import TransformPages from 'uni-read-pages-vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import Optimization from '@uni-ku/bundle-optimizer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      resolvers: [WotResolver()]  // 自动引入wot-design-uni组件
    }),
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
  }
})
