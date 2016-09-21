function arc3(){

	/* disable the click function*/
	stopClicker();

	var delaySeconds = [0,1,2,12,22,29,34,39,40,45,52];

	/*run Progresss Bar*/
	runProgressBar(time=700*(delaySeconds[(delaySeconds.length-1)]+1));	
		
   /* fill the arcs*/
   svg.selectAll("g.group").select("path")
	.transition().delay(function(d, i) { return 700*delaySeconds[i];}).duration(1000)
    .attrTween("d", function(d) {
		if(d.index != 0) {
		   var i = d3.interpolate(d.startAngle, d.endAngle);
		   return function(t) {
			   d.endAngle = i(t);
			 return arc(d);
		   }
		}
	});
 
  svg.selectAll("g.group")
	.transition().delay(function(d,i) { return 700*delaySeconds[i]; }).duration(700)
	.selectAll("g").selectAll("line").style("stroke", "#000");
  svg.selectAll("g.group")
	.transition().delay(function(d,i) { return 700*delaySeconds[i]; }).duration(700)
	.selectAll("g").selectAll("text").style("opacity", 1);
  svg.selectAll("g.group")
	.transition().delay(function(d,i) { return 700*delaySeconds[i]; }).duration(700)
	.selectAll("text").style("opacity", 1);


   /*************************************************************************************
   ***************************** DISPLAY TEXT *******************************************
   *************************************************************************************/


	/*Attempt Theft & Container Theft*/
	changeTopText(newText = "Attempt theft and Delivery Container Theft is less than 0%",
		loc = 6/3, delayDisappear = 0, delayAppear = 2);
	changeBottomText(newText = "Attempt Theft - 0.53%, Delivery Container Theft - 0.05%",
		loc = -2/100, delayDisappear = 0, delayAppear = 2);
	/*From Building*/
	changeTopText(newText = "Theft from building has almost 21% of the entire theft",
		loc = 6/3, delayDisappear = (delaySeconds[3]-1), delayAppear = delaySeconds[3]);
	changeBottomText(newText = "From Building is 4% less than the 500$ and above theft",
		loc = -2/100, delayDisappear = (delaySeconds[3]-1), delayAppear = delaySeconds[3]);
	/*Over 500*/
	changeTopText(newText = "\"Over 500$\" has almost quater part of the theft crime. 25%",
		loc = 1/2, delayDisappear = (delaySeconds[4]-1), delayAppear = delaySeconds[4]);
	changeBottomText(newText="",
		loc = 3/2, delayDisappear = (delaySeconds[4]-1), delayAppear = delaySeconds[4]);
	/*Pocket - Picking*/
	changeTopText(newText = "Pocket-Picking with 2.8% of the crime",
		loc = 1/2, delayDisappear = (delaySeconds[5]-1), delayAppear = delaySeconds[5]);		
	changeBottomText(newText="",loc = 4/2, delayDisappear = delaySeconds[5], delayAppear = (delaySeconds[5]-1));
	/*Purse snatching*/
	changeTopText(newText="",
		loc = 1/2, delayDisappear = (delaySeconds[6]-1), delayAppear = delaySeconds[6]);
	changeBottomText(newText = "Purse Snatching with 0.9%",
		loc = -1/2, delayDisappear = (delaySeconds[6]-1), delayAppear = delaySeconds[6]);	
	/*Retail Theft*/
	changeBottomText(newText = "Retail theft has 9.45% of the theft crime so far in 2015.",
		loc = -1/2, delayDisappear = (delaySeconds[8]-1), delayAppear = delaySeconds[8]);	
	changeTopText(newText="",
		loc = -1/2, delayDisappear = (delaySeconds[8]-1), delayAppear = delaySeconds[8]);
    /* total 100%*/
	changeTopText(newText = "Together that sums up to 100%",
		loc = 1/2, delayDisappear = (delaySeconds[9]-1), delayAppear = delaySeconds[9]);		
	/*Chord intro*/
	changeTopText(newText = "This circle shows the \"Reported Theft Crime\" of Chicago, 2015",
		loc = 1/2, delayDisappear = (delaySeconds[10]-1), delayAppear = delaySeconds[10], finalText = true);					
	/*Chord intro*/
	changeBottomText(newText = "",
		loc = 1/2, delayDisappear = (delaySeconds[9]-1), delayAppear = delaySeconds[10]);	
};