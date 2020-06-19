import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';

Vue.use(Vuex);
// const BASE_URL = '';

export default new Vuex.Store({
  state: {
    auth: false,
    alert: {
      show: false,
      type: 'info',
      text: 'Уведомление',
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
    logout({ commit }, user) {
      return new Promise(function(resolve, reject) {
        commit('setAuthStatus', false);
        resolve();
      });
    },
  },
  modules: {},
});
