const d3 = require('d3');

class Intro {
  constructor() {
  }

  start() {
	  d3.selectAll('.fullVis').style("background-color", "transparent").html("")
	  d3.selectAll('.halfVis').style("background-color", "transparent").html("")
	  d3.select("#title1 .fullVis").style("background-color", "black")
	  d3.selectAll("#vis p").style("font-weight", "normal")
	  d3.select("#content1").style("font-weight", "bold")
  }
}

module.exports = Intro;
