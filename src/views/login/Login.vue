<template lang="pug">
.login
  v-card.login__form
    Logo
    v-form(v-model="valid")
      v-text-field(
        v-model="login"
        :rules="rules.login"
        label="Имя пользователя"
        required
      )
      v-text-field(
        v-model="pass"
        type="password"
        :rules="rules.pass"
        label="Пароль"
        required
      )
      v-btn.login__btn(
        color="primary"
        block
        :disabled="!valid"
        @click="submit"
      ) Войти
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import { Logo } from '@/components';

export default
@Component({
  components: {
    Logo,
  },
})
class ViewLogin extends Vue {
  valid = false;
  login = '';
  pass = '';

  rules = {
    login: [v => !!v || 'Поле не может быть пустым'],
    pass: [
      v => !!v || 'Поле не может быть пустым',
      v => v.length >= 6 || 'Минимальная длина пароля - 6 символов',
    ],
  };

  submit() {
    const { valid, login, pass, $router, $store } = this;
    const data = { login, pass };
    if (valid) {
      $store.dispatch('login', data).then(() => {
        $router.push('/');
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  display: flex
  align-items: center
  justify-content: center
  height: 100%

  &__form
    width: 100%
    padding: 20px
    max-width: 320px
    margin: auto
    display: flex
    flex-direction: column
    justify-content: center
    > *
      width: 100%

  &__btn
    margin-top: 8px
</style>
