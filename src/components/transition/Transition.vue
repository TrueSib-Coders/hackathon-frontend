<template lang="pug">
  transition(
    name="transition-fade" mode="out-in"
  )
    slot
</template>

<script>
export default {
  name: 'transition-fade',
};
</script>

<style scoped lang="stylus">
.transition-fade-enter-active,
.transition-fade-leave-active
  transition: opacity .3s

.transition-fade-enter,
.transition-fade-leave-to
  opacity: 0

.transition-fade-enter-to,
.transition-fade-leave
  opacity: 1
</style>
