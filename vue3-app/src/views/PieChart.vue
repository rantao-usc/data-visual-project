<template>
    <div id="Piechart">
      <h1 class="mt-3">Transportation CO2 emission per State</h1>
        <svg id="pie-co2" width="975" height="700"></svg>
    </div>
  </template>

<script>
import * as d3 from "d3";
export default {
  name: "Piechart",
  mounted: function () {
    d3.json("co2_emissions_by_sector_2020.json").then((data) => {
      this.PieChart(data);
    });
  }, // mounted
  methods: {
    PieChart(data) {
    var width = 600,
    height = 600,
    margin = 100

const radius = Math.min(width, height) / 2 - margin

const svg3 = d3.select('#pie-co2')
    .append("svg")
    .attr('width', width)
    .attr('height', height)

var g = svg3.append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


const color3 = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])



const pie = d3.pie()
    .sort(null)
    .value(d => d.share)

const path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0)

const label = d3.arc()
    .outerRadius(0)
    .innerRadius(2 * radius + 100)

const label_val = d3.arc()
    .outerRadius(0)
    .innerRadius(radius)

var format = d => `${d}`

    var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc')

    arc.append('path')
        .attr('d', path)
        .attr('fill', d => color3(d.data.sector))

    arc.append('text')
        .attr('transform', d => 'translate(' + label.centroid(d) + ')')
        .attr('dy', '0.35em')
        .style('text-anchor', 'middle')
        .text(d => d.data.sector)

    arc.append('text')
        .attr('transform', d => 'translate(' + label_val.centroid(d) + ')')
        .attr('dy', '0.35em')
        .style('text-anchor', 'middle')
        .text(d => d.data.share)

    svg3.append('text')
        .attr('x', width / 2)
        .attr('y', 30)
        // .attr('class', 'chart-title')
        .style('font-weight', 'bold')
        .style('font-size', '18px')
        .attr('text-anchor', 'middle')
        .text('Pie Chart of CO2 Emissions By Economic Sector (2020)')



    }
}
};
</script>
<style scoped>
 #Piechart {
      margin: 0px 25px 25px 25px;
      padding: 10px
  }



</style>