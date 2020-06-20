<template lang="pug">
.list
  Item(
    v-for="item, index in items"
    :key="index"
    :big="index === 0"
    :id="item.id"
    :title="item.title"
    :text="item.text"
    :image="item.image"
    :rating="item.rating"
    :vote="item.vote"
    :comments="item.comments"
    :author="item.author"
    :authorId="item.authorId"
    :date="item.date"
    :tags="item.tags"
    @selectTag="selectTag"
  )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import Item from '../item';

export default
@Component({
  components: {
    Item,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
})
class List extends Vue {
  selectTag(tag) {
    this.$emit('selectTag', tag);
  }
}
</script>

<style lang="stylus" scoped></style>
