import { createRouter } from 'uni-mini-router';
const router = createRouter({
	routes: [...ROUTES]
});

router.beforeEach((to, from, next) => {
	console.log('to', to);
	next();
});

router.afterEach(() => {});

export default router;
