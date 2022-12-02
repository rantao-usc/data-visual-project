<template>
    <div class="d3multiline">
  
      <h1 class="mt-3">Average Retail Fuel Prices</h1>
      <div class="info_multi">The graph shown below is a Multi-Line Chart, click on one of the fuel types to see how the Average Fuel Price changes over time.</div>
      <select id="selectButton"></select>
      <svg width="960" height="480" id="multi-line"></svg>
  
    </div>
  </template>
  
  <script>
  
  import * as d3 from 'd3';
  
  export default {
    name: 'd3multiline',
    mounted: function () {
      d3.csv("avg_retail_prices/multi-line-data.csv").then((data) => {
      this.multiLineGraph(data);
    });
    },
    methods: {
      multiLineGraph(data) {
    // console.log(data);
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 40, left: 60},
        width = 960 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%Y-%m-%d");

    var svg_line = d3.select("#multi-line")
                        .append("svg")
                        .attr("width", width + margin.left - margin.right)
                        .attr("height", height + margin.top + margin.bottom);

    var g = svg_line.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    data.forEach(function (d) {
      d.date = parseTime(d.Date),
      d.gasoline= +d.Gasoline,
      d.propane= +d.Propane,
      d.diesel = +d.Diesel,
      d.electricity = +d.Electricity
    })


  // set the ranges
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);
  var fuel_idx_dict = {"gasoline": 0, "propane": 1, "diesel": 2, "electricity": 3};
      var fuel_types = Object.keys(fuel_idx_dict);

      d3.select("#selectButton")
          .selectAll('myOptions')
          .data(fuel_types)
          .enter()
          .append('option')
          .text(function(d){return d.charAt(0).toUpperCase() + d.slice(1);})
          .attr("value", function(d){return d;})
      
      var myColor = d3.scaleOrdinal()
                          .domain(fuel_types)
                          .range(d3.schemeSet2);

      var fuel_data = fuel_types.map(function(k){
          return {
              id: k,
              values: data.map(function(d){
                  return {
                      date: d.date,
                      price: d[k]
                  };
              })
          };
      });

      x.domain(d3.extent(data, d => {
          return d.date;
      }));
      y.domain([
          d3.min(fuel_data, c => {
              return d3.min(c.values, d => {
                  return d.price;
              });
          }),
          d3.max(fuel_data, c => {
              return d3.max(c.values, d => {
                  return d.price;
              });
          })
      ]);
      
      // append xaxis grid
      g.append("g")
      .attr("class", "x axis-grid")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(-height).tickFormat('').ticks(10));

      g.append("g")
      .attr("class", "y axis-grid")
      .call(d3.axisLeft(y).tickSize(-width).tickFormat('').ticks(10));

      // append x axis
      g.append("g")
          .attr("class", "axis axis-x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .append("text")
          .attr("y", 20)
          .attr("x", width/2)
          .attr("dy", "0.9em")
          .attr("fill", "#000")
          .attr("font-size", "12px")
          .text("Year")
          .append("text")
          .attr("y", 20)
          .attr("x", 310)
          .attr("dy", "0.9em")
          .attr("fill", "#000");
      
      //append y axis
      g.append("g")
          .attr("class", "axis axis-y")
          .call(d3.axisLeft(y))
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -50)
          .attr("x", -125)
          .attr("dy", "0.9em")
          .attr("fill", "#000")
          .text("Average Fuel Price ($)");
      


      // Initialize line with group a
      var line = g.append("g")
                  .append("path")
                  .datum(fuel_data[fuel_idx_dict["gasoline"]].values)
                  .attr("d", d3.line()
                  .x(function(d) { return x(d.date) })
                  .y(function(d) { return y(d.price) })
          )
          .attr("stroke", function(d){ return myColor("gasoline") })
          .style("stroke-width", 3)
          .style("fill", "none");
      // // A function that update the chart
      function update(selectedGroup) {

      //   Create new data with the selection?
      const dataFilter = fuel_data[fuel_idx_dict[selectedGroup]].values;

        // Give these new data to update line
      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.price) })
          )
          .attr("stroke", function(d){ return myColor(selectedGroup) })
      }

      // When the button is changed, run the updateChart function
      d3.select("#selectButton").on("change", function(event,d) {
          // recover the option that has been chosen
          const selectedOption = d3.select(this).property("value")
          // run the updateChart function with this selected option
          update(selectedOption)
      })

   
  }
}
  }
  </script>
  
  <!-- "scoped" attribute limits CSS to this component only -->
  <style scoped>
.d3multiline {
      margin: 0px 25px 25px 25px;
      padding: 10px
  }
  .info_multi {
      margin: 10px;
  }

  :deep(#multi-line) {
  display: block;
  margin: auto;
}

:deep(.axis-x path) {
  stroke: #000;
}

:deep(select) {
  width: 120px;
  padding: 0 1em 0 0;
  border: 1px solid var(--dark);
  border-color: black;
  border-radius: 0.25em;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
}

:deep(.axis-grid line) {
  stroke: rgb(187, 213, 238);
}

:deep(text) {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 13px;
}

:deep(.center) {
  text-align: center;
}

:deep(.x.axis path) {
  display: none;
}

  </style>
  