<template lang="pug">
.chart
  h2.chart__title Самые популярные теги
  Chart(
    :chartData="datacollection"
    :options="options"
  )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Chart from './chart.js';
import colors from '../colors.js';

export default
@Component({
  components: {
    Chart,
  },
})
class IdeasChart extends Vue {
  datacollection = {};

  options = {};

  mounted() {
    this.fillData();
  }

  fillData() {
    this.datacollection = {
      labels: [
        'Карты',
        'Кредиты',
        'Ипотека',
        'Вклады и инвестиции',
        'Премиум',
        'Private Banking',
        'Информация',
        'Отдых',
        'Другое',
      ],
      datasets: [
        {
          backgroundColor: [...colors],
          data: [2, 5, 11, 3, 1, 1, 5, 19, 9],
        },
      ],
    };
  }
}
</script>

<style lang="stylus" scoped>
.chart__title
  font-family: 'Proxima'
  text-align: center
</style>
