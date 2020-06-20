import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';

Vue.use(Vuex);
// const BASE_URL = '';

export default new Vuex.Store({
  state: {
    auth: true,
    alert: {
      show: false,
      type: 'info',
      text: 'Уведомление',
    },
    items: {
      popular: null,
      new: null,
      discussed: null,
    },
  },
  mutations: {
    setAuthStatus(state, status) {
      state.auth = status;
    },
    setAlert(state, alert) {
      state.alert = { show: true, text: alert.text, type: alert.type };
    },
    removeAlert(state) {
      state.alert = { show: false, text: '', type: 'info' };
    },
    setItems(state, data) {
      const { items, query } = data;
      state.items[query] = items;
    },
  },
  actions: {
    removeAlert({ commit }) {
      commit('removeAlert');
    },
    /* login({ commit }, user) {
      return new Promise(function(resolve, reject) {
        axios
          .post(`${BASE_URL}/auth`, user)
          .then(response => {
            if (response.data.status === 'success') {
              commit('setAuthStatus', true);
              resolve(response.data.data);
            } else {
              commit('setAlert', {
                text: 'Неверные данные входа',
                type: 'error',
              });
              reject(new Error('Неверные данные входа'));
            }
          })
          .catch(e => {
            commit('setAlert', { text: 'Ошибка подключения', type: 'error' });
            reject(new Error(e));
          });
      });
    }, */
    login({ commit }, user) {
      return new Promise(function(resolve, reject) {
        commit('setAuthStatus', true);
        resolve();
      });
    },
    logout({ commit }) {
      return new Promise(function(resolve, reject) {
        commit('setAuthStatus', false);
        resolve();
      });
    },
    loadPosts({ commit }, query) {
      return new Promise(function(resolve, reject) {
        const items = [
          {
            id: 0,
            title: 'Лекция по готовке борща',
            image:
              'https://image.shutterstock.com/image-photo/tasty-beetroot-soup-bowl-on-600w-1415016974.jpg',
            text:
              'Приглашаю всех сотрудников, независимо от пола и возраста, на мою пятничную онлайн-лекцию по готовке борща. Трансляция пройдет в Zoom в 19:00 по Московскому времени.',
            author: 'Иванова А. А.',
            authorLink: '/users/1',
            date: '13.06.2020',
            rating: 134,
            vote: true,
            tags: ['Еда', 'Сотрудники', 'Лекции'],
          },
          {
            id: 1,
            title: 'Изменения в отделе разработки',
            image:
              'https://image.shutterstock.com/image-photo/cropped-image-young-man-working-600w-258726044.jpg',
            text:
              'Текущая система IT-департамента не соответствует современным тенденциям разработки программного продукта. Предлагаю изменить систему менеджмента и внедрить применение гибких методологий.',
            author: 'Александров В. И.',
            authorLink: '/users/2',
            date: '16.06.2020',
            rating: 98,
            vote: null,
            tags: ['Разработка'],
          },
          {
            id: 2,
            title: 'Корпоратив на природе',
            image:
              'https://image.shutterstock.com/image-photo/fresh-homecooked-on-grill-fire-600w-1095342890.jpg',
            text:
              'Предлагаю отметить день рождения компании на природе и пожарить шашлыки.',
            author: 'Петров И. Н.',
            authorLink: '/users/3',
            date: '03.06.2020',
            rating: 255,
            vote: true,
            tags: ['Еда', 'Отдых', 'Сотрудники'],
          },
          {
            id: 3,
            title: 'Конкурс на лучшую творческую работу',
            image:
              'https://image.shutterstock.com/image-photo/cheerful-mother-little-daughter-standing-600w-1214481112.jpg',
            text:
              'Есть вариант провести конкурс творчества, в качестве приза - месячная премия. Приветствуются танцы, песни, стихи собственного сочинения и любые другие проявления вашей фантазии!',
            author: 'Антонов И. Г.',
            authorLink: '/users/4',
            date: '11.06.2020',
            rating: 11,
            vote: false,
            tags: ['Отдых', 'Сотрудники'],
          },
        ];
        commit('setItems', { query, items });
        resolve();
      });
    },
  },
});
