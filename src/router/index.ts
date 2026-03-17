import { createRouter } from 'uni-mini-router';
const router = createRouter({
	routes: [...ROUTES]
});

router.beforeEach((_to, _from, next) => {
    next()
})

router.afterEach(() => {})

export default router;
