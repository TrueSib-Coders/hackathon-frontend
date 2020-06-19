import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify);

const vuetify = {
  theme: {
    themes: {
      light: {
        primary: '#0057b6',
        secondary: '#262c40',
        accent: '#0d356c',
        error: '#c84f4f',
        info: '#7c8793',
        success: '#65cc7B',
        warning: '#f5984e',
      },
    },
  },
  lang: {
    locales: { ru },
    current: 'ru',
  },
};

export default new Vuetify(vuetify);
