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
    v-list.main__tags(
      :class="{ 'main__tags_mobile': isMobile }"
      dense
    )
      v-list-item.main__tag(
        v-for="item, index in tags"
        :class="{ 'main__tag_mobile': isMobile }"
        :key="index"
      )
        v-checkbox.main__tagitem(
          v-model="selectedTags"
          :label="item.text"
          :value="item.id"
        )
    Transition
      v-btn(
        v-if="selectedTags.length"
        color="error"
        block
        outlined
        @click="clear"
      ) Сброс
  v-tabs-items.main__content(id="popular" v-model="activeTab")
    v-tab-item(id="popular")
      router-view
    v-tab-item(id="discussed")
      router-view
    v-tab-item(id="new")
      router-view
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

  selectedTags = [];

  tags = [
    {
      id: 0,
      text: 'Разработка',
    },
    {
      id: 1,
      text: 'Лекции',
    },
    {
      id: 2,
      text: 'Еда',
    },
    {
      id: 3,
      text: 'Автомобили',
    },
    {
      id: 4,
      text: 'Отдых',
    },
    {
      id: 5,
      text: 'Путешествия',
    },
    {
      id: 6,
      text: 'Сотрудники',
    },
  ];

  get isMobile() {
    return this.checkMobile.mobile;
  }

  get isDesktop() {
    return !this.isMobile;
  }

  clear() {
    this.selectedTags = [];
  }
}
</script>

<style lang="stylus" scoped>
.main
  padding-right: 216px
  &_mobile
    padding-right: 16px

  &__tagscard
    width: 100%
    position: static
    padding: 12px

    &_desktop
      padding: 0 16px
      position: absolute
      right: 0
      top: 0
      z-index: 2
      height: 100%
      width: 200px
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
</style>
