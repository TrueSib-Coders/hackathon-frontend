<template lang="pug">
.chart
  h2.chart__title Самые обсуждаемые теги
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
          data: [14, 52, 114, 33, 4, 6, 54, 145, 45],
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
