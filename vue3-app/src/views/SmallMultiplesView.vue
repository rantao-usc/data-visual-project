<template>
  <div class="smallmultiples">

    <div v-if="!store.planetsMulti">Loading datasets...</div>
    <div v-else>
      <h1 class="mt-4 green">Small Multiples with Chart Component</h1>

      <h3>Bar chart</h3>

      <BarChart
        class="mb-2"
        :data="store.planetsMulti[0]" 
        title="Dataset 0: Top 10 COVID-19 confirmed in US, Aug 31 2020"
      />

      <h3 class="mt-3">Bar charts</h3>

      <BarChart v-for="(item, index) in store.planetsMulti" :key="'chart' + index" 
        class="mb-2"
        :data="item"
        :title="`Dataset ${index} Top 10 COVID-19 confirmed in US, Aug 31 2020`"
      />

      <!-- <h2 class="mt-4">Data</h2>

      {{message}} -->
      
      <!-- <div v-for="(item, index) in store.planetsMulti" :key="'code' + index"> 
        <div>Dataset {{index}} with {{item.length}} records</div>
        
        <pre><code>{{item}}</code></pre>
      </div> -->

    </div>

  </div>
</template>

<script setup>
import BarChart from '..//components/BarChart.vue';
import { ref, onMounted } from 'vue';
import { useChartStore } from '../stores/useChartStore';
import * as d3 from 'd3';

const store = useChartStore();
const message = ref('Data was set from store');

onMounted(() => {
  if (!store.planetsMulti) {
    var promises = [];
    promises.push(d3.json('covid-19-confirmed-083120.json'));
    promises.push(d3.json('covid-19-confirmed-083120.json'));
    promises.push(d3.json('covid-19-confirmed-083120.json'));
    promises.push(d3.json('covid-19-confirmed-083120.json'));
    promises.push(d3.json('covid-19-confirmed-083120.json'));

    Promise.all(promises).then(result => {
      store.planetsMulti = result;
      message.value = `Data was loaded from file, contains ${store.planetsMulti.length} records`;
    });
  }
});
</script>

<style scoped>
pre {
  border: hsla(160, 100%, 37%, 1) 2px solid;
  background-color: white;
}
</style>
