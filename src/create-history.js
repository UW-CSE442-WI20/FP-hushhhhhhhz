const d3 = require('d3');

class History {
	constructor() {
	}

	start(flag) {
		if (flag) {
			d3.selectAll(".fullVis:not(.special)").html("")
			d3.selectAll('.halfVis').html("")
			
			d3.selectAll("#vis div").classed("selected", false)
			d3.select("#content2").classed("selected", true)
		} else {
			d = 1000
			d3.selectAll(".fullVis:not(.special)").style("background-color", "transparent").html("")
			d3.selectAll('.halfVis').style("background-color", "transparent").html("")

			d3.selectAll("#vis div").classed("selected", false)
			d3.select("#content2").classed("selected", true)
		
			var infoContainer = d3.select('#title2 .fullVis').append('div').attr('class', 'infoContainer')
			infoContainer.append('text')
				.text("The study and advancement of cryptology goes back centuries.")
				.style('font-size', '24px')
			var infoContainer2 = d3.select('#title2 .fullVis').append('div').attr('class', 'infoContainer')
			infoContainer2.append('text')
                .text("Below we outline some of the most major discoveries and improvements in the field:")
				.style('font-size', '24px')
			var timelineContainer = d3.select('#title2 .fullVis').append('div').attr('class', 'timelineContainer');
			var leftDiv = timelineContainer.append('div').attr('class', 'leftDiv');
			var lineDiv = timelineContainer.append('div').attr('class', 'lineDiv');
			var rightDiv = timelineContainer.append('div').attr('class', 'rightDiv');
			rightDiv.append('br')

			y = d3.scaleLinear()
				.domain([1450, 1975])
				.range([0, 700]);

			var line = d3.line()
				.curve(d3.curveCatmullRom.alpha(0.5))
				.x(10)
				.y(function(d) {
					return y(d);
				});

			var data = []
			for (var i = 1467; i < 1975; i ++) {
				data.push(i)
			}

			var totalLength = 600;

			d3.select('.lineDiv').append('svg')
				.attr("width", 20)
				.append('path')
				.attr('d', line(data))
				.attr("stroke", "#2B7A78")
				.attr("stroke-width", 2)
				.attr("stroke-dasharray", totalLength + " " + totalLength)
				.attr("stroke-dashoffset", totalLength)
				.transition()
				.duration(12*d)
				.ease(d3.easeLinear)
				.attr("stroke-dashoffset", 0);

			eventHash = { 
				"1467": "Leon Battista Alberti (father of western cryptography) invents cipher wheel",
				"1553": "Giovan Battista Bellaso describes Vigenere's early stream cipher",
				"1678": "Robert Hooke publishes first one way function (related to RSA)",
				"1854": "Playfair cipher invented by Sir Charles Wheatstone",
				"1863": "First published solution to vigenere cipher, authored by Kasiski",
				"1917": "Gilbert Vernam proposed one time pad modification to a stream cipher",
				"1923": "Enigma encoding machine invented by the Germans",
				"1942": "Enigma code cracked by Alan Turing and his fellows at Bletchley Park",
				"1960": "Cryptographic hash functions introduced into computer systems",
				"1975": "Data Encryption Standard introduced for symmetric key encryption",
				"2001": "SHA-2 published",
				"2015": "SHA-3 published",
			}

			var i = 0;
			var delay = d;
			console.log("here")
			for (var key in eventHash) {
				var side = (i % 2 == 0) ? leftDiv : rightDiv;
				var eventBox = side.append('div')
				
				eventBox.transition()
					.attr('class', 'eventBox')
					.attr('id', 'eventBox' + i)
					.delay(delay * i);
				eventBox.append('div')
					.transition()
					.attr('class', 'year')
					.text(key)
					.delay(delay * i);
				eventBox.append('div')
					.transition()
					.attr('class', 'event')
					.text(eventHash[key])
					.delay(delay * i);
				i += 1;
			}
		}
	}
}

module.exports = History;
