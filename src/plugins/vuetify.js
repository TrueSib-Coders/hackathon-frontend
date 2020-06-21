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
        info: '#508be2',
        success: '#65cc7B',
        warning: '#f5984e',
        light: '#ffffff',
        gold: '#deb900',
        silver: '#b3b3b3',
        bronze: '#a25f0c',
      },
      dark: {
        primary: '#FFFFFF',
        secondary: '#E9F1F9',
        accent: '#D7DEE9',
        error: '#F4DCDC',
        info: '#CEDFF4',
        success: '#E1F5E5',
        warning: '#F5984E',
        gold: '#deb900',
        silver: '#b3b3b3',
        bronze: '#a25f0c',
      },
    },
  },
  lang: {
    locales: { ru },
    current: 'ru',
  },
};

export default new Vuetify(vuetify);
