import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  'token',
)}`;

Vue.use(Vuex);
const BASE_URL = 'http://192.168.1.6:3029/api/v1';

export default new Vuex.Store({
  state: {
    auth: false,
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
    user: {},
    life: [],
    icons: [],
    loading: false,
    loadingTags: false,
    tags: [],
    news: [],
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
    setUser(state, user) {
      state.user = user;
    },
    setLoading(state, status) {
      state.loading = status;
    },
    setLoadingTags(state, status) {
      state.loadingTags = status;
    },
    setTags(state, tags) {
      state.tags = tags;
    },
    setIcons(state, data) {
      state.icons = data;
    },
    setLife(state, data) {
      state.life = data;
    },
    setNews(state, data) {
      state.news = data;
    },
  },
  actions: {
    removeAlert({ commit }) {
      commit('removeAlert');
    },
    login({ commit, dispatch }, user) {
      return new Promise(function(resolve, reject) {
        commit('setLoading', true);
        axios
          .post(`${BASE_URL}/customer/authorization`, user)
          .then(response => {
            if (response.status === 200) {
              const { data } = response.data;
              localStorage.setItem('token', data.token);
              commit('setAuthStatus', true);
              commit('setUser', data.customer);
              commit('setLoading', false);
              dispatch('loadTags').then(() => {
                resolve(data);
              });
            } else {
              commit('setAlert', {
                text: 'Неверные данные входа',
                type: 'error',
              });
              commit('setLoading', false);
              reject(new Error('Неверные данные входа'));
            }
          })
          .catch(e => {
            commit('setAlert', { text: 'Ошибка подключения', type: 'error' });
            commit('setLoading', false);
            reject(new Error(e));
          });
      });
    },
    logout({ commit }) {
      return new Promise(function(resolve, reject) {
        commit('setAuthStatus', false);
        localStorage.removeItem('token');
        resolve();
      });
    },
    init() {
      const list = [
        this.dispatch('loadPosts', 'popular'),
        this.dispatch('loadTags'),
      ];
      return Promise.all(list);
    },
    loadPosts({ commit }, query) {
      return new Promise(function(resolve, reject) {
        commit('setLoading', true);
        axios
          .post(`${BASE_URL}/customer/posts`, { sort: query })
          .then(response => {
            if (response.status === 200) {
              const { data } = response.data;
              commit('setItems', { items: data, query });
              commit('setLoading', false);
              resolve(data);
            } else {
              commit('setAlert', {
                text: 'Ошибка подключения',
                type: 'error',
              });
              commit('setLoading', false);
              reject(new Error('Ошибка подключения'));
            }
          })
          .catch(e => {
            commit('setAlert', { text: 'Ошибка подключения', type: 'error' });
            commit('setLoading', false);
            reject(new Error(e));
          });
      });
    },
    loadTags({ commit }, query) {
      return new Promise(function(resolve, reject) {
        commit('setLoadingTags', true);
        axios
          .get(`${BASE_URL}/customer/categories`)
          .then(response => {
            if (response.status === 200) {
              const { data } = response.data;
              commit('setTags', data);
              commit('setLoadingTags', false);
              resolve(data);
            } else {
              commit('setAlert', {
                text: 'Ошибка подключения',
                type: 'error',
              });
              commit('setLoadingTags', false);
              reject(new Error('Ошибка подключения'));
            }
          })
          .catch(e => {
            commit('setAlert', { text: 'Ошибка подключения', type: 'error' });
            commit('setLoadingTags', false);
            reject(new Error(e));
          });
      });
    },
    loadNews({ commit }) {
      return new Promise(function(resolve, reject) {
        commit('setLoading', true);
        axios
          .get(`${BASE_URL}/customer/news`)
          .then(response => {
            if (response.status === 200) {
              const { data } = response.data;
              commit('setNews', data);
              commit('setLoading', false);
              resolve(data);
            } else {
              commit('setAlert', {
                text: 'Ошибка подключения',
                type: 'error',
              });
              commit('setLoading', false);
              reject(new Error('Ошибка подключения'));
            }
          })
          .catch(e => {
            commit('setAlert', { text: 'Ошибка подключения', type: 'error' });
            commit('setLoading', false);
            reject(new Error(e));
          });
      });
    },
    loadTop({ commit }) {
      return new Promise(function(resolve, reject) {
        commit('setLoading', true);
        axios
          .get(`${BASE_URL}/customer/top`)
          .then(response => {
            if (response.status === 200) {
              const { data } = response.data;
              commit('setLoading', false);
              resolve(data);
            } else {
              commit('setAlert', {
                text: 'Ошибка подключения',
                type: 'error',
              });
              commit('setLoading', false);
              reject(new Error('Ошибка подключения'));
            }
          })
          .catch(e => {
            commit('setAlert', { text: 'Ошибка подключения', type: 'error' });
            commit('setLoading', false);
            reject(new Error(e));
          });
      });
    },
    loadProfile({ commit }, query) {
      return new Promise(function(resolve, reject) {
        commit('setLoading', true);
        axios
          .get(`${BASE_URL}/customer/profile/life`)
          .then(response => {
            if (response.status === 200) {
              const { data } = response.data;
              const { life, icons } = data;
              commit('setLife', life);
              commit('setIcons', icons);
              commit('setLoading', false);
              resolve(data);
            } else {
              commit('setAlert', {
                text: 'Ошибка подключения',
                type: 'error',
              });
              commit('setLoading', false);
              reject(new Error('Ошибка подключения'));
            }
          })
          .catch(e => {
            commit('setAlert', { text: 'Ошибка подключения', type: 'error' });
            commit('setLoading', false);
            reject(new Error(e));
          });
      });
    },
  },
});
