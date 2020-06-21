<template lang="pug">
.profile
  v-card.profile__header(
    :class="{ 'profile__header_mobile': isMobile }"
    color="secondary"
    outlined
    tile
  )
    .profile__info
      .profile__user
        .profile__image
          img(src="@/assets/img/avatar.svg")
        .profile__text
          h2 {{ fio }}
          p {{ department }}
          p г. Красноярск
      Level(
        :exp="experience.exp"
        :next="experience.nextLevelExp"
      )
    .profile__achs
      Achievement(
        v-for="ach, index in achievements"
        :key="index"
        :type="ach.type"
        :title="ach.title"
        :subtitle="ach.subtitle"
      )
  .profile__content(
    :class="{ 'profile__content_mobile': isMobile }"
  )
    .profile__icons
      h1.profile__subtitle Личный прогресс
      .profile__icons-list
        v-card.profile__icons-item(
          v-for="item, index in icons"
          :key="index"
        )
          v-icon.profile__icons-icon(color="primary" large) {{ item.icon }}
          h2.profile__icons-count {{ item.count }}
          p.profile__icons-title {{ item.title }}
          hr.profile__icons-hr
          p.profile__icons-description(color="secondary") {{ item.description }}
    .profile__life
      h1.profile__subtitle Последняя активность
      .profile__life-list
        router-link(
          v-for="item, index in life"
          :key="index"
          :to="item.id"
        )
          v-card.profile__life-item
            v-icon.profile__life-icon(color="primary" large) {{ item.icon }}
            p.profile__life-title(color="secondary") {{ item.title }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import { Achievement, Level } from '@/components';
import checkMobile from '@/mixins';

export default
@Component({
  components: {
    Achievement,
    Level,
  },
  mixins: [checkMobile],
})
class Profile extends Vue {
  achievements = [
    {
      type: 'first',
      title: 'Первая идея',
      subtitle: 'в категории "Ипотека"',
    },
    {
      type: 'ideas',
      title: 'Самый идейный',
      subtitle: 'в категории "Ипотека"',
    },
    {
      type: 'shot',
      title: 'Точное попадание',
      subtitle: 'в топ-10 по популярности',
    },
    {
      type: 'fire',
      title: 'Самый активный',
      subtitle: 'на протяжении двух недель',
    },
  ];

  get loading() {
    return this.$store.state.loading;
  }

  get fio() {
    const { name, surname, patronymic } = this.$store.state.user;
    return `${surname} ${name} ${patronymic}`;
  }

  get life() {
    return this.$store.state.life;
  }

  get icons() {
    return this.$store.state.icons;
  }

  get department() {
    const { department } = this.$store.state.user;
    return department.department_name;
  }

  get experience() {
    const { experience } = this.$store.state.user;
    return experience;
  }

  get isMobile() {
    return this.checkMobile.phablet || this.checkMobile.mobile;
  }

  mounted() {
    this.$store.dispatch('loadProfile');
  }
}
</script>

<style lang="stylus" scoped>
$flexCenter
  display: flex
  align-items: center
  justify-content: center

img
  width: 100%

.profile
  padding: 0 !important

  &__header
    padding: 16px
    color: white
    display: flex
    justify-content: space-between
    height: 200px

    &_mobile
      flex-direction: column
      height: auto

      >>> .profile__achs
        overflow: auto
        max-width: 100%
        margin-top: 16px

  &__image
    @extends $flexCenter
    padding: 16px
    border-radius: 50%
    background: #508BE2
    min-width: 120px
    width: 120px
    height: 120px
    margin-right: 16px

    &:before
      content: '5'
      font-family: 'Cera Bold'
      position: absolute
      top: 2px
      left: 50px
      font-size: 6em
      text-shadow: 0px 0px 6px black, 0 0 1em black

  &__info
    display: flex
    justify-content: space-between
    flex-direction: column

  &__user
    display: flex
    margin-bottom: 20px

  &__achs
    display: flex
    // flex-wrap: wrap

  &__content
    display: flex
    padding: 20px

    &_mobile
      flex-direction: column

      >>> .profile__icons, .profile__life
        max-width: 100%
        margin: 0
        margin-bottom: 40px

      >>> .profile__icons-list
        margin-right: 0

      >>> .profile__life-list
        width: 100%

  &__subtitle
    margin-bottom: 16px

  &__icons
    flex-grow: 5
    max-width: 60%
    margin-right: 40px
    &-list
      display: flex
      flex-wrap: wrap
      margin: -8px
    &-item
      flex-grow: 1
      flex-basis: 30%
      margin: 8px
      padding: 12px
      text-align: center;
    &-icon
      border: 1px solid #0057B6
      padding: 12px
      border-radius: 4px
      margin-bottom: 8px
    &-count
      font-size: 1.5em
      font-family: 'Proxima Bold'
    &-description
      font-size: 0.8em
      margin-bottom: 0

  &__life
    flex-grow: 3
    max-width: 40%

    &-item
      display: flex
      padding: 8px
      margin-bottom: 16px

    &-title
      margin-left: 8px
      margin-bottom: 0

    &-icon
      padding: 8px
</style>
