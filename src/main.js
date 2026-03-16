import App from './App';
import { createSSRApp } from 'vue';
import * as Pinia from 'pinia';
import '@/css/global.css';
import router from './router';
export function createApp() {
	const app = createSSRApp(App);
	const pinia = Pinia.createPinia();
	app.use(pinia);
	app.use(router);
	return {
		app,
		pinia
	};
}
