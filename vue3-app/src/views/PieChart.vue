<template>
    <div id="Piechart">
        <h1 class="mt-3">CO2 Emissions by Sector by State</h1>
        <p>Click on one of the states to view the CO2 emissions broken down by sector.</p>
        <select id="selectButton"></select>

        <div id="pie-co2"></div>
    </div>
  </template>

<script>
import * as d3 from "d3";
export default {
  name: "Piechart",
  mounted: function () {
    d3.csv('CO2_emissions_by_sector.csv', d => {
        return {
            state: d.state,
            sector: d.sector,
            share: +d.share
        }
    }).then(data => {
        this.PieChart(data)
    })
}
  , // mounted
  methods: {
    PieChart(data) {
    var width = 600,
    height = 600,
    margin = 100

    var format = d => `${d}`

const radius = Math.min(width, height) / 2 - margin

const svg_pie = d3.select('#pie-co2')
    .append("svg")
    .attr('width', width)
    .attr('height', height)

var g = svg_pie.append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


const color2 = d3.scaleOrdinal()
    .domain(['Commercial', 'Electric Power', 'Residential', 'Industrial', 'Transportation'])
    .range(d3.schemeSet2)

const path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0)

var state_idx_dict = {
        "Total": 51, "Alabama": 0, "Alaska": 1, "Arizona": 2, "Arkansas": 3, "California": 4, "Colorado": 5,
        "Connecticut": 6, "Delaware": 7, "District of Columbia": 8, "Florida": 9, "Georgia": 10,
        "Hawaii": 11, "Idaho": 12, "Illinois": 13, "Indiana": 14, "Iowa": 15,
        "Kansas": 16, "Kentucky": 17, "Louisiana": 18, "Maine": 19, "Maryland": 20, "Massachusetts": 21, "Michigan": 22, "Minnesota": 23, "Mississippi": 24, "Missouri": 25, "Montana": 26, "Nebraska": 27, "Nevada": 28, "New Hampshire": 29, "New Jersey": 30, "New Mexico": 31, "New York": 32, "North Carolina": 33, "North Dakota": 34, "Ohio": 35, "Oklahoma": 36, "Oregon": 37, "Pennsylvania": 38, "Rhode Island": 39, "South Carolina": 40, "South Dakota": 41, "Tennessee": 42, "Texas": 43, "Utah": 44, "Vermont": 45, "Virginia": 46, "Washington": 47, "West Virginia": 48, "Wisconsin": 49, "Wyoming": 50
    };

 // List of states for drop down selection
 var states = Object.keys(state_idx_dict);


d3.select("#selectButton")
    .style('width', '350px')
    .selectAll('myOptions')
    .data(states)
    .enter()
    .append('option')
    .text(d => d)
    .attr("value", function (d) { return d; })


function update(selectedState) {

        // Filter data to only state of interest
        var filtered_data = data.filter(d => { return d.state === selectedState })



        const pie = d3.pie()
            .sort(null)
            .value(d => d.share)


        g = svg_pie.append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


        var arc = g.selectAll(".arc")
            .data(pie(filtered_data))
            .enter()
            .append('g')
            .attr('class', 'arc')



        arc.append('path')
            .attr('d', path)
            .attr('fill', d => color2(d.data.sector))
            .append("title")
            .text(d => `${d.data.sector} - ${format((d.data.share * 100).toFixed(1))}%`)



        // Legend implementation adapted from https://stackoverflow.com/questions/32298837/how-to-add-a-nice-legend-to-a-d3-pie-chart
        var legendG = svg_pie.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
            .data(pie(filtered_data))
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(" + (width - 125) + "," + (i * 25 + 80) + ")"; // place each legend on the right and bump each one down 15 pixels
            })
            .attr("class", "legend");

        legendG.append("rect") // make a matching color rect
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", function (d, i) {
                return color2(d.data.sector);
            });

        legendG.append("text") // add the text
            .text(function (d) {
                return d.data.sector;
            })
            .style("font-size", 14)
            .attr("y", 12)
            .attr("x", 25);
    }

    d3.select("#selectButton").on("change", function (event, d) {

        const selectedState = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedState)
    })

    update('Total') // Initialize to Nation

    }
}
};
</script>
<style scoped>
 #Piechart {
      margin: 0px 25px 25px 25px;
      padding: 10px
  }

  .arc text {
      font: 10px sans-serif;
      text-anchor: middle;
    }

    .arc path {
      stroke: #fff;
    }

</style>