<template lang="pug">
v-progress-linear(
  :active="true"
  :buffer-value="next"
  :height="20"
  :rounded="true"
  :value="percent"
  color="light-blue"
) {{ exp }} / {{ next }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

export default
@Component({
  props: {
    exp: {
      type: Number,
      default: 0,
    },
    next: {
      type: Number,
      default: 1,
    },
  },
})
class Level extends Vue {
  get percent() {
    return Math.round((this.exp / this.next) * 100);
  }
}
</script>

<style lang="stylus" scoped>
.level
  width: 100%
  height: 60px
  border: none
  border

  &__bg
    width: 100%
    height: 100%

  &__exp
    height: 100%
</style>
