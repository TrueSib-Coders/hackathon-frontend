<template lang="pug">
v-app.app
  v-navigation-drawer.app__nav(
    v-model="drawer"
    app
  )
    v-list(dense)
      router-link.app__link(to="/")
        v-list-item(link)
          v-list-item-action
            v-icon mdi-home
          v-list-item-content
            v-list-item-title Главная
      router-link.app__link(to="/news")
        v-list-item(link)
          v-list-item-action
            v-icon mdi-newspaper-variant
          v-list-item-content
            v-list-item-title Новости
      router-link.app__link(to="/top" @click.native="toTop")
        v-list-item(link)
          v-list-item-action
            v-icon mdi-trophy-variant
          v-list-item-content
            v-list-item-title Статистика
      router-link.app__link(to="/profile")
        v-list-item(link)
          v-list-item-action
            v-icon mdi-account
          v-list-item-content
            v-list-item-title Профиль
      hr.app__hr
      button.app__link(@click="logout")
        v-list-item(link)
          v-list-item-action
            v-icon mdi-logout-variant
          v-list-item-content
            v-list-item-title Выход

  v-app-bar(
    app
    color="primary"
    dark
  )
    v-app-bar-nav-icon(
      v-if="authorized"
      @click.stop="drawer = !drawer"
    )
    v-toolbar-title
      router-link.app__link(to="/")
        Logo(color="white")
    v-spacer

    v-btn.app__btn(
      to="/create"
      v-if="authorized && !isMobile"
      light
      color="warning"
    ) Предложить идею
      // v-icon mdi-text-box-plus-outline

    v-btn.app__btn(
      to="/create"
      v-if="authorized && isMobile"
      light
      color="warning"
      fab
      small
    )
      v-icon mdi-text-box-plus-outline
  v-main.relative
    img.bg-left(
      src="@/assets/img/bg1.png"
    )
    img.bg-right(
      src="@/assets/img/bg2.png"
    )
    router-view.app__content
  v-footer(
    color="accent"
    app
  )
    span(class="white--text") TrueSib Coders &copy; 2020
  Alert
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import checkMobile from '@/mixins';

import { Alert, Logo } from '@/components';

export default
@Component({
  components: {
    Alert,
    Logo,
  },
  mixins: [checkMobile],
})
class App extends Vue {
  drawer = false;

  departaments = [];

  get isMobile() {
    return this.checkMobile.mobile;
  }

  get authorized() {
    const result = this.$store.state.auth;
    this.drawer = result;
    return result;
  }

  toTop() {
    this.drawer = false;
  }

  logout() {
    this.$store.dispatch('logout').then(() => {
      this.$router.push('/login');
    });
  }
}
</script>

<style lang="stylus">
@import './stylus/fonts.styl'

*
  font-family: "Proxima"

a
  text-decoration: none

.app
  &__link
    width: 100%
    text-align: left
    display: block
    text-decoration: none
    &:hover, &:focus
      text-decoration: none

  &__hr
    border-top: 1px solid rgba(0, 0, 0, 0.12)
    border-bottom: none

  &__content
    padding: 16px
    position: relative
    z-index: 1

  &__btn
    z-index: 15

.v-toolbar__title
  padding-left: 0 !important

.bg-left
  position: fixed
  top: 0
  left: 0
  opacity: 0.2

.bg-right
  position: fixed
  bottom: 0
  right: 0
  opacity: 0.1

.relative
  position: relative
</style>
