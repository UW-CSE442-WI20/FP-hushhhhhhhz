const d3 = require('d3');

class CreateBlock {

	constructor() {

	}

	start() {
		console.log('[CreateBlock]');

		// need this in order to clear out the previous section's visualization
		document.getElementById('vis').innerHTML = "";

		initialMessage = "SECRET";
		cipherMessage = "UCBSDU"

		// column, row, box
		plain_text_pairs = ["GR", "MO", "MY"];
		cipher_text_pairs = ["MW", "NP", "OW"];

		var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

		var block_container = d3.select("#vis").append("div").attr('class', 'blockContainer')

		var grid = block_container.append('div').attr('class', 'grid');

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				grid.append('div').attr('class', 'grid_box block-' + alphabet[j + i * 4 + i]).append('p').text(alphabet[j + i * 4 + i]);
			}
		}

		var text_container = block_container.append('div').attr('class', 'text_container')
		text_container.append('div').attr('class', 'rules');
		
		this.transitions(plain_text_pairs, cipher_text_pairs, block_container, 0);

		var encryption = text_container.append('div').attr('class', 'encryption');
		encryption.append('div').attr('class', 'block_message').text("");
		encryption.append('div').attr('class', 'cipher_message').text("");
		

		this.message_transition(initialMessage, cipherMessage);

	}

	message_transition(initialMessage, cipherMessage) {
		var delay = 21000
		var duration = 1000

		for(var i=0; i < initialMessage.length; i++){
			d3.select('.block_message').append("div").attr('id', "encr_block_"+i).attr('class', 'block_msg_letter')
				.transition()
				.duration(duration)
				.text(initialMessage[i])
				.delay(delay);

			d3.select('.cipher_message').append("div").attr('id', "decr_block_"+i).attr('class', 'block_msg_letter update_margin')
				.transition()
				.duration(duration)
				.delay(delay);
		}

		var last = 0

		for(var i=0; i < initialMessage.length; i+=2){
			d3.select("#encr_block_" + i)
				.transition()
				.duration(duration)
				.style('color', 'red')
				.delay((last * 3000)+(delay + duration));

			d3.select("#encr_block_" + (i+1))
				.transition()
				.duration(duration)
				.style('color', 'red')
				.delay((last * 3000)+(delay + duration));

			/////////////////////////////////////////////////

			// color the plain text letters in the grid (red)
			d3.select('.block-' + initialMessage[i])
				.transition()
				.duration(duration)
				.style('background-color', 'red')
				.delay((last * 3000)+(delay + duration));
			d3.select('.block-' + initialMessage[i+1])
				.transition()
				.duration(duration)
				.style('background-color', 'red')
				.delay((last * 3000)+(delay + duration));

			// color the plain text letters in the grid (light red)
			d3.select('.block-' + initialMessage[i])
				.transition()
				.duration(duration)
				.style('background-color', '#ffcccc')
				.delay((last * 4000)+(delay + duration));
			d3.select('.block-' + initialMessage[i+1])
				.transition()
				.duration(duration)
				.style('background-color', '#ffcccc')
				.delay((last * 4000)+(delay + duration));

			// color the cipher text letters in the grid (red)
			d3.select('.block-' + cipherMessage[i])
				.transition()
				.duration(duration)
				.style('background-color', 'red')
				.delay((last * 5000)+(delay + duration));
			d3.select('.block-' + cipherMessage[i+1])
				.transition()
				.duration(duration)
				.style('background-color', 'red')
				.delay((last * 5000)+(delay + duration));

			// add in the ciphered letters at the same time as the cipher text highlight
			d3.select("#encr_block_" + i)
				.transition()
				.duration(duration)
				.style('color', 'black')
				.delay((last * 5000)+(delay + duration));

			d3.select("#decr_block_"+i)
				.transition()
				.duration(duration)
				.text(cipherMessage[i])
				.style('color', 'blue')
				.delay((last * 5000)+(delay + duration));
			
			d3.select("#encr_block_" + (i+1))
				.transition()
				.duration(duration)
				.style('color', 'black')
				.delay((last * 5000)+(delay + duration));

			d3.select("#decr_block_"+(i+1))
				.transition()
				.duration(duration)
				.text(cipherMessage[i+1])
				.style('color', 'blue')
				.delay((last * 5000)+(delay + duration));

			////////////////////////////////////////////////////

			// d3.select("#encr_block_" + i)
			// 	.transition()
			// 	.duration(duration)
			// 	.style('color', 'black')
			// 	.delay((last * 6000)+(delay + duration));

			// d3.select("#encr_block_" + (i+1))
			// 	.transition()
			// 	.duration(duration)
			// 	.style('color', 'black')
			// 	.delay((last * 6000)+(delay + duration));
			

			last +=1
		}
	}

	box_transition(plain_text_pairs, cipher_text_pairs, block_container, i) {
		var column_ex = d3.select(".rules").append("div").attr('class', 'exampleContainer').append("h3").text( "Box rule:")
		var plain_text = column_ex.append('div').attr('class', 'example')

		plain_text.append('div').text(plain_text_pairs[i][0]).attr('class', 'block_letter')

		plain_text.append('div').text(plain_text_pairs[i][1]).attr('class', 'block_letter')

		var cipher_text = column_ex.append('div').attr('class', 'example')
		cipher_text.append('div').attr('id', 'box_cipher_1').attr('class', 'block_letter')
		cipher_text.append('div').attr('id', 'box_cipher_2').attr('class', 'block_letter')

		var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

		var duration = 2000;
		var delay = 200;
		var forreal = this;
		// highlight row 1 (box 0 is red, everything else is pink)
		d3.select('.block-' + plain_text_pairs[i][0])
			.transition()
			.duration(500)
			.style('background-color', 'red')
			.delay(0);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 1)])
			.transition()
			.duration(500)
			.style('background-color', '#ffcccc')
			.delay(0);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 2)])
			.transition()
			.duration(500)
			.style('background-color', '#ffcccc')
			.delay(0);
		
		// highlight row 2
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 5)])
			.transition()
			.duration(500)
			.style('background-color', '#ffcccc')
			.delay(0);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 6)])
			.transition()
			.duration(500)
			.style('background-color', '#ffcccc')
			.delay(0);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 7)])
			.transition()
			.duration(500)
			.style('background-color', '#ffcccc')
			.delay(0);

		// highlight row 3 (box 2 is red, everything else is pink)
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 10)])
			.transition()
			.duration(500)
			.style('background-color', '#ffcccc')
			.delay(0);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 11)])
			.transition()
			.duration(500)
			.style('background-color', '#ffcccc')
			.delay(0);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 12)])
			.transition()
			.duration(500)
			.style('background-color', 'red')
			.delay(0);
		
		// make everything pink
		d3.select('.block-' + plain_text_pairs[i][0])
			.transition()
			.duration(500)
			.style('background-color', '#ffcccc')
			.delay(1000);

		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 12)])
			.transition()
			.duration(500)
			.style('background-color', '#ffcccc')
			.delay(1000);

		// make box 2 of row 1 and box 0 of row 2 red
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 2)])
			.transition()
			.duration(500)
			.style('background-color', 'red')
			.delay(1500);

		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 10)])
			.transition()
			.duration(500)
			.style('background-color', 'red')
			.delay(1500);

		// add in the ciphered letters at the same time as the cipher text highlight
		d3.select("#box_cipher_1")
			.transition()
			.duration(500)
			.text(cipher_text_pairs[i][0])
			.delay(1500);

		d3.select("#box_cipher_2")
			.transition()
			.duration(500)
			.text(cipher_text_pairs[i][1])
			.delay(1500);

		// decolor everything
		d3.select('.block-' + plain_text_pairs[i][0])
			.transition()
			.duration(500)
			.style('background-color', "#F1F1F1")
			.delay(3500);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 1)])
			.transition()
			.duration(500)
			.style('background-color', '#F1F1F1')
			.delay(3500);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 2)])
			.transition()
			.duration(500)
			.style('background-color', '#F1F1F1')
			.delay(3500);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 5)])
			.transition()
			.duration(500)
			.style('background-color', '#F1F1F1')
			.delay(3500);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 6)])
			.transition()
			.duration(500)
			.style('background-color', '#F1F1F1')
			.delay(3500);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 7)])
			.transition()
			.duration(500)
			.style('background-color', '#F1F1F1')
			.delay(3500);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 10)])
			.transition()
			.duration(500)
			.style('background-color', '#F1F1F1')
			.delay(3500);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 11)])
			.transition()
			.duration(500)
			.style('background-color', "#F1F1F1")
			.delay(3500);
		d3.select('.block-' + alphabet[(alphabet.indexOf(plain_text_pairs[i][0]) + 12)])
			.transition()
			.duration(500)
			.style('background-color', "#F1F1F1")
			.delay(3500)
			.on('end', function () {
				forreal.message_transition()
			});
	}

	transitions(plain_text_pairs, cipher_text_pairs, block_container, i) {
		var rule = (i==0) ? "column" : "row"; 

		var column_ex = d3.select(".rules").append("div").attr('class', 'exampleContainer').append("h3").text( rule[0].toUpperCase() + rule.substr(1, rule.length) + " rule:")
		var plain_text = column_ex.append('div').attr('class', 'example')

		plain_text.append('div').text(plain_text_pairs[i][0]).attr('class', 'block_letter')

		plain_text.append('div').text(plain_text_pairs[i][1]).attr('class', 'block_letter')

		var cipher_text = column_ex.append('div').attr('class', 'example')
		cipher_text.append('div').attr('id', rule + '_cipher_1').attr('class', 'block_letter')
		cipher_text.append('div').attr('id', rule + '_cipher_2').attr('class', 'block_letter')
		
		var duration = 2000;
		var delay = 200;

		// color the plain text letters in the grid (red)
		d3.select('.block-' + plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', 'red')
			.delay(delay);
		d3.select('.block-' + plain_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', 'red')
			.delay(delay);

		// color the plain text letters in the grid (light red)
		d3.select('.block-' + plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', '#ffcccc')
			.delay(duration + delay);
		d3.select('.block-' + plain_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', '#ffcccc')
			.delay(duration + delay);

		// color the cipher text letters in the grid (red)
		d3.select('.block-' + cipher_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', 'red')
			.delay((duration + delay));
		d3.select('.block-' + cipher_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', 'red')
			.delay((duration + delay));

		// add in the ciphered letters at the same time as the cipher text highlight
		d3.select("#"+ rule + "_cipher_1")
			.transition()
			.duration(duration)
			.text(cipher_text_pairs[i][0])
			.delay((duration + delay) + 1000);

		d3.select("#"+ rule + "_cipher_2")
			.transition()
			.duration(duration)
			.text(cipher_text_pairs[i][1])
			.delay((duration + delay) + 1000);

		
		// decolor everything 
		d3.select('.block-' + plain_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', '#F1F1F1')
			.delay(2*(duration + delay + 1000));
		d3.select('.block-' + plain_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', '#F1F1F1')
			.delay(2*(duration + delay + 1000));

		d3.select('.block-' + cipher_text_pairs[i][0])
			.transition()
			.duration(duration)
			.style('background-color', '#F1F1F1')
			.delay(2*(duration + delay + 1000));

		var forreal = this;

		if (i == 0) {
			d3.select('.block-' + cipher_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', '#F1F1F1')
			.delay(2*(duration + delay + 1000))
			.on("end", function () {
				forreal.transitions(plain_text_pairs, cipher_text_pairs, block_container, 1)
			});
		}

		if (i == 1) {
			d3.select('.block-' + cipher_text_pairs[i][1])
			.transition()
			.duration(duration)
			.style('background-color', '#F1F1F1')
			.delay(2*(duration + delay + 1000))
			.on("end", function () {
				forreal.box_transition(plain_text_pairs, cipher_text_pairs, block_container, 2)
			});
		}
	}
}

module.exports = CreateBlock;


