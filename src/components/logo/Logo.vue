<template lang="pug">
.logo
  img(
    v-if="color === 'blue'"
    src="@/assets/img/blue-logo.svg"
  )
  img(
    v-else
    src="@/assets/img/white-logo.svg"
  )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

export default
@Component({
  props: {
    color: {
      type: String,
      default: 'blue',
    },
  },
})
class MainLogo extends Vue {}
</script>

<style lang="stylus" scoped></style>
