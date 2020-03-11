const d3 = require('d3');

class TransitionSection {
	constructor() {
	}

	start() {
		d3.selectAll(".fullVis:not(.special)").html("")
        d3.selectAll('.halfVis').html("")

		colors = ["#FFFFFF", "#BCF2F0", "#4EB7B2", "#2B7A78"];

        transitionContainer = d3.select("#title7 .fullVis")

		var nodes = [
            { id: "1", r: 1000, cx: 750, cy: 400, color: "#2B7A78"}
		];

		var futureContainer = transitionContainer.append('svg')
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
				.style('opacity', 0.7);

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
                .attr('opacity', 1)
                .delay(1000)

		bubbleContainer = transitionContainer.append('div')
			.style('width', '900px')
			.style('position','fixed')
			.style('top','20vh')
			.style('left','25vw')
			.style('text-align', 'center')

		firstBubble = bubbleContainer.append('div')
                .style("width", "0px")
                .style("height", "0px")
                .style("background-color", "#1f2833")
                .attr("class", "explanationCircle")
		
            firstBubble.append("div")
                .attr('class', 'textDiv')
                .attr('class', 'textDivTitle')
                .text("Into Data Protection")
                .style("opacity", 0)

        firstBubble.transition()
                .duration(1000)
                .style("width", "400px")
                .style("height", "400px")
				.delay(2000)

            firstBubble.selectAll(".textDiv").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(2500)

            firstBubble.selectAll(".textDivTitle").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(2500)

		secondBubble = bubbleContainer.append('div')
                .style("width", "0px")
                .style("height", "0px")
                .style("background-color", "#314155")
                .attr("class", "explanationCircle")
				.style("margin-left", "auto")
            secondBubble.append("div")
                .attr('class', 'textDiv')
                .attr('class', 'textDivTitle')
                .text("Advanced Key Encryption")
                .style("opacity", 0)

        secondBubble.transition()
                .duration(1000)
                .style("width", "400px")
                .style("height", "400px")
                .delay(2700)
				.style("margin-top", '-180px')

            secondBubble.selectAll(".textDiv").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(3200)

            secondBubble.selectAll(".textDivTitle").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(3200)

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
