<template lang="pug">
.chart
  h2.chart__title История активности
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

  options = {
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Месяц',
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Количество рейтинга в месяц',
          },
        },
      ],
    },
  };

  mounted() {
    this.fillData();
  }

  fillData() {
    this.datacollection = {
      labels: ['Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
      datasets: [
        {
          label: 'Байкалов И. С.',
          backgroundColor: colors[10],
          borderColor: colors[10],
          fill: false,
          data: [98, 15, 54, 100, 85, 11],
        },
        {
          label: 'Соколовский Н. В.',
          backgroundColor: colors[11],
          borderColor: colors[11],
          fill: false,
          data: [23, 54, 56, 114, 37, 98],
        },
        {
          label: 'Фабричкина М. О.',
          backgroundColor: colors[12],
          borderColor: colors[12],
          fill: false,
          data: [15, 66, 52, 96, 117, 100],
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
