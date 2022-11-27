<template>
  <div class="d3ChartComp">

    <h1 class="mt-3">D3 Chart Composition API</h1>

    <div class="title">Top 10 COVID-19 confirmed in US, Aug 31 2020 (source Johns Hopkins University)</div>
    <svg width="400" height="300" id="chart"></svg>

    <h2>Data</h2>
    {{message}}
    <pre><code>{{store.planets}}</code></pre>

  </div>
</template>

<script setup>
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useChartStore } from '../stores/useChartStore'

const store = useChartStore();
const message = ref('Data was set from store');

function barChart() {
  var svg = d3.select('#chart');
  var enter = svg.selectAll('rect')
    .data(store.planets)
    .enter();

  enter.append('rect')
    .attr('x', 100)
    .attr('y', (d, i) => 20 + i * 25)
    .attr('width', d => d.dist / 25)
    .attr('class', 'bar');

  enter.append('text')
    .attr('x', 90)
    .attr('y', (d, i) => 30 + i * 25)
    .attr('class', 'label')
    .text(d => d.label);

  enter.append('text')
    .attr('x', d => 150 + d.dist / 25)
    .attr('y', (d, i) => 30 + i * 25)
    .attr('class', 'value')
    .text(d => Number(d.dist).toLocaleString());
}

onMounted(() => {
  if (!store.planets) {
    d3.json('planets.json').then(result => {
      store.planets = result;
      message.value = `Data was loaded from file, contains ${store.planets.length} rows`;
      barChart();
    });
  } else {
    barChart();
  }
});
</script>

<style scoped>
.title {
  font-size: 1vw;
  color:hsla(160, 100%, 37%, 1);
}

pre {
  border: hsla(160, 100%, 37%, 1) 2px solid;
}

:deep(text.label) {
  text-anchor: end;
  alignment-baseline: middle;
  font-size: 12px;
  fill: black;
}

:deep(text.value) {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  font-size: 12px;
  text-anchor: end;
  alignment-baseline: middle;
  fill: #eee;
}

:deep(rect.bar) {
  text-align: right;
  vertical-align: middle;
  fill:hsla(160, 100%, 37%, 1);
  height: 20px;
}
</style>
