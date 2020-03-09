const d3 = require('d3');

class Intro {
	constructor() {
	}

	start() {
		// remove any previous vis
		d3.selectAll('.fullVis').style("background-color", "transparent").html("")
		d3.selectAll('.halfVis').style("background-color", "transparent").html("")

		// highlight in table of contents
		d3.selectAll("#vis div").classed("selected", false)
		d3.select("#content1").classed("selected", true)

		container = d3.select("#title1 .fullVis")
		title = container.append('div')
					.attr("class", "titleBox")
					.text("Cryptography: Keeping Your Information Safe")
		

		var nodes = [
			{ id: "Government", cx: 80, cy: 100},
			{ id: "Internet", cx: 70, cy: 200},
			{ id: "Passwords", cx: 180, cy: 60 },
			{ id: "Email", cx: 170, cy: 160 },
			{ id: "Mobile Devices", cx: 270, cy: 120},
			{ id: "Business", cx: 260, cy: 220 },
			{ id: "Military", cx: 160, cy: 260 }  
		]

		// starting positions for the nodes
		nodes.forEach(function(node) {
			node.x = Math.random() * 500;
			node.y = Math.random() * 500;
		})

		var bubbleContainer = container.append('svg')
										.style('width','400')
										.style('height', '400')
										.append('g');

		var nodeElements = bubbleContainer.selectAll("circle")
			.data(nodes)
			.enter().append("circle")
			.attr('r', '2')
			.attr('fill', 'white')
			.attr('cx', function (d) { return d.x; })
			.attr('cy', function (d) { return d.y; });

		// nodeElements.exit().remove()

		// constants used in the simulation
		// var simulation = d3.forceSimulation(nodeElements)
		// 	.velocityDecay(0.2)
		// 	.force('charge', d3.forceManyBody().strength(30))
		// 	.force('center', d3.forceCenter(200, 200))
		// 	.force('collision', d3.forceCollide().radius(50))

		// function ticked() {
		// 	console.log("!")
		// 	console.log(this)
		// 	bubbleContainer.selectAll("circle")
		// 		.attr('cx', function (d) { return d.x; })
		// 		.attr('cy', function (d) { return d.y; });
		// }

		// simulation.nodes(nodeElements).on('tick', ticked);

		nodeElements.transition("move")
			.duration(4000)
		    .attr('cx', (d) => { return d.cx })
		    .attr('cy', (d) => { return d.cy })
			.delay(1000);

		nodeElements.transition("grow")
			.duration(2000)
			.attr('r', 50)
			.delay(3000)

		bubbleContainer.selectAll("text")
			.data(nodes).enter()
			.append("text")
			.text((d) => {return d.id})
			.attr('x', (d) => {return d.cx - 30})
			.attr('y', (d) => {return d.cy})
			.attr('fill', 'green')
			.attr('opacity', 0)
			.transition()
			.duration(2000)
			.attr('opacity', 100)
			.delay(5000)
	}

}

module.exports = Intro;
