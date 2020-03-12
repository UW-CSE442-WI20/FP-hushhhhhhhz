const d3 = require('d3');

class BlockAnimation {

	constructor() {
		// dark pink
		this.darkColor = "#DA2C5E";
		// light pink
		this.lightColor = "#CA9AA7";
		// yellow
		this.cipherColor = "#FFD700";
		this.plain_text_pairs = ["GR", "MO", "MY"];
		this.cipher_text_pairs = ["MW", "NP", "OW"];
		this.initialMessage = "SECRET";
		this.cipherMessage = "UCBSDU"
		this.alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
		this.reset = false;
	}

	appendItems() {
		d3.select("#everythingContainer").append('h1').text('A more advanced approach...').style('color', 'white').style('padding', '20px').style('font-size', '36px')

		var block_container = d3.select("#everythingContainer").append("div").attr('class', 'blockContainer')

		var grid = block_container.append('div').attr('class', 'grid');

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				grid.append('div').attr('class', 'grid_box block-' + this.alphabet[j + i * 4 + i]).append('p').text(this.alphabet[j + i * 4 + i]);
			}
		}

		var text_container = block_container.append('div').attr('class', 'text_container')
		text_container.append('div').attr('class', 'rules');

		var encryption = block_container.append('div').attr('class', 'encryption');
		encryption.append('div').attr('class', 'block_message').text("");
		encryption.append('div').attr('class', 'cipher_message').text("");		

		var interactive_container = d3.select("#everythingContainer").append("div").attr('class', 'interactiveContainer')
	}

	start(flag) {
		d3.selectAll(".fullVis:not(.special)").html("")
        d3.selectAll('.halfVis').html("")

		d3.selectAll("#vis div").classed("selected", false)
		d3.select("#content4").classed("selected", true)

		var explanation = d3.select('#title5 .explanation')

		var everything = d3.select("#title5 .halfVis").append("div").attr('class', 'everything').attr('id', 'everythingContainer')
		everything.append('h1').text('A more advanced approach...').style('color', 'white').style('padding', '20px').style('font-size', '36px')
		var block_container = d3.select("#everythingContainer").append("div").attr('class', 'blockContainer')

		var grid = block_container.append('div').attr('class', 'grid');

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				grid.append('div').attr('class', 'grid_box block-' + this.alphabet[j + i * 4 + i]).append('p').text(this.alphabet[j + i * 4 + i]);
			}
		}

		if (!flag) {
			historyBubble = explanation.append('div')
				.style("width", "0px")
				.style("height", "0px")
				.style("background-color", "#2B7A78")
				.attr("class", "explanationCircle")
				.style("margin-left", "auto")

			historyBubble
				.append('div')
				.attr("class", "textDiv")
				.attr("class", "textDivTitle")
                .style("opacity", 0)
				.append("text")
				.text("Block Cipher: Playfair")

			historyBubble
				.append('div')
				.attr("class", "textDiv")
				.text("Playfair uses a key table that acts as the key for encrypting plaintext, and decrypting the ciphered text.")
                .style("opacity", 0)

			historyBubble
				.append('div')
				.attr("class", "textDiv")
				.attr("id", "history_part2")
				.text("The alphabet has 26 letters and the key table only uses 25, which means we must ommit one letter from our alphabet!")
                .style("opacity", 0)

			historyBubble.transition()
				.duration(1000)
				.style("width", "350px")
				.style("height", "350px")
				.style("color", "black")

			historyBubble.selectAll(".textDiv").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(700)

            historyBubble.selectAll(".textDivTitle").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(700)

			processBubble = explanation.append('div')
				.style("width", "0px")
				.style("height", "0px")
				.style("background-color", "#4EB7B2")
				.attr("class", "explanationCircle")

			processBubble
				.append('div')
				.attr("class", "textDiv")
				.attr("class", "textDivTitle2")
                .style("opacity", 0)
				.attr("id", "blockEncryptionBubble")
				.append("text")
				.text("Encryption")

			processBubble
				.append('div')
				.attr("class", "textDiv")
				.text("The message is split into pairs of letters, and we use both letters to encrypt.")
                .style("opacity", 0)

			processBubble
				.append('div')
				.attr("class", "textDiv")
				.text("Click the button below to see how it works.")
                .style("opacity", 0)

			processBubble
				.append('div')
				.attr('id', 'startAnimation')
				.text("START ANIMATION")
                .style("opacity", 0)

			// you gotta do what you gotta do \_(-_-)_/
			const forreal = this;
			document.getElementById("startAnimation").onclick = function () {
				document.getElementById("everythingContainer").innerHTML = ""
				forreal.appendItems()
				document.getElementById("startAnimation").style.pointerEvents = 'none'
				forreal.transitions(0)
			};

			processBubble.transition()
				.duration(1000)
				.style("width", "350px")
				.style("height", "350px")
				.delay(500)
				.style("color", "black")
				.style("margin-top", '-90px')

			processBubble.selectAll("#startAnimation").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(1000)

            processBubble.selectAll(".textDiv").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(1000)

            processBubble.selectAll(".textDivTitle2").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(1000)

			decryptBubble = explanation.append('div')
				.style("width", "0px")
				.style("height", "0px")
				.style("background-color", "#BCF2F0")
				.attr("class", "explanationCircle")
				.style("margin-left", "auto")

			decryptBubble
				.append('div')
				.attr("class", "textDiv")
				.attr("class", "textDivTitle2")
				.text("Decryption")
                .style("opacity", 0)

			decryptBubble
				.append('div')
				.attr("class", "textDiv")
				.text("Decryption works the same as encryption but in the opposite way. For example, if two letters were in the same column, take the letters above each one.")
                .style("opacity", 0)

			decryptBubble.transition()
				.duration(1000)
				.style("width", "350px")
				.style("height", "350px")
				.delay(1000)
				.style("color", "black")
				.style("margin-top", '-90px')

			decryptBubble.selectAll(".textDiv").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(1500)

            decryptBubble.selectAll(".textDivTitle2").transition()
                .duration(500)
                .style("opacity", 1)
                .delay(1500)
		}
	}


	transitions(i) {
		
		this.plain_text_pairs = ["GR", "MO", "MY"];
		this.cipher_text_pairs = ["MW", "NP", "OW"];
		
		var rule = (i==0) ? "column" : "row"; 


		var column_ex = d3.select(".rules").append("div").attr('class', 'exampleContainer').append("h3").text( rule[0].toUpperCase() + rule.substr(1, rule.length) + " rule:")
		var plain_text = column_ex.append('div').attr('class', 'example')

		plain_text.append('div').text(this.plain_text_pairs[i][0]).attr('class', 'block_letter').attr("id", rule+"_plaintext_"+this.plain_text_pairs[i][0]).style("color", this.darkColor)

		plain_text.append('div').text(this.plain_text_pairs[i][1]).attr('class', 'block_letter').attr("id", rule+"_plaintext_"+this.plain_text_pairs[i][1]).style("color", this.darkColor)

		var cipher_text = column_ex.append('div').attr('class', 'example')
		cipher_text.append('div').attr('id', rule + '_cipher_1').attr('class', 'block_letter')
		cipher_text.append('div').attr('id', rule + '_cipher_2').attr('class', 'block_letter')

		var duration = 500;
		var delay = 1000;

		// color the plain text letters in the grid (red)
		d3.select('.block-' + this.plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', this.darkColor)
			.style("color", "white")
			.delay(0);
		d3.select('.block-' + this.plain_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', this.darkColor)
			.style("color", "white")
			.delay(0);

		// color the plain text letters in the grid (light red)
		d3.select('.block-' + this.plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', this.lightColor)
			.style("color", "white")
			.delay(duration + delay);
		d3.select('.block-' + this.plain_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', this.lightColor)
			.style("color", "white")
			.delay(duration + delay);

		d3.select("#" + rule + "_plaintext_" + this.plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('color', this.lightColor)
			.delay(duration + delay)

		d3.select("#" + rule + "_plaintext_" + this.plain_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('color', this.lightColor)
			.delay(duration + delay)

		// color the cipher text letters in the grid (red)
		d3.select('.block-' + this.cipher_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', this.darkColor)
			.style("color", "white")
			.delay((duration + delay));
		d3.select('.block-' + this.cipher_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', this.darkColor)
			.style("color", "white")
			.delay((duration + delay));

		// add in the ciphered letters at the same time as the cipher text highlight
		d3.select("#"+ rule + "_cipher_1")
			.transition()
			.duration(duration)
			.style('color', this.darkColor)
			.text(this.cipher_text_pairs[i][0])
			.delay((duration + delay) + 500);

		d3.select("#"+ rule + "_cipher_2")
			.transition()
			.duration(duration)
			.style('color', this.darkColor)
			.text(this.cipher_text_pairs[i][1])
			.delay((duration + delay) + 500);


		// decolor everything 
		d3.select('.block-' + this.plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', 'transparent')
			.style('color', '#9a9a9a')
			.delay((duration + delay + 1500));
		d3.select('.block-' + this.plain_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', 'transparent')
			.style('color', '#9a9a9a')
			.delay(duration + delay + 1500);

		d3.select('.block-' + this.cipher_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', 'transparent')
			.style('color', '#9a9a9a')
			.delay(duration + delay + 1500);

		var forreal = this;

		if (i == 0) {
			d3.select('.block-' + this.cipher_text_pairs[i][1])
				.transition()
				.duration(duration)
				.style('background-color', 'transparent')
				.style('color', '#9a9a9a')
				.delay(duration + delay + 1500)
				.on("end", function () {
					forreal.transitions(1)
				});
		}

		if (i == 1) {
			d3.select('.block-' + this.cipher_text_pairs[i][1])
				.transition()
				.duration(duration)
				.style('background-color', 'transparent')
				.style('color', '#9a9a9a')
				.delay(duration + delay + 1500)
				.on("end", function () {
					forreal.box_transition(2)
				});
		}
	}

	box_transition(i) {
		this.plain_text_pairs = ["GR", "MO", "MY"];
		this.cipher_text_pairs = ["MW", "NP", "OW"];

		var column_ex = d3.select(".rules").append("div").attr('class', 'exampleContainer').append("h3").text( "Box rule:")
		var plain_text = column_ex.append('div').attr('class', 'example')

		plain_text.append('div').text(this.plain_text_pairs[i][0]).attr('class', 'block_letter').attr("id", "box_plaintext_"+this.plain_text_pairs[i][0]).style("color", this.darkColor)

		plain_text.append('div').text(this.plain_text_pairs[i][1]).attr('class', 'block_letter').attr("id", "box_plaintext_"+this.plain_text_pairs[i][1]).style("color", this.darkColor)

		var cipher_text = column_ex.append('div').attr('class', 'example')
		cipher_text.append('div').attr('id', 'box_cipher_1').attr('class', 'block_letter')
		cipher_text.append('div').attr('id', 'box_cipher_2').attr('class', 'block_letter')

		// var this.alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

		var duration = 500;
		var delay = 1000;
		var forreal = this;

		// highlight M and Y in red 
		d3.select('.block-' + this.plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style("color", "white")
			.style('background-color', this.darkColor)
			.delay(0);

		d3.select('.block-' + this.alphabet[(this.alphabet.indexOf(this.plain_text_pairs[i][0]) + 12)])
			.transition()
			.duration(duration)
			.style('background-color', this.darkColor)
			.style("color", "white")
			.delay(0);

		// highlight M and Y in pink
		d3.select('.block-' + this.plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', this.lightColor)
			.delay(delay);

		d3.select('.block-' + this.alphabet[(this.alphabet.indexOf(this.plain_text_pairs[i][0]) + 12)])
			.transition()
			.duration(duration)
			.style('background-color', this.lightColor)
			.delay(delay);

		
		d3.select("#box_plaintext_" + this.plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('color', this.lightColor)
			.delay(duration + delay)

		d3.select("#box_plaintext_" + this.plain_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('color', this.lightColor)
			.delay(duration + delay)

		// highlight O and W in red 
		d3.select('.block-' + this.alphabet[(this.alphabet.indexOf(this.plain_text_pairs[i][0]) + 2)])
			.transition()
			.duration(duration)
			.style('background-color', this.darkColor)
			.style("color", "white")
			.delay(delay + duration);

		d3.select('.block-' + this.alphabet[(this.alphabet.indexOf(this.plain_text_pairs[i][0]) + 10)])
			.transition()
			.duration(500)
			.style('background-color', this.darkColor)
			.style("color", "white")
			.delay(delay + duration);

		// add in the ciphered letters at the same time as the cipher text highlight
		d3.select("#box_cipher_1")
			.transition()
			.duration(duration)
			.style('color', this.darkColor)
			.text(this.cipher_text_pairs[i][0])
			.delay(delay + duration);

		d3.select("#box_cipher_2")
			.transition()
			.duration(duration)
			.style('color', this.darkColor)
			.text(this.cipher_text_pairs[i][1])
			.delay(delay + duration);

		// decolor everything
		d3.select('.block-' + this.plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', "transparent")
			.style("color", "#9a9a9a")
			.delay(2*(delay+duration));
		d3.select('.block-' + this.alphabet[(this.alphabet.indexOf(this.plain_text_pairs[i][0]) + 2)])
			.transition()
			.duration(duration)
			.style('background-color', 'transparent')
			.style("color", "#9a9a9a")
			.delay(2*(delay+duration));
		d3.select('.block-' + this.alphabet[(this.alphabet.indexOf(this.plain_text_pairs[i][0]) + 10)])
			.transition()
			.duration(duration)
			.style('background-color', 'transparent')
			.style("color", "#9a9a9a")
			.delay(2*(delay+duration));
		d3.select('.block-' + this.alphabet[(this.alphabet.indexOf(this.plain_text_pairs[i][0]) + 12)])
			.transition()
			.duration(duration)
			.style('background-color', "transparent")
			.style("color", "#9a9a9a")
			.delay(2*(delay+duration))
			.on('end', function () {
				forreal.message_transition();
			});
	}

	message_transition() {
		var duration = 1000
		var buffer = 2500;

		for(var i=0; i < this.initialMessage.length; i++){
			var delay = 1000
			d3.select('.block_message').append("div").attr('id', "encr_block_"+i).attr('class', 'block_msg_letter')
				.transition()
				.duration(duration)
				.text(this.initialMessage[(i == 0) ? 0 : i])
				.delay(delay);

			d3.select('.cipher_message').append("div").attr('id', "decr_block_"+i).attr('class', 'block_msg_letter update_margin')
				.transition()
				.duration(duration)
				.delay(delay);
		}

		var lastTiming = 0;

		for(var i=0; i < this.initialMessage.length; i+=2){
			var delay = (i==0) ? 0 : (lastTiming - ((i/2) * 3000));

			var last = i/2;

			d3.select("#encr_block_" + i)
				.transition()
				.duration(duration)
				.style('color', this.darkColor)
				.delay((last * buffer)+(delay + duration));

			d3.select("#encr_block_" + (i+1))
				.transition()
				.duration(duration)
				.style('color', this.darkColor)
				.delay((last * buffer)+(delay + duration));	


			var e_index1 = this.alphabet.indexOf(this.initialMessage[i])
			var e_index2 = this.alphabet.indexOf(this.initialMessage[i+1])

			// make two plain text letters red 
			d3.select('.block-' + this.alphabet[e_index1])
				.transition()
				.duration(duration)
				.style('background-color', this.darkColor)
				.style('color', 'white')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + this.alphabet[e_index2])
				.transition()
				.duration(duration)
				.style('background-color', this.darkColor)
				.style('color', 'white')
				.delay((last * buffer)+(delay + duration));

			delay = (i==0) ? 2000 : (lastTiming - ((i/2) * 1000) - (1000*(i-2)))

			d3.select("#encr_block_" + i)
				.transition()
				.duration(duration)
				.style('color', this.lightColor)
				.delay((last * buffer)+(delay + duration));

			d3.select("#encr_block_" + (i+1))
				.transition()
				.duration(duration)
				.style('color', this.lightColor)
				.delay((last * buffer)+(delay + duration));	

			// make two plain text letters pink
			d3.select('.block-' + this.alphabet[e_index1])
				.transition()
				.duration(duration)
				.style('background-color', this.lightColor)
				.style('color', 'white')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + this.alphabet[e_index2])
				.transition()
				.duration(duration)
				.style('background-color', this.lightColor)
				.style('color', 'white')
				.delay((last * buffer)+(delay + duration));

			var c_index1 = this.alphabet.indexOf(this.cipherMessage[i])
			var c_index2 = this.alphabet.indexOf(this.cipherMessage[i+1])

			// make two cipher text letters red
			d3.select('.block-' + this.alphabet[c_index1])
				.transition()
				.duration(duration)
				.style('background-color', this.darkColor)
				.style('color', 'white')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + this.alphabet[c_index2])
				.transition()
				.duration(duration)
				.style('background-color', this.darkColor)
				.style('color', 'white')
				.delay((last * buffer)+(delay + duration));

			d3.select("#decr_block_" + i)
				.transition()
				.duration(duration)
				.style('color', this.darkColor)
				.text(this.cipherMessage[i])
				.delay((last * buffer)+(delay + duration));

			d3.select("#decr_block_" + (i+1))
				.transition()
				.duration(duration)
				.style('color', this.darkColor)
				.text(this.cipherMessage[i+1])
				.delay((last * buffer)+(delay + duration));	

			delay = (i==0) ? 3000 : (lastTiming - ((i-2) * 500))

			// decolor everything
			d3.select('.block-' + this.alphabet[e_index1])
				.transition()
				.duration(duration)
				.style('background-color', 'transparent')
				.style("color", "#9a9a9a")
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + this.alphabet[e_index2])
				.transition()
				.duration(duration)
				.style('background-color', 'transparent')
				.style("color", "#9a9a9a")
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + this.alphabet[c_index1])
				.transition()
				.duration(duration)
				.style('background-color', 'transparent')
				.style("color", "#9a9a9a")
				.delay((last * buffer)+(delay + duration));

			if( i == 4 ){
				d3.select('.block-' + this.alphabet[c_index2])
					.transition()
					.duration(duration)
					.style('background-color', 'transparent')
					.style("color", "#9a9a9a")
					.delay((last * buffer) + (delay + duration))
					.on('end', function() {
						document.getElementById("startAnimation").style.pointerEvents = 'auto'
					})

			} else {
				d3.select('.block-' + this.alphabet[c_index2])
					.transition()
					.duration(duration)
					.style('background-color', 'transparent')
					.style("color", "#9a9a9a")
					.delay((last * buffer) + (delay + duration))
			}


			lastTiming = (last * buffer)+(delay + duration) + duration
		}

	}

}

module.exports = BlockAnimation;
