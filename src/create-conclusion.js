const d3 = require('d3');

class Conclusion {
    constructor() {
    }

    start() {
        d3.selectAll(".fullVis:not(.special)").html("")
        d3.selectAll('.halfVis').html("")

		d3.selectAll("#vis div").classed("selected", false)
		d3.select("#content8").classed("selected", true)
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
			.style('width', '1300px')
			.style('display', 'flex')
			.style('text-align', 'center')
			.style('justify-content', 'center')
			.style('margin', 'auto')
			.style('margin-top', '100px')

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

		firstBubble
                .append('div')
                .attr('class', 'textDiv')
                .text('There is plenty more to learn and study when it comes to cryptography!')
                .style("opacity", 0)

		firstBubble
                .append('div')
                .attr('class', 'textDiv')
                .text('We recommend looking into our sources on the right, or feel free to visit Khan Academy, where they have tons of more tutorials and practice exercises.')
                .style("opacity", 0)

		link0 = firstBubble
                .append('div')
                .attr('class', 'textDiv')
                .style("opacity", 0)
            link0.append('a')
                .html('Khan Academy')
                .attr('href', 'https://www.khanacademy.org/computing/computer-science/cryptography')

		firstBubble.transition()
                .duration(1000)
                .style("width", "350px")
                .style("height", "350px")
                .style("color", "black")
				.style('margin-right', '30px')
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
            historyBubble.append("div")
                .attr('class', 'textDiv')
                .attr('class', 'textDivTitle')
                .text("Sources")
                .style("opacity", 0)

            link1 = historyBubble
                .append('div')
                .attr('class', 'textDiv')
                .style("opacity", 0)
            link1.append('a')
				.html('Asymmetric/Symmetric')
				.attr('href', 'https://www.cryptomathic.com/news-events/blog/classification-of-cryptographic-keys-functions-and-properties?fbclid=IwAR1GXcSfL-18_UUJsw69e59Cl_qQ3342QyewLwnJO9eOd0Mi0eub-jcOaIk')
			
			link2 = historyBubble
                .append('div')
                .attr('class', 'textDiv')
                .style("opacity", 0)
            link2.append('a')
                .html('Why Cryptography')
                .attr('href', 'https://www.commonlounge.com/discussion/921db548a81f4d5d91cd03fc22f4b0a1')

			link3 = historyBubble
                .append('div')
                .attr('class', 'textDiv')
                .style("opacity", 0)
            link3.append('a')
                .html('Hacker Gif')
                .attr('href', 'https://www.google.com/imgres?imgurl=https://media2.giphy.com/media/9WC8WTZsFxkRi/source.gif&imgrefurl=https://giphy.com/gifs/hack-9WC8WTZsFxkRi&tbnid=CEULoB359FPrTM&vet=1&docid=UGFOTdP4wh8OyM&w=800&h=600&q=hackery+gif&source=sh/x/im')


			link4 = historyBubble
                .append('div')
                .attr('class', 'textDiv')
                .style("opacity", 0)
            link4.append('a')
                .html('Cipher Info')
                .attr('href', 'http://www.quotium.com/resources/importance-cryptography/')

            historyBubble.transition()
                .duration(1000)
                .style("width", "350px")
                .style("height", "350px")
				.delay(500)
                .style("color", "black")
				.style('margin-right', '30px')
   
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
                .text('Lior Levy')
                .style("opacity", 0)

			processBubble
                .append('div')
                .attr('class', 'textDiv')
                .text('Emma Raible')
                .style("opacity", 0)

            processBubble
                .append('div')
                .attr('class', 'textDiv')
                .text('Heather Harvey')
                .style("opacity", 0)

			processBubble
                .append('div')
                .attr('class', 'textDiv')
                .text('Amir Mola')
                .style("opacity", 0)

            processBubble
                .append('div')
                .attr('class', 'textDiv')
                .text('Kushal Jhunjhunwalla')
                .style("opacity", 0)
			processBubble.transition()
                .duration(1000)
                .style("width", "350px")
                .style("height", "350px")
                .delay(1000)
                .style("color", "black")
				.style('margin-right', '30px')

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

