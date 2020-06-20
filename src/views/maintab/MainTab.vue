<template lang="pug">
.maintab {{ name }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import checkMobile from '@/mixins';

export default
@Component({
  mixins: [checkMobile],
})
class MainTab extends Vue {
  get items() {
    return this.$store.state.items[this.name];
  }

  get name() {
    return this.$route.meta.tabName;
  }

  mounted() {
    if (!this.items) this.$store.dispatch('loadPosts', this.name);
  }
}
</script>

<style lang="stylus" scoped></style>
