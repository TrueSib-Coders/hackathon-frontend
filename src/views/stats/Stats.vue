<template lang="pug">
.stat
  .stat__dep
    StatDepartments
  .stat__users
    StatUsers
  .stat__ideas
    StatActivity
  .stat__all
    StatComments
  .stat__graph
    StatIdeas
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import StatDepartments from './departments';
import StatIdeas from './ideas';
import StatComments from './comments';
import StatUsers from './users';
import StatActivity from './activity';

export default
@Component({
  components: {
    StatDepartments,
    StatIdeas,
    StatUsers,
    StatComments,
    StatActivity,
  },
})
class Stat extends Vue {
  mounted() {
    this.$store.dispatch('loadTop');
  }
}
</script>

<style lang="stylus" scoped>
.stat
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  grid-template-rows: 1fr 1fr 1fr

  > *
    border-radius: 4px
    background: white
    padding: 8px

  &__dep
    grid-area: 1 / 1 / 3 / 3
    margin-bottom: 20px
    margin-right: 20px

  &__users
    grid-area: 1 / 3 / 3 / 4
    margin-bottom: 20px

  &__ideas
    grid-area: 3 / 1 / 4 / 2
    margin-right: 20px

  &__all
    grid-area: 3 / 2 / 4 / 3
    margin-right: 20px

  &__graph
    grid-area: 3 / 3 / 4 / 4
</style>
