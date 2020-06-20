<template lang="pug">
.create
  v-card.create__form
    v-form(v-model="valid")
      v-text-field(
        v-model="title"
        :rules="rules.title"
        label="Название"
        required
      )
      v-textarea(
        v-model="text"
        :rules="rules.text"
        label="Описание"
        rows="1"
        required
      )
      v-select(
        v-model="selectedTags"
        multiple
        :items="flatTags"
        :rules="rules.tags"
        label="Теги"
        required
      )
      v-btn.login__btn(
        color="primary"
        block
        :disabled="!valid"
        @click="submit"
      ) Создать
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

export default
@Component({
  components: {},
})
class NewPost extends Vue {
  valid = false;
  title = '';
  text = '';
  selectedTags = [];

  rules = {
    title: [v => !!v || 'Поле не может быть пустым'],
    text: [v => !!v || 'Поле не может быть пустым'],
    tags: [v => (v.length < 4 && v.length > 0) || 'Выберите от 1 до 3 тегов'],
  };

  get tags() {
    return this.$store.state.tags;
  }

  get flatTags() {
    return this.tags.reduce((all, item) => {
      all.push(...item.data);
      return all;
    }, []);
  }

  submit() {
    const { valid, text, title, $router, $store } = this;
    const data = { text, title };
    if (valid) {
      $store.dispatch('createPost', data).then(() => {
        $router.push('/new');
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
.create
  height: 100%

  &__form
    width: 100%
    max-width: 600px
    padding: 20px
    margin: auto
    display: flex
    flex-direction: column
    justify-content: center
    > *
      width: 100%

  &__btn
    margin-top: 8px
</style>
