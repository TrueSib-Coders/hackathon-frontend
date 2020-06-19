import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import ru from 'vuetify/es5/locale/ru'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#262C40',
        secondary: '#0057B6',
        accent: '#0D356C',
        error: '#C84F4F',
        info: '#E1F5E5',
        success: '#65CC7B',
        warning: '#F5984E'
      }
    }
  },
  lang: {
    locales: { ru },
    current: 'ru'
  }
})
