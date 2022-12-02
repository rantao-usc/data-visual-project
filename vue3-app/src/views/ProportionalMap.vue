<template>
  <div id="proportionalChart">
    <h1 class="mt-3">U.S. Electric vehicle counts</h1>

    <div class="info_proportional">The graph shown below is a proportional map, which shows the count for all the states in the US for the years 2016, 2018, 2019, 2021.</div>
    <!-- <h4 id="year"></h4> -->
    <!-- <div id="slider_2"></div> -->
    <svg width="500" height="300" id="proportional-count-2016"></svg>
    <svg width="500" height="300" id="proportional-count-2018"></svg>
    <h6 class="tab4">2016<span class="tab"></span>2018</h6>
    <svg width="500" height="300" id="proportional-count-2019"></svg>
    <svg width="500" height="300" id="proportional-count-2021"></svg>
    <h6 class="tab4">2019<span class="tab"></span>2021</h6>
  </div>
</template>

<script>

import * as d3 from 'd3';
import * as topojson from 'topojson-client'
export default {
name: 'proportionalChart',
mounted: function(){
    var promises = [];
    var states_file = 'maps_data/states-albers-10m.json';
    var ev_2016 = 'maps_data/ev_count_2016.csv';
    var ev_2018 = 'maps_data/ev_counts_2018.csv';
    var ev_2019 = 'maps_data/ev_count_2019.csv';
    var ev_2021 = 'maps_data/ev_count_2021.csv';

    promises.push(d3.json(states_file));
    promises.push(d3.csv(ev_2016));

    Promise.all(promises).then( data => {
    this.values = data;
    this.proportionalChart("#proportional-count-2016");
    });

    var promises = [];
    promises.push(d3.json(states_file));
    promises.push(d3.csv(ev_2019));

    Promise.all(promises).then( data => {
    this.values = data;
    this.proportionalChart("#proportional-count-2019");
    });

    var promises = [];
    promises.push(d3.json(states_file));
    promises.push(d3.csv(ev_2018));

    Promise.all(promises).then( data => {
    this.values = data;
    this.proportionalChart("#proportional-count-2018");
    });
    
    var promises = [];
    promises.push(d3.json(states_file));
    promises.push(d3.csv(ev_2021));

    Promise.all(promises).then( data => {
    this.values = data;
    this.proportionalChart("#proportional-count-2021");
    });
},
methods: {

proportionalChart(chart_id){
  var us = this.values[0];
  this.us = us
  var data = this.values[1];
  this.data = data

  var data_2019 = this.values[2];
  this.data_2019 = data_2019
  var format = d3.format(',.0f')

  // Cast data as correct data types
  this.data.forEach(function (d) {
    d.state = d.state
    d.year = +d.year
    d.emissions = +d.emissions
  })
  var states = topojson.feature(us, us.objects.states);
  
   var dataByStateByEVCounts = new Map(this.data.map((d1) => [d1.state, +d1.emissions]));

   //scaleSqrt is used to size the circles by area, as opposed to radius. Note quantile scale. 
  var radius = d3.scaleSqrt([0, d3.quantile([...dataByStateByEVCounts.values()].sort(d3.ascending), 0.985)], [0, 15]);
  // var radius = d3.scaleSqrt([0, 46100496], [0, 60]);
  // console.log(radius)
  console.log(chart_id)
  var svg = d3.select(chart_id)
  .attr('viewBox', [0, 0, 975, 790]);
  var path = d3.geoPath()
  //add the geopath for all the states
  svg.append('path')
      .datum(topojson.feature(us, us.objects.states))
      .attr('fill', '#ccc')
      .attr('d', path);
  //add the geopath for the borders of the states
svg.append('path')
  .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
  .attr('fill', 'none')
  .attr('stroke', 'white')
  .attr('stroke-linejoin', 'round')
  .attr('d', path);

//add the legend
const legend = svg.append('g')
  .attr('fill', '#777')
  .attr('transform', 'translate(925,608)')
  .attr('text-anchor', 'middle')
  .style('font', '10px sans-serif')
  .selectAll('g')
  .data([1e6, 5e6, 1e7])
  .join('g');
legend.append('circle')
  .attr('fill', 'none')
  .attr('stroke', '#ccc')
  .attr('cy', d => -radius(d))
  .attr('r', radius);

legend.append('text')
  .attr('y', d => -2 * radius(d))
  .attr('dy', '1.3em')
  .text(d3.format('.1s'));

// create and append the green circles for the proportional symbol map. 
var stateShapes = svg.append('g')
  .attr('fill', 'green')
  .attr('fill-opacity', 0.5)
  .attr('stroke', '#fff')
  .attr('stroke-width', 0.5)
  .selectAll('circle')
  .data(
    topojson.feature(us, us.objects.states)
    .features.map((d) => ((d.value = dataByStateByEVCounts.get(d.properties.name)), d)) //map the "ids" to the "value" 
  .sort((a, b) => b.value - a.value))
  .join('circle')
  .attr('transform', d => `translate(${path.centroid(d)})`)  //position circles at their respective feature centroid
  .attr('r', d => radius(d.value*3))
  .append('title')
  .text(d => `${d.properties.name} ${format(d.value)}`);

}
}
}
</script>

<style scoped>

#proportionalChart{
  margin: 0px 25px 25px 25px;
}
.tab {
          display: inline-block;
          margin-left: 500px;
      }

:deep(.info_proportional){
margin-bottom: 20px;
}
:deep(input) {
        display: block;
        width: 200px;
        margin: 10px 0px 0px 0px;
    }

:deep(.legend) {
position: relative;
left: 20px;
}

:deep(.axis path,.axis line) {
fill: none;
stroke: #000;
shape-rendering: crispEdges;
}

:deep(.x.axis path) {
display: none;
}

</style>