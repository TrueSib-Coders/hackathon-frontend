<template lang="pug">
.chart
  h2.chart__title Статистика отделов
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
class DepChart extends Vue {
  datacollection = {};

  options = {
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  mounted() {
    this.fillData();
  }

  fillData() {
    this.datacollection = {
      labels: [
        'Отдел кадров',
        'Юридический отдел',
        'Отдел автоматизации',
        'Ревизионный отдел',
        'Административный отдел',
        'Отдел кредитов',
        'Бухгалтерия',
      ],
      datasets: [
        {
          label: 'Рейтинг за оценки',
          backgroundColor: colors[7],
          data: [50, 34, 22, 39, 23, 11, 87],
          stack: 1,
        },
        {
          label: 'Рейтинг за обсуждения',
          backgroundColor: colors[8],
          data: [104, 203, 68, 120, 43, 23, 167],
          stack: 1,
        },
        {
          label: 'Рейтинг за идеи',
          backgroundColor: colors[6],
          data: [201, 111, 33, 12, 80, 50, 224],
          stack: 1,
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
