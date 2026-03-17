import * as Pinia from 'pinia'
import { createSSRApp } from 'vue'
import App from './App'
import router from './router'
import '@/css/global.css'

export function createApp() {
    const app = createSSRApp(App)
    const pinia = Pinia.createPinia()
    app.use(pinia)
    app.use(router)
    return {
        app,
        pinia,
    }
}
