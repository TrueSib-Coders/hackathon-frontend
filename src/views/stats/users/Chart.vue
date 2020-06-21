<template lang="pug">
.top
  h2.top__title Топ-15 активных сотрудников
  .top__content
    .top__user-wrapper(
      v-for="item, index in users"
      :key="index"
    )
      router-link(:to="item.user")
        v-card(outlined)
          .top__user
            .top__user-award.top__user-rank(
              v-if="item.rank < 4"
            )
              v-icon(
                :color="getColorIcon(item.rank)"
              ) mdi-trophy-variant-outline
            .top__user-rank(
              v-else
            ) {{ item.rank }}. &nbsp;
            .top__user-name {{ item.fullName }}
            .top__user-level {{ item.level }}
            .top__user-exp ({{ item.exp }})
            v-spacer
            .top__user-stat(
              v-for="stat, index in item.achieve"
              :key="index"
            )
              span {{ stat.value }}
              v-icon(small) {{ stat.icon }}&nbsp;
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import TOP from './const.js';

export default
@Component({})
class TopUsers extends Vue {
  users = TOP;

  getColorIcon(rank) {
    return rank === 1 ? 'gold' : rank === 2 ? 'silver' : 'bronze';
  }
}
</script>

<style lang="stylus" scoped>
.top
  &__title
    font-family: 'Proxima'
    text-align: center

  &__content
    padding: 12px

  &__user-wrapper
    margin-bottom: 12px

  &__user
    display: flex
    align-items: center
    margin: 0 8px
    padding: 8px 0

    &-name
      font-size: 1.1em
      font-family: 'Proxima Bold'

    &-rank
      text-align: center
      width: 30px

    &-level
      padding: 0px
      border: 2px solid #0057b6
      width: 25px
      height: 25px
      border-radius: 18px
      text-align: center
      margin: 0 8px
      display: flex
      align-items: center
      justify-content: center

    &-stat
      margin-left: 4px
      font-size: 0.8em
</style>
