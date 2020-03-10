const d3 = require('d3');

class StreamAnimation {

	constructor() {
	}


	start() {
		d3.selectAll(".fullVis:not(.special)").html("")
        d3.selectAll('.halfVis').html("")
		d3.selectAll('.explanation').html("")

		d3.selectAll("#vis div").classed("selected", false)
		d3.select("#content3").classed("selected", true)

		initialMessage = "PLAINTEXT";
		initialKey = "KEYKEYKEY";
		initialCipher = "ZPYSRROBR";
		var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M"];
		var alphabet2 = ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
		var alphaAlpha = alphabet.concat(alphabet2)

		var plainColor = "var(--plain-color)";
		var keyColor = "var(--key-color)";
		var cipherColor = "var(--cipher-color)";

		var stream_container = d3.select('#title3 .halfVis').append('div').attr('class', 'streamContainer');
		var table_div = stream_container.append('div').attr('class', 'tableDiv')
		var message = stream_container.append('div').attr('class', 'message');

		var explanation = d3.select('#title3 .explanation')

		historyBubble = explanation.append('div')
			.style("width", "0px")
			.style("height", "0px")
			.style("background-color", "#BCF2F0")
			.attr("class", "explanationCircle")

		historyText = historyBubble
			.append('div')
		historyText.append("text")
			.text("Stream Cipher: Vigenere")
			.style('font-size', '26px')
		historyText.append('br')
		historyText.append('br')
		historyText.append('text')
			.text('In a stream cipher, the encryption rule depends on a plaintext symbol\'s position in the stream of plaintext symbols. One of the most famous early stream ciphers is the Vigenere, created by the diplomat of King Charles IX. It follows the convention where letters are labeled based on their position within the alphabet: A = 0, B = 1, ... Z = 25')

		historyBubble.transition()
			.duration(1000)
			.style("width", "350px")
			.style("height", "350px")
			.style("color", "black")

		processBubble = explanation.append('div')
			.style("width", "0px")
			.style("height", "0px")
			.style("background-color", "#4EB7B2")
			.attr("class", "explanationCircle")
			.style("margin-left", "auto")

		processText = processBubble
			.append('div')
		processText.append("text")
			.text("Encryption")
			.style('font-size', '26px')
		processText.append('br')
		processText.append('br')
		processText.append('text')
            .text('Plaintext (P) and keytext (C) are then added together to produce a ciphertext (C) using the following equation:')
		processText.append('br')
		processText.append('br')
		processText.append('text')
            .text('C = P + K mod 26')
		processText.append('br')
        processText.append('br')
		processText.append('text')
            .text('Click start and follow along on the left as we encrypt our plaintext message')
		processText.append('br')
		processText.append('br')
		var startButton = processText.append('div')
			.attr('id', 'startButton')
			.text("START ANIMATION")
			.style('width', '120px')

		processBubble.transition()
			.duration(1000)
			.style("width", "350px")
			.style("height", "350px")
			.delay(500)
			.style("color", "black")
			.style("margin-top", '-90px')

		decryptBubble = explanation.append('div')
			.style("width", "0px")
			.style("height", "0px")
			.style("background-color", "#2B7A78")
			.attr("class", "explanationCircle")

		decryptBubble
			.append('div')
			.append("text")
			.text("Decryption")

		decryptBubble.transition()
			.duration(1000)
			.style("width", "350px")
			.style("height", "350px")
			.delay(1000)
			.style("color", "black")
			.style("margin-top", '-90px')

		for(var i = 0; i < initialMessage.length; i++) {
			var index = message.append('div') 
				.attr('id', 'index' + i)
				.attr('class', 'index');

			index.append('div')
				.attr('class', 'letter')
				.transition()
				.duration(200)
				.text(initialMessage[i]);
			index.append('div')
				.attr('class', 'key')
				.transition()
				.duration(200)
				.text(initialKey[i]);
			index.append('div')
				.attr('class', 'cipher')
		}

		// TABLE 1
		var table = table_div.append('table');
		var thead = table.append('thead');
		var tbody = table.append('tbody');
		thead.append('tr')
			.selectAll('th')
			.data(alphabet)
			.enter()
			.append('th')
			.text(function(letter) { return letter })
			.attr('class', function(letter) { return letter });
		var rows = tbody.selectAll('tr')
			.data([1])
			.enter()
			.append('tr')
		var cells = rows.selectAll('td')
			.data(function(row) {
				return alphabet.map(function(letter) {
					return {column: letter, value: alphabet.indexOf(letter)};
				});
			})
			.enter()
			.append('td')
			.html(function(d) {return d.value})
			.attr('class', function(d) { return d.column });
		//TABLE 2
		var table2 = table_div.append('table');
		var thead2 = table2.append('thead');
		var tbody2 = table2.append('tbody');
		thead2.append('tr')
			.selectAll('th')
			.data(alphabet2)
			.enter()
			.append('th')
			.text(function(letter) { return letter })
			.attr('class', function(letter) { return letter });
		var rows2 = tbody2.selectAll('tr')
			.data([1])
			.enter()
			.append('tr')
		var cells2 = rows2.selectAll('td')
			.data(function(row) {
				return alphabet2.map(function(letter) {
					return {column: letter, value: alphabet2.indexOf(letter) + 13};
				});
			})
			.enter()
			.append('td')
			.html(function(d) {return d.value})
			.attr('class', function(d) { return d.column });


		// MATH CALCULATIONS
		var math_div = table_div.append('div').attr('class', 'math')
		var plain_text = math_div.append('p').text('P')
			.style('color', plainColor)
			.attr('id', 'plain')
			.attr('class', 'mathSymbol')
		var plus = math_div.append('p').text('  +  ').attr('class', 'mathSymbol')
		var key = math_div.append('p').text('K')
			.style('color', keyColor)
			.attr('id', 'key')
			.attr('class', 'mathSymbol')
		var mod = math_div.append('p').text(' mod 26 = ').attr('class', 'mathSymbol')
		var cipher = math_div.append('p').text('C')
			.style('color', cipherColor)
			.attr('id', 'cipher')
			.attr('class', 'mathSymbol')

		d3.select('#startButton').on('click', function () {
		var m = 3000;
		for (var i = 0; i < initialMessage.length; i++) {
			d3.select('#index'+i).select('.letter')
				.transition()
				.duration(500)
				.style('color', plainColor)
				.delay(m*i);
			d3.select('#index'+i).select('.key')
				.transition()
				.duration(500)
				.style('color', keyColor)
				.delay(m*i);
			d3.select('#key')
				.transition()
				.duration(500)
				.text(alphaAlpha.indexOf(initialKey[i]))
				.delay(m*i);
			d3.select('#plain')
				.transition()
				.duration(500)
				.text(alphaAlpha.indexOf(initialMessage[i]))
				.delay(m*i);
			d3.selectAll('.'+initialMessage[i])
				.transition()
				.duration(500)
				.style('background-color', plainColor)
				.style('color', 'white')
				.delay(m*i);
			d3.selectAll('.'+initialKey[i])
				.transition()
				.duration(500)
				.style('background-color', keyColor)
				.style('color', 'white')
				.delay(m*i);
			d3.select('#index'+i).select('.cipher')
				.transition()
				.duration(500)
				.style('color', cipherColor)
				.text(initialCipher[i])
				.delay(1000+m*i);
			d3.select('#cipher')
				.transition()
				.duration(500)
				.text(alphaAlpha.indexOf(initialCipher[i]))
				.delay(1000+m*i);
			d3.selectAll('.'+initialMessage[i])
				.transition()
				.duration(500)
				.style('background-color', 'transparent')
				.style('color', '#9a9a9a')
				.delay(1000+m*i);
			d3.selectAll('.'+initialKey[i])
				.transition()
				.duration(500)
				.style('background-color', 'transparent')
				.style('color', '#9a9a9a')
				.delay(1000+m*i);
			d3.selectAll('.'+initialCipher[i])
				.transition()
				.duration(500)
				.style('background-color', cipherColor)
				.style('color', 'white')
				.delay(1000+m*i);

			d3.select('#index'+i).select('.letter')
				.transition()
				.duration(500)
				.style('color', 'black')
				.delay(1000+m*i);
			d3.select('#index'+i).select('.key')
				.transition()
				.duration(500)
				.style('color', 'black')
				.delay(1000+m*i);
			d3.selectAll('.'+initialCipher[i])
				.transition()
				.duration(500)
				.style('background-color', 'transparent')
				.style('color', '#9a9a9a')
				.delay(2000+m*i);
		}
		d3.select('#plain')
			.transition()
			.duration(50)
			.text('P')
			.delay(20000);
		d3.select('#cipher')
			.transition()
			.duration(50)
			.text('C')
			.delay(20000);
		d3.select('#key')
			.transition()
			.duration(50)
			.text('K')
			.delay(20000);
        });
	}
	
}

module.exports = StreamAnimation;
