<template>
    <div id="ZoomableCirclePacking">
      <h1 class="mt-3">Electricity Source per State</h1>
  
      <div class="title">The graph shown below is a zoommable circle packing chart, click on a state to see what electricity sources they are using.</div>
        <svg width="990" height="600" id="circle_packing"></svg>
    </div>
  </template>
  
  <script>
  
  import * as d3 from 'd3';
  
  export default {
    name: 'ZoomableCirclePacking',
    mounted: function(){
    d3.json("electricity_per_state/bubble.json").then(data => {
            this.circlePacking(data)
        });
    },
    methods: {
        circlePacking(data){
    function BubbleChart(data){

        let width = 930;
        let height = width;
        let bold = true;
        let black = false;
        let shadow = true;
        let multicolor = true;
        let hexcolor = "#0099cc";

        const root =  d3.pack()
        .size([width, height])
        .padding(3)
        (d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value));

        // const color = d3.scaleLinear()
        // .domain([0, 5])
        // .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        // .interpolate(d3.interpolateHcl);
        const color = setColorScheme(multicolor);

        const format = d3.format(",d");

        function setColorScheme(multi){
            if (multi) {
            let color = d3.scaleOrdinal()
                .range(d3.schemeCategory10)
            return color;
            }
        }

        function setCircleColor(obj) {
            let depth = obj.depth;
            while (obj.depth > 1) {
            obj = obj.parent;
            }
            let newcolor = multicolor ? d3.hsl(color(obj.data.name)) : d3.hsl(hexcolor);
            newcolor.l += depth == 1 ? 0 : depth * .1;
            return newcolor;
        }

        function setStrokeColor(obj) {
            let depth = obj.depth;
            while (obj.depth > 1) {
            obj = obj.parent;
            }
            let strokecolor = multicolor ? d3.hsl(color(obj.data.name)) : d3.hsl(hexcolor);
            return strokecolor;
        }

        let fontsize = d3.scaleOrdinal()
        .domain([1,3])
        .range([24,16]);

        let focus = root;
        let view;

        const svg = d3
            .select("#circle_packing")
            .append("svg")
            .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
            .style("display", "block")
            .style("margin", "0 -14px")
            .style("background", color(0))
            .style("cursor", "pointer")
            .on("click", (event) => zoom(event, root));

        const node = svg.append("g")
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
            .attr("fill", setCircleColor)
            .attr("stroke", setStrokeColor)
            .attr("pointer-events", d => !d.children ? "none" : null)
            .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
            .on("mouseout", function() { d3.select(this).attr("stroke", null); })
            .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

        const label = svg.append("g")
            .style("font", "18px sans-serif")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
            .style("fill-opacity", d => d.parent === root ? 1 : 0)
            .style("display", d => d.parent === root ? "inline" : "none")
            .text(d => d.data.name);

        zoomTo([root.x, root.y, root.r * 2]);

        function zoomTo(v) {
        const k = width / v[2];

        view = v;

        label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
        }

        function zoom(event, d) {
        const focus0 = focus;

        focus = d;

        const transition = svg.transition()
            .duration(event.altKey ? 7500 : 750)
            .tween("zoom", d => {
                const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                return t => zoomTo(i(t));
            });

        label
            .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
            .transition(transition)
            .style("fill-opacity", d => d.parent === focus ? 1 : 0)
            .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
        }

        return svg.node();
    }
    
    BubbleChart(data)
  
  },
  },
  
  };
  </script>
  
  <!-- "scoped" attribute limits CSS to this component only -->
  <style scoped>
  
  #ZoomableCirclePacking {
      margin: 0px 25px 25px 25px;
      padding: 10px
  }
  
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
  