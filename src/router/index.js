import Vue from 'vue';
import VueRouter from 'vue-router';

import Store from '../store';

Vue.use(VueRouter);

const ViewLogin = () =>
  import('../views/login/Login.vue' /* webpackChunkName: "login" */);

const ViewMain = () =>
  import('../views/main/Main.vue' /* webpackChunkName: "login" */);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: ViewLogin,
    meta: { name: 'Вход' },
  },
  {
    path: '/',
    name: 'main',
    component: ViewMain,
    meta: { name: 'Главная', requiresAuth: true },
  },
  {
    path: '/news',
    name: 'news',
    component: ViewMain,
    meta: { name: 'Новости', requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ViewMain,
    meta: { name: 'Профиль', requiresAuth: true },
  },
  {
    path: '*',
    redirect: '/login',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (Store.state.auth) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else next();
  } else {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next({ path: '/login' });
    }
    next();
  }
});

export default router;
