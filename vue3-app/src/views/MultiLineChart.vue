<template>
    <div class="d3multiline">
  
      <!-- <div>Here is the data: {{JSON.stringify(d3ChartData)}}</div> -->
  
      <!-- <div class="title">Unemployment, total (% of total labor force) for 2020 for 20 countries</div> -->
      <svg width="550" height="300" id="multi-line"></svg>
  
    </div>
  </template>
  
  <script>
  
  import * as d3 from 'd3';
  
  export default {
    name: 'd3multiline',
    mounted: function () {
      d3.csv("multi-line-data.csv", function(d){
        var parseTime = d3.timeParse("%Y-%m-%d")
        return{
              Date_pass : parseTime(d.Date),
              Gasoline : +d.Gasoline,
              Propane : +d.Propane,
              Diesel : +d.Diesel,
              Electricity : +d.Electricity
          }
      }).then(data =>  {
          this.multiLineGraph(data)
      });
    },
    methods: {
      multiLineGraph(data) {
    console.log(data);
   
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the Date / time
var parseTime = d3.timeParse("%Y-%m-%d"),
    formatDate = d3.timeFormat("%Y-%m"),
    bisectDate = d3.bisector(function(d) { return d.Date; }).left;

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the 1st line
var valueline = d3.line()
    .x(function(d) { return console.log(x(d.Date_pass)) })
    .y(function(d) { return y(d.Gasoline); });

// define the 2nd line
var valueline2 = d3.line()
    .x(function(d) { return x(d.Date_pass); })
    .y(function(d) { return y(d.Propane); });

// define the 2nd line
var valueline3 = d3.line()
    .x(function(d) { return x(d.Date_pass); })
    .y(function(d) { return y(d.Diesel); });

// define the 2nd line
var valueline4 = d3.line()
    .x(function(d) { return x(d.Date_pass); })
    .y(function(d) { return y(d.Electricity); });


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#multi-line")
.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var axisPad = 6 // axis formatting
var R = 6 //legend marker

var category = ["Gasoline", "Propane", "Diesel", "Electricity"]
// since Category B and E are really close to each other, assign them diverging colors
var color = d3.scaleOrdinal()
            .domain(category)
            .range(["#D73027", "#2166AC", "#5AB4AC", "#1B7837"])

var svgLegend = svg.append("g")
                    .attr("class", "gLegend")
                    .attr("transform", "translate(" + (width - 120) + "," + 0 + ")")

var legend = svgLegend.selectAll(".legend")
                        .data(category)
                        .enter()
                        .append("g")
                        .attr("class", "legend")
                        .attr("transform", function(d, i) {return "translate(0," + i * 20 + ")"})

  x.domain(d3.extent(data, function(d) { return d.Date_pass; }));
  y.domain([0, d3.max(data, function(d) {
	  return Math.max(d.Gasoline, d.E85, d.CNG, d.Propane, d.Diesel, d.B20, d.B99_B100, d.Electricity); })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "#D73027")
      .attr("stroke-width", "3px")
      .attr("d", valueline);        

  // Add the valueline2 path.
  svg.append("path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "#2166AC")
      .attr("stroke-width", "3px")
      .attr("d", valueline2);

  svg.append("path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "#5AB4AC")
      .attr("stroke-width", "3px")
      .attr("d", valueline3);

  svg.append("path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "#1B7837")
      .attr("stroke-width", "3px")
      .attr("d", valueline4);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("x", 80)
      .attr("y", -4)
      .attr("font-size", 12)
      .attr("fill", "#000000")
      .text("Average Fuel Prices ($)");


    legend.append("circle")
            .attr("class", "legend-node")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", R)
            .style("fill", d=>color(d))


    legend.append("text")
        .attr("class", "legend-text")
        .attr("x", R*2)
        .attr("y", R/2)
        .style("fill", "#00000")
        .style("font-size", 12)
        .text(d=>d)
    },
  }
}
  </script>
  
  <!-- "scoped" attribute limits CSS to this component only -->
  <style scoped>
  
  :deep(text.label) {  /* need to add :to gets passed to d3 because vue creates new mapping */
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
  
  :deep(rect.bar_2) {
    text-align: right;  /* pull value text to the end of the bar */
    vertical-align: middle;  /* align value text with middle of the bar */
    fill:#7abcff; /* bar height, this can stay fixed */
  }
  
  .title {
    margin-bottom: 0px;
    font-size: 12px;
  }
  </style>
  