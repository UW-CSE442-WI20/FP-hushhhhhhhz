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

		// a container for any visualizations
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

		var bubbleContainer = container.append('svg')
										.style('width','400')
										.style('height', '400')
										.append('g');
		var nodeElements = bubbleContainer.selectAll("circle")
										.data(nodes)
										.enter().append("circle")
										.attr('r', '50')
										.attr('cx', (d) => {return d.cx})
										.attr('cy', (d) => {return d.cy})
										.attr('fill', 'white')
										
		bubbleContainer.selectAll("text")
						.data(nodes).enter()
						.append("text")
						.text((d) => {return d.id})
						.attr('x', (d) => {return d.cx - 30})
                        .attr('y', (d) => {return d.cy})
						.attr('fill', 'red')					
										//.on('mouseover', mouseOver)
										//.on('mousemove', mouseMove)
										//.on('mouseout', mouseOut)
		
		
		


	}
}

module.exports = Intro;
