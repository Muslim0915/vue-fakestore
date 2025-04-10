import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "@/stores/authStore";

const routes = [
    {
        path: '/',
        component: () => import('@/pages/HomePage/HomePage.vue'),
    },
    {
        path: '/products',
        component: () => import('@/pages/ProductsPage/ProductsPage.vue'),
    },
    {
        path: '/cart',
        component: () => import('@/pages/CartPage/CartPage.vue'),
    },
    {
        path: '/signup',
        component: () => import('@/pages/SignUpPage/SignUpPage.vue'),
    },
    {
        path: '/login',
        component: () => import('@/pages/LogInPage/LogInPage.vue'),
    },
    {
        path: '/profile',
        component: () => import('@/pages/ProfilePage/ProfilePage.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/products/:id',
        component: () => import('@/pages/ProductsPage/ProductInfoPage.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/NotFoundPage.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: 'text-gray-600 border-b-2 border-gray-600 dark:text-gray-400 dark:border-gray-400',
})

router.beforeEach((to, _, next) => {
    const authStore = useAuthStore();
    const isLoginOrSignUp = ['/login', '/signup'].includes(to.path);

    if (authStore.getUser && isLoginOrSignUp) {
        return next('/');
    }
    if (to.meta.requiresAuth && !authStore.getUser) {
        return next('/login');
    }
    next();
});

export default router
