const d3 = require('d3');

class Intro {
	constructor() {
	}

	start(flag) {
		if (flag) {
			console.log("!")
			console.log(d3.selectAll(".fullVis:not(#step1 .fullvis):not(#step2 .fullvis)"))
			d3.selectAll(".fullVis:not(#step1):not(#step2)").style("background-color", "transparent").html("")
			d3.selectAll('.halfVis').style("background-color", "transparent").html("")
		} else {
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


			applicationText = applicationContainer.append('div')
				.style("width", "700px")
				.style("opacity", 0)
				.style("background-color", "black")
				.style("padding", "10px")

			applicationText.append("h2")
				.text("Applications of Cryptography")

			applicationText.append('p')
				.text("Cryptography has had many applications over thousands of years of history. To the left we highlight the major applications that motivate the study and development of cryptography today. As you can see, cryptography comes into our lives in a multitude of ways.")

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
				.text("Cryptology: Cryptology (literally \"the hidden word\") is an umbrella term for the fields of cryptography and cryptanalysis. Researchers who both develop new ciphers and attempt to break others are most properly called cryptologists as they practice both cryptography and cryptanalysis.")

			typeText.append('p')
				.text("Cryptography: Cryptography (\"hidden writing\") is the area of cryptology related to the creation of new codes and ciphers. Cryptographers use mathematical properties to develop cryptographic algorithms. The intent of these algorithms is to encode a message in such a way that the author and intended recipient can easily communicate while it is impossible or computationally infeasible for an unauthorized party to learn any secret information.")

			typeText.append('p')
				.text("Cryptanalysis: Cryptanalysis (\"the investigation of the hidden\") is the art and science of breaking ciphers. Cryptanalysts perform a variety of different analyses on a cipher to attempt to learn secret information. Among these are mathematical analysis (searching for loopholes or flaws in the mathematical basis of the cipher), logical analysis (confirming that the cipher was designed correctly), and side-channel analysis (testing if the execution time, power consumption, etc. of a system is dependent on-and reveals information about the plaintext or secret key.)")

			var types = [
				{ id: "Cryptology", cx: 200, cy: 100},
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
				.style('height', '400')
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
