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


var focus_electricity = svg.append("g").style("display", "none");
var focus_gasoline = svg.append("g").style("display", "none");
var focus_e85 = svg.append("g").style("display", "none");
var focus_cng = svg.append("g").style("display", "none");
var focus_diesel = svg.append("g").style("display", "none");
var focus_b20 = svg.append("g").style("display", "none");
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
      .attr("stroke", "blue")
      .attr("stroke-width", "2px")
      .attr("d", valueline);

  // Add the valueline2 path.
  svg.append("path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", "2px")
      .attr("d", valueline2);

  svg.append("path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", "2px")
      .attr("d", valueline3);

  svg.append("path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", "2px")
      .attr("d", valueline4);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

  // append the x line
  focus_electricity.append("line")
      .attr("class", "x")
      .style("stroke", "blue")
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.5)
      .attr("y1", 0)
      .attr("y2", height);

  // append the y line
  focus_electricity.append("line")
      .attr("class", "y")
      .style("stroke", "blue")
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.5)
      .attr("x1", width)
      .attr("x2", width);

  // append the circle at the intersection 
  focus_electricity.append("circle")
      .attr("class", "y")
      .style("fill", "none")
      .style("stroke", "blue")
      .attr("r", 4);

    // place the value at the intersection
    focus_electricity.append("text")
        .attr("class", "y1")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "-.3em");
    focus_electricity.append("text")
        .attr("class", "y2")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // place the date at the intersection
    focus_electricity.append("text")
        .attr("class", "y3")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "1em");
    focus_electricity.append("text")
        .attr("class", "y4")
        .attr("dx", 8)
        .attr("dy", "1em");

// /////////////////////
  // append the x line
  focus_gasoline.append("line")
      .attr("class", "x")
      .style("stroke", "blue")
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.5)
      .attr("y1", 0)
      .attr("y2", height);

  // append the y line
  focus_gasoline.append("line")
      .attr("class", "y")
      .style("stroke", "blue")
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.5)
      .attr("x1", width)
      .attr("x2", width);

  // append the circle at the intersection 
  focus_gasoline.append("circle")
      .attr("class", "y")
      .style("fill", "none")
      .style("stroke", "blue")
      .attr("r", 4);

    // place the value at the intersection
    focus_gasoline.append("text")
        .attr("class", "y1")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "-.3em");
    focus_gasoline.append("text")
        .attr("class", "y2")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // place the date at the intersection
    focus_gasoline.append("text")
        .attr("class", "y3")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "1em");
        focus_gasoline.append("text")
        .attr("class", "y4")
        .attr("dx", 8)
        .attr("dy", "1em");
///////////
  
  // append the rectangle to capture mouse
  svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", function() { focus_electricity.style("display", null); })
      .on("mouseout", function() { focus_electricity.style("display", "none"); })
      .on("mousemove", mousemove);

  function mousemove() {
	  var x0 = x.invert(d3.pointer(event,this)[0]),
		  i = bisectDate(data, x0, 1),
		  d0 = data[i - 1],
		  d1 = data[i],
		  d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;

	focus_electricity.select("circle.y")
	   .attr("transform",
	         "translate(" + x(d.Date) + "," +
	                        y(d.Electricity) + ")");

		focus_electricity.select("text.y1")
		    .attr("transform",
		          "translate(" + x(d.Date) + "," +
		                         y(d.Electricity) + ")")
		    .text(`$` + d.Electricity);

		focus_electricity.select("text.y2")
		    .attr("transform",
		          "translate(" + x(d.Date) + "," +
		                         y(d.Electricity) + ")")
		    .text(`$` + d.Electricity)
            .attr("font-size", "1.2em");

		focus_electricity.select("text.y3")
		    .attr("transform",
		          "translate(" + x(d.Date) + "," +
		                         y(d.Electricity) + ")")
		    .text(formatDate(d.Date));

		focus_electricity.select("text.y4")
		    .attr("transform",
		          "translate(" + x(d.Date) + "," +
		                         y(d.Electricity) + ")")
		    .text(formatDate(d.Date));

		focus_electricity.select(".x")
		    .attr("transform",
		          "translate(" + x(d.Date) + "," +
		                         y(d.Electricity) + ")")
		               .attr("y2", height - y(d.Electricity));

		focus_electricity.select(".y")
		    .attr("transform",
		          "translate(" + width * -1 + "," +
		                         y(d.Electricity) + ")")
		               .attr("x2", width + width);
    
  }
  

});
