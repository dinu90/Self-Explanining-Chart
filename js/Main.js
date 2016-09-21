var TheftCategory = ["$500 & Under","Attempt Theft","Delivery Container Theft","Building","Over $500",
"Pocket-Picking","Purse-Snatching","Retail Theft"];

var percentageMatrix = [
[39.93174061,0,0,0,0,0,0,0], /*$500 & Under*/
[0.536323745,0,0,0,0,0,0,0], /*Attempt Theft*/
[0.048756704,0,0,0,0,0,0,0], /*Delivery Container Theft*/
[21.20916626,0,0,0,0,0,0,0], /*From Building*/
[25.06094588,0,0,0,0,0,0,0], /*Over $500*/
[2.827888835,0,0,0,0,0,0,0], /*Pocket-Picking*/
[0.926377377,0,0,0,0,0,0,0], /*Purse-Snatching*/
[9.458800585,0,0,0,0,0,0,0]  /*Rtail Theft*/
];

var colors = ["#C4C4C4","#935BCD","#A6D9FD","#65D1AE","#4DA338","#D9EC39","#F3AF2F","#EA3A22"];

/*Initializing color value to Theft Category Property*/
var fill = d3.scale.ordinal()
    .domain(d3.range(TheftCategory.length))
    .range(colors);

/* Initiating the Chord */
var margin = {top: 30, right: 45, bottom: 40, left: 35}, 
	width = 700 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom,
    innerRadius = Math.min(width, height) * .35, 
    outerRadius = innerRadius * 1.09;

/* Initiating the SVG */
var svg = d3.select("#pieChart").append("svg:svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("svg:g")
    .attr("transform", "translate(" + (margin.left + width / 2) + "," + (margin.top + height / 2) + ")");
	
var chord = d3.layout.chord()
    .padding(.04)
    .sortSubgroups(d3.descending) 
    .sortChords(d3.descending) 
	.matrix(percentageMatrix);
	
/* Draw outer arc */
var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
	
var g = svg.selectAll("g.group")
	.data(chord.groups)
	.enter().append("svg:g")
	.attr("class", function(d) {return "group " + TheftCategory[d.index];});
	
g.append("svg:path")
	  .attr("class", "arc")
	  .style("stroke", function(d) { return fill(d.index); })
	  .style("fill", function(d) { return fill(d.index); })
	  .attr("d", arc)
	  .style("opacity", 0)
	  .transition().duration(1000)
	  .style("opacity", 0.4);


/* Initiating Tick's */
var ticks = svg.selectAll("g.group").append("svg:g")
	.attr("class", function(d) {return "ticks " + TheftCategory[d.index];})
	.selectAll("g.ticks")
	.attr("class", "ticks")
    .data(groupTicks)
	.enter().append("svg:g")
    .attr("transform", function(d) {
      return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
          + "translate(" + outerRadius+40 + ",0)";
    });

/* append ticks to the arc*/
ticks.append("svg:line")
	.attr("x1", 1)
	.attr("y1", 0)
	.attr("x2", 5)
	.attr("y2", 0)
	.attr("class", "ticks")
	.style("stroke", "#FFF");
	
/*Adding labels*/
ticks.append("svg:text")
	.attr("x", 8)
	.attr("dy", ".35em")
	.attr("class", "tickLabels")
	.attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
	.style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
	.text(function(d) { return d.label; })
	.attr('opacity', 0);
	
/* Initiating Crime Names*/
  g.append("svg:text")
  .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
  .attr("dy", ".35em")
  .attr("class", "titles")
  .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
  .attr("transform", function(d) {
		return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
		+ "translate(" + (innerRadius + 55) + ")"
		+ (d.angle > Math.PI ? "rotate(180)" : "");
  })
  .attr('opacity', 0)
  .text(function(d,i) { return TheftCategory[i]; });  


/* Drawing inner chors*/
var chords = svg.selectAll("path.chord")
	.data(chord.chords)
	.enter().append("svg:path")
	.attr("class", "chord")
	.style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(); })
	.style("fill", function(d) { return fill(d.source.index); })
	.attr("d", d3.svg.chord().radius(innerRadius))
	.attr('opacity', 0);

/*Initiate progress bar*/
var progressColor = ["#D1D1D1","#73e600"],
	progressClass = ["prgsBehind","prgsFront"],
	prgsWidth = 0.4*650,
	prgsHeight = 10;

/* SVG to progress bar*/
var progressBar = d3.select("#progress").append("svg")
	.attr("width", prgsWidth)
	.attr("height", 3*prgsHeight);

/*Create two bars of which one has a width of zero*/
progressBar.selectAll("rect")
	.data([prgsWidth, 0])
	.enter()
	.append("rect")
	.attr("class", function(d,i) {return progressClass[i];})
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", function (d) {return d;})
	.attr("height", prgsHeight)
	.attr("fill", function(d,i) {return progressColor[i];});

/*wrapper for center text*/
var textCenter = svg.append("g")
					.attr("class", "explanationWrapper");

/*Starting text for welcome*/
var welcomeText = textCenter.append("text")
	.attr("class", "explanation")
	.attr("text-anchor", "middle")
	.attr("x", 0 + "px")
	.attr("y", -24*10/2.5 + "px")
	.attr("dy", "1em")
	.attr("opacity", 1)
	.text("Welcome!!!")
	.call(wrap, 350);

/*center middle text*/
var middleTextTop = textCenter.append("text")
	.attr("class", "explanation")
	.attr("text-anchor", "middle")
	.attr("x", 0 + "px")
	.attr("y", -24*10/5 + "px")
	.attr("dy", "1em")
	.attr("opacity", 1)
    .text("Reported \"Theft\" incidents of crime that occurred in the City of Chicago at 2015.")
	.call(wrap, 350);

/*bottom middle text*/
var middleTextBottom = textCenter.append("text")
	.attr("class", "explanation")
	.attr("text-anchor", "middle")
	.attr("x", 0 + "px")
	.attr("y", 24*3/3 + "px")
	.attr("dy", "1em")
	.attr('opacity', 1)
	.text("The data are taken from https://data.cityofchicago.org/ Public-Safety/Crimes-2015/vwwp-7yr9")
	.call(wrap, 350);

var counter = 1,
	buttonTexts = ["Ok","Continue","Play Again"],
	opacityValueBase = 0.8,
	opacityValue = 0.4;

/* Reloads the page */
d3.select("#reset")
	.on("click", function(e) {location.reload();});
	
/*Order of steps when clicking button*/
d3.select("#clicker")      
	.on("click", function(e){
		if(counter == 1) arc1();
		else if(counter == 2) arc2();
		else if(counter == 3) arc3();
		else if(counter ==4){
			location.reload();
		}
		counter = counter + 1;
	});

