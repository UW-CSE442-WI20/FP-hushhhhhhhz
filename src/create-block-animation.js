const d3 = require('d3');

class BlockAnimation {

	constructor() {
	}

	start() {
		d3.selectAll('.fullVis').style("background-color", "transparent").html("")
		d3.selectAll('.halfVis').style("background-color", "transparent").html("")

		d3.selectAll("#vis p").style("font-weight", "normal")
		d3.select("#content4").style("font-weight", "bold")

		// column, row, box
		plain_text_pairs = ["GR", "MO", "MY"];
		cipher_text_pairs = ["MW", "NP", "OW"];

		var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

		var everything = d3.select("#title5 .halfVis").append("div").attr('class', 'everything')
		var block_container = everything.append("div").attr('class', 'blockContainer')

		var grid = block_container.append('div').attr('class', 'grid');

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				grid.append('div').attr('class', 'grid_box block-' + alphabet[j + i * 4 + i]).append('p').text(alphabet[j + i * 4 + i]);
			}
		}

		var text_container = block_container.append('div').attr('class', 'text_container')
		text_container.append('div').attr('class', 'rules');
		
		this.transitions(plain_text_pairs, cipher_text_pairs, 0);

		var encryption = text_container.append('div').attr('class', 'encryption');
		encryption.append('div').attr('class', 'block_message').text("");
		encryption.append('div').attr('class', 'cipher_message').text("");		

		var interactive_container = everything.append("div").attr('class', 'interactiveContainer')
	}


	transitions(plain_text_pairs, cipher_text_pairs, i) {
		var rule = (i==0) ? "column" : "row"; 

		var column_ex = d3.select(".rules").append("div").attr('class', 'exampleContainer').append("h3").text( rule[0].toUpperCase() + rule.substr(1, rule.length) + " rule:")
		var plain_text = column_ex.append('div').attr('class', 'example')

		plain_text.append('div').text(plain_text_pairs[i][0]).attr('class', 'block_letter')

		plain_text.append('div').text(plain_text_pairs[i][1]).attr('class', 'block_letter')

		var cipher_text = column_ex.append('div').attr('class', 'example')
		cipher_text.append('div').attr('id', rule + '_cipher_1').attr('class', 'block_letter')
		cipher_text.append('div').attr('id', rule + '_cipher_2').attr('class', 'block_letter')
		
		var duration = 500;
		var delay = 1000;

		// color the plain text letters in the grid (red)
		d3.select('.block-' + plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', '#e53935')
			.delay(0);
		d3.select('.block-' + plain_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', '#e53935')
			.delay(0);

		// color the plain text letters in the grid (light red)
		d3.select('.block-' + plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', '#ef9a9a')
			.delay(duration + delay);
		d3.select('.block-' + plain_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', '#ef9a9a')
			.delay(duration + delay);

		// color the cipher text letters in the grid (red)
		d3.select('.block-' + cipher_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', '#e53935')
			.delay((duration + delay));
		d3.select('.block-' + cipher_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', '#e53935')
			.delay((duration + delay));

		// add in the ciphered letters at the same time as the cipher text highlight
		d3.select("#"+ rule + "_cipher_1")
			.transition()
			.duration(duration)
			.style('color', '#1b87e5')
			.text(cipher_text_pairs[i][0])
			.delay((duration + delay) + 500);

		d3.select("#"+ rule + "_cipher_2")
			.transition()
			.duration(duration)
			.style('color', '#1b87e5')
			.text(cipher_text_pairs[i][1])
			.delay((duration + delay) + 500);

		
		// decolor everything 
		d3.select('.block-' + plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', 'transparent')
			.delay((duration + delay + 1500));
		d3.select('.block-' + plain_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', 'transparent')
			.delay(duration + delay + 1500);

		d3.select('.block-' + cipher_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', 'transparent')
			.delay(duration + delay + 1500);

		var forreal = this;

		if (i == 0) {
			d3.select('.block-' + cipher_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', 'transparent')
			.delay(duration + delay + 1500)
			.on("end", function () {
				forreal.transitions(plain_text_pairs, cipher_text_pairs, 1)
			});
		}

		if (i == 1) {
			d3.select('.block-' + cipher_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', 'transparent')
			.delay(duration + delay + 1500)
			.on("end", function () {
				forreal.box_transition(plain_text_pairs, cipher_text_pairs, 2)
			});
		}
	}

	box_transition(plain_text_pairs, cipher_text_pairs, i) {
		var column_ex = d3.select(".rules").append("div").attr('class', 'exampleContainer').append("h3").text( "Box rule:")
		var plain_text = column_ex.append('div').attr('class', 'example')

		plain_text.append('div').text(plain_text_pairs[i][0]).attr('class', 'block_letter')

		plain_text.append('div').text(plain_text_pairs[i][1]).attr('class', 'block_letter')

		var cipher_text = column_ex.append('div').attr('class', 'example')
		cipher_text.append('div').attr('id', 'box_cipher_1').attr('class', 'block_letter')
		cipher_text.append('div').attr('id', 'box_cipher_2').attr('class', 'block_letter')

		var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

		var duration = 500;
		var delay = 1000;
		var forreal = this;
		
		// highlight M and Y in red 
		d3.select('.block-' + plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', '#e53935')
			.delay(0);

		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 12)])
			.transition()
			.duration(duration)
			.style('background-color', '#e53935')
			.delay(0);
		
		// highlight M and Y in pink
		d3.select('.block-' + plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', '#ef9a9a')
			.delay(delay);

		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 12)])
			.transition()
			.duration(duration)
			.style('background-color', '#ef9a9a')
			.delay(delay);

		// highlight O and W in red 
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 2)])
			.transition()
			.duration(duration)
			.style('background-color', '#e53935')
			.delay(delay + duration);

		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 10)])
			.transition()
			.duration(500)
			.style('background-color', '#e53935')
			.delay(delay + duration);

		// add in the ciphered letters at the same time as the cipher text highlight
		d3.select("#box_cipher_1")
			.transition()
			.duration(duration)
			.style('color', '#1b87e5')
			.text(cipher_text_pairs[i][0])
			.delay(delay + duration);

		d3.select("#box_cipher_2")
			.transition()
			.duration(duration)
			.style('color', '#1b87e5')
			.text(cipher_text_pairs[i][1])
			.delay(delay + duration);

		// decolor everything
		d3.select('.block-' + plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', "transparent")
			.delay(2*(delay+duration));
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 2)])
			.transition()
			.duration(duration)
			.style('background-color', 'transparent')
			.delay(2*(delay+duration));
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 10)])
			.transition()
			.duration(duration)
			.style('background-color', 'transparent')
			.delay(2*(delay+duration));
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 12)])
			.transition()
			.duration(duration)
			.style('background-color', "transparent")
			.delay(2*(delay+duration))
			.on('end', function () {
				forreal.message_transition();
			});
	}

	message_transition() {
		var initialMessage = "SECRET";
		var cipherMessage = "UCBSDU"
		var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
		
		var duration = 1000
		var buffer = 2500;

		for(var i=0; i < initialMessage.length; i++){
			var delay = 1000
			d3.select('.block_message').append("div").attr('id', "encr_block_"+i).attr('class', 'block_msg_letter')
				.transition()
				.duration(duration)
				.text(initialMessage[(i == 0) ? 0 : i])
				.delay(delay);

			d3.select('.cipher_message').append("div").attr('id', "decr_block_"+i).attr('class', 'block_msg_letter update_margin')
				.transition()
				.duration(duration)
				.delay(delay);
		}

		var lastTiming = 0;

		for(var i=0; i < initialMessage.length; i+=2){
			var delay = (i==0) ? 0 : (lastTiming - ((i/2) * 3000));

			var last = i/2;
			
			d3.select("#encr_block_" + i)
				.transition()
				.duration(duration)
				.style('color', '#e53935')
				.delay((last * buffer)+(delay + duration));

			d3.select("#encr_block_" + (i+1))
				.transition()
				.duration(duration)
				.style('color', '#e53935')
				.delay((last * buffer)+(delay + duration));	
			

			var e_index1 = alphabet.indexOf(initialMessage[i])
			var e_index2 = alphabet.indexOf(initialMessage[i+1])

			// make two plain text letters red 
			d3.select('.block-' + alphabet[e_index1])
				.transition()
				.duration(duration)
				.style('background-color', '#e53935')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + alphabet[e_index2])
				.transition()
				.duration(duration)
				.style('background-color', '#e53935')
				.delay((last * buffer)+(delay + duration));

			delay = (i==0) ? 2000 : (lastTiming - ((i/2) * 1000) - (1000*(i-2)))

			d3.select("#encr_block_" + i)
				.transition()
				.duration(duration)
				.style('color', 'black')
				.delay((last * buffer)+(delay + duration));

			d3.select("#encr_block_" + (i+1))
				.transition()
				.duration(duration)
				.style('color', 'black')
				.delay((last * buffer)+(delay + duration));	
			
			// make two plain text letters pink
			d3.select('.block-' + alphabet[e_index1])
				.transition()
				.duration(duration)
				.style('background-color', '#ef9a9a')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + alphabet[e_index2])
				.transition()
				.duration(duration)
				.style('background-color', '#ef9a9a')
				.delay((last * buffer)+(delay + duration));

			var c_index1 = alphabet.indexOf(cipherMessage[i])
			var c_index2 = alphabet.indexOf(cipherMessage[i+1])
			
			// make two cipher text letters red
			d3.select('.block-' + alphabet[c_index1])
				.transition()
				.duration(duration)
				.style('background-color', '#e53935')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + alphabet[c_index2])
				.transition()
				.duration(duration)
				.style('background-color', '#e53935')
				.delay((last * buffer)+(delay + duration));

			d3.select("#decr_block_" + i)
				.transition()
				.duration(duration)
				.style('color', '#1b87e5')
				.text(cipherMessage[i])
				.delay((last * buffer)+(delay + duration));

			d3.select("#decr_block_" + (i+1))
				.transition()
				.duration(duration)
				.style('color', '#1b87e5')
				.text(cipherMessage[i+1])
				.delay((last * buffer)+(delay + duration));	

			delay = (i==0) ? 3000 : (lastTiming - ((i-2) * 500))
			
			// decolor everything
			d3.select('.block-' + alphabet[e_index1])
				.transition()
				.duration(duration)
				.style('background-color', 'transparent')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + alphabet[e_index2])
				.transition()
				.duration(duration)
				.style('background-color', 'transparent')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + alphabet[c_index1])
				.transition()
				.duration(duration)
				.style('background-color', 'transparent')
				.delay((last * buffer)+(delay + duration));
			
			var forreal = this;
			
			d3.select('.block-' + alphabet[c_index2])
				.transition()
				.duration(duration)
				.style('background-color', 'transparent')
				.delay((last * buffer)+(delay + duration));
			
			lastTiming = (last * buffer)+(delay + duration) + duration
		}
	}

}

module.exports = BlockAnimation;
