<template>
  <div id="stacked_bar_chart">
    <h1 class="mt-3">D3 Chart Options API</h1>

    <div class="title">Top 10 COVID-19 confirmed in US, Aug 31 2020 (source Johns Hopkins University)</div>
      <svg width="990" height="600" id="chart_1"></svg>
  </div>
</template>

<script>

import * as d3 from 'd3';

export default {
  name: 'StackedBarChart',
  mounted: function(){
  d3.csv("vehicle_inv.csv", function(data){
      return {
          Date: data.Date,
          LNG: +data.LNG,
          Electricity: +data.Electricity,
          E85: +data.E85,
          Biodiesel: +data.Biodiesel
      }
      }).then(data =>  {
          this.stackBar(data)
      });
  },
  methods: {
    stackBar(data){
    // console.log("call stack bar chart");
    // console.log(data);

  function StackedBarChart(
  data, 
  {
  x = (d, i) => i, // given d in data, returns the (ordinal) x-value
  y = d => d, // given d in data, returns the (quantitative) y-value
  z = () => 1, // given d in data, returns the (categorical) z-value
  title, // given d in data, returns the title text
  marginTop = 30, // top margin, in pixels
  marginRight = 0, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 60, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  xDomain, // array of x-values
  xRange = [marginLeft, width - marginRight], // [left, right]
  xPadding = 0.1, // amount of x-range to reserve to separate bars
  yType = d3.scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop], // [bottom, top]
  zDomain, // array of z-values
  offset = d3.stackOffsetDiverging, // stack offset method
  order = d3.stackOrderNone, // stack order method
  yFormat, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  colors = d3.schemeTableau10, // array of colors
} = {}) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const Z = d3.map(data, z);


  // Compute default x- and z-domains, and unique them.
  if (xDomain === undefined) xDomain = X;
  if (zDomain === undefined) zDomain = Z;
  xDomain = new d3.InternSet(xDomain);
  zDomain = new d3.InternSet(zDomain);
  // console.log(zDomain);
  // Omit any data not present in the x- and z-domains.
  const I = d3.range(X.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));

  // Compute a nested array of series where each series is [[y1, y2], [y1, y2],
  // [y1, y2], …] representing the y-extent of each stacked rect. In addition,
  // each tuple has an i (index) property so that we can refer back to the
  // original data point (data[i]). This code assumes that there is only one
  // data point for a given unique x- and z-value.
  const series = d3.stack()
      .keys(zDomain)
      .value(([x, I], z) => Y[I.get(z)])
      .order(order)
      .offset(offset)
    (d3.rollup(I, ([i]) => i, i => X[i], i => Z[i]))
    .map(s => s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})));

  // Compute the default y-domain. Note: diverging stacks can be negative.
  if (yDomain === undefined) yDomain = d3.extent(series.flat(2));

  // Construct scales, axes, and formats.
  const xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
  const yScale = yType(yDomain, yRange);
  const color = d3.scaleOrdinal(zDomain, colors);
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);

  // Compute titles.
  if (title === undefined) {
    const formatValue = yScale.tickFormat(100, yFormat);
    title = i => `${X[i]}\n${Z[i]}\n${formatValue(Y[i])}`;
  } else {
    const O = d3.map(data, d => d);
    const T = title;
    title = i => T(O[i], i, data);
  }

  const svg = d3
      .select("#chart_1")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .attr('font-size', 12)
          .text(yLabel));

  const bar = svg.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
      .attr("fill", ([{i}]) => color(Z[i]))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", ({i}) => xScale(X[i]))
      .attr("y", ([y1, y2]) => Math.min(yScale(y1), yScale(y2)))
      .attr("height", ([y1, y2]) => Math.abs(yScale(y1) - yScale(y2)))
      .attr("width", xScale.bandwidth());

  if (title) bar.append("title")
      .text(({i}) => title(i));

  svg.append("g")
      .attr("transform", `translate(0,${yScale(0)})`)
      .call(xAxis);

var category_legend = ["LNG","Electricity","E85","Biodiesel"]
var legend = svg.append('g')
              .attr('class', 'legend')
              .attr('transform', 'translate(' + (xPadding) + ', 0)');

          legend.selectAll('rect')
              .data(series)
              .enter()
              .append('rect')
              .attr('x', "660px")
              .attr('y', function(d, i){
                  return i * 20;
              })
              .attr('width', 12)
              .attr('height', 12)
              .attr("fill", ([{i}]) => color(Z[i]));
          
          legend.selectAll('text')
              .data(category_legend)
              .enter()
              .append('text')
              .text(function(d){
                  return d;
              })
              .attr('x', "690px")
              .attr('y', function(d, i){
                  return i * 20;
              })
              .attr('text-anchor', 'start')
              .attr('alignment-baseline', 'hanging');

  return Object.assign(svg.node(), {scales: {color}});
} // end of stack bar chart

var category = ["LNG","Electricity","E85","Biodiesel"]
var cnt_category = category.flatMap(c => data.map(d => ({year: d.Date, c, count: d[c]})))
StackedBarChart(cnt_category, {
x: d => d.year,
y: d => d.count,
z: d => d.c,
yLabel: "↑ Vehicles (thousands)",
zDomain: category,
colors: d3.schemeSpectral[category.length],
width: 760,
height: 500
})
},
},

};
</script>

<!-- "scoped" attribute limits CSS to this component only -->
<style scoped>

/* body {
    margin: 20px 25px 25px 25px;
    padding: 10px
} */

/* #bar-chart {
  display: block;
  margin: auto;
} */

/* #multi-line {
  display: block;
  margin: auto;
} */

.legend {
  position: relative;
  left: 20px;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.x.axis path {
  display: none;
}

/* .focus circle {
    fill: steelblue;
    stroke: steelblue;
  } */

/* svg {
  width: 960px;
  height:500px; 
  background-color:whitesmoke;
} */
</style>
