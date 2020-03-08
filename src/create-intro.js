const d3 = require('d3');

class Intro {
	constructor() {
	}

	start() {
		// remove any previous vis
		d3.selectAll('.fullVis').style("background-color", "transparent").html("")
		d3.selectAll('.halfVis').style("background-color", "transparent").html("")

		// highlight in table of contents
		d3.selectAll("#vis div").style("font-weight", "normal")
		d3.select("#content1").style("font-weight", "bold")

		// a container for any visualizations
		d3.select("#title1 .fullVis")
	}
}

module.exports = Intro;
