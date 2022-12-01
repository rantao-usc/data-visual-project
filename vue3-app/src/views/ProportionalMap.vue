<template>
    <div id="proportionalChart">
      <h1 class="mt-3">U.S. Electric vehicle counts</h1>
  
      <div class="info_proportional">The graph shown below is a proportional map, which shows the count for all the states in the US for the year 2020</div>
      <h4 id="year"></h4>
      <div id="slider_2"></div>
      <svg width="990" height="600" id="proportional-count"></svg>
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
      var pop_file = 'maps_data/population.json';

      promises.push(d3.json(states_file));
      promises.push(d3.json(pop_file));

      Promise.all(promises).then( data => {
      this.values = data;
      this.proportionalChart();
  });
},
methods: {

proportionalChart(){
    var us = this.values[0];
    this.us = us
    var data = this.values[1];
    this.data = data
    var format = d3.format(',.0f')
    //create a map to use to map values to marks
    this.data = new Map(this.data.slice(1).map(([population, state]) => [state, +population]))
    console.log(this.data)
     //scaleSqrt is used to size the circles by area, as opposed to radius. Note quantile scale. 
    var radius = d3.scaleSqrt([0, d3.quantile([...this.data.values()].sort(d3.ascending), 0.985)], [0, 15]);
    var svg = d3.select('#proportional-count')
    .attr('viewBox', [0, 0, 975, 610]);
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

// create and append the red/brown circles for the proportional symbol map. 
svg.append('g')
    .attr('fill', 'green')
    .attr('fill-opacity', 0.5)
    .attr('stroke', '#fff')
    .attr('stroke-width', 0.5)
    .selectAll('circle')
    .data(topojson.feature(us, us.objects.states).features
      .map(d => (d.value = this.data.get(d.id), d))  //map the "ids" to the "value" 
      .sort((a, b) => b.value - a.value))
    .join('circle')
    .attr('transform', d => `translate(${path.centroid(d)})`)  //position circles at their respective feature centroid
    .attr('r', d => radius(d.value))
    .append('title')
    .text(d => `${d.properties.name} ${format(d.value)}`);

  //Implement slider
  var slider_input = d3.select("#slider_2")
      .append("input")
      .attr("type", "range")
      .attr("min", 1970)
      .attr("max", 2020)
      .attr("step", 1)
      .style('width', '300px')
      .on("input", function () {
        // var year = +this.value;  // make sure is a number as thats what it is expecting
        // update(year);
      });

    }
}
}
</script>