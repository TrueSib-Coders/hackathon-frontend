<template lang="pug">
v-alert.alert(
  v-if="alertShow"
  :type="alertType"
  dismissible
  transition="slide-x-transition"
  @input="closed"
) {{ alertText }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

export default
@Component({})
class Alert extends Vue {
  get alertShow() {
    return this.$store.state.alert.show;
  }

  get alertType() {
    return this.$store.state.alert.type;
  }

  get alertText() {
    return this.$store.state.alert.text;
  }

  closed() {
    this.$store.dispatch('removeAlert');
  }
}
</script>

<style lang="stylus" scoped>
.alert
  position: absolute
  bottom: 40px
  right: 0
  margin: 20px
  width: auto
  z-index: 20
  min-width: 200px
  max-width: 500px
</style>
