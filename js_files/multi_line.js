var glines
var mouseG
var tooltip
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
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Gasoline); });

// define the 2nd line
var valueline2 = d3.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Propane); });

// define the 2nd line
var valueline3 = d3.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Diesel); });

// define the 2nd line
var valueline4 = d3.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Electricity); });


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#multi-line").append("svg")
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


// Get the data
d3.csv("../data/retail_fuel_prices.csv").then(function(data) {

  // format the data
  data.forEach(function(d) {
      d.Date = parseTime(d.Date);
      d.Gasoline = +d.Gasoline;
      d.Propane = +d.Propane;
      d.Diesel = +d.Diesel;
      d.Electricity +d.Electricity;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Date; }));
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

});
