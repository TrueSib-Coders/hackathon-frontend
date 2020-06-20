<template lang="pug">
.maintab
  PostsList.maintab__content(
    v-if="hasItems"
    :items="filteredItems"
    :isMobile="isMobile"
  )
  v-alert.maintab__empty(
    v-else
    border="bottom"
    colored-border
    type="warning"
    elevation="2"
  ) К сожалению, в этой категории нет постов. Приходите позже или измените настройки фильтра!
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import { PostsList } from '@/components';
import checkMobile from '@/mixins';

export default
@Component({
  components: {
    PostsList,
  },
  props: {
    selectedTags: {
      type: Array,
      default: () => [],
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [checkMobile],
})
class MainTab extends Vue {
  get items() {
    return this.$store.state.items[this.name];
  }

  get hasItems() {
    return this.filteredItems && this.filteredItems.length;
  }

  get filteredItems() {
    const { selectedTags, items } = this;
    if (selectedTags.length && items && items.length) {
      return items.filter(post => {
        const result = post.tags.filter(tag => {
          return selectedTags.some(item => tag === item);
        });
        return !!result.length;
      });
    }
    return items || [];
  }

  get name() {
    return this.$route.meta.tabName;
  }

  mounted() {
    if (!this.items) this.$store.dispatch('loadPosts', this.name);
  }
}
</script>

<style lang="stylus" scoped>
.maintab
  padding: 16px 0
</style>
