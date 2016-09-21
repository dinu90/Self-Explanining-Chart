function arc1(){

	/* disable the click function*/
	stopClicker();
		
	/*run Progresss Bar*/
	runProgressBar(time=700*11);

	changeWelcomeText(newText = " ", loc = 0, delayDisappear=0, delayAppear=1);
		
	changeTopText(newText = "Considering the Public Safety, the Chicago Police Department keeps "+
		"its people posted about various theft in data.cityofchicago.org portal...",

	loc = 4/4, delayDisappear = 0, delayAppear = 1);

	changeTopText(newText = "In the next few steps I would like to introduce you to the various "+
		"theft crimes happened last year.",
	loc = 8/3, delayDisappear = 9, delayAppear = 10, finalText = true);
	
	changeBottomText(newText = "Let's start by drawing out the division of the 2051 theft crimes " + 
	"happened last year. This is just 18.05% of the entire crime last year.",
	loc = 1/2, delayDisappear = 0, delayAppear = 10);
	
	d3.selectAll(".arc")
		.transition().delay(9*700).duration(2100)
		.style("opacity", 0)
		.each("end", function() {d3.selectAll(".arc").remove();});
		
};