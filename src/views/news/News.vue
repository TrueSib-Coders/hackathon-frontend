<template lang="pug">
.news
  h1.news__title Новости и мероприятия
  .news__list
    v-card.news__item(
      v-for="item, index in news"
      :key="index"
    )
      v-img(
        :src="item.image"
        height="200px"
      )
      v-card-title {{ item.title }}
      v-card-subtitle
        p {{ item.type }}
        v-spacer
        p {{ item.date }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

export default
@Component({})
class News extends Vue {
  get news() {
    return this.$store.state.news;
  }

  mounted() {
    this.$store.dispatch('loadNews');
  }
}
</script>

<style lang="stylus" scoped>
.news
  max-width: 1400px
  margin: 0 auto
  &__title
    margin-bottom: 20px
  &__list
    display: flex
    flex-wrap: wrap
    margin: -20px
  &__item
    flex-grow: 1
    flex-basis: 30%
    max-width: 420px
    margin: 20px
</style>
