import { createSSRApp } from "vue";
import App from "./App.vue";
import pinia from './store';

import { requestInterceptor, routeInterceptor } from './interceptors/index'

export function createApp() {
	const app = createSSRApp(App);
	app.use(pinia)
	app.use(routeInterceptor)
	app.use(requestInterceptor)
	return {
		app,
		pinia
	};
}