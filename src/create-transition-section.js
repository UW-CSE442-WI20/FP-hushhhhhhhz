const d3 = require('d3');

class TransitionSection {
    constructor() {
    }

    start() {
	d3.selectAll(".fullVis").style("background-color", "transparent").html("")
	d3.selectAll(".halfVis").style("background-color", "transparent").html("")
	d3.select("#title7").text("coming soon?")
    }
}

module.exports = TransitionSection;
