<template lang="pug">
.main(
  :class="{ 'main_mobile': isMobile }"
)
  v-tabs.main__list(
    v-model="activeTab"
    grow
    :vertical="isMobile"
  )
    v-tab(key="popular" to="popular") Популярное
    v-tab(key="discussed" to="discussed") Обсуждаемое
    v-tab(key="new" to="new") Новое
  v-card.main__tagscard(
    :class="{ 'main__tagscard_desktop': isDesktop }"
    outlined
    tile
  )
    v-text-field(
      v-model="searchTags"
      label="Введите тег"
    )
    v-skeleton-loader.main__sidebar(
      :loading="loading"
      height="94"
      type="list-item-five-line"
    )
      v-list.main__tags(
        :class="{ 'main__tags_mobile': isMobile }"
        dense
      )
        v-list-item.main__tag(
          v-for="item, index in filteredTags"
          :class="{ 'main__tag_mobile': isMobile }"
          :key="item.id"
        )
          v-checkbox.main__tagitem(
            v-model="selectedTags"
            :label="item.text"
            :value="item"
          )
        v-alert.main__empty(
          v-if="!hasTags"
          border="bottom"
          colored-border
          type="warning"
          elevation="2"
        ) Ничего не найдено!
    Transition
      v-btn.main__btn(
        v-if="canClear"
        color="error"
        block
        outlined
        tile
        @click="clear"
      ) Сброс
  v-tabs-items.main__content(id="popular" v-model="activeTab")
    v-tab-item(id="popular")
      router-view(
        :selectedTags="selectedTags"
        :isMobile="isMobile"
        @selectTag="selectTag"
      )
    v-tab-item(id="discussed")
      router-view(
        :selectedTags="selectedTags"
        :isMobile="isMobile"
        @selectTag="selectTag"
      )
    v-tab-item(id="new")
      router-view(
        :selectedTags="selectedTags"
        :isMobile="isMobile"
        @selectTag="selectTag"
      )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import { Transition } from '@/components';
import checkMobile from '@/mixins';

export default
@Component({
  components: {
    Transition,
  },
  mixins: [checkMobile],
})
class Main extends Vue {
  activeTab = 'popular';

  searchTags = '';

  selectedTags = [];

  get tags() {
    return this.$store.state.tags;
  }

  get isMobile() {
    return this.checkMobile.mobile;
  }

  get isTablet() {
    return this.checkMobile.phablet;
  }

  get isDesktop() {
    return !this.isMobile;
  }

  get flatTags() {
    return this.tags.reduce((all, item) => {
      all.push(...item.data);
      return all;
    }, []);
  }

  get filteredTags() {
    const { searchTags, flatTags } = this;
    if (searchTags) {
      return flatTags.filter(item => {
        const tag = item.text.toLowerCase();
        const search = searchTags.toLowerCase();
        return tag.includes(search);
      });
    }
    return flatTags;
  }

  get hasTags() {
    return !!this.filteredTags.length;
  }

  get canClear() {
    const { selectedTags, searchTags } = this;
    return searchTags || selectedTags.length;
  }

  get loading() {
    return this.$store.state.loadingTags;
  }

  clear() {
    this.selectedTags = [];
    this.searchTags = '';
  }

  selectTag(tag) {
    this.selectedTags.push(tag);
  }
}
</script>

<style lang="stylus" scoped>
.main
  padding-right: 286px
  max-width: 1400px
  margin: 0 auto

  &_mobile
    padding-right: 16px

  &__tagscard
    width: 100%
    position: static
    padding: 12px

    &_desktop
      padding: 0 16px
      position: fixed
      right: 0
      top: 66px
      z-index: 2
      height: 100%
      width: 270px
      border-top: none
      border-right: none
      border-bottom: none
      overflow: auto

  &__tags
    &_mobile
      display: flex
      overflow-x: auto
      overflow-y: hidden

  &__tag
    height: 40px
    padding: 0
    &_mobile
      padding: 0 4px

  &__tagitem
    width: 100%

  &__empty
    line-height: 1.2
    width: 100%

  &__sidebar
    max-height: 600px
    overflow: auto

  &__btn
    margin-top: 16px
</style>
