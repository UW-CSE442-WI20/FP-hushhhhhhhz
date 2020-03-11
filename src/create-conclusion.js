const d3 = require('d3');

class Conclusion {
    constructor() {
    }

    start() {
        d3.selectAll(".fullVis:not(.special)").html("")
        d3.selectAll('.halfVis').html("")

        colors = ["#FFFFFF", "#BCF2F0", "#4EB7B2", "#2B7A78"];


        titleContainer = d3.select("#title11 .fullVis").append('div')
			.style('text-align', 'center')

		titleContainer.append("h1")
                .text("Thank you for watching!")
                .style("font-size", "40px")
                .transition()
                .duration(2000)

		titleContainer.append('div')
			.style("font-size", "20px")
			.text('We hope you have learned something about this interesting and complex field.')
		titleContainer.append('div')
			.style("font-size", "20px")
            .text('It is important to understand how our data is protected, especially in this modern age of technology.') 

        conclusionContainer = d3.select("#title11 .fullVis").append('div')
			.style('width', '700px')
			.style('text-align', 'center')
			.style('margin', 'auto')

		firstBubble = conclusionContainer.append('div')
                .style("width", "0px")
                .style("height", "0px")
                .style("background-color", "#BCF2F0")
                .attr("class", "explanationCircle")

            firstBubble.append("div")
                .attr('class', 'textDiv')
                .attr('class', 'textDivTitle')
                .text("Learn More")
                .style("opacity", 0)

		firstBubble.transition()
                .duration(1000)
                .style("width", "350px")
                .style("height", "350px")
                .style("color", "black")

            firstBubble.selectAll(".textDiv").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(1000)

            firstBubble.selectAll(".textDivTitle").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(700)


		historyBubble = conclusionContainer.append('div')
                .style("width", "0px")
                .style("height", "0px")
                .style("background-color", '#4EB7B2')
                .attr("class", "explanationCircle")
                .style("margin-left", "auto")
            historyBubble.append("div")
                .attr('class', 'textDiv')
                .attr('class', 'textDivTitle')
                .text("Sources")
                .style("opacity", 0)

            historyBubble
                .append('div')
                .attr('class', 'textDiv')
                .text('In a stream cipher, the encryption rule depends on a plaintext symbol\'s position in the stream of plaintext symbols.')
                .style("opacity", 0)

            historyBubble
                .append('div')
                .attr('class', 'textDiv')
                .text('It follows the convention where letters are labeled based on their position within the alphabet:')
                .style("opacity", 0)

            historyBubble
                .append('div')
                .attr('class', 'textDiv')
                .text(' A = 0, B = 1, ... Z = 25')
                .style("opacity", 0)

            historyBubble.transition()
                .duration(1000)
                .style("width", "350px")
                .style("height", "350px")
				.delay(500)
                .style("color", "black")
				.style("margin-top", '-170px')
   
            historyBubble.selectAll(".textDiv").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(1000)
			historyBubble.selectAll(".textDivTitle").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(1000)

            processBubble = conclusionContainer.append('div')
                .style("width", "0px")
                .style("height", "0px")
                .style("background-color", "#2B7A78")
                .attr("class", "explanationCircle")

            processBubble.append("div")
                .attr('class', 'textDiv')
                .attr('class', 'textDivTitle')
                .text("Teammates")
                .style("opacity", 0)

            processBubble
                .append('div')
                .attr('class', 'textDiv')
                .text('Heather Harvey')
                .style("opacity", 0)

            processBubble
                .append('div')
                .attr('class', 'textDiv')
                .text('Kushal Jhunjhunwalla')
                .style("opacity", 0)

            processBubble
                .append('div')
                .attr('class', 'textDiv')
                .text('Lior Levy')
                .style("opacity", 0)

			processBubble
                .append('div')
                .attr('class', 'textDiv')
                .text('Amir Mola')
                .style("opacity", 0)

			processBubble
                .append('div')
                .attr('class', 'textDiv')
                .text('Emma Raible')
                .style("opacity", 0)

			processBubble.transition()
                .duration(1000)
                .style("width", "350px")
                .style("height", "350px")
                .delay(1000)
                .style("color", "black")
                .style("margin-top", '-170px')

            processBubble.selectAll(".textDiv").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(1300)

            processBubble.selectAll(".textDivTitle").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(1300)

    }
}

module.exports = Conclusion;

