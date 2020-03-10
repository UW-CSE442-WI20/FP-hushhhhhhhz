const d3 = require('d3');

class TransitionSection {
	constructor() {
	}

	start() {
		d3.selectAll(".fullVis:not(.special)").style("background-color", "transparent").html("")
		d3.selectAll(".halfVis").style("background-color", "transparent").html("")

		d3.selectAll("#vis div").classed("selected", false)
        d3.select("#content7").classed("selected", true)

		colors = ["#FFFFFF", "#BCF2F0", "#4EB7B2", "#2B7A78"];

        futureContainer = d3.select("#title7 .fullVis")
/*        title = futureContainer.append('div')
                .attr("class", "titleBox")
                .text("Moving into modern cryptology...");
*/
		var nodes = [
            { id: "1", r: 1000, cx: 750, cy: 400, color: "#2B7A78"}
		];

		var futureContainer = futureContainer.append('svg')
                .style('width','3000')
                .style('height', '1000')
                .append('g');

		var nodeElements = futureContainer.selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr('r', '2')
                .attr('fill',  function (d) { return d.color; })
                .attr('cx', function (d) { return d.cx; })
                .attr('cy', function (d) { return d.cy; })
				.style('opacity', 0.8);

		nodeElements.transition("grow")
                .duration(2000)
                .attr('r', (d) => {return d.r})
		futureTitle = futureContainer.append("text")
                .text("Moving into modern cryptology...")
                .attr('x', 500)
                .attr('y', 100)
                .attr('fill', 'white')
				.style("font-size", "40px")
                .attr('opacity', 0)
                .transition()
                .duration(2000)
                .attr('opacity', 100)
                .delay(1000)
/*
        var nodes = [
            { id: "1", r: 5, cx: 162, cy: 350, color: 0},
            { id: "2", r: 10, cx: 175, cy: 350, color: 0},
            { id: "3", r: 20, cx: 200, cy: 350, color: 1},
            { id: "4", r: 40, cx: 250, cy: 350, color: 1},
            { id: "5", r: 80, cx: 350, cy: 350, color: 2},
            { id: "6", r: 160, cx: 550, cy: 350, color: 2},
            { id: "final", r: 320, cx: 950, cy: 350, color: 3}
       ]
//1f2833;
// starting positions for the nodes
            nodes.forEach(function(node) {
                node.x = 0;
                node.y = 350;
            })

            var futureContainer = futureContainer.append('svg')
                .style('width','1300')
                .style('height', '800')
                .append('g');

            var nodeElements = futureContainer.selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr('r', '2')
                .attr('fill',  function (d) { return colors[d.color]; })
                .attr('cx', function (d) { return d.x; })
                .attr('cy', function (d) { return d.y; });
			
			nodeElements.transition("move")
                .duration(4000)
                .attr('cx', (d) => { return d.cx })
                .attr('cy', (d) => { return d.cy })

            nodeElements.transition("grow")
                .duration(2000)
                .attr('r', (d) => {return d.r})
                .delay(2000)
*/
	}
}

module.exports = TransitionSection;
