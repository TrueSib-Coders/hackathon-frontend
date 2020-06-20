<template lang="pug">
.list
  Item(
    v-for="item, index in items"
    :key="index"
    :big="index === 0"
    :isMobile="isMobile"
    :id="item.id"
    :title="item.title"
    :text="item.text"
    :image="item.image"
    :rating="item.rating"
    :vote="item.vote"
    :author="item.author"
    :authorLink="item.authorLink"
    :date="item.date"
    :tags="item.tags"
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
class List extends Vue {}
</script>

<style lang="stylus" scoped></style>
