const d3 = require('d3')

class RSA {
	constructor() {

	}

	start() {
		d3.selectAll('.fullVis').style("background-color", "transparent").html("")
		d3.selectAll('.halfVis').style("background-color", "transparent").html("")

		d3.selectAll("#vis div").classed("selected", false)
		d3.select("#content7").classed("selected", true)

		this.vis = d3.select('#title12 .fullVis')
	}
}

module.exports = RSA;
