import App from './App';
import { createSSRApp } from 'vue';
import * as Pinia from 'pinia';
import '@/css/global.css';
import router from './router'
export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  app.use(router)
  return {
    app,
    Pinia, // 此处必须将 Pinia 返回
  }
}
