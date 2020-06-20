<template lang="pug">
.ach
  .ach__img(v-if="type === 'fire'")
    img(src="@/assets/ach/fire.svg")
  .ach__img(v-else-if="type === 'first'")
    img(src="@/assets/ach/first.svg")
  .ach__img(v-else-if="type === 'ideas'")
    img(src="@/assets/ach/ideas.svg")
  .ach__img(v-else)
    img(src="@/assets/ach/shot.svg")
  .ach__title {{ title }}
  .ach__subtitle {{ subtitle }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

export default
@Component({
  props: {
    type: {
      type: String,
      default: 'fire',
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
})
class Achievement extends Vue {}
</script>

<style lang="stylus" scoped>
$flexCenter
  display: flex
  align-items: center
  justify-content: center

img
  width: 100%

.ach
  display: flex
  flex-direction: column
  align-items: center
  text-align: center
  width: 100px
  margin-left: 8px

  &__img
    @extends $flexCenter
    padding: 8px
    border-radius: 50%
    background: #508BE2
    width: 80px
    height: 80px
    margin-bottom: 8px

  &__title
    text-transform: uppercase
    font-size: 0.8em
    font-family: 'Proxima Bold'

  &__subtitle
    font-size: 0.8em
</style>
