const d3 = require('d3');

class Intro {
	constructor() {
	}

	start(flag) {
		if (flag) {
			d3.selectAll(".fullVis:not(.special)").style("background-color", "transparent").html("")
			d3.selectAll('.halfVis').style("background-color", "transparent").html("")
		} else {
			// remove any previous vis
			//d3.selectAll('.fullVis').style("background-color", "transparent").html("")
			//d3.selectAll('.halfVis').style("background-color", "transparent").html("")

			// highlight in table of contents
			d3.selectAll("#vis div").classed("selected", false)
			d3.select("#content1").classed("selected", true)

			container = d3.select("#title1 .fullVis")
			title = container.append('div')
				.attr("class", "titleBox")
				.text("Cryptography: Keeping Your Information Safe")

			applicationContainer = container.append('div')
				.attr('class', 'introContainer')

			typeContainer = container.append('div')
				.attr('class', 'introContainer')


			var nodes = [
				{ id: "Government", cx: 90, cy: 100},
				{ id: "Internet", cx: 80, cy: 200},
				{ id: "Passwords", cx: 180, cy: 60 },
				{ id: "Email", cx: 170, cy: 160 },
				{ id: "Mobile", cx: 260, cy: 120},
				{ id: "Business", cx: 250, cy: 220 },
				{ id: "Military", cx: 160, cy: 260 }  
			]

			// starting positions for the nodes
			nodes.forEach(function(node) {
				node.x = Math.random() * 500;
				node.y = Math.random() * 500;
			})

			var bubbleContainer = applicationContainer.append('svg')
				.style('width','400')
				.style('height', '320')
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


			applicationText = applicationContainer.append('div')
				.style("width", "700px")
				.style("height", "230px")
				.style("opacity", 0)
				.style("background-color", "black")
				.style("padding", "10px")

			applicationText.append("h2")
				.text("Why is Cryptogology important?")

			applicationText.append('p')
				.text("Cryptology has had many applications over thousands of years of history. In fact, the earliest computers were developed in order to break encrypted messages being sent during WWII. But as computers have made their way into every part of our live, cryptology has become increasingly important in protecting the personal data of individuals. To the left we highlight the major applications that motivate the study and development of cryptology today. As you can see, cryptoloy comes into our lives in a multitude of ways.")

			applicationText.transition()
				.duration(5000)
				.style("opacity", 1)
				.delay(2000)

			typeText = typeContainer.append('div')
				.style("width", "700px")
				.style("opacity", 0)
				.style("background-color", "black")
				.style("padding", "10px")

			typeText.append("h2")
				.text("The three branches")

			typeText.append('p')
				.text("Cryptology is an umbrella term for the fields of cryptography and cryptanalysis.") 

			typeText.append('p')
				.text("Cryptography is the creation of new codes and ciphers. Cryptographers use mathematical properties to encode a message in such a way that the author and intended recipient can easily communicate while it is impossible or computationally infeasible for an unauthorized party to learn any secret information.")

			typeText.append('p')
				.text("Cryptanalysis is the art and science of breaking ciphers. Cryptanalysts perform a variety of different analyses on a cipher to attempt to learn secret information. Among these are mathematical analysis, logical analysis and side-channel analysis.") 

			var types = [
				{ id: "Cryptology", cx: 200, cy: 90},
				{ id: "Cryptography", cx: 200, cy: 230},
				{ id: "Cryptanalysis", cx: 80, cy: 160 },
			]

			// starting positions for the nodes
			types.forEach(function(node) {
				node.x = Math.random() * 500;
				node.y = Math.random() * 500;
			})

			var typeBubbles = typeContainer.append('svg')
				.style('width','400')
				.style('height', '300')
				.append('g');

			var typeElements = typeBubbles.selectAll("circle")
				.data(types)
				.enter().append("circle")
				.attr('r', '0')
				.attr('fill', 'white')
				.attr('cx', function (d) { return d.x; })
				.attr('cy', function (d) { return d.y; });


			typeElements.transition("move")
				.duration(3000)
				.attr('cx', (d) => { return d.cx })
				.attr('cy', (d) => { return d.cy })
				.delay(4000);

			typeElements.transition("grow")
				.duration(1500)
				.attr('r', 4)
				.delay(4000)
				.on("end", () => {
					typeElements.transition("grow2")
						.duration(3000)
						.attr("r", 70) })

			typeBubbles.selectAll("text")
				.data(types).enter()
				.append("text")
				.text((d) => {return d.id})
				.attr('x', (d) => {return d.cx - 30})
				.attr('y', (d) => {return d.cy})
				.attr('fill', 'green')
				.attr('opacity', 0)
				.transition()
				.duration(2000)
				.attr('opacity', 100)
				.delay(9000)

			typeText.transition()
				.duration(3000)
				.style("opacity", 1)
				.delay(4000)
		}
	}

}

module.exports = Intro;
