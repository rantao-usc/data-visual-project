<template>
    <div id="chloropethChart">
      <h1 class="mt-3">CO2 emission per State</h1>
  
      <div class="title">The graph shown below is a chloropleth map, Write something here about the map</div>
        <svg width="990" height="600" id="choropleth-co2"></svg>
    </div>
  </template>
  
  <script>
  
  import * as d3 from 'd3';
  import * as topojson from 'topojson-client'
  export default {
    name: 'chloropethChart',
    mounted: function(){
        console.log("mounted Map Chart component");

        var promises = [];
        var states_file = 'maps_data/states-albers-10m.json';
        var co2_file = 'maps_data/CO2_emissions_per_cap_2020.csv';

        promises.push(d3.json(states_file));
        promises.push(d3.csv(co2_file));

        Promise.all(promises).then( data => {
        this.values = data;
        this.chloropethChart();
    });
    },
    methods: {
    chloropethChart(){

    var us = this.values[0];
    this.us = us
    var data = this.values[1];
    this.data = data

    var states;
    states = new Map(us.objects.states.geometries.map(d => [d.id, d.properties]));

    var format = d => `${d}`

    var path = d3.geoPath()

    var color = d3.scaleQuantize([0, 100], d3.schemeBlues[8])  // Changed to 8 shades for our data

    data = Object.assign(new Map(data.map((d) => [d.State, +d.Emissions])));  // CO2 emissions per capita for each state
    data.title = "CO2 Emissions (per capita)"
    path = d3.geoPath()

    var svg = d3.select("#choropleth-co2")
      .attr("viewBox", [0, 0, 975, 610]);

    svg.append("g")
      .attr("transform", "translate(610,20)")
      .append(() => this.legend({ color, title: data.title, width: 260 }));

    svg.append("g")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .join("path")
      .attr("stroke", "grey")
      .attr("fill", d => color(data.get(d.properties.name)))
      .attr("d", path)
      .append("title")
      .text(d => `${d.properties.name}, ${format(data.get(d.properties.name).toFixed(1))}`);

    svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "grey")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
    
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
  