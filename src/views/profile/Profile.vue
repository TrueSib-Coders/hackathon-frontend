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
  .profile__content хз что тут
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

  get fio() {
    const { name, surname, patronymic } = this.$store.state.user;
    return `${surname} ${name} ${patronymic}`;
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
      height: 380px

      >>> .profile__achs
        justify-content: center

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
</style>
