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
        const items = [];
        commit('setItems', { query, items });
        resolve();
      });
    },
  },
});
