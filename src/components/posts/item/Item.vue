<template lang="pug">
.item
  v-card.item__card(
    :class="{ 'item_small' : small }"
    class="mx-auto"
  )
    router-link(
      :to="`/post/${id}`"
    )
      v-img.item__image(
        :class="{ 'item__image_small' : small }"
        class="white--text align-end"
        :src="image"
        :max-height="small ? 'auto' : '400px'"
        :max-width="small ? '300px' : 'auto'"
      )
        v-card-title.item__title(v-if="!small") {{ title }}
    .item__content
      router-link(
        class="text--accent"
        :to="`/post/${id}`"
      )
        v-card-title.item__title(v-if="small") {{ title }}
      v-card-subtitle.item__subtitle(
        :class="{ 'item__subtitle_small' : small }"
        class="pb-0"
      )
        router-link(:to="authorLink") {{ author }}
      v-card-text.item__text(
        :class="{ 'item__text_small' : small }"
        class="text--primary"
      ) {{ text }}
      v-spacer(v-if="small")
      v-card-actions.item__actions
        .item__comments(class="text--secondary")
          v-icon(small) mdi-comment-text-outline
          | &nbsp; {{ comments }}
        .item__tags(v-if="!isMobile")
          v-chip.item__tag(
            v-for="tag, index in tags"
            :key="index"
            color="accent"
            small
            @click="selectTag(tag)"
          ) {{ tag }}
        v-spacer
        v-btn(
          color="success"
          :text="vote !== (true || null)"
        )
          v-icon mdi-chevron-up
        .item__rating {{ rating }}
        v-btn(
          color="error"
          :text="vote !== (false || null)"
        )
          v-icon mdi-chevron-down
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

export default
@Component({
  props: {
    big: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: '',
    },
    authorLink: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    vote: {
      type: Boolean,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default: () => [],
    },
  },
})
class Item extends Vue {
  get small() {
    const { big, isMobile } = this;
    return !(big || isMobile);
  }
}
</script>

<style lang="stylus" scoped>
.item
  margin-bottom: 16px

  &_small
    display: flex
    max-height: 210px

  &__card
    overflow: hidden

  &__image
    position: relative

    &:before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 1
      background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.9) 100%)

  &__title
    font-family: "Proxima Bold"
    position: relative
    z-index: 2

  &__content
    display: flex
    flex-direction: column
    width: 100%

  &__actions
    padding: 8px 8px 8px 16px

  &__text
    &_small
      max-height: 120px
      overflow: hidden

  &__subtitle
    &_small
      padding-top: 0

  &__rating
    font-family: "Proxima Bold"
    width: 50px
    font-size: 1.2em
    text-align: center

  &__tags
    margin: 0 4px 0 8px

  &__tag
    margin: 2px 4px 2px 0
    >>> *
      color: white
</style>
