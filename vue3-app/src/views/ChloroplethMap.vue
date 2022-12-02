<template>
    <div id="chloropethChart">
      <h1 class="mt-3">U.S. Transportation CO2 Emissions</h1>
  
      <div class="info_chloro">The graph shown below is a chloropleth map, which shows the transportation CO2 emissions for the years 1970 to 2020. Play with the slider to see the change over this time.</div>
      <h4 id="year"></h4>
      <!-- <div class="tooltip" style="opacity: 0; text-align:left;"></div> -->
      <div id="slider"></div>
      <svg width="990" height="600" id="choropleth-co2"></svg>
    </div>
  </template>
  
  <script>
  
  import * as d3 from 'd3';
  import * as topojson from 'topojson-client'
  export default {
    name: 'chloropethChart',
    mounted: function(){
        var promises = [];
        var states_file = 'maps_data/states-albers-10m.json';
        var co2_file = 'maps_data/transportation_co2_unpivoted.csv';

        promises.push(d3.json(states_file));
        promises.push(d3.csv(co2_file));

        Promise.all(promises).then( data => {
        this.values = data;
        this.chloropethChart();
    });
    },
    methods: {
    chloropethChart(){

  // Choropleth implementation 
  var margin = { top: 20, right: 20, bottom: 20, left: 20 };
  var width = 1000 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom,
  formatPercent = d3.format(".1%");

  var svg = d3.select("#choropleth-co2")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Create tooltip
// var tooltip = d3.select("body")
//   .append("div")
//   .attr("class", "tooltip")
//   .style("opacity", 0);


// CO2 per capita --> min: 3.5, max: 131.2
// CO2 raw --> min: 2.4, max: 684.7
// CO2 transportation --> min: 0.9, max: 235.7

var color = d3.scaleQuantize([0.9, 235.7], d3.schemeReds[8])// Changed to 8 shades for our data


svg.append("g")
  .attr("transform", "translate(610,20)")
  .append(() => this.legend({ color, title: 'CO2 Emissions (millions of metric tons)', width: 260, tickFormat: d3.format(".1f") }));
  // var div = d3.select(".tooltip");

    var us = this.values[0];
    this.us = us
    var data = this.values[1];
    this.data = data

      // Geometries associated with states
  var states = topojson.feature(us, us.objects.states);


    // Cast data as correct data types
    this.data.forEach(function (d) {
      d.state = d.state
      d.year = +d.year
      d.emissions = +d.emissions
    })
    console.log(this.data)

    // Group by state and year
    var dataByStateByYear = d3.group(this.data, d => d.state, d => d.year)

    // Add a property corresponding to each states data for all years
    states.features.forEach(function (state) {
      state.properties.years = dataByStateByYear.get(state.properties.name)
    });


    // Path -- already in geoAlbers()
    var path = d3.geoPath()

    // Draw map
    var stateShapes = svg.selectAll(".state")
      .data(states.features)
      .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', path)
    // updates for vue
    d3.selectAll(".state")
          .append('title')

    // Tooltip functionality
    // stateShapes
    //   .on("mouseover", function (d) {
    //     tooltip.transition()
    //       .duration(250)
    //       .style("opacity", 1);


    //     tooltip.html(
    //       "<p><strong>" + d.path[0].__data__.properties.years.get(1970)[0].state + "</strong></p>" +
    //       "<table><tbody><tr><td class='wide'>Transportation CO2 Emissions in 1970:&nbsp</td> <td>" + d.path[0].__data__.properties.years.get(1970)[0].emissions + "</td></tr>" +
    //       "<tr><td>Transportation CO2 Emissions in 2020:&nbsp</td><td>" + d.path[0].__data__.properties.years.get(2020)[0].emissions + "</td></tr>" +
    //       "<tr><td>Change:</td><td>" + formatPercent((d.path[0].__data__.properties.years.get(2020)[0].emissions - d.path[0].__data__.properties.years.get(1970)[0].emissions) / 100) + "</td></tr></tbody></table>"
    //     )
    //       .style("left", (d.pageX + 50) + "px")
    //       .style("top", (d.pageY - 20) + "px");
    //         })
    //     .on("mouseout", function (d) {
    //       tooltip.transition()
    //         .duration(250)
    //         .style("opacity", 0);
    //     });


      // Draw state boundaries
      svg.append("path")
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-linejoin", "round")
        .attr("d", path);

      

      // Update choropleth based on year selected by slider
      function update(year) {
        slider_input.property("value", year);
        d3.select("#year").text(year);
        stateShapes.style("fill", function (d) {
          return color(d.properties.years.get(year)[0].emissions)
        })
        // updates to include
      .selectAll("title")
      .text(d => `${d.properties.name} (${year}) - ${d.properties.years.get(year)[0].emissions}`)
      }

    // Slider implementation
    var slider_input = d3.select("#slider")
      .append("input")
      .attr("type", "range")
      .attr("min", 1970)
      .attr("max", 2020)
      .attr("step", 1)
      .style('width', '300px')
      .on("input", function () {
        var year = +this.value;  // make sure is a number as thats what it is expecting
        update(year);
      });
      

    // Initialize chart to be 1970
    update(1970);
    },
    legend({
        color,
        title,
        tickSize = 6,
        width = 320,
        height = 44 + tickSize,
        marginTop = 18,
        marginRight = 0,
        marginBottom = 16 + tickSize,
        marginLeft = 0,
        ticks = width / 64,
        tickFormat,
        tickValues
    } = {}) 
    {

    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible")
      .style("display", "block");

    let x;

    if (color.interpolator) {
      x = Object.assign(color.copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
        { range() { return [marginLeft, width - marginRight]; } });

      svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.interpolator()).toDataURL());

      if (!x.ticks) {
        if (tickValues === undefined) {
          const n = Math.round(ticks + 1);
          tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
        }
        if (typeof tickFormat !== "function") {
          tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
        }
      }
    }

    else if (color.invertExtent) {
      const thresholds
        = color.thresholds ? color.thresholds() // scaleQuantize
          : color.quantiles ? color.quantiles() // scaleQuantile
            : color.domain(); // scaleThreshold

      const thresholdFormat
        = tickFormat === undefined ? d => d
          : typeof tickFormat === "string" ? d3.format(tickFormat)
            : tickFormat;

      x = d3.scaleLinear()
        .domain([-1, color.range().length - 1])
        .rangeRound([marginLeft, width - marginRight]);

      svg.append("g")
        .selectAll("rect")
        .data(color.range())
        .join("rect")
        .attr("x", (d, i) => x(i - 1))
        .attr("y", marginTop)
        .attr("width", (d, i) => x(i) - x(i - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", d => d);

      tickValues = d3.range(thresholds.length);
      tickFormat = i => thresholdFormat(thresholds[i], i);
    }

        svg.append("g")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(d3.axisBottom(x)
            .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
            .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
            .tickSize(tickSize)
            .tickValues(tickValues))
        .call(g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("y", marginTop + marginBottom - height - 6)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(title));

        return svg.node();
        },
    ramp(color, n = 256) {
    const canvas = DOM.canvas(n, 1);
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
    }

  },
  
  };
  </script>
  
  <!-- "scoped" attribute limits CSS to this component only -->
  <style scoped>
  
  #chloropethChart{
      margin: 0px 25px 25px 25px;
      padding: 10px
  }

  :deep(.info_chloro){
    margin-bottom: 20px;
  }
  :deep(input) {
            display: block;
            width: 200px;
            margin: 10px 0px 0px 0px;
        }
  :deep(div.tooltip) {	
    position: absolute;			
    text-align: center;			
    width: 275px;					
    height: 125px;					
    padding: 2px;				
    font: 12px sans-serif;		
    background: rgb(204, 224, 250, 0.5);
    border: 0px;		
    border-radius: 8px;			
    pointer-events: none;			
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
  