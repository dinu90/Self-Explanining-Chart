/**********************************************************************
********************* COMMON FUNCTIONS ********************************
**********************************************************************/

/*returns the angle and lable for each tick*/
function groupTicks(d) {
  var k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, 1).map(function(v, i) {
    return {
      angle: v * k + d.startAngle,
      label: i % 5 ? null : v + "%"
    };
  });
};

/*Reference : https://groups.google.com/forum/#!msg/d3-js/WC_7Xi6VV50/j1HK0vIWI-EJ*/
function endall(transition, callback) { 
    var n = 0; 
    transition 
        .each(function() { ++n; }) 
        .each("end", function() { if (!--n) callback.apply(this, arguments); }); 
};/*endall*/ 

/*Reference: http://bl.ocks.org/mbostock/7555321*/
function wrap(text, width) {
    var text = d3.select(this[0][0]),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4, 
        y = text.attr("y"),
		x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
		
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      };
    };  
};

/*Change Top text with Transition*/
function changeTopText (newText, loc, delayDisappear, delayAppear, finalText, xloc, w) {
	if(typeof(finalText)==='undefined') finalText = false;
	if(typeof(xloc)==='undefined') xloc = 0;
	if(typeof(w)==='undefined') w = 350;
	middleTextTop	
		.transition().delay(700 * delayDisappear).duration(700)
		.attr('opacity', 0)	
		.call(endall,  function() {
			middleTextTop.text(newText)
			.attr("y", -24*loc + "px")
			.attr("x", xloc + "px")
			.call(wrap, w);	
		})
		.transition().delay(700 * delayAppear).duration(700)
		.attr('opacity', 1)
		.call(endall,  function() {
			if (finalText == true) {
				d3.select("#clicker")
					.text(buttonTexts[counter-2])
					.style("pointer-events", "auto")
					.transition().duration(400)
					.style("border-color", "#363636")
					.style("color", "#363636");
				};
		});
};

/*Change Welcome text with Transition*/
function changeWelcomeText (newText, loc, delayDisappear, delayAppear) {
	welcomeText
		.transition().delay(700 * delayDisappear).duration(700)
		.attr('opacity', 0)
		.call(endall,  function() {
			welcomeText.text(newText)
			.attr("y", 24*loc + "px")
			.call(wrap, 350);	
		})
		.transition().delay(700 * delayAppear).duration(700)
		.attr('opacity', 1);
;}

/*Change bottom text with Transition*/
function changeBottomText (newText, loc, delayDisappear, delayAppear) {
	middleTextBottom
		.transition().delay(700 * delayDisappear).duration(700)
		.attr('opacity', 0)
		.call(endall,  function() {
			middleTextBottom.text(newText)
			.attr("y", 24*loc + "px")
			.call(wrap, 350);	
		})
		.transition().delay(700 * delayAppear).duration(700)
		.attr('opacity', 1);
;}

/* Stop clicker from working */
function stopClicker() {
	d3.select("#clicker")
		.style("pointer-events", "none")
		.transition().duration(400)
		.style("border-color", "#D3D3D3")
		.style("color", "#D3D3D3");
};

/* Progress bar with animation*/
function runProgressBar(time) {	
	d3.selectAll("#progress")
		.style("visibility", "visible");
	d3.selectAll(".prgsFront")
		.transition().duration(time).ease("linear")
		.attr("width", prgsWidth)
		.call(endall,  function() {
			d3.selectAll("#progress")
				.style("visibility", "hidden");
		});
	d3.selectAll(".prgsFront")
		.attr("width", 0);	
};