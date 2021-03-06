import Vue from 'vue';
import VueRouter from 'vue-router';

import Store from '../store';

Vue.use(VueRouter);

const Login = () =>
  import('../views/login/Login.vue' /* webpackChunkName: "login" */);

const Main = () =>
  import('../views/main/Main.vue' /* webpackChunkName: "main" */);

const News = () =>
  import('../views/news/News.vue' /* webpackChunkName: "news" */);

const Profile = () =>
  import('../views/profile/Profile.vue' /* webpackChunkName: "profile" */);

const Stat = () =>
  import('../views/stats/Stats.vue' /* webpackChunkName: "top" */);

const MainTab = () =>
  import('../views/maintab/MainTab.vue' /* webpackChunkName: "tab" */);

const CreatePost = () =>
  import('../views/new/New.vue' /* webpackChunkName: "create" */);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { name: 'Вход' },
  },
  {
    path: '/',
    component: Main,
    redirect: 'popular',
    meta: { name: 'Главная', requiresAuth: true },
    children: [
      {
        path: '/popular',
        name: 'popular',
        component: MainTab,
        meta: { name: 'Популярное', requiresAuth: true, tabName: 'popular' },
      },
      {
        path: '/discussed',
        name: 'discussed',
        component: MainTab,
        meta: { name: 'Обсуждаемое', requiresAuth: true, tabName: 'discussed' },
      },
      {
        path: '/new',
        name: 'new',
        component: MainTab,
        meta: { name: 'Новое', requiresAuth: true, tabName: 'new' },
      },
    ],
  },
  {
    path: '/news',
    name: 'news',
    component: News,
    meta: { name: 'Новости', requiresAuth: true },
  },
  {
    path: '/top',
    name: 'top',
    component: Stat,
    meta: { name: 'Статистика', requiresAuth: true },
  },
  {
    path: '/create',
    name: 'createPost',
    component: CreatePost,
    meta: { name: 'Предлоэить новую идею', requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { name: 'Профиль', requiresAuth: true },
  },
  {
    path: '*',
    redirect: '/',
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
    } else {
      next();
    }
  }
});

export default router;
